import React, { useState, useCallback, useRef } from 'react'
import { Card, Stack, Text, Button, Select, Checkbox, Spinner, TextArea, Box, Flex } from '@sanity/ui'
import { Tool } from 'sanity'
import { useClient } from 'sanity'
import { UploadIcon } from '@sanity/icons'

const contentTypes = [
  { value: 'blog', label: 'Articles de blog' },
  { value: 'changelog', label: 'Journal des modifications' },
  { value: 'faq', label: 'FAQ' },
  { value: 'feature', label: 'Fonctionnalités' },
  { value: 'featureCard', label: 'Cartes de fonctionnalités' },
  { value: 'pricingPlan', label: 'Plans tarifaires' },
  { value: 'testimonial', label: 'Témoignages' },
  { value: 'siteConfig', label: 'Configuration du site' },
  { value: 'hero', label: 'Héros' },
  { value: 'cta', label: 'Appels à l\'action' },
  { value: 'socialProof', label: 'Preuve sociale' },
  { value: 'home', label: 'Page d\'accueil' }
]

function JsonImportTool() {
  const client = useClient()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedType, setSelectedType] = useState('')
  const [replaceExisting, setReplaceExisting] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [importResult, setImportResult] = useState<string | null>(null)
  const [jsonData, setJsonData] = useState('')
  const [fileInput, setFileInput] = useState<File | null>(null)

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'application/json') {
      setFileInput(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setJsonData(content)
      }
      reader.readAsText(file)
    } else {
      setImportResult('Veuillez sélectionner un fichier JSON valide')
    }
  }, [])

  const handleFileButtonClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleDirectImport = async () => {
    if (!selectedType) {
      setImportResult('Veuillez sélectionner un type de contenu à importer')
      return
    }

    if (!jsonData.trim()) {
      setImportResult('Veuillez fournir des données JSON à importer')
      return
    }

    setIsImporting(true)
    setImportResult(null)

    try {
      // Parse JSON data
      let data
      try {
        data = JSON.parse(jsonData)
      } catch (parseError) {
        throw new Error('Format JSON invalide')
      }

      // Ensure data is an array
      if (!Array.isArray(data)) {
        data = [data]
      }

      // Filter and validate data
      const validItems = data.filter(item => {
        if (typeof item !== 'object' || item === null) return false
        // Add _type if not present
        if (!item._type) {
          item._type = selectedType
        }
        return item._type === selectedType
      })

      if (validItems.length === 0) {
        throw new Error(`Aucun élément valide de type '${selectedType}' trouvé dans les données JSON`)
      }

      // Delete existing documents if replace option is selected
      if (replaceExisting) {
        setImportResult('Suppression des documents existants...')
        const deleteQuery = `*[_type == "${selectedType}"]`
        const existingDocs = await client.fetch(deleteQuery)
        
        if (existingDocs.length > 0) {
          const deleteTransaction = client.transaction()
          existingDocs.forEach((doc: any) => {
            deleteTransaction.delete(doc._id)
          })
          await deleteTransaction.commit()
          setImportResult(`Supprimé ${existingDocs.length} documents existants. Importation en cours...`)
        }
      }

      // Create transaction for batch import
      const transaction = client.transaction()
      
      validItems.forEach(item => {
        // Remove _id if it exists to let Sanity generate new ones
        const { _id, ...itemWithoutId } = item
        transaction.create(itemWithoutId)
      })
      
      const result = await transaction.commit()
      setImportResult(`✅ Importation réussie ! ${validItems.length} éléments de type '${selectedType}' ont été importés.`)
      
      // Clear the form
      setJsonData('')
      setFileInput(null)
      
    } catch (error) {
      console.error('Import error:', error)
      setImportResult(`❌ Erreur lors de l'importation : ${error instanceof Error ? error.message : 'Erreur inconnue'}`)
      
      if (error instanceof Error && error.message.includes('401')) {
        setImportResult(prev => prev + '\n💡 Vérifiez que votre token Sanity a les permissions d\'écriture')
      }
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <Card padding={4}>
      <Stack space={4}>
        <Text size={3} weight="bold">
          Importer des données JSON directement
        </Text>
        
        <Text size={1} muted>
          Importez des données JSON directement dans votre dataset Sanity sans utiliser de scripts externes.
        </Text>

        <Stack space={3}>
          <Text size={2} weight="semibold">
            1. Sélectionner le type de contenu
          </Text>
          
          <Select
            value={selectedType}
            onChange={(event) => setSelectedType(event.currentTarget.value)}
            placeholder="Sélectionner le type de contenu..."
          >
            <option value="">Sélectionner le type de contenu...</option>
            {contentTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </Select>
        </Stack>

        <Stack space={3}>
          <Text size={2} weight="semibold">
            2. Charger les données JSON
          </Text>
          
          <Box>
            <Text size={1} muted style={{ marginBottom: '8px' }}>
              Option A: Télécharger un fichier JSON
            </Text>
            <Flex gap={2} align="center">
              <Button
                onClick={handleFileButtonClick}
                tone="default"
                icon={UploadIcon}
                text={fileInput ? fileInput.name : 'Choisir un fichier JSON'}
              />
              {fileInput && (
                <Text size={1} muted>
                  Fichier sélectionné: {fileInput.name}
                </Text>
              )}
            </Flex>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </Box>

          <Box>
            <Text size={1} muted style={{ marginBottom: '8px' }}>
              Option B: Coller directement le JSON
            </Text>
            <TextArea
              value={jsonData}
              onChange={(event) => setJsonData(event.currentTarget.value)}
              placeholder='Collez votre JSON ici, par exemple:
[
  {
    "title": "Mon titre",
    "description": "Ma description",
    "category": "Analytics"
  }
]'
              rows={10}
              style={{ fontFamily: 'monospace', fontSize: '12px' }}
            />
          </Box>
        </Stack>

        <Stack space={3}>
          <Text size={2} weight="semibold">
            3. Options d'importation
          </Text>
          
          <Checkbox
            checked={replaceExisting}
            onChange={(event) => setReplaceExisting(event.currentTarget.checked)}
            id="replace-existing"
          >
            Remplacer les documents existants (⚠️ Supprime toutes les données actuelles de ce type)
          </Checkbox>

          <Button
            onClick={handleDirectImport}
            disabled={!selectedType || !jsonData.trim() || isImporting}
            tone="primary"
            style={{ width: '100%' }}
          >
            {isImporting ? <Spinner /> : 'Importer les données'}
          </Button>
        </Stack>

        {importResult && (
          <Card padding={3} tone={importResult.includes('✅') ? 'positive' : importResult.includes('❌') ? 'critical' : 'primary'} border>
            <Text size={1} style={{ whiteSpace: 'pre-wrap' }}>
              {importResult}
            </Text>
          </Card>
        )}

        <Card padding={3} tone="caution" border>
          <Stack space={2}>
            <Text size={1} weight="semibold">
              Format JSON requis :
            </Text>
            <Text size={1} style={{ fontFamily: 'monospace', fontSize: '11px' }}>
              {`[
  {
    "title": "Titre requis",
    "description": "Description requise",
    "icon": "nom-icone",
    "category": "Analytics|Productivity|Support|Security|Integrations",
    "order": 1
  }
]`}
            </Text>
            <Text size={1}>
              • Le champ _type sera automatiquement ajouté selon votre sélection
            </Text>
            <Text size={1}>
              • Les champs _id existants seront ignorés (Sanity génère de nouveaux IDs)
            </Text>
            <Text size={1}>
              • Assurez-vous que les champs correspondent à votre schéma Sanity
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Card>
  )
}

export const jsonImportTool: Tool = {
  name: 'json-import-tool',
  title: 'Import JSON',
  icon: () => '📤',
  component: JsonImportTool,
}
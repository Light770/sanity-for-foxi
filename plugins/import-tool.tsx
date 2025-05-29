import React, { useState } from 'react'
import { Card, Stack, Text, Button, Select, Checkbox, Spinner } from '@sanity/ui'
import { Tool } from 'sanity'

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

function ImportTool() {
  const [selectedType, setSelectedType] = useState('')
  const [replaceExisting, setReplaceExisting] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [importResult, setImportResult] = useState<string | null>(null)

  const handleImport = async () => {
    if (!selectedType) {
      setImportResult('Veuillez sélectionner un type de contenu à importer')
      return
    }

    setIsImporting(true)
    setImportResult(null)

    try {
      // This would typically call your import API endpoint
      // For now, we'll show instructions to run the CLI command
      const command = replaceExisting
        ? `npm run import-type ${selectedType} --replace`
        : `npm run import-${selectedType === 'feature' ? 'features' : selectedType === 'featureCard' ? 'feature-cards' : selectedType}`

      setImportResult(`Pour importer ${selectedType}, exécutez cette commande dans votre terminal :\n\n${command}`)
    } catch (error) {
      setImportResult(`Erreur : ${error instanceof Error ? error.message : 'Erreur inconnue'}`)
    } finally {
      setIsImporting(false)
    }
  }

  const handleImportAll = async () => {
    setIsImporting(true)
    setImportResult(null)

    try {
      const command = replaceExisting 
        ? 'npm run import-type --all --replace'
        : 'npm run import-data'

      setImportResult(`Pour importer tous les types de contenu, exécutez cette commande dans votre terminal :\n\n${command}`)
    } catch (error) {
      setImportResult(`Erreur : ${error instanceof Error ? error.message : 'Erreur inconnue'}`)
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <Card padding={4}>
      <Stack space={4}>
        <Text size={3} weight="bold">
          Importer des données JSON
        </Text>
        
        <Text size={1} muted>
          Importez des données de démarrage depuis des fichiers JSON dans votre ensemble de données Sanity.
        </Text>

        <Stack space={3}>
          <Text size={2} weight="semibold">
            Importer un type de contenu spécifique
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

          <Checkbox
            checked={replaceExisting}
            onChange={(event) => setReplaceExisting(event.currentTarget.checked)}
            id="replace-existing"
          >
            Remplacer les documents existants
          </Checkbox>

          <Button
            onClick={handleImport}
            disabled={!selectedType || isImporting}
            tone="primary"
          >
            {isImporting ? <Spinner /> : 'Importer le type sélectionné'}
          </Button>
        </Stack>

        <Stack space={3}>
          <Text size={2} weight="semibold">
            Importer tous les types de contenu
          </Text>
          
          <Button
            onClick={handleImportAll}
            disabled={isImporting}
            tone="positive"
          >
            {isImporting ? <Spinner /> : 'Importer tous les types'}
          </Button>
        </Stack>

        {importResult && (
          <Card padding={3} tone="primary" border>
            <Text size={1} style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
              {importResult}
            </Text>
          </Card>
        )}

        <Card padding={3} tone="caution" border>
          <Stack space={2}>
            <Text size={1} weight="semibold">
              Notes importantes :
            </Text>
            <Text size={1}>
              • Assurez-vous d'avoir SANITY_TOKEN défini dans votre fichier .env
            </Text>
            <Text size={1}>
              • Les commandes d'importation doivent être exécutées depuis le répertoire du studio
            </Text>
            <Text size={1}>
              • Utilisez "Remplacer les documents existants" avec précaution car cela supprimera les données actuelles
            </Text>
            <Text size={1}>
              • Commandes disponibles : npm run list-types, npm run import-faq, etc.
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Card>
  )
}

export const importTool: Tool = {
  name: 'import-tool',
  title: 'Importer des données',
  icon: () => '📥',
  component: ImportTool,
}
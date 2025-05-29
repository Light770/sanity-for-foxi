# Guide d'utilisation - Page de Tarification

## Vue d'ensemble

La page de tarification dans Sanity Studio permet de gérer entièrement le contenu et la structure de la page de tarification de votre site Astro. Vous pouvez contrôler quels composants afficher, personnaliser le contenu et sélectionner des éléments spécifiques depuis votre base de données Sanity.

## Accès dans Sanity Studio

1. Ouvrez Sanity Studio
2. Naviguez vers **Pages** → **Page Tarification**
3. Créez ou modifiez le document de la page de tarification

## Champs disponibles

### 1. Paramètres SEO
- **Titre de la page** : Le titre qui apparaît dans l'onglet du navigateur et les résultats de recherche
- **Méta description** : Description pour les moteurs de recherche et les réseaux sociaux

### 2. En-tête de page
- **Titre de l'en-tête** : Le titre principal affiché en haut de la page
- **Texte de l'en-tête** : Texte descriptif sous le titre principal

### 3. Section de preuve sociale
- **Section de preuve sociale** : Référence vers une section de preuve sociale existante
- Si laissé vide, utilise la section par défaut

### 4. Section des fonctionnalités
- **Afficher la section des fonctionnalités** : Case à cocher pour activer/désactiver l'affichage
- Par défaut : activé

### 5. Témoignage en vedette
- **Témoignage en vedette** : Sélectionner un témoignage spécifique
- **Image de fond du témoignage** : Image de fond pour la section témoignage
- **Position du fond du témoignage** : Gauche, Droite, ou Centre

### 6. Section FAQ
- **Afficher la section FAQ** : Case à cocher pour activer/désactiver l'affichage
- **Classe CSS de fond pour la FAQ** : Personnaliser le style de fond
- Par défaut : `bg-slate-50 dark:bg-neutral-900/40`

### 7. Appel à l'action
- **Appel à l'action** : Référence vers une section CTA existante

## Comment utiliser

### Étape 1 : Configuration de base
1. Remplissez les **Paramètres SEO** avec un titre et une description appropriés
2. Configurez l'**En-tête de page** avec le titre et le texte souhaités

### Étape 2 : Sélection des composants
1. **Section de preuve sociale** : 
   - Laissez vide pour utiliser la section par défaut
   - Ou sélectionnez une section spécifique depuis "Composants" → "Preuve sociale"

2. **Section des fonctionnalités** :
   - Cochez pour afficher la liste des fonctionnalités
   - Décochez pour masquer cette section

3. **Témoignage** :
   - Sélectionnez un témoignage depuis "Composants" → "Témoignage"
   - Ajoutez une image de fond personnalisée si souhaité
   - Choisissez la position de l'image (gauche, droite, centre)

4. **Section FAQ** :
   - Cochez pour afficher la FAQ
   - Personnalisez les classes CSS si nécessaire

5. **CTA** :
   - Sélectionnez un appel à l'action depuis "Composants" → "Appel à l'action"

### Étape 3 : Gestion des plans de tarification
Les plans de tarification sont gérés séparément dans **Composants** → **Plans de tarification**. Ils apparaîtront automatiquement sur la page selon leur ordre défini.

## Exemples d'utilisation

### Configuration minimale
- SEO : Titre et description
- En-tête : Titre et texte
- Laisser tous les autres champs par défaut

### Configuration personnalisée
- Désactiver la section des fonctionnalités si elle n'est pas pertinente
- Sélectionner un témoignage spécifique qui met en valeur vos tarifs
- Choisir un CTA spécifique pour la conversion
- Personnaliser l'image de fond du témoignage

## Conseils

1. **Cohérence** : Assurez-vous que le témoignage sélectionné est pertinent pour la tarification
2. **Performance** : Les images de fond sont optimisées automatiquement
3. **Responsive** : Tous les composants s'adaptent automatiquement aux différentes tailles d'écran
4. **SEO** : Utilisez des titres et descriptions uniques pour améliorer le référencement

## Dépannage

- **Les changements ne s'affichent pas** : Vérifiez que le document est publié dans Sanity
- **Composants manquants** : Assurez-vous que les références (témoignage, CTA, etc.) existent et sont publiées
- **Erreurs d'affichage** : Vérifiez les logs de la console pour identifier les problèmes de données

## Support

Pour toute question ou problème, consultez la documentation technique ou contactez l'équipe de développement.
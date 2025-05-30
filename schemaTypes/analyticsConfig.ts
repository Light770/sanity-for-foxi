import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'analyticsConfig',
  title: 'Configuration Analytics',
  type: 'document',
  fields: [
    defineField({
      name: 'googleSiteVerification',
      title: 'Google Site Verification ID',
      type: 'string',
      description: 'ID de vérification pour Google Search Console',
      placeholder: 'Ex: abc123def456...',
    }),
    defineField({
      name: 'googleAnalyticsMeasurementID',
      title: 'Google Analytics Measurement ID',
      type: 'string',
      description: 'ID de mesure Google Analytics (format: G-XXXXXXXXXX)',
      placeholder: 'Ex: G-XXXXXXXXXX',
      validation: (Rule) => Rule.regex(/^G-[A-Z0-9]+$/).warning('Le format doit être G-XXXXXXXXXX'),
    }),
    defineField({
      name: 'googleTagManagerID',
      title: 'Google Tag Manager ID',
      type: 'string',
      description: 'ID Google Tag Manager (format: GTM-XXXXXXX)',
      placeholder: 'Ex: GTM-XXXXXXX',
      validation: (Rule) => Rule.regex(/^GTM-[A-Z0-9]+$/).warning('Le format doit être GTM-XXXXXXX'),
    }),
    defineField({
      name: 'enableAnalytics',
      title: 'Activer les analytics',
      type: 'boolean',
      description: 'Activer ou désactiver le suivi analytics',
      initialValue: true,
    }),
    defineField({
      name: 'cookieConsent',
      title: 'Consentement aux cookies requis',
      type: 'boolean',
      description: 'Exiger le consentement avant d\'activer les analytics',
      initialValue: true,
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Configuration Analytics',
        subtitle: 'Google Analytics, Tag Manager, Site Verification',
      }
    },
  },
})
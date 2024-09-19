import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  ssr: false,
  devtools: {enabled: true},

  imports: {
    dirs: [
      'composables/**',
      'types/**'
    ]
  },

  css: [
    '~/assets/css/main.scss',

  ],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  alias: {
    '@components': './components',
    '@assets': './assets',
  },

  build: {
    transpile: ['vuetify'],
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
                @import "./assets/css/_mixins.scss";
              `,
        },
      },
    },
  },

  modules: [
    "@pinia/nuxt",
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  pinia: {
    storesDirs: ['stores/*/**'],
  },
})
export default {
  head: {
    title: 'client',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/theme/index.css'
  ],

  plugins: [
    '@/plugins/element-ui',
    '@/plugins/vue-markdown',
    '@/plugins/axios'
  ],

  components: true,

  buildModules: [
  ],

  modules: [
    '@nuxtjs/axios',
  ], 

  axios: {
    baseURL: 'http://localhost:5000',
  },

  build: {
    transpile: [/^element-ui/],
  }
}

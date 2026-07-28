import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'v487s9li',
    dataset: 'production'
  },
  studioHost: 'labgastronomy',
  deployment: {
    autoUpdates: false,
  },
  vite: (config) => {
    config.base = '/studio/'
    return config
  }
})

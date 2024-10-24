import type { RecursiveRequired, Settings } from '#/global'
import settingsDefault from '@/settings.default'
import { defaultsDeep } from 'lodash-es'

const globalSettings: Settings.all = {
  app: {
    enableProgress: false,
  },
  menu: {
    mode: 'single',
  },
  toolbar: {
    colorScheme: true,
  },
}

export default defaultsDeep(globalSettings, settingsDefault) as RecursiveRequired<Settings.all>

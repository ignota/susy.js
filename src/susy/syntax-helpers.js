import normalize from './normalize'
import { settings } from './settings'

export const compile = ({ config, shorthand }) => {
  const normalizedConfig = config ? normalize(settings(config)) : normalize(settings())
  const normalizedShorthand = normalize(shorthand, normalizedConfig)

  return Object.assign({}, normalizedConfig, normalizedShorthand)
}

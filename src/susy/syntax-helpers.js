import normalize from './normalize'
import { settings } from './settings'

export const compile = (shorthand, config) => {
    const normalizedConfig = config ? normalize(settings(config)) : normalize(settings())
    const normalizedShorthand = normalize(shorthand)

    return Object.assign({}, normalizedConfig, normalizedShorthand)
}

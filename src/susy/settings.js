import repeat from './repeat'

const SUSY_DEFAULTS = {
  columns: repeat(4),
  containerSpread: 'narrow',
  gutters: 0.25,
  spread: 'narrow',
}

let SUSY = {}

export function configure(settings = {}) {
  SUSY = settings
}

export function get(key) {
  const s = settings()
  if (!Object.keys(s).includes(key)) {
    throw new Error(`There is no Susy setting called '${ key }'.`)
  }
  return s[key]
}

export function settings(overrides = {}) {
  return Object.assign({}, SUSY_DEFAULTS, SUSY, overrides)
}

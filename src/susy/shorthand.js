import R from 'ramda'

export const all = config => ({ ...config, span: 'all' })

export const alpha = count => config => ({ ...config, location: 'alpha', span: count })

export const at = location => config => ({ ...config, location })

export const first = count => config => ({ ...config, location: 'first', span: count })

export const last = count => config => ({ ...config, location: 'last', span: count })

export const narrow = config => ({ ...config, spread: 'narrow' })

export const of = (...shorthand) => config => {
    shorthand = shorthand.map(s => {
        if (typeof s === 'number' || Array.isArray(s)) {
            return c => ({ ...c, columns: s })
        }

        return s
    })

    const ofConfig = shorthand.length
        ? R.pipe(...shorthand)({})
        : {}

    if (ofConfig.spread) {
        ofConfig.containerSpread = ofConfig.spread
        delete ofConfig.spread
    }

    return {
        ...config,
        ...ofConfig,
    }
}

export const omega = count => config => ({ ...config, location: 'omega', span: count })

export const setGutters = gutters => config => ({ ...config, gutters })

export const wide = config => ({ ...config, spread: 'wide' })

export const wider = config => ({ ...config, spread: 'wider' })

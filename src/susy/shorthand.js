import R from 'ramda'

export const all = config => ({ ...config, span: 'all' })

export const alpha = config => ({ ...config, location: 'alpha' })

export const at = location => config => ({ ...config, location })

export const first = config => ({ ...config, location: 'first' })

export const last = config => ({ ...config, location: 'last' })

export const of = (columns, ...shorthand) => config => {
    const ofConfig = R.pipe(...shorthand)({})

    if (ofConfig.spread) {
        ofConfig.containerSpread = ofConfig.spread
        delete ofConfig.spread
    }

    return {
        ...config,
        ...ofConfig,
        columns,
    }
}

export const omega = config => ({ ...config, location: 'omega' })

export const setGutters = gutters => config => ({ ...config, gutters })

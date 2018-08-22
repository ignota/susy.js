import R from 'ramda'

export const all = config => ({ ...config, span: 'all' })

export const alpha = count => config => ({ ...config, location: 'alpha', span: count })

export const at = location => config => ({ ...config, location })

export const first = count => config => ({ ...config, location: 'first', span: count })

export const last = count => config => ({ ...config, location: 'last', span: count })

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

export const omega = count => config => ({ ...config, location: 'omega', span: count })

export const setGutters = gutters => config => ({ ...config, gutters })

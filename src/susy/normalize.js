import { get, settings } from './settings'
import R from 'ramda'
import repeat from './repeat'

function normalize(config, context) {
    const normal = R.clone(config)

    ;['containerSpread', 'spread'].forEach(s => {
        if (normal[s]) {
            normal[s] = normalizeSpread(normal[s])
        }
    })

    if (normal.columns) {
        normal.columns = normalizeColumns(normal.columns, context)
    } else {
        normal.columns = R.propOr(get('columns'), 'columns', context)
    }

    if (normal.span) {
        normal.span = normalizeSpan(normal.span, normal.columns)
    }

    if (normal.location) {
        normal.location = normalizeLocation(normal.span, normal.location, normal.columns)
    }

    return normal
}

function normalizeColumns(columns, context = settings()) {
    if (Array.isArray(columns)) {
        return R.flatten(columns)
    }

    if (typeof columns === 'number') {
        const span = columns
        const ctx = context.columns
        const symmetrical = repeat(ctx.length, ctx[0])

        if (R.equals(ctx, symmetrical)) {
            return repeat(span, ctx[0])
        } else {
            throw new Error(`Context slice of '${ span }' cannot be determined based on grid-columns '${ columns }'.`)
        }
    }

    return columns
}

function normalizeLocation(span, location, columns) {
    const count = columns.length
    const normalLocations = {
        alpha: 1,
        first: 1,
        last: count - span + 1,
        omega: count - span + 1,
    }

    return normalLocations[location] || location
}

function normalizeSpan(span, columns) {
    if (span === 'all') {
        return columns.length
    }

    return span
}

function normalizeSpread(spread) {
    const normalSpread = {
        narrow: -1,
        wide: 0,
        wider: 1,
    }

    return Object.keys(normalSpread).includes(spread)
        ? normalSpread[spread]
        : spread
}

export default normalize

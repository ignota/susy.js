import * as su from '../su'
import { compile } from './syntax-helpers'
import { of } from './shorthand'
import R from 'ramda'

export const gutter = (...shorthand) => {
    shorthand = shorthand.map(s => {
        if (typeof s === 'number' || Array.isArray(s)) {
            return config => ({ ...config, columns: s })
        }

        return s
    })

    let susy

    if (typeof shorthand[shorthand.length - 1] !== 'function') {
        susy = shorthand.pop()
    }

    const config = shorthand.length
        ? of(...shorthand)({})
        : {}

    const context = compile(config, susy)

    return su.gutter(context)
}

export const halfGutter = (...shorthand) => {
    const g = gutter(...shorthand)
    const length = Number.parseFloat(g)
    const match = /([A-Za-z%])$/.exec(g)
    return `${ length / 2 }${ match[1] }`
}

export const slice = (...shorthand) => {
    shorthand = shorthand.map(s => {
        if (typeof s === 'number' || Array.isArray(s)) {
            return config => ({ ...config, span: s })
        }

        return s
    })

    let susy

    if (typeof shorthand[shorthand.length - 1] !== 'function') {
        susy = shorthand.pop()
    }

    let config = shorthand.length
        ? R.pipe(...shorthand)({})
        : {}

    const span = compile(config, susy)

    return su.slice(span)
}

export const span = (...shorthand) => {
    shorthand = shorthand.map(s => {
        if (typeof s === 'number' || Array.isArray(s)) {
            return config => ({ ...config, span: s })
        }

        return s
    })

    let susy

    if (typeof shorthand[shorthand.length - 1] !== 'function') {
        susy = shorthand.pop()
    }

    let config = shorthand.length
        ? R.pipe(...shorthand)({})
        : {}

    const output = compile(config, susy)
    if (output.span) {
        return su.span(output)
    }

    throw new Error(`Unable to determine span value from [${ typeof span }] '${ span }'.`)
}

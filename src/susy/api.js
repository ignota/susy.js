import * as su from '../su'
import { compile } from './syntax-helpers'
import R from 'ramda'

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

    let config = R.pipe(...shorthand)({})

    const output = compile(config, susy)
    if (output.span) {
        return su.span(output)
    }

    throw new Error(`Unable to determine span value from [${ typeof span }] '${ span }'.`)
}

export const gutter = (...shorthand) => {
    let susy

    if (typeof shorthand[shorthand.length - 1] !== 'function') {
        susy = shorthand.pop()
    }

    const config = R.pipe(...shorthand)({})

    const context = compile(config, susy)

    return su.gutter(context)
}

export const slice = (s, ...shorthand) => {
    let susy

    if (typeof shorthand[shorthand.length - 1] !== 'function') {
        susy = shorthand.pop()
    }

    let config = R.pipe(...shorthand)({})
    config = typeof s === 'number'
        ? { ...config, span: s }
        : s(config)

    const span = compile(config, susy)

    return su.slice(span)
}

import * as validate from './validate'
import { mapAddUnits } from './utilities'

export function calcSpan(span, columns, gutters, spread, containerSpread, shouldValidate = true) {
    containerSpread ??= spread

    if (shouldValidate) {
        span = validate.validSpan(span)
        columns = validate.validColumns(columns)
        gutters = validate.validGutters(gutters)
        spread = validate.validSpread(spread)
        containerSpread = validate.validSpread(containerSpread)
    }

    span = calcSum(span, gutters, spread, false)
    const context = calcSum(columns, gutters, containerSpread, false)

    let calc = `${ span.fixed || '' }`
    let fluidCalc = `(100% - ${ context.fixed })`

    if (!span.fluid) {
        fluidCalc = null
    } else if (span.fluid !== context.fluid) {
        span.fluid = `* ${ span.fluid }`
        context.fluid = context.fluid ? `/ ${ context.fluid }` : ''
        fluidCalc = `(${ fluidCalc } ${ context.fluid } ${ span.fluid })`
    }

    if (fluidCalc) {
        calc = calc === ''
            ? ''
            : `${ calc } + `
        calc = calc + fluidCalc
    }

    return `calc(${ calc })`
}

export function calcSum(columns, gutters, spread, shouldValidate = true) {
    if (shouldValidate) {
        columns = validate.validSpan(columns)
        gutters = validate.validGutters(gutters)
        spread = validate.validSpread(spread)
    }

    let fluid = 0
    let fixed = {}
    let calc = null

    gutters = validate.validMeasure(gutters)
    gutters = `${ gutters.length * (columns.length + spread) }${ gutters.unit || '' }`

    for (const col of columns.concat(gutters)) {
        if (!validate.validMeasure(col)?.unit) {
            fluid += col
        } else {
            fixed = mapAddUnits(fixed, col)
        }
    }

    for (const [unit, total] of Object.entries(fixed)) {
        calc = calc
            ? `${ calc } + ${ total }${ unit }`
            : `${ total }${ unit }`
    }

    if (calc && calc.includes('+')) {
        calc = `(${ calc })`
    }

    fluid = fluid === 0
        ? null
        : fluid

    return {
        fixed: calc,
        fluid,
    }
}

export function sum(columns, gutters, spread, shouldValidate = true) {
    if (shouldValidate) {
        columns = validate.validColumns(columns)
        gutters = validate.validGutters(gutters)
        spread = validate.validSpread(spread)
    }

    const columnSum = columns.reduce((sum, col) => {
        const { length, unit } = validate.validMeasure(col)

        sum.unit = unit
        sum.length += length

        return sum
    }, { length: 0, unit: undefined })

    gutters = validate.validMeasure(gutters)

    const gutterSum = (Math.ceil(columns.length) + spread) * gutters.length

    const total = {
        length: gutterSum > 0 ? columnSum.length + gutterSum : columnSum.length,
        unit: columnSum.unit,
    }

    return total
}

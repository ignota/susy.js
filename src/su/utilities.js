import * as validate from './validate'

export function isComparable(...lengths) {
    const comparable = (l1, l2) => validate.validMeasure(l1, true)?.unit === validate.validMeasure(l2, true)?.unit
    const unitless = l => !validate.validMeasure(l, true)?.unit

    const first = lengths[0]

    if (lengths.length > 1) {
        for (const l of lengths) {
            if (
                !comparable(first, l) ||
                (unitless(first) && !unitless(l)) ||
                (!unitless(first) && unitless(l))
            ) {
                return false
            }
        }
    }

    const unit = validate.validMeasure(first)?.unit
    return unit
        ? 'static'
        : 'fluid'
}

export function mapAddUnits(map, value) {
    let { length, unit } = validate.validMeasure(value)
    let has = map[unit] || 0
    return Object.assign({}, map, { [unit]: has + length })
}

export function needsCalcOutput(span, columns, gutters, spread, shouldValidate = true) {
    if (shouldValidate) {
        span = validate.validSpan(span)
        columns = validate.validColumns(columns)
        gutters = validate.validGutters(gutters)
    }

    const hasGutter = span.length > 0 || (spread && spread >= 0)
    const check = hasGutter
        ? span.concat(gutters)
        : span
    const safeSpan = isComparable(...check)

    if (safeSpan === 'static') {
        return false
    }

    if (!safeSpan) {
        return true
    }

    return !isComparable(gutters, ...columns)
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
    }, {})

    gutters = validate.validMeasure(gutters)

    const gutterSum = Math.ceil(columns.length + spread) * gutters.length

    const total = {
        length: columnSum.length + gutterSum,
        unit: columnSum.unit,
    }

    return total
}

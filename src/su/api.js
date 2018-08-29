import * as validate from './validate'
import { calcSpan, sum } from './math'
import { needsCalcOutput } from './utilities'

export function gutter({ columns, containerSpread, gutters }) {
  if ((typeof gutters === 'number' || typeof gutters === 'string') && (gutters === 0 || /[A-Za-z]+$/.test(gutters))) {
    return gutters
  }

  if (needsCalcOutput(gutters, columns, gutters, -1, false)) {
    return calcSpan(gutters, columns, gutters, -1, containerSpread, false)
  }

  const container = sum(columns, gutters, containerSpread)
  gutters = validate.validMeasure(gutters)

  return `${ gutters.length / container.length * 100 }%`
}

export function slice({ columns, location = 1, shouldValidate = true, span }) {
  if (shouldValidate) {
    columns = validate.validColumns(columns)
    location = validate.validLocation(span, location, columns)
  }

  span = validate.validMeasure(span)

  const floor = Math.floor(span.length)
  const subColumns = columns.slice(location - 1, location - 1 + floor)

  if (floor !== span.length) {
    const remainder = span.length - floor
    const columnValue = columns.slice(location - 1 + floor)
    const columnMeasure = validate.validMeasure(columnValue)

    if (columnMeasure.unit) {
      subColumns.push(`${ columnMeasure.length * remainder }${ columnMeasure.unit }`)
    } else {
      subColumns.push(columnMeasure.length * remainder)
    }
  }

  return subColumns
}

export function span({ columns, containerSpread, gutters, location = 1, span, spread }) {
  containerSpread ??= spread

  span = validate.validSpan(span)
  columns = validate.validColumns(columns)
  gutters = validate.validGutters(gutters)
  spread = validate.validSpread(spread)

  if (typeof span === 'string' && /[A-Za-z]+$/.test(span)) {
    return span
  }

  if (typeof span === 'string' || typeof span === 'number') {
    location = validate.validLocation(span, location, columns)
    span = slice({ columns, location, shouldValidate: false, span })
  }

  if (needsCalcOutput(span, columns, gutters, spread, false)) {
    return calcSpan(span, columns, gutters, spread, containerSpread, false)
  }

  const spanWidth = sum(span, gutters, spread, false)

  if (spanWidth.unit) {
    return `${ spanWidth.length }${ spanWidth.unit }`
  }

  containerSpread = validate.validSpread(containerSpread)
  const container = sum(columns, gutters, containerSpread, false)

  return `${ spanWidth.length / container.length * 100 }%`
}

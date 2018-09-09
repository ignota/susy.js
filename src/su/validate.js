export function validColumns(columns, silentFailure = false) {
  if (Array.isArray(columns) && columns.every(c => validMeasure(c, true))) {
    return columns
  }

  return silentFailure
    ? null
    : throw new Error(`[${ typeof columns }] '${ columns }' is not a valid list of columns.`)
}

export function validGutters(gutters) {
  if (validMeasure(gutters, true)) {
    return gutters
  }

  throw new Error(`[${ typeof gutters }] '${ gutters }' is not a valid number or length for gutters.`)
}

export function validLocation(span, location, columns) {
  const count = columns.length

  if (!location) {
    return location
  }

  if (typeof location !== 'number') {
    throw new Error(`[${ typeof location }] '${ location }' is not a number.`)
  }

  if (Math.floor(location) !== location) {
    throw new Error(`Location (${ location }) must be a 1-indexed integer position.`)
  }

  if (location > count || location < 1) {
    throw new Error(`Position ${ location } does not exist in grid ${ columns }.`)
  }

  if (location + span - 1 > count) {
    throw new Error(`There are not enough columns in grid '${ columns }' for span '${ span }' at '${ location }'.`)
  }

  return location
}

export function validMeasure(measure, silentFailure = false) {
  if (typeof measure === 'number') {
    return {
      length: measure,
      unit: undefined,
    }
  }

  if (Number.isNaN(Number.parseFloat(measure))) {
    return silentFailure
      ? null
      : throw new Error(`[${ typeof measure }] '${ measure }' cannot be parsed as a number.`)
  }

  let match
  if (typeof measure === 'string' && !(match = /([.\d]+)([A-Za-z]+|%)?$/.exec(measure))) {
    return silentFailure
      ? null
      : throw new Error(`[${ typeof measure }] '${ measure }' cannot be parsed as a number with unit.`)
  }

  return {
    length: Number.parseFloat(match[1]),
    unit: match[2],
  }
}

export function validSpan(span) {
  if (Array.isArray(span) && validColumns(span, true)) {
    return span
  }

  if (validMeasure(span, true)) {
    return span
  }

  throw new Error(`[${ typeof span }] '${ span }' is not a valid number, length, or column list for span.`)
}

export function validSpread(spread) {
  if ([-1, 0, 1].includes(spread)) {
    return spread
  }

  throw new Error(`[${ typeof spread }] '${ spread }' is not a normalized [-1, 0, 1] value for spread.`)
}

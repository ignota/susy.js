import * as validate from 'su/validate'
import {
  first,
  span,
  wide,
} from 'susy'
import { gutter } from 'su/api'

export function columnPosition(column, grid) {
  column -= 1

  if (column > 0) {
    return span(first(column), wide, grid)
  }

  return column
}

export function offset(grid) {
  validate.validColumns(grid.columns)
  validate.validGutters(grid.gutters)
  const container = validate.validSpread(grid.containerSpread) + 1

  if (container === 0) {
    return
  }

  const g = gutter(grid)

  if (g.includes('calc')) {
    return `calc(${ container } * ${ g } / 2)`
  }

  return `${ container * Number.parseFloat(g) / 2 }%`
}

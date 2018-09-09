import * as math from './math'
import * as shorthand from './shorthand'
import * as su from 'su'
import {
  at,
  narrow,
  span as susySpan,
} from 'susy'
import {
  rectangle,
  gradient as svgGradient,
} from './svg'
import { compile } from 'susy/syntax-helpers'
import condense from 'condense-whitespace'
import { of } from 'susy/shorthand'

function grid(...grid) {
  grid = grid.map(s => {
    if (typeof s === 'number' || Array.isArray(s)) {
      return config => ({ ...config, columns: s })
    }

    return s
  })

  let config
  if (typeof grid[grid.length - 1] !== 'function') {
    config = grid.pop()
  }

  const shorthand = grid.length
    ? of(...grid)({})
    : {}

  grid = compile({ config, shorthand })

  let colors = grid.svgGridColors
  let gradient = ''
  if (Array.isArray(grid.svgGridColors)) {
    gradient = svgGradient(grid.svgGridColors)
    colors = 'url(%23susyjs-svg-gradient)'
  }

  const span = Object.assign({}, grid, {
    span: grid.columns,
    spread: grid.containerSpread,
  })

  let imageWidth = su.span(span)
  imageWidth = imageWidth.includes('calc')
    ? '100%'
    : imageWidth

  let { columns, offset } = grid
  offset ??= math.offset(grid)

  const rects = columns
    .map((_col, idx) => {
      const width = susySpan(1, narrow, at(idx + 1), grid)
      const x = math.columnPosition(idx + 1, grid)
      return rectangle(x, width, offset)
    })
    .join('')

  let svg = `
    <svg fill='${ colors }' width='${ imageWidth }' xmlns='http://www.w3.org/2000/svg'>
      ${ gradient }
      ${ rects }
    </svg>
  `
  svg = condense(svg).replace(/> </g, '><')

  return `url("data:image/svg+xml,${ svg }")`
}

grid.colors = shorthand.colors
grid.offset = shorthand.offset

export default grid

import { validMeasure } from 'su/validate'

const SVG_UNITS = [
  '%',
  'cm',
  'em',
  'ex',
  'in',
  'mm',
  'px',
  'pt',
  'pc',
]

export function gradient(colors) {
  const stops = colors
    .map((color, idx) => {
      return `<stop offset='${ idx / (colors.length - 1) * 100 }%' style='stop-color:${ color };' />`
    })
    .join('')

  return `
    <defs>
      <linearGradient id='susyjs-svg-gradient' spreadMethod='pad' x1='0%' x2='100%' y1='0%' y2='0%'>
        ${ stops }
      </linearGradient>
    </defs>
  `
}

export function rectangle(x, width, offset) {
  x = validateUnits(x)
  width = validateUnits(width)
  offset = offset === 0 ? null : validateUnits(offset)

  if (offset && 'unit' in offset && 'unit' in x && offset.unit === x.unit) {
    x = `${ x.length + offset.length }${ x.unit }`
  } else if (offset && 'unit' in offset && 'unit' in x && x.length !== 0) {
    x = `calc(${ x.length }${ x.unit } + ${ offset.length }${ offset.unit })`
  } else if (offset) {
    x = `${ offset.length }${ offset.unit }`
  } else {
    x = `${ x.length }${ x.unit || '' }`
  }

  return `<rect height='100%' width='${ width.length }${ width.unit || '' }' x='${ x }' />`
}

function validateUnits(length, name) {
  const measure = validMeasure(length, true)

  if (!measure) {
    return length
  } else if (!measure.unit || SVG_UNITS.includes(measure.unit)) {
    return measure
  }

  throw new Error(`'${ measure.unit }' ${ name || '' } units are not supported in SVG.`)
}

import {
  colors,
  offset,
} from 'plugins/svg-grid/shorthand'
import {
  first,
  of,
  wide,
  wider,
} from 'susy/shorthand'
import repeat from 'susy/repeat'
import svgGrid from 'plugins/svg-grid'

describe('SVG Grid Plugin API Interface', () => {
  describe('svgGrid function', () => {
    it('returns the correct SVG with default settings', () => {
      svgGrid().should.equal(`url("data:image/svg+xml,<svg fill='url(%23susyjs-svg-gradient)' width='100%' xmlns='http://www.w3.org/2000/svg'><defs><linearGradient id='susyjs-svg-gradient' spreadMethod='pad' x1='0%' x2='100%' y1='0%' y2='0%'><stop offset='0%' style='stop-color:hsla(120, 50%, 50%, 0.5);' /><stop offset='100%' style='stop-color:hsla(120, 50%, 75%, 0.5);' /></linearGradient></defs><rect height='100%' width='21.052631578947366%' x='0' /><rect height='100%' width='21.052631578947366%' x='26.31578947368421%' /><rect height='100%' width='21.052631578947366%' x='52.63157894736842%' /><rect height='100%' width='21.052631578947366%' x='78.94736842105263%' /></svg>")`)
    })

    it('uses the default for a zero-length shorthand', () => {
      svgGrid(...[]).should.equal(`url("data:image/svg+xml,<svg fill='url(%23susyjs-svg-gradient)' width='100%' xmlns='http://www.w3.org/2000/svg'><defs><linearGradient id='susyjs-svg-gradient' spreadMethod='pad' x1='0%' x2='100%' y1='0%' y2='0%'><stop offset='0%' style='stop-color:hsla(120, 50%, 50%, 0.5);' /><stop offset='100%' style='stop-color:hsla(120, 50%, 75%, 0.5);' /></linearGradient></defs><rect height='100%' width='21.052631578947366%' x='0' /><rect height='100%' width='21.052631578947366%' x='26.31578947368421%' /><rect height='100%' width='21.052631578947366%' x='52.63157894736842%' /><rect height='100%' width='21.052631578947366%' x='78.94736842105263%' /></svg>")`)
    })

    it('accepts grid shorthand', () => {
      svgGrid(6, wider).should.equal(`url("data:image/svg+xml,<svg fill='url(%23susyjs-svg-gradient)' width='100%' xmlns='http://www.w3.org/2000/svg'><defs><linearGradient id='susyjs-svg-gradient' spreadMethod='pad' x1='0%' x2='100%' y1='0%' y2='0%'><stop offset='0%' style='stop-color:hsla(120, 50%, 50%, 0.5);' /><stop offset='100%' style='stop-color:hsla(120, 50%, 75%, 0.5);' /></linearGradient></defs><rect height='100%' width='12.903225806451612%' x='3.225806451612903%' /><rect height='100%' width='12.903225806451612%' x='19.35483870967742%' /><rect height='100%' width='12.903225806451612%' x='35.483870967741936%' /><rect height='100%' width='12.903225806451612%' x='51.612903225806456%' /><rect height='100%' width='12.903225806451612%' x='67.74193548387096%' /><rect height='100%' width='12.903225806451612%' x='83.87096774193547%' /></svg>")`)
    })

    it('ignores most span data', () => {
      svgGrid(first(3), of(6), wider).should.equal(`url("data:image/svg+xml,<svg fill='url(%23susyjs-svg-gradient)' width='100%' xmlns='http://www.w3.org/2000/svg'><defs><linearGradient id='susyjs-svg-gradient' spreadMethod='pad' x1='0%' x2='100%' y1='0%' y2='0%'><stop offset='0%' style='stop-color:hsla(120, 50%, 50%, 0.5);' /><stop offset='100%' style='stop-color:hsla(120, 50%, 75%, 0.5);' /></linearGradient></defs><rect height='100%' width='12.903225806451612%' x='3.225806451612903%' /><rect height='100%' width='12.903225806451612%' x='19.35483870967742%' /><rect height='100%' width='12.903225806451612%' x='35.483870967741936%' /><rect height='100%' width='12.903225806451612%' x='51.612903225806456%' /><rect height='100%' width='12.903225806451612%' x='67.74193548387096%' /><rect height='100%' width='12.903225806451612%' x='83.87096774193547%' /></svg>")`)
    })

    it('accepts context-only asymmetrical shorthand', () => {
      svgGrid([1, 1, 2, 3, 5, 8]).should.equal(`url("data:image/svg+xml,<svg fill='url(%23susyjs-svg-gradient)' width='100%' xmlns='http://www.w3.org/2000/svg'><defs><linearGradient id='susyjs-svg-gradient' spreadMethod='pad' x1='0%' x2='100%' y1='0%' y2='0%'><stop offset='0%' style='stop-color:hsla(120, 50%, 50%, 0.5);' /><stop offset='100%' style='stop-color:hsla(120, 50%, 75%, 0.5);' /></linearGradient></defs><rect height='100%' width='4.705882352941177%' x='0' /><rect height='100%' width='4.705882352941177%' x='5.88235294117647%' /><rect height='100%' width='9.411764705882353%' x='11.76470588235294%' /><rect height='100%' width='14.117647058823529%' x='22.35294117647059%' /><rect height='100%' width='23.52941176470588%' x='37.64705882352941%' /><rect height='100%' width='37.64705882352941%' x='62.35294117647059%' /></svg>")`)
    })

    /**
     * Genuinely cannot see the purpose of this; it feels like an abuse of the
     * parser API. Test (and functionality) skipped, will implement if there is
     * demand.
     */
    it.skip('uses span spread in output', () => {
      svgGrid(wide, of()).should.equal(`url("data:image/svg+xml,<svg fill='url(%23susyjs-svg-gradient)' width='100%' xmlns='http://www.w3.org/2000/svg'><defs><linearGradient id='susyjs-svg-gradient' spreadMethod='pad' x1='0%' x2='100%' y1='0%' y2='0%'><stop offset='0%' style='stop-color:hsla(120, 50%, 50%, 0.5);' /><stop offset='100%' style='stop-color:hsla(120, 50%, 75%, 0.5);' /></linearGradient></defs><rect height='100%' width='21.05263%' x='0' /><rect height='100%' width='21.05263%' x='26.31579%' /><rect height='100%' width='21.05263%' x='52.63158%' /><rect height='100%' width='21.05263%' x='78.94737%' /></svg>")`)
    })

    it('allows for single-color overrides', () => {
      svgGrid(colors('#9CC')).should.equal(`url("data:image/svg+xml,<svg fill='#9CC' width='100%' xmlns='http://www.w3.org/2000/svg'><rect height='100%' width='21.052631578947366%' x='0' /><rect height='100%' width='21.052631578947366%' x='26.31578947368421%' /><rect height='100%' width='21.052631578947366%' x='52.63157894736842%' /><rect height='100%' width='21.052631578947366%' x='78.94736842105263%' /></svg>")`)
    })

    it('allows the offset to be overridden', () => {
      svgGrid(offset('1em')).should.equal(`url("data:image/svg+xml,<svg fill='url(%23susyjs-svg-gradient)' width='100%' xmlns='http://www.w3.org/2000/svg'><defs><linearGradient id='susyjs-svg-gradient' spreadMethod='pad' x1='0%' x2='100%' y1='0%' y2='0%'><stop offset='0%' style='stop-color:hsla(120, 50%, 50%, 0.5);' /><stop offset='100%' style='stop-color:hsla(120, 50%, 75%, 0.5);' /></linearGradient></defs><rect height='100%' width='21.052631578947366%' x='1em' /><rect height='100%' width='21.052631578947366%' x='calc(26.31578947368421% + 1em)' /><rect height='100%' width='21.052631578947366%' x='calc(52.63157894736842% + 1em)' /><rect height='100%' width='21.052631578947366%' x='calc(78.94736842105263% + 1em)' /></svg>")`)
    })

    it('allows for a fixed-width grid', () => {
      svgGrid({
        columns: repeat(10, '60px'),
        containerSpread: 'narrow',
        gutters: '20px',
        spread: 'narrow',
      }).should.equal(`url("data:image/svg+xml,<svg fill='url(%23susyjs-svg-gradient)' width='780px' xmlns='http://www.w3.org/2000/svg'><defs><linearGradient id='susyjs-svg-gradient' spreadMethod='pad' x1='0%' x2='100%' y1='0%' y2='0%'><stop offset='0%' style='stop-color:hsla(120, 50%, 50%, 0.5);' /><stop offset='100%' style='stop-color:hsla(120, 50%, 75%, 0.5);' /></linearGradient></defs><rect height='100%' width='60px' x='0' /><rect height='100%' width='60px' x='80px' /><rect height='100%' width='60px' x='160px' /><rect height='100%' width='60px' x='240px' /><rect height='100%' width='60px' x='320px' /><rect height='100%' width='60px' x='400px' /><rect height='100%' width='60px' x='480px' /><rect height='100%' width='60px' x='560px' /><rect height='100%' width='60px' x='640px' /><rect height='100%' width='60px' x='720px' /></svg>")`)
    })
  })
})

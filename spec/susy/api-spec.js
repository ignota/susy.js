import {
    all,
    at,
    first,
    last,
    of,
    wider,
} from 'susy/shorthand'
import {
    gutter,
    slice,
    span,
} from 'susy/api'
import { configure } from 'susy/settings'
import repeat from 'susy/repeat'

describe('API Interface', () => {
    describe('asymmetrical calc grid', () => {
        beforeEach(() => {
            configure({
                columns: ['50px', '4em', 1, 1, 3, 1, 3, '6em', '3em', '3cm'],
                gutters: '0.125in',
            })
        })

        afterEach(() => {
            configure()
        })

        it('returns the correct gutter', () => {
            gutter().should.equal('0.125in')
        })

        it('calculates the correct span with `first`', () => {
            span(first(2)).should.equal('calc((50px + 4em + 0.125in))')
        })

        it('calculates the correct span with `last`', () => {
            span(last(2)).should.equal('calc((3em + 3cm + 0.125in))')
        })

        it('calculates the correct span with `at`', () => {
            span(6, at(3)).should.equal('calc((6em + 0.625in) + (100% - (50px + 13em + 3cm + 1.125in)))')
        })

        it('calculates the correct three-column span with `first`, `of`, and `slice`', () => {
            span(first(3), of(slice(6, at(3)))).should.equal('calc(0.25in + ((100% - (6em + 0.625in)) / 9 * 5))')
        })

        it('calculates the correct gutter for `slice(6 at 3)`', () => {
            gutter(slice(6, at(3))).should.equal('0.125in')
        })

        it('calculates the correct span with `last`, `of`, and `slice`', () => {
            span(last(3), of(slice(6, at(3)))).should.equal('calc((6em + 0.25in) + ((100% - (6em + 0.625in)) / 9 * 4))')
        })

        it('calculates the correct two-column span with `first`, `of`, and `slice(6 at 3)`', () => {
            span(first(2), of(slice(6, at(3)))).should.equal('calc(0.125in + ((100% - (6em + 0.625in)) / 9 * 2))')
        })

        it('calculates the correct four-column span with `last`, `of`, and `slice`', () => {
            span(last(4), of(slice(6, at(3)))).should.equal('calc((6em + 0.375in) + ((100% - (6em + 0.625in)) / 9 * 7))')
        })

        it('calculates the correct gutter for `slice(4 at 5)`', () => {
            gutter(slice(4, at(5))).should.equal('0.125in')
        })

        it('calculates the correct two-column span with `first`, `of`, and `slice(4 at 5)`', () => {
            span(first(2), of(slice(4, at(5)))).should.equal('calc(0.125in + ((100% - (6em + 0.375in)) / 7 * 4))')
        })

        it('calculates the correct two-column span with `last`, `of`, and `slice`', () => {
            span(last(2), of(slice(4, at(5)))).should.equal('calc((6em + 0.125in) + ((100% - (6em + 0.375in)) / 7 * 3))')
        })
    })

    describe('symmetrical split grid', () => {
        beforeEach(() => {
            configure({
                columns: repeat(10),
                containerSpread: 'wide',
            })
        })

        afterEach(() => {
            configure()
        })

        it('calculates the correct `wider` gutter', () => {
            const g = gutter(wider)
            ;(Number.parseFloat(g) / 2).should.almost.equal(0.98039)
        })

        it('calculates the correct raw gutter', () => {
            const g = gutter()
            ;(Number.parseFloat(g) / 2).should.equal(1)
        })

        it('calculates the correct width for span(2)', () => {
            span(2).should.equal('18%')
        })

        it('calculates the correct gutter(6)', () => {
            const g = gutter(6)
            ;(Number.parseFloat(g) / 2).should.almost.equal(1.66667)
        })

        it('calculates the correct width for span(3 of 6)', () => {
            span(3, of(6)).should.equal('46.666666666666664%')
        })

        it('calculates the correct width for span(2 of 6)', () => {
            span(2, of(6)).should.equal('30%')
        })

        it('calculates the correct gutter(4)', () => {
            const g = gutter(4)
            ;(Number.parseFloat(g) / 2).should.almost.equal(2.5)
        })

        it('calculates the correct width for span(2 of 4)', () => {
            span(2, of(4)).should.equal('45%')
        })
    })

    describe('asymmetrical float grid', () => {
        beforeEach(() => {
            configure({
                columns: [1, 2, 1, 1, 3, 1, 3, 2, 1, 4],
                gutters: 0.5,
            })
        })

        afterEach(() => {
            configure()
        })

        it('calculates the correct gutter', () => {
            gutter().should.equal('2.127659574468085%')
        })

        it('calculates the correct width for span(first 2)', () => {
            span(first(2)).should.equal('14.893617021276595%')
        })

        it('calculates the correct width for span(last 2)', () => {
            span(last(2)).should.equal('23.404255319148938%')
        })

        it('calculates the correct width for span(6 at 3)', () => {
            span(6, at(3)).should.equal('57.446808510638306%')
        })

        it('calculates the correct width for span(first 3 of slice(6 at 3))', () => {
            span(first(3), of(slice(6, at(3)))).should.equal('44.44444444444444%')
        })

        it('calculates the correct gutter for gutter(slice(6 at 3))', () => {
            gutter(slice(6, at(3))).should.equal('3.7037037037037033%')
        })

        it('calculates the correct width for span(last 3 of slice(6 at 3))', () => {
            span(last(3), of(slice(6, at(3)))).should.equal('51.85185185185185%')
        })

        it('calculates the correct width for span(first 2 of slice(6 at 3))', () => {
            span(first(2), of(slice(6, at(3)))).should.equal('18.51851851851852%')
        })

        it('calculates the correct width for span(last 4 of slice(6 at 3))', () => {
            span(last(4), of(slice(6, at(3)))).should.equal('77.77777777777779%')
        })

        it('calculates the correct gutter for slice(4 at 5)', () => {
            gutter(slice(4, at(5))).should.equal('4.761904761904762%')
        })

        it('calculates the correct width for span(first 2 of slice(4 at 5))', () => {
            span(first(2), of(slice(4, at(5)))).should.equal('42.857142857142854%')
        })

        it('calculates the correct width for span(last 2 of slice(4 at 5))', () => {
            span(last(2), of(slice(4, at(5)))).should.equal('52.38095238095239%')
        })
    })

    describe('inside fixed grid', () => {
        beforeEach(() => {
            configure({
                columns: repeat(10, '5em'),
                containerSpread: 'wide',
                gutters: '0.5em',
                spread: 'wide',
            })
        })

        afterEach(() => {
            configure()
        })

        it('calculates the correct width for span(all)', () => {
            span(all).should.equal('55em')
        })

        it('calculates the correct gutter', () => {
            gutter().should.equal('0.5em')
        })

        it('calculates the correct width for span(2)', () => {
            span(2).should.equal('11em')
        })

        it('calculates the correct width for span(6)', () => {
            span(6).should.equal('33em')
        })

        it('calculates the correct width for span(3 of 6)', () => {
            span(3, of(6)).should.equal('16.5em')
        })

        it('calculates the correct width for span(2 of 6)', () => {
            span(2, of(6)).should.equal('11em')
        })

        it('calculates the correct width for span(4 of 6)', () => {
            span(4, of(6)).should.equal('22em')
        })

        it('calculates the correct width for span(2 of 4)', () => {
            span(2, of(4)).should.equal('11em')
        })
    })

    describe('inside static grid', () => {
        beforeEach(() => {
            configure({
                columns: repeat(10),
                containerSpread: 'wide',
                gutters: '0.5em',
                spread: 'wide',
            })
        })

        afterEach(() => {
            configure()
        })

        it('calculates the correct gutter', () => {
            gutter().should.equal('0.5em')
        })

        it('calculates the correct width for span(2)', () => {
            span(2).should.equal('calc(1em + ((100% - 5em) / 10 * 2))')
        })

        it('calculates the correct width for span(6)', () => {
            span(6).should.equal('calc(3em + ((100% - 5em) / 10 * 6))')
        })

        it('calculates the correct width for span(3 of 6)', () => {
            span(3, of(6)).should.equal('calc(1.5em + ((100% - 3em) / 6 * 3))')
        })

        it('calculates the correct width for span(2 of 6)', () => {
            span(2, of(6)).should.equal('calc(1em + ((100% - 3em) / 6 * 2))')
        })

        it('calculates the correct width for span(4 of 6)', () => {
            span(4, of(6)).should.equal('calc(2em + ((100% - 3em) / 6 * 4))')
        })

        it('calculates the correct width for span(2 of 4)', () => {
            span(2, of(4)).should.equal('calc(1em + ((100% - 2em) / 4 * 2))')
        })
    })
})

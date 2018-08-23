# `@ignota/susy.js`: JavaScript power tools for web layout.
Susy.js is a JavaScript port of the powerful [Susy](https://github.com/oddbird/susy) layout toolkit for Sass. It makes the power and flexibility of Susy's venerable grid primitives available to your favorite CSS-in-JS solution---anything from Styled Components to inline React styles---so that you can build your own damn grids with your own damn tools.

## Resources
* [Release notes](https://github.com/ignota/susy.js/releases).
* [Guidelines for contributing](CONTRIBUTING.md).
* [Code of conduct](CONDUCT.md).
* [GPL-3.0 license](LICENSE).

## Installation
```bash
yarn add @ignota/susy.js
```

## Usage
```js
import {
    at,
    configure,
    first,
    gutter,
    slice,
    span,
} from '@ignota/susy.js'

configure({
    columns: [1, 2, 1, 1, 3, 1, 3, 2, 1, 4],
    gutters: 0.5,
})

console.log(span(first(3), of(slice(6, at(3))))) // 44.44444444444444%
console.log(gutter(slice(6, at(3))))             // 3.7037037037037033%
```

### Settings
The package exposes a function called `configure` that takes an object as its only argument. You can customize your default grid by setting the following keys:

* **`columns`.** A list of columns, either unitless numbers (e.g., `[1, 3, 5]`), strings with CSS lengths (e.g., `['1em', '3em', '5em']`), or a mix of both (e.g., `[1, '3em', 5]`). You may import the function `repeat` to quickly create symmetrical grids: e.g., `repeat(10)`, `repeat(10, '1em')`, or `['120px', repeat(4), '120px']`.
* **`gutters`.** A unitless fraction as a number (e.g., `0.5`) or an explicit width as a string (e.g., `'1em'`).
* **`spread` and `containerSpread`.** A string, either `narrow`, `wide`, or `wider`, that defines how grid elements and grid containers handle gutters. See [the Oddbird blog](http://oddbird.net/2017/06/13/susy-spread/) for more details.

These configuration options may also be passed into the core [Susy functions](#susy-functions) as their final argument.

### Susy Functions
The core Susy API is exposed as three functions, `gutter`, `slice`, and `span`, which map to the Sass functions `susy-gutter`, `susy-slice`, and `susy-span`. These can be imported as named imports directly from the package root. All three accept a variadic argument list, which should start with a list of [shorthand functions](#shorthand) and may optionally end with an object containing [settings](#settings) to be applied to the current calculation.

An additional helper function, `halfGutter`, is also exposed; it returns half the width of a single gutter, handling the ugly conversion from a string to a number and back.

### Shorthand
Susy's Sass implementation turns on a very friendly [shorthand](http://oddbird.net/susy/docs/api.html#shorthand) for defining grid spans and context:

```scss
$col-width: su-span(3 at 2);
```

Susy.js does its level best to preserve the friendliness of the API through a set of shorthand _functions_:

* `all`
* `alpha(count)`
* `at(location)`
* `first(count)`
* `last(count)`
* `narrow`
* `of(...shorthand)`
* `omega(count)`
* `setGutters(gutters)`
* `wide`
* `wider`

Shorthand may also include bare numbers or arrays, which will be treated as column counts.

#### Examples
```js
span(2)
span(2, of(6))
span(6, at(3))
span(first(3), of(slice(6, at(3))))
```

```js
gutter()
gutter(6)
gutter(wider)
gutter(slice(6, at(3)))
```

Familiarity with the Sass syntax is highly recommended, and will make picking up the JavaScript version a more-or-less breeze.

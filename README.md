# ts-transform-classcat
Compile time [classcat](https://github.com/JorgeBucaran/classcat) transformation for JSX.

Transpiles:
```javascript
<div class={{
  circle: true,
  off: !isOn,
  on: isOn,
  textOff: !isOn
}} />
```
Into:
```javascript
var _cc = require("classcat")
<div class={_cc({
    circle: true,
    off: !isOn,
    on: isOn,
    textOff: !isOn
})}/>
```

# Install
`yarn add -D ts-transform-classcat`
`yarn add classcat`

## General usage
```javascript
const transformClasscat = require('ts-transform-classcat').default;

transformInferno()
```

## Usage examples
Look [here](https://github.com/deamme/ts-transform-inferno/tree/master/examples).

## Testing
You can run the following command to test: `npm test`

### Adding test cases
Write your test in a `.tsx` file and add it to `tests/cases`.

Compile with `npm test` and look into the `tests/temp` and verify.

Overwrite references by running the following command: `npm run overwrite-references`

Run `npm test` again to verify that all tests are passing.

## Credits
- [Classcat](https://github.com/JorgeBucaran/classcat)

# Avro webpack loader [![NPM version](https://img.shields.io/npm/v/@avro/webpack-loader.svg)](https://www.npmjs.com/package/@avro/webpack-loader)

## Usage

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.avdl$/,
        use: '@avro/webpack-loader'
      }
    ]
  }
};
```

See `examples/` for a sample application.

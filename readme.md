## Css Asserts Minimize Plugin

A Webpack plugin to merge media query and minimize CSS assets.

### What does the plugin do?

It will search for CSS assets during the Webpack build and will merge the same media query and optimize \ minimize the CSS by cssnano , so that you can ues css percompiler to write media query in css styles and don't worry about writing so much the same media queries and making css assets too large.

### Install

> npm i css-asserts-minimize-plugin -D

### Basic Usage

```js
// webpack.config.js
  module.exports = {
	...
  plugins: [
    new CssAssertsMinimizePlugin(),
       
```
```js
// webpack.config.js
  module.exports = {
	...
  plugins: [
    new CssAssertsMinimizePlugin({
          preset: ['default', {
              discardComments: {
                  removeAll: true,
              },
          }]
        }),
       
```
the config is the same as cssnano config


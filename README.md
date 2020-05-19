# dom-painter

<a href="https://www.npmjs.com/package/dom-painter">
  <img src="https://img.shields.io/badge/npm-v1.0.7-yellowgreen"/>
</a>

<a href="https://www.npmjs.com/package/dom-painter">
  <img src="https://img.shields.io/npm/dw/dom-painter"/>
</a>

converts dom to an image.

English | <a href="https://github.com/Longgererer/dom-pointer/blob/master/READMECN.md">简体中文</a>

## feature

- support
  - External CSS style drawing
  - External font drawing
  - SVG drawing
  - Canvas drawing
- nonsupport
  - Pseudo element drawing
    - If you want to use dom-painter to draw pseudo-elements, You can put the pseudo-element's CSS style string in`config.otherStyles`.
  - iframe element drawing
    - If you need to draw an iframe, try extracting the dom object from the iframe and drawing it.
  - Network picture drawing (including background picture)
    - If you need to draw an image, convert the image's external link to base64 encoding.

## arguments

### element

dom-painter receives an element, which is a dom element, as a conversion object.

### config

The configuration items required by dom-painter are as follows:

- `width: integer`
  - Image width.
- `height: integer`
  - Image height.
- `format: ?string`
  - Optional, image format, default is jpeg.
- `quality: ?integer`
  - Optional, image quality, default is 1.
- `links: ?string[]`
  - Optional, external CSS links, default is [].
- `fonts: ?string[]`
  - Optional, external font link, default is [].
- `otherStyles: ?string`
  - Optionally, other styles, such as pseudo-elements, external styles, etc., default to empty strings.

Note: `quality` takes effect only if `format` is `jpeg` or `webp`.

## usage

```dash
npm i dom-painter --save
```

You can use dom-painter as follows:

```html
<div id="dom">123123213</div>
```

```javascript
import domPainter from 'dom-painter'

const links = ['...']
const fonts = [
  {
    url: '...',
    fontFamily: '...',
  },
]
const otherStyles = '#div:before{...}'
const config = {
  width: 1200,
  height: 600,
  format: 'jpeg',
  quality: 0.8,
  links,
  fonts,
  otherStyles,
}

const element = document.getElementById('dom')

domPainter(element, config).then((dataURL) => {
  console.log(dataURL)
})
```

## license

MIT

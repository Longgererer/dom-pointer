# dom-painter

将 dom 元素转化为图片

简体中文 | <a href="https://github.com/Longgererer/dom-pointer/blob/master/README.md">English</a>

## 特性

- 支持
  - 外部 css 样式绘制
  - 外部字体绘制
  - svg 元素绘制
  - canvas 元素绘制
- 不支持
  - 伪元素绘制
    - 如果你想使用 dom-painter 绘制伪元素，你可以把伪元素的 css 样式字符串放到`config.otherStyles`中
  - iframe 元素绘制
    - 如果你需要绘制 iframe，尝试提取出 iframe 中的 dom 对象再进行绘制
  - 网络图片绘制(包括背景图片)
    - 如果你需要绘制图片，请将该图片的外部链接转换为 base64 编码

## 参数

### element

dom-painter 接收一个 element 作为转换对象，element 是一个 dom 元素

### config

dom-painter 所需的配置项如下:

- `width: integer`
  - 图片宽度。
- `height: integer`
  - 图片高度。
- `format: ?string`
  - 可选，图片格式，默认为 jpeg。
- `quality: ?integer`
  - 可选，图片质量，默认为 1。
- `links: ?string[]`
  - 可选，外部 css 链接，默认为[]。
- `fonts: ?string[]`
  - 可选，外部字体链接，默认为[]。
- `otherStyles: ?string`
  - 可选，其他样式，如伪元素，外部样式等，默认为空字符串

注意：只有 `format` 为 `jpeg` 或 `webp` 格式时，`quality` 才会生效。

## 使用

```dash
npm i dom-painter --save
```

你可以向下面这样使用 dom-painter:

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

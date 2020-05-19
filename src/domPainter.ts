interface FontUrl {
  url: RequestInfo;
  fontFamily: String;
}
interface Config {
  [key: string]: any;
  width: number;
  height: number;
  format?: string;
  quality?: number;
  links?: string[];
  fonts?: FontUrl[];
  otherStyles?: string;
}
interface StyleInfo {
  [key: string]: any;
  renderStyles: string[];
  inheritedStyles: string[];
  gridStyles: string[];
  flexStyles: string[];
  defaultStyles: any;
}
const styleInfo: StyleInfo = {
  renderStyles: [
    'align-items',
    'align-content',
    'bottom',
    'box-sizing',
    'box-shadow',
    'background',
    'background-color',
    'background-image',
    'background-repeat',
    'background-position',
    'background-size',
    'border-radius',
    'border-collapse',
    'border',
    'clip',
    'clip-path',
    'color',
    'clear',
    'display',
    'font-size',
    'font-family',
    'font-style',
    'font-weight',
    'float',
    'flex-direction',
    'flex-wrap',
    'flew-flow',
    'flex',
    'grid',
    'grid-template-columns',
    'grid-template-rows',
    'grid-template-areas',
    'grid-template',
    'grid-column-gap',
    'grid-row-gap',
    'grid-gap',
    'grid-auto-flow	',
    'height',
    'justify-content',
    'justify-items',
    'left',
    'list-style',
    'line-height',
    'letter-spacing',
    'word-spacing',
    'white-space',
    'margin',
    'margin-top',
    'margin-right',
    'margin-bottom',
    'margin-left',
    'max-height',
    'max-width',
    'min-height',
    'min-width',
    'opacity',
    'overflow',
    'position',
    'padding',
    'padding-top',
    'padding-right',
    'padding-bottom',
    'padding-left',
    'place-items',
    'right',
    'text-transform',
    'text-align',
    'text-shadow',
    'text-decoration',
    'transform-origin',
    'top',
    'transform',
    'visibility',
    'vertical-align',
    'white-space',
    'width',
    'z-index',
  ],
  inheritedStyles: [
    'borderCollapse',
    'captionSide',
    'color',
    'emptyCells',
    'font',
    'fontFamily',
    'fontWeight',
    'fontSize',
    'fontStyle',
    'lineHeight',
    'letterSpacing',
    'textAlign',
    'textShadow',
    'textTransform',
    'visibility',
    'wordSpacing',
  ],
  gridStyles: [
    'grid',
    'gridTemplateColumns',
    'gridTemplateRows',
    'gridTemplateAreas',
    'gridTemplate',
    'gridColumnGap',
    'gridRowGap',
    'gridGap',
    'gridAutoFlow	',
  ],
  flexStyles: [
    'flexDirection',
    'flexWrap',
    'flewFlow',
    'justifyContent',
    'justifyItems',
    'alignItems',
    'alignContent',
  ],
  defaultStyles: {
    background: 'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box',
    boxSizing: 'content-box',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    minHeight: 'auto',
    minWidth: 'auto',
    position: 'static',
    backgroundRepeat: 'repeat',
    backgroundPosition: '0% 0%',
    listStyle: 'outside none disc',
    overflow: 'visible',
    verticalAlign: 'baseline',
    opacity: '1',
  },
  specialStyles: {
    textDecoration: /^none solid rgb/,
    border: /^0px none rgb/
  }
}
const tags: string[] = ["br", "hr", "img", "input", "param", "meta", "link"]
export default async function domPainter(element: any, config: Config) {
  let type: string = 'string'
  if (typeof element !== 'string') {
    if (!judgeDom(element)) {
      throw 'element\'s is not string or dom.'
    } else {
      type = 'dom'
    }
  }
  config = generateDefaultConfig(config)
  const { width, height, fonts, links, quality, format, otherStyles } = config
  let styleStr: string = otherStyles + '\n'
  await loadFonts(fonts).then((fontStyleStr: string) => {
    styleStr += fontStyleStr
  })
  await loadLinks(links).then((linkStyleStr: string) => {
    styleStr += linkStyleStr
  })
  let xmlStr: string = ''
  await htmlToText(element).then(res => {
    xmlStr = res
  })
  xmlStr = htmlToXml(xmlStr)
  const svg: Blob = buildSVG(width, height, xmlStr, styleStr)
  let dataURL: string = ''
  await drawImage(width, height, svg, quality, format).then(res => {
    dataURL = res
  })
  return dataURL
}
function generateDefaultConfig(config: Config) {
  const defaultConfig: Config = {
    width: 0,
    height: 0,
    format: 'jpeg',
    quality: 1,
    links: [],
    fonts: [],
    otherStyles: ''
  }
  for (let attr in defaultConfig) {
    !config.hasOwnProperty(attr) && (config[attr] = defaultConfig[attr])
  }
  return config
}
function judgeDom(element: any) {
  if (element instanceof HTMLElement || element instanceof HTMLBodyElement || element.nodeName === 'BODY') {
    return true
  }
  return false
}
async function drawImage(width: number, height: number, svg: any, quality?: number, format?: string) {
  let url: string = ''
  await blobToDataURL(svg).then(async (res: any) => {
    const canvas: any = document.createElement('canvas')
    const ctx: any = canvas.getContext('2d')
    const canvasW: any = document.createAttribute("width")
    const canvasH: any = document.createAttribute("height")
    canvasW.nodeValue = width
    canvasH.nodeValue = height
    canvas.setAttributeNode(canvasW)
    canvas.setAttributeNode(canvasH)
    ctx.fillStyle = "#fff"
    ctx.fillRect(0, 0, width, height)
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.src = res
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height)
        url = canvas.toDataURL(`image/${format}`, quality)
        resolve(url)
      }
    })
  })
  return url
}
function svgToImage(svg: any) {
  const svgXmlStr: string = new XMLSerializer().serializeToString(svg)
  const imgBase64: string = `data:image/svg+xml;base64,${window.btoa(svgXmlStr)}`
  let url: string = ''
  const canvas: any = document.createElement('canvas')
  const ctx: any = canvas.getContext('2d')
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.src = imgBase64
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      url = canvas.toDataURL()
      resolve(url)
    }
  })
}
function isBase64(str: string) {
  const match: RegExp = /^data:image\//
  return match.test(str)
}
function htmlToXml(str: string) {
  const div = document.createElement('div')
  div.innerHTML = str
  const xml = new XMLSerializer().serializeToString(div.childNodes[0])
  return xml
}
async function htmlToText(node: any) {
  let txt: string = ""
  if (node.nodeName !== "#text") {
    let nodeName: string = node.nodeName.toLowerCase()
    let otherAttr: string = ''
    if (nodeName === 'img') {
      const src = node.src
      if (isBase64(src)) {
        otherAttr += ` src='${src}'`
      }
    }
    if (nodeName === 'canvas') {
      nodeName = 'img'
      otherAttr += ` src='${node.toDataURL(node)}'`
    }
    if (node.nodeName === 'svg') {
      nodeName = 'img'
      await svgToImage(node).then(res => {
        otherAttr += ` src=${res}`
      })
    }
    const style: string = styleToString(node, styleInfo.renderStyles)
    txt += `<${nodeName}${otherAttr} style="${style}">`
    if (!tags.includes(nodeName)) {
      const childNodes: any = node.childNodes
      for (let i = 0, j = childNodes.length;i < j;i++) {
        txt += await htmlToText(childNodes[i])
      }
      txt += `</${nodeName}>`
    }
  } else {
    txt += node.data
  }
  return txt
}
function styleToString(node: any, styleNames: String[]) {
  const css: any = window.getComputedStyle(node, null)
  const style: string[] = []
  const parent: any = node.parentNode
  let parentStyle: any = null
  if (parent.nodeName !== 'HTML') {
    parentStyle = window.getComputedStyle(parent, null)
  }
  const display: String = css['display']
  const gridDisplay: String[] = ['grid', 'inlineGrid']
  const flexDisplay: String[] = ['flex', 'inlineFlex']
  const { gridStyles, flexStyles, inheritedStyles, defaultStyles, specialStyles } = styleInfo
  for (const name of styleNames) {
    const fName: string = separatorToCamelNaming(name)
    let value = css[fName]
    if (!gridDisplay.includes(display)) {
      if (gridStyles.includes(fName)) {
        continue
      }
    }
    if (!flexDisplay.includes(display)) {
      if (flexStyles.includes(fName)) {
        continue
      }
    }
    if (specialStyles[fName]) {
      if (specialStyles[fName].test(value)) {
        continue
      }
    }
    if (fName === 'backgroundImage') {
      let url: string = ''
      if (/^url\(/.test(value)) {
        url = value.split('(')[1].split(')')[0]
        if (url && !isBase64(url)) {
          continue
        }
      }
    }
    if (parentStyle) {
      let parV: string = parentStyle[fName]
      if (value === parV) {
        if (value === 'none' || value === 'normal' || value === '0px' || value === 'auto') {
          continue
        }
        if (inheritedStyles.includes(fName)) {
          continue
        } else if (defaultStyles[fName] === value) {
          continue
        }
      } else {
        if (defaultStyles[fName] === value) {
          continue
        }
      }
      if (parentStyle.display !== 'flex') {
        if (fName === 'flex') continue
      }
    }
    if (fName === 'fontFamily') {
      if(value){
        value = value.replace(/"/g, '');
      }
    }
    style.push(`${name}: ${value};`);
  }
  return style.join(' ')
}
function buildSVG(width: number, height: number, xmlStr: string, styleStr: string) {
  const htmlStr = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">\n
<style>\n
${styleStr}
</style>\n
<foreignObject width="100%" height="100%">\n
${xmlStr}
</foreignObject>\n
</svg>`
  const svg = new Blob(htmlStr.split(''), {
    type: 'image/svg+xml;charset=utf-8'
  })
  return svg
}
async function loadFonts(fontUrlList: any) {
  const promises: Promise<String>[] = []
  let fontStyleStr = ''
  fontUrlList.forEach((item: FontUrl) => {
    const promise: Promise<String> = fetch(item.url)
      .then((res: any) => res.blob())
      .then((data: Blob) => {
        return new Promise(resolve => {
          const fr: FileReader = new FileReader()
          fr.onload = (e: any) => {
            resolve(e.target.result)
          }
          fr.readAsDataURL(data)
        })
      }).then((data: any) => {
        const fontFamily: String = item.fontFamily
        let fontStr: String =
          `\n@font-face {
              font-family: ${fontFamily};
              font-style: normal;
              font-weight: regular;
              src: url('${data}');
            }\n`
        return fontStr
      })
    promises.push(promise)
  })
  await Promise.all(promises).then(list => {
    for (let i = list.length - 1;i >= 0;i--) {
      fontStyleStr += list[i]
    }
  })
  return fontStyleStr
}
async function loadLinks(linkList: any) {
  const promises: Promise<String>[] = []
  let linkStyleStr = ''
  linkList.forEach((item: string) => {
    // 转换url为blob对象
    const promise: Promise<String> = fetch(item)
      .then((res: any) => res.text())
      .then((data: string) => data)
    promises.push(promise)
  })
  await Promise.all(promises).then(list => {
    for (let i = list.length - 1;i >= 0;i--) {
      linkStyleStr += list[i]
    }
  })
  return linkStyleStr
}
async function blobToDataURL(blob: Blob) {
  return new Promise((resolve, reject) => {
    let a: FileReader = new FileReader()
    a.onload = async (e: any) => {
      resolve(e.target.result)
    }
    a.readAsDataURL(blob)
  })
}
function separatorToCamelNaming(name: String) {
  const nameArr: string[] = name.split(/-/g)
  let newName: string = ''
  for (let i = 0, j = nameArr.length;i < j;i++) {
    const item: string = nameArr[i]
    if (i === 0) {
      newName += item
    } else {
      newName += `${item[0].toLocaleUpperCase()}${item.substr(1)}`
    }
  }
  return newName
}

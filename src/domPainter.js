"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var styleInfo = {
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
};
var tags = ["br", "hr", "img", "input", "param", "meta", "link"];
function domPainter(element, config) {
    return __awaiter(this, void 0, void 0, function () {
        var type, width, height, fonts, links, quality, format, otherStyles, styleStr, xmlStr, svg, dataURL;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    type = 'string';
                    if (typeof element !== 'string') {
                        if (!judgeDom(element)) {
                            throw 'element\'s is not string or dom.';
                        }
                        else {
                            type = 'dom';
                        }
                    }
                    config = generateDefaultConfig(config);
                    width = config.width, height = config.height, fonts = config.fonts, links = config.links, quality = config.quality, format = config.format, otherStyles = config.otherStyles;
                    styleStr = otherStyles + '\n';
                    return [4 /*yield*/, loadFonts(fonts).then(function (fontStyleStr) {
                            styleStr += fontStyleStr;
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, loadLinks(links).then(function (linkStyleStr) {
                            styleStr += linkStyleStr;
                        })];
                case 2:
                    _a.sent();
                    xmlStr = '';
                    return [4 /*yield*/, htmlToText(element).then(function (res) {
                            xmlStr = res;
                        })];
                case 3:
                    _a.sent();
                    xmlStr = htmlToXml(xmlStr);
                    svg = buildSVG(width, height, xmlStr, styleStr);
                    dataURL = '';
                    return [4 /*yield*/, drawImage(width, height, svg, quality, format).then(function (res) {
                            dataURL = res;
                        })];
                case 4:
                    _a.sent();
                    return [2 /*return*/, dataURL];
            }
        });
    });
}
exports.default = domPainter;
function generateDefaultConfig(config) {
    var defaultConfig = {
        width: 0,
        height: 0,
        format: 'jpeg',
        quality: 1,
        links: [],
        fonts: [],
        otherStyles: ''
    };
    for (var attr in defaultConfig) {
        !config.hasOwnProperty(attr) && (config[attr] = defaultConfig[attr]);
    }
    return config;
}
function judgeDom(element) {
    return element instanceof HTMLElement;
}
function drawImage(width, height, svg, quality, format) {
    return __awaiter(this, void 0, void 0, function () {
        var url;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = '';
                    return [4 /*yield*/, blobToDataURL(svg).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                            var canvas, ctx, canvasW, canvasH;
                            return __generator(this, function (_a) {
                                canvas = document.createElement('canvas');
                                ctx = canvas.getContext('2d');
                                canvasW = document.createAttribute("width");
                                canvasH = document.createAttribute("height");
                                canvasW.nodeValue = width;
                                canvasH.nodeValue = height;
                                canvas.setAttributeNode(canvasW);
                                canvas.setAttributeNode(canvasH);
                                ctx.fillStyle = "#fff";
                                ctx.fillRect(0, 0, width, height);
                                return [2 /*return*/, new Promise(function (resolve, reject) {
                                        var img = new Image();
                                        img.crossOrigin = 'Anonymous';
                                        img.src = res;
                                        img.onload = function () {
                                            ctx.drawImage(img, 0, 0, width, height);
                                            url = canvas.toDataURL("image/" + format, quality);
                                            resolve(url);
                                        };
                                    })];
                            });
                        }); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, url];
            }
        });
    });
}
function svgToImage(svg) {
    var svgXmlStr = new XMLSerializer().serializeToString(svg);
    var imgBase64 = "data:image/svg+xml;base64," + window.btoa(svgXmlStr);
    var url = '';
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    return new Promise(function (resolve, reject) {
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = imgBase64;
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            url = canvas.toDataURL();
            resolve(url);
        };
    });
}
function isBase64(str) {
    var match = /^data:image\//;
    return match.test(str);
}
function htmlToXml(str) {
    var div = document.createElement('div');
    div.innerHTML = str;
    var xml = new XMLSerializer().serializeToString(div.childNodes[0]);
    return xml;
}
function htmlToText(node) {
    return __awaiter(this, void 0, void 0, function () {
        var txt, nodeName, otherAttr_1, src, style, childNodes, i, j, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    txt = "";
                    if (!(node.nodeName !== "#text")) return [3 /*break*/, 8];
                    nodeName = node.nodeName.toLowerCase();
                    otherAttr_1 = '';
                    if (nodeName === 'img') {
                        src = node.src;
                        if (isBase64(src)) {
                            otherAttr_1 += " src='" + src + "'";
                        }
                    }
                    if (nodeName === 'canvas') {
                        nodeName = 'img';
                        otherAttr_1 += " src='" + node.toDataURL(node) + "'";
                    }
                    if (!(node.nodeName === 'svg')) return [3 /*break*/, 2];
                    nodeName = 'img';
                    return [4 /*yield*/, svgToImage(node).then(function (res) {
                            otherAttr_1 += " src=" + res;
                        })];
                case 1:
                    _b.sent();
                    _b.label = 2;
                case 2:
                    style = styleToString(node, styleInfo.renderStyles);
                    txt += "<" + nodeName + otherAttr_1 + " style=\"" + style + "\">";
                    if (!!tags.includes(nodeName)) return [3 /*break*/, 7];
                    childNodes = node.childNodes;
                    i = 0, j = childNodes.length;
                    _b.label = 3;
                case 3:
                    if (!(i < j)) return [3 /*break*/, 6];
                    _a = txt;
                    return [4 /*yield*/, htmlToText(childNodes[i])];
                case 4:
                    txt = _a + _b.sent();
                    _b.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 3];
                case 6:
                    txt += "</" + nodeName + ">";
                    _b.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    txt += node.data;
                    _b.label = 9;
                case 9: return [2 /*return*/, txt];
            }
        });
    });
}
function styleToString(node, styleNames) {
    var css = window.getComputedStyle(node, null);
    var style = [];
    var parent = node.parentNode;
    var parentStyle = null;
    if (parent.nodeName !== 'HTML') {
        parentStyle = window.getComputedStyle(parent, null);
    }
    var display = css['display'];
    var gridDisplay = ['grid', 'inlineGrid'];
    var flexDisplay = ['flex', 'inlineFlex'];
    var gridStyles = styleInfo.gridStyles, flexStyles = styleInfo.flexStyles, inheritedStyles = styleInfo.inheritedStyles, defaultStyles = styleInfo.defaultStyles, specialStyles = styleInfo.specialStyles;
    for (var _i = 0, styleNames_1 = styleNames; _i < styleNames_1.length; _i++) {
        var name_1 = styleNames_1[_i];
        var fName = separatorToCamelNaming(name_1);
        var value = css[fName];
        if (!gridDisplay.includes(display)) {
            if (gridStyles.includes(fName)) {
                continue;
            }
        }
        if (!flexDisplay.includes(display)) {
            if (flexStyles.includes(fName)) {
                continue;
            }
        }
        if (specialStyles[fName]) {
            if (specialStyles[fName].test(value)) {
                continue;
            }
        }
        if (fName === 'backgroundImage') {
            var url = value.split('(')[1].split(')')[0];
            if (!isBase64(url)) {
                continue;
            }
        }
        if (parentStyle) {
            var parV = parentStyle[fName];
            if (value === parV) {
                if (value === 'none' || value === 'normal' || value === '0px' || value === 'auto') {
                    continue;
                }
                if (inheritedStyles.includes(fName)) {
                    continue;
                }
                else if (defaultStyles[fName] === value) {
                    continue;
                }
            }
            else {
                if (defaultStyles[fName] === value) {
                    continue;
                }
            }
            if (parentStyle.display !== 'flex') {
                if (fName === 'flex')
                    continue;
            }
        }
        if (fName === 'fontFamily') {
            value = value.replace(/"/g, '');
        }
        style.push(name_1 + ": " + value + ";");
    }
    return style.join(' ');
}
function buildSVG(width, height, xmlStr, styleStr) {
    var htmlStr = "<svg width=\"" + width + "\" height=\"" + height + "\" xmlns=\"http://www.w3.org/2000/svg\">\n\n<style>\n\n" + styleStr + "\n</style>\n\n<foreignObject width=\"100%\" height=\"100%\">\n\n" + xmlStr + "\n</foreignObject>\n\n</svg>";
    var svg = new Blob(htmlStr.split(''), {
        type: 'image/svg+xml;charset=utf-8'
    });
    return svg;
}
function loadFonts(fontUrlList) {
    return __awaiter(this, void 0, void 0, function () {
        var promises, fontStyleStr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promises = [];
                    fontStyleStr = '';
                    fontUrlList.forEach(function (item) {
                        var promise = fetch(item.url)
                            .then(function (res) { return res.blob(); })
                            .then(function (data) {
                            return new Promise(function (resolve) {
                                var fr = new FileReader();
                                fr.onload = function (e) {
                                    resolve(e.target.result);
                                };
                                fr.readAsDataURL(data);
                            });
                        }).then(function (data) {
                            var fontFamily = item.fontFamily;
                            var fontStr = "\n@font-face {\n              font-family: " + fontFamily + ";\n              font-style: normal;\n              font-weight: regular;\n              src: url('" + data + "');\n            }\n";
                            return fontStr;
                        });
                        promises.push(promise);
                    });
                    return [4 /*yield*/, Promise.all(promises).then(function (list) {
                            for (var i = list.length - 1; i >= 0; i--) {
                                fontStyleStr += list[i];
                            }
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, fontStyleStr];
            }
        });
    });
}
function loadLinks(linkList) {
    return __awaiter(this, void 0, void 0, function () {
        var promises, linkStyleStr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promises = [];
                    linkStyleStr = '';
                    linkList.forEach(function (item) {
                        // 转换url为blob对象
                        var promise = fetch(item)
                            .then(function (res) { return res.text(); })
                            .then(function (data) { return data; });
                        promises.push(promise);
                    });
                    return [4 /*yield*/, Promise.all(promises).then(function (list) {
                            for (var i = list.length - 1; i >= 0; i--) {
                                linkStyleStr += list[i];
                            }
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, linkStyleStr];
            }
        });
    });
}
function blobToDataURL(blob) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var a = new FileReader();
                    a.onload = function (e) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            resolve(e.target.result);
                            return [2 /*return*/];
                        });
                    }); };
                    a.readAsDataURL(blob);
                })];
        });
    });
}
function separatorToCamelNaming(name) {
    var nameArr = name.split(/-/g);
    var newName = '';
    for (var i = 0, j = nameArr.length; i < j; i++) {
        var item = nameArr[i];
        if (i === 0) {
            newName += item;
        }
        else {
            newName += "" + item[0].toLocaleUpperCase() + item.substr(1);
        }
    }
    return newName;
}

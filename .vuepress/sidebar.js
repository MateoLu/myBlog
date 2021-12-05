const { createSideBarConfig } = require('./util')
const CSS_PATH = '/blogs/css'
const NODE_PATH = '/blogs/node'
const JS_PATH = '/blogs/javascript'

module.exports = {
  [CSS_PATH]: [createSideBarConfig('CSS 技巧', CSS_PATH)],
  [NODE_PATH]: [createSideBarConfig('Node.js 技术', NODE_PATH)],
  [JS_PATH]: [createSideBarConfig('手写JS常见面试题合集', JS_PATH + 'js-methods')]
}
const { createSideBarConfig } = require('./util')
const CSS_PATH = '/blogs/css'
const NODE_PATH = '/blogs/node'

module.exports = {
  [CSS_PATH]: [createSideBarConfig('CSS 技巧', CSS_PATH)],
  [NODE_PATH]: [createSideBarConfig('Node 基础到 Koa2框架', NODE_PATH)]
}
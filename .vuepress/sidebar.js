const { createSideBarConfig } = require('./util')
const CSS_PATH = '/blogs/css'

module.exports = {
  [CSS_PATH]: [createSideBarConfig('CSS 技巧', CSS_PATH)],
}
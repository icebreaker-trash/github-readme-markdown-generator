const { vue2MdByPath } = require('../')
// const fsp = require('fs/promises')
const path = require('path')
;(async () => {
  const filepath = path.resolve(__dirname, '../demos/vue/index.vue')
  const result = await vue2MdByPath(filepath)
  return result
})()

// import juice from 'juice'
import fs from 'fs/promises'
import { createSSRApp } from 'vue'
import { createServer } from 'vite'
import { renderToString } from 'vue/server-renderer'

import {
  parse,
  // compileStyleAsync,
  compileScript,
  compileTemplate,
  compileStyleAsync,
  compileStyle,
  rewriteDefault
  // transformRef,
  // shouldTransform
} from 'vue/compiler-sfc'

export function createApp () {
  return createSSRApp({
    data: () => ({ count: 1 }),
    template: '<div @click="count++">{{ count }}</div>'
  })
}

export async function vue2Md (source: string) {
  const id = 'som'
  const dataVId = 'data-v-' + id
  const { descriptor } = parse(source, { sourceMap: false })
  const hasScoped = descriptor.styles.some((s) => s.scoped)
  const template = compileTemplate({
    filename: descriptor.filename,
    id,
    source: descriptor.template?.content as string,
    scoped: hasScoped,
    compilerOptions: {
      scopeId: hasScoped ? dataVId : undefined
    }
  })
  const script = compileScript(descriptor, {
    id,
    templateOptions: {
      scoped: hasScoped,
      compilerOptions: {
        scopeId: hasScoped ? dataVId : undefined
      }
    }
  })
  const styles = descriptor.styles
  const styleCodes = []

  if (styles.length) {
    for (let i = 0; i < styles.length; i++) {
      const styleItem = styles[i]
      styleCodes.push(
        compileStyle({
          filename: descriptor.filename,
          source: styleItem.content,
          id: dataVId,
          scoped: styleItem.scoped
        }).code
      )
    }
  }
  const styleCode = styleCodes.join('\n')
  const renderName = '_sfc_render'
  const mainName = '_sfc_main'
  const templateCode = template.code.replace(
    /\nexport (function|const) (render|ssrRender)/,
    '\n$1 _sfc_$2'
  )
  const scriptCode = rewriteDefault(script.content, mainName)

  const output = [
    scriptCode,
    templateCode,

    mainName + '.render=' + renderName,
    'export default ' + mainName
  ]
  if (hasScoped) {
    output.push(mainName + '.__scopeId = ' + JSON.stringify(dataVId))
  }
  const code = output.join('\n')
  console.log(code)
  await fs.writeFile('./demo.js', code, {
    encoding: 'utf-8'
  })
  // const b = compileScript(descriptor, {
  //   id: mockId
  // })
  // const r = compileTemplate({
  //   filename: descriptor.filename,
  //   id: mockId,
  //   source: descriptor.template?.content as string
  // })
  // console.log(b, r)
  // const app = createApp()

  // const html = await renderToString(app)
  // return html
}

export async function vue2MdByPath (filepath: string) {
  const source = await fs.readFile(filepath, {
    encoding: 'utf-8'
  })
  return await vue2Md(source)
}

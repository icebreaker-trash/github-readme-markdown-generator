import fs from 'fs/promises'
import path from 'path'
import { tmpDir } from '@/util'
export type createHtmlParams = {
  title?: string
  scriptPath: string
}

export function createHtml (params: createHtmlParams) {
  return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${params.title ?? 'github-readme-markdown-generator'}</title>
</head>

<body>
  <div id="app"></div>
  <script type="module" src="${params.scriptPath}"></script>
</body>
</html>
  `
}

export async function createTmpHtml (params: createHtmlParams) {
  try {
    await fs.access(tmpDir)
  } catch (error) {
    console.log('.tmp dir not existed, mkdir')
    await fs.mkdir(tmpDir)
  }
  await fs.writeFile(path.resolve(tmpDir, 'index.html'), createHtml(params), {
    encoding: 'utf-8'
  })
  console.log('generate index.html successfully!')
}

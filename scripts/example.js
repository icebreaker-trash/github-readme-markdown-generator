import { renderToStaticMarkup } from 'react-dom/server.js'
import React from 'react'
import Content from './example.mdx'

console.log(renderToStaticMarkup(React.createElement(Content)))

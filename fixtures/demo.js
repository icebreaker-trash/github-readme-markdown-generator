import { toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from 'vue'
const _sfc_main = {
  setup (__props, { expose }) {
    expose()

    const username = 'sonofmagic'

    const __returned__ = { username }
    Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
    return __returned__
  }

}

const _withScopeId = n => (_pushScopeId('data-v-som'), n = n(), _popScopeId(), n)
const _hoisted_1 = { class: 'title' }

function _sfc_render (_ctx, _cache) {
  return (_openBlock(), _createElementBlock('div', _hoisted_1, 'Hello world ' + _toDisplayString(_ctx.username), 1 /* TEXT */))
}
_sfc_main.render = _sfc_render
export default _sfc_main
_sfc_main.__scopeId = 'data-v-som'

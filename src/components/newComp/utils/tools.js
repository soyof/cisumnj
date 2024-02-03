import Vue from 'vue'
// import BigNumber from 'bignumber.js'
const isServer = Vue.prototype.$isServer
const BIGNUMBER_DEFAULT_FORMAT = {groupSeparator: '', decimalSeparator: '.'}
const BIGNUMBER_GROUPING_FORMAT = {
  decimalSeparator: '.',
  groupSeparator: ',',
  groupSize: 3
}
export { BIGNUMBER_DEFAULT_FORMAT, BIGNUMBER_GROUPING_FORMAT }
// 判断变量类型
// 注：typeof及instanceof仅针对简单变量
function is (type, val) {
  if (val && val !== '') {
    return Object.prototype.toString.call(val) === '[object ' + type + ']'
  }
}
export { is }
// 查找组件的父组件
function findComponentParent (content, componentName, componentNames) {
  if (is('String', componentName)) {
    componentNames = [componentName]
  } else {
    componentNames = componentName
  }
  let parent = content.$parent
  let name = parent.$options.name
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.$parent
    if (parent) {
      name = parent.$options.name
    }
  }
  return parent
}
export { findComponentParent }
// 查找子组件
function findComponentChildren (content, componentName) {
  let childrens = content.$children
  let children = null
  if (childrens.length) {
    for (let i = 0; i < childrens.length; i++) {
      const child = childrens[i]
      const name = child.$options.name
      if (name === componentName) {
        children = child
        break
      } else {
        children = findComponentChildren(child, componentName)
        if (children) break
      }
    }
  }
  return children
}
export { findComponentChildren }
// 查找所有子组件
function findComponentsChildren (content, componentName) {
  let childrens = content.$children
  let childrenComponents = []
  if (childrens.length) {
    childrens.forEach(child => {
      let name = child.$options.name
      if (name === componentName) {
        childrenComponents.push(child)
      }
      let childCh = child.$children
      if (childCh.length) {
        let findChildCh = findComponentsChildren(child, componentName)
        if (findChildCh) {
          childrenComponents.concat(findChildCh)
        }
      }
    })
  }
  return childrenComponents
}
export { findComponentsChildren }

export function createSimpleFunctional (c, el = 'div') {
  return {
    functional: true,

    render: (h, { data, children }) => {
      data.staticClass = data.staticClass ? `${c} ${data.staticClass}` : c
      return h(el, data, children)
    }
  }
}

export function directiveConfig (binding, defaults = {}) {
  return Object.assign(
    defaults,
    binding.modifiers,
    { value: binding.arg },
    binding.value || {}
  )
}

export function closest (className) {
  let parent = this.$parent

  while (parent) {
    if (!parent.$el) {
      return null
    }

    if (parent.$el.classList.contains(className)) {
      return parent
    }

    parent = parent.$parent
  }

  return null
}

export function addOnceEventListener (el, event, cb) {
  var once = () => {
    cb()
    el.removeEventListener(event, once, false)
  }

  el.addEventListener(event, once, false)
}

// 浏览器兼容
export function addHandler (ele, eType, handler) {
  if (ele.addEventListener) {
    ele.addEventListener(eType, handler, false)
  } else {
    ele.attachEvent('on' + eType, handler)
  }
}
export function removeHandler (ele, eType, handler) {
  if (ele.removeEventListener) {
    ele.removeEventListener(eType, handler, false)
  } else {
    ele.detachEvent('on' + eType, handler)
  }
}
export function removeDom (obj) {
  try {
    obj.remove()
  } catch (e) {
    obj.removeNode(true)
  }
}
// 判断参数是否是其中之一
export function oneOf (value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}
// 判断是否是数字
export function isValueNumber (value) {
  return /(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/.test(value + '')
}
export function arrContains (arr, obj) {
  var i = arr.length
  while (i--) {
    if (arr[i] === obj) {
      return true
    }
  }
  return false
}

// firstUpperCase
function firstUpperCase (str) {
  return str.toString()[0].toUpperCase() + str.toString().slice(1)
}
// scrollTop animation
export function scrollTop (el, from = 0, to, duration = 500) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame =
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60)
      }
  }
  const difference = Math.abs(from - to)
  const step = Math.ceil((difference / duration) * 50)

  function scroll (start, end, step) {
    if (start === end) return

    let d = start + step > end ? end : start + step
    if (start > end) {
      d = start - step < end ? end : start - step
    }

    if (el === window) {
      window.scrollTo(d, d)
    } else {
      el.scrollTop = d
    }
    window.requestAnimationFrame(() => scroll(d, end, step))
  }
  scroll(from, to, step)
}
export { firstUpperCase }

// watch DOM change
export const MutationObserver =
  window.MutationObserver ||
  window.WebKitMutationObserver ||
  window.MozMutationObserver ||
  false

// For notice
export function camelcaseToHyphen (str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}
// For MsgBox scrollBar hidden
let cached
let isIe = navigator.userAgent.indexOf('MSIE') >= 0 || navigator.userAgent.indexOf('Trident') >= 0
export function getScrollBarSize (fresh) {
  if (isServer) return 0
  // 解决-在目前皮肤设置滚动条7px时，页面刷新会在表格/select初始化时执行获取原生宽度，导致后赋值主题样式后计算错误
  // 在框架设置皮肤时，将滚动条直接设置到sessionStorage中（chorme下）
  if (!isIe && window.sessionStorage.getItem('scrollbarWidth') && window.sessionStorage.getItem('scrollbarWidth') !== null) cached = Number(window.sessionStorage.getItem('scrollbarWidth'))
  if (fresh || cached === undefined) {
    const inner = document.createElement('div')
    inner.style.width = '100%'
    inner.style.height = '200px'

    const outer = document.createElement('div')
    const outerStyle = outer.style

    outerStyle.position = 'absolute'
    outerStyle.top = 0
    outerStyle.left = 0
    outerStyle.pointerEvents = 'none'
    outerStyle.visibility = 'hidden'
    outerStyle.width = '200px'
    outerStyle.height = '150px'
    outerStyle.overflow = 'hidden'

    outer.appendChild(inner)

    document.body.appendChild(outer)
    // clientWidth是对象看到的宽度（不含边线,即border）
    // scrollWidth是对象实际内容的宽度（不含边线和padding）。
    // offsetWidth是指对象自身的宽度，整型，单位像素（含边线，如滚动条等）。
    const widthContained = inner.offsetWidth
    outer.style.overflow = 'scroll'
    let widthcroll = inner.offsetWidth

    if (widthContained === widthcroll) {
      widthcroll = outer.clientWidth
    }

    document.body.removeChild(outer)

    cached = widthContained - widthcroll
  }
  return cached
}
let cachedHeight
export function getScrollBarSizeHeight (fresh) {
  if (isServer) return 0
  if (fresh || cachedHeight === undefined) {
    const inner = document.createElement('div')
    inner.style.width = '100%'
    inner.style.height = '100%'

    const outer = document.createElement('div')
    const outerStyle = outer.style

    outerStyle.position = 'absolute'
    outerStyle.top = 0
    outerStyle.left = 0
    outerStyle.pointerEvents = 'none'
    outerStyle.visibility = 'hidden'
    outerStyle.width = '200px'
    outerStyle.height = '150px'
    outerStyle.overflow = 'hidden'

    outer.appendChild(inner)

    document.body.appendChild(outer)
    // clientWidth是对象看到的宽度（不含边线,即border）
    // scrollWidth是对象实际内容的宽度（不含边线和padding）。
    // offsetWidth是指对象自身的宽度，整型，单位像素（含边线，如滚动条等）。
    const heightContained = inner.offsetHeight
    outer.style.overflow = 'scroll'
    let heigtcroll = inner.offsetHeight

    if (heightContained === heigtcroll) {
      heigtcroll = outer.clientHeight
    }

    document.body.removeChild(outer)

    cachedHeight = heightContained - heigtcroll
  }
  return cachedHeight
}
function typeOf (obj) {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  return map[toString.call(obj)]
}
export { typeOf }
// deepCopyEx
function deepCopyEx (data, exAttr) {
  const t = typeOf(data)
  let o
  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]))
    }
  } else if (t === 'object') {
    for (let i in data) {
      if (exAttr.indexOf(i) < 0) o[i] = deepCopyEx(data[i], exAttr)
    }
  }
  return o
}
export { deepCopyEx }

function deepCopySome (data, someAttr) {
  const t = typeOf(data)
  let o
  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]))
    }
  } else if (t === 'object') {
    for (let i in data) {
      if (someAttr.indexOf(i) >= 0) o[i] = deepCopySome(data[i], someAttr)
    }
  }
  return o
}
export { deepCopySome }
// deepCopy
function deepCopy (data) {
  const t = typeOf(data)
  let o

  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]))
    }
  } else if (t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i])
    }
  }
  return o
}

export { deepCopy }
// Find components upward
function findComponentsUpward (context, componentName, componentNames) {
  if (typeof componentName === 'string') {
    componentNames = [componentName]
  } else {
    componentNames = componentName
  }

  let parent = context.$parent
  let name = parent.$options.name
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.$parent
    if (parent) name = parent.$options.name
  }
  return parent
}
export { findComponentsUpward }
// Find components downward
// Find component downward
export function findComponentDownward (context, componentName) {
  const childrens = context.$children
  let children = null

  if (childrens.length) {
    for (const child of childrens) {
      const name = child.$options.name
      if (name === componentName) {
        children = child
        break
      } else {
        children = findComponentDownward(child, componentName)
        if (children) break
      }
    }
  }
  return children
}

// Find components downward
export function findComponentsDownward (context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child)
    const foundChilds = findComponentsDownward(child, componentName)
    return components.concat(foundChilds)
  }, [])
}

/* istanbul ignore next */
export function hasClass (el, cls) {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1) { throw new Error('className should not contain space.') }
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
}
/* istanbul ignore next */
export function addClass (el, cls) {
  if (!el) return
  let curClass = el.className
  const classes = (cls || '').split(' ')

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.add(clsName)
    } else {
      if (!hasClass(el, clsName)) {
        curClass += ' ' + clsName
      }
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
}

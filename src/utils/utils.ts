/* eslint-disable no-unused-vars */
/**
 * @name: 43236
 * @description: 创建任意长度的数组,数组内容为当前下标值
 * @param {Number} len 需要创建的数组长度
 * @returns {Array} 创建的新数组
 */
export const createArrayFn = (len: number): any[] => [...new Array(len).keys()]

/**
  * @name: 43236
  * @description: 获取数据类型
  * @param {any} val 需要判断类型的数据
  * @return {any} string, number, boolean, object, array, null, undefined等
  * @Date: 2021-12-01 14:44:20
  */
export const getValueType = (val: any): any => {
  const type = typeof val
  if (type !== 'object') {
    return type.toLocaleLowerCase()
  }
  return Object.prototype.toString.call(val).replace(/^\[object (\S+)\]$/, '$1').toLocaleLowerCase()
}

/**
  * @name: 43236
  * @description: 获取yyyyMMdd格式时间
  * @param {String} val 需要格式化的时间
  * @param {String} type 格式化后的形式
  * @return {String} 已格式化后的日期
  * 当前支持的格式如下：
  * 1.yyyyMMdd；
  * 2.yyyy-MM-dd；
  * 3.yyyy/MM/dd；
  * 4.yyyy-MM-dd HH:MM:SS；
  * 5.yyyy/MM/dd HH:MM:SS；
  * 6.HH:MM:SS
  * @Date: 2021-12-08 13:37:33
  */
export const formatDate = (val: string | number | Date, type?: string): string => {
  val = val ? val + '' : '' // 确保val为string类型
  type = type ? type.toLocaleLowerCase() : ''
  if (val && val.length === 8 && getValueType(+val) === 'number' && !isNaN(+val)) {
    val = val.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1/$2/$3')
  }

  if (!isNaN(+val) && val.length > 10) { // 处理时间戳形式的数据
    val = +val
  }

  const date = val ? new Date(val) : new Date()
  const year = date.getFullYear()
  let month: string | number = date.getMonth() + 1
  let day: string | number = date.getDate()
  let hours: string | number = date.getHours()
  let minutes: string | number = date.getMinutes()
  let second: string | number = date.getSeconds()
  month = month >= 10 ? month : `0${month}`
  day = day >= 10 ? day : `0${day}`
  hours = hours >= 10 ? hours : `0${hours}`
  minutes = minutes >= 10 ? minutes : `0${minutes}`
  second = second >= 10 ? second : `0${second}`

  switch (type) {
    case 'yyyy%mm%dd':
      return `${year}年${month}月${day}日`
    case 'yyyymmdd':
      return `${year}${month}${day}`
    case 'yyyy-mm-dd':
      return `${year}-${month}-${day}`
    case 'yyyy/mm/dd':
      return `${year}/${month}/${day}`
    case 'yyyy-mm-dd hh:mm:ss':
      return `${year}-${month}-${day} ${hours}:${minutes}:${second}`
    case 'yyyy/MM/dd HH:MM:SS':
      return `${year}/${month}/${day} ${hours}:${minutes}:${second}`
    case 'hh:mm:ss':
      return `${hours}:${minutes}:${second}`
    case 'yyyy-mm':
      return `${year}-${month}`
    case 'yyyymm':
      return `${year}${month}`
    case 'yyyy':
      return `${year}`
    case 'mm':
      return `${month}`
    case 'dd':
      return `${day}`
    case 'hours':
      return `${hours}`
    case 'minutes':
      return `${minutes}`
    case 'second':
      return `${second}`
    default:
      return `${year}-${month}-${day} ${hours}:${minutes}:${second}`
  }
}

/**
 * @description: 将毫秒转为hh:mm:ss
 * @param {number} time
 * @param {boolean} hasHours
 * @return {string} hh:mm:ss | mm:ss
 * @Date: 2022-05-08 20:44:15
 */
export const formatTime2HMS = (time: number, hasHours = false): string => {
  let second: number | string = 0
  let totalMinute = 0
  let minute: number | string = 0
  let hour: number | string = 0
  const totalSecond = parseInt(`${time / 1000}`, 10)
  if (totalSecond > 59) {
    second = parseInt(`${totalSecond > 59 ? totalSecond % 60 : totalSecond}`, 10)
    totalMinute = parseInt(`${totalSecond / 60}`, 10)
  } else {
    second = totalSecond
  }
  if (totalMinute > 59) {
    minute = parseInt(`${totalMinute > 59 ? totalMinute % 60 : totalMinute}`, 10)
    hour = parseInt(`${totalMinute / 60}`, 10)
  } else {
    minute = totalMinute
  }
  hour < 10 ? (hour = `0${hour}`) : hour
  minute < 10 ? (minute = `0${minute}`) : minute
  second < 10 ? (second = `0${second}`) : second
  return hasHours ? `${hour}:${minute}:${second}` : `${minute}:${second}`
}

// 判断参数是否是其中之一
export const oneOf = (value: any, validList: any) => {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}

export const randomFn = () => {
  return Math.random().toString(36).slice(-6)
}

/**
 *
 * @param {any} info 需要移除空格的数据
 * @return {any} 移除空格后的数据
 */
export const removeSpace = (info: any): any => {
  let newInfo = JSON.parse(JSON.stringify(info))
  const infoType = getValueType(newInfo)
  if (infoType === 'object') {
    const keys = Object.keys(newInfo)
    keys.forEach(key => {
      const valType = getValueType(newInfo[key])
      if (valType === 'string') {
        newInfo[key] = (newInfo[key] && newInfo[key].trim) ? newInfo[key].trim() : ''
      } else if (valType === 'array' || valType === 'object') {
        newInfo[key] = removeSpace(newInfo[key])
      }
    })
  }
  if (infoType === 'string') {
    newInfo = (newInfo && newInfo.trim) ? newInfo.trim() : ''
  }
  if (infoType === 'array') {
    newInfo = newInfo.map((item: any) => {
      return removeSpace(item)
    })
  }
  return newInfo
}

/**
 * 将下划线字符串转为驼峰
 * @param {any} s 需要转为驼峰的字符串
 * @return {any} 驼峰字符串
 */
export const underlineToHump = (s: any): any => {
  if (typeof s !== 'string') return s
  if (s.indexOf('_') <= 0) return s
  return s.replace(/_(\w)/g, (all, letter) => {
    return letter.toUpperCase()
  })
}

/**
 * 将下划线形式的 JSON对象 转为 驼峰形式的JSON对象
 * @param obj 下划线形式的数据
 * @return {any} 驼峰形式的数据
 */
export const jsonToHump = (obj: any): any => {
  const objType = getValueType(obj)
  if (obj && (objType === 'array' || objType === 'object')) {
    obj = JSON.parse(JSON.stringify(obj))
  }

  if (objType === 'array') {
    obj = obj.map((item: any) => {
      if (getValueType(item) === 'array' || getValueType(item) === 'object') {
        item = jsonToHump(item)
      }
      return item
    })
  } else if (objType === 'object') {
    Object.keys(obj).forEach((key) => {
      const newKey = underlineToHump(key)
      if (newKey !== key) {
        obj[newKey] = obj[key]
        delete obj[key]
      }
      if (getValueType(obj[newKey]) === 'array' || getValueType(obj[newKey]) === 'object') {
        obj[newKey] = jsonToHump(obj[newKey])
      }
    })
  }
  return obj
}

/**
 * 将驼峰转为下划线字符串
 * @param {any} s 驼峰形式的数据
 * @return {any} 下划线的字符串
 */
const humpToUnderline = (s: any): any => {
  if (typeof s !== 'string') return s
  if (!/[A-Z]/g.test(s)) return s
  return s.replace(/([A-Z])/g, '_$1').toLowerCase()
}

/**
 * 将驼峰形式的JSON对象 转为 下划线形式JSON对象
 * @param {any} obj 驼峰形式的数据
 * @return {any} 下划线形式的数据
 */
const jsonToUnderline = (obj: any): any => {
  const objType = getValueType(obj)
  if (obj && (objType === 'array' || objType === 'object')) {
    obj = JSON.parse(JSON.stringify(obj))
  }
  if (objType === 'array') {
    obj = obj.map((item: any) => {
      if (getValueType(item) === 'array' || getValueType(item) === 'object') {
        item = jsonToUnderline(item)
      }
      return item
    })
  } else if (objType === 'object') {
    Object.keys(obj).forEach((key) => {
      const newKey = humpToUnderline(key)
      if (newKey !== key) {
        obj[newKey] = obj[key]
        delete obj[key]
      }
      if (getValueType(obj[newKey]) === 'array' || getValueType(obj[newKey]) === 'object') {
        obj[newKey] = jsonToUnderline(obj[newKey])
      }
    })
  }
  return obj
}

/**
 * 滚动至可视区域
 * @param {HTMLElement} scrollDom overflow：auto元素 父元素 （必须为相对定位，使得子元素offsetTop以滚动的元素为准）
 * @param {Number} toPos 滚动的位置
 * @param {Function} cb 滚动完成的回调函数
 */
export const scrollToView = (scrollDom: HTMLElement, toPos: number, cb: (arg0: number) => any) => {
  let times = Date.now()
  const beginTime = Date.now()
  const beginValue = scrollDom.scrollTop
  const rAF = window.requestAnimationFrame || function(func) {
    return setTimeout(func, 16)
  }
  const frameFunc = () => {
    const progress = (Date.now() - beginTime) / 500
    if (progress < 1) {
      scrollDom.scrollTop = beginValue + ((toPos - beginValue) * easeInOutCubicAnimate(progress))
      rAF(frameFunc)
    } else {
      scrollDom.scrollTop = toPos
      times = Date.now() - times
      cb && cb(times)
    }
  }
  return rAF(frameFunc)
}

const easeInOutCubicAnimate = (value: number) => {
  return value < 0.5 ? cubicFn(value * 2) / 2 : 1 - cubicFn((1 - value) * 2) / 2
}

const cubicFn = (value: number) => {
  return Math.pow(value, 3)
}

/**
 *
 * @param {HTMLElement} container overflow: auto元素,即滚动区域的元素
 * @param {HTMLElement} selected 当前选中元素
 */
export const scrollIntoView = (container: HTMLElement, selected: HTMLElement) => {
  if (!selected) {
    container.scrollTop = 0
    return
  }

  const offsetParents = []
  let pointer: any = selected.offsetParent
  while (pointer && container !== pointer && container.contains(pointer)) {
    offsetParents.push(pointer)
    pointer = pointer.offsetParent
  }
  const top = selected.offsetTop + offsetParents.reduce((prev, curr) => (prev + curr.offsetTop), 0) // 当前元素相对offsetParent的top位置,若该元素的offsetParent非container, 需加上该元素offsetParent的offsetTop值
  const bottom = top + selected.offsetHeight // 当前选择元素底部(bottom)相对offsetParent的top位置
  const viewRectTop = container.scrollTop // 可是区域的最小位置
  const viewRectBottom = viewRectTop + container.clientHeight // 可视区域的最大位置
  // 当前元素不在可视区域内(top < viewRectTop | bottom > viewRectBottom)
  if (top < viewRectTop) {
    container.scrollTop = top
  } else if (bottom > viewRectBottom) {
    container.scrollTop = bottom - container.clientHeight
  }
}

/**
 * 获取随机字符串
 * @param {number} digit 字符串位数
 * @returns {string} random
 */
export const getRandom = (digit = 32): string => {
  digit = +digit || 32
  let randomStr = ''
  const charStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const rangeList = createArrayFn(digit)
  rangeList.forEach(_ => {
    randomStr += charStr.charAt(Math.floor(Math.random() * charStr.length))
  })
  return randomStr
}


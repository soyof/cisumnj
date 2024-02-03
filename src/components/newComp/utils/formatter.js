let formatters = {
  // 字符串格式化日期
  formatterDate: function (str) {
    if (str) {
      str += ''
    } else {
      return  ''
    }
    let zeroCount = 8 - str.length
    for (let i = 0; i < zeroCount; i++) { str = '0' + str }
    return str ? (str.substr(0, 4) + '-' + str.substr(4, 2) + '-' + str.substr(6, 2)) : ''
  },
  // 日期格式化成日期字符串
  formatterDateToString: function (date, fmt) {
    let o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
      'H+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
    }
    return fmt
  },
  // 格式化年月日时分秒
  formatterDateTime: function (str) {
    if (str) {
      str += ''
    } else {
      return  ''
    }
    let zeroCount = 14 - str.length
    for (let i = 0; i < zeroCount; i++) { str = '0' + str }
    return str.substr(0, 4) + '-' + str.substr(4, 2) + '-' + str.substr(6, 2) + ' ' + str.substr(8, 2) + ':' + str.substr(10, 2) + ':' + str.substr(12, 2)
  },
  // 格式化时间
  formatterTime: function (str) {
    if (str) {
      str += ''
    } else {
      return  ''
    }
    let zeroCount = 6 - str.length
    for (let i = 0; i < zeroCount; i++) { str = '0' + str }
    return str ? (str.substr(0, 2) + ':' + str.substr(2, 4) + ':' + str.substr(4, 6)) : ''
  },
  // 格式化金额
  formatterAmount: function (number, decimals, roundtag) {
    decimals = decimals || 2
    number = (number + '').replace(/[^0-9+-Ee.]/g, '')
    roundtag = roundtag || 'round' // 'ceil','floor','round'
    let n = !isFinite(+number) ? 0 : +number
    let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
    let s = ''
    let toFixedFix = function (n, prec) {
      let k = Math.pow(10, prec)
      return '' + parseFloat(Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(prec * 2)) / k
    }
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
    let re = /(-?\d+)(\d{3})/
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, '$1' + ',' + '$2')
    }
    if ((s[1] || '').length < prec) {
      s[1] = s[1] || ''
      s[1] += new Array(prec - s[1].length + 1).join('0')
    }
    return s.join('.')
  },
  // 格式化数量
  formatterCount: function (number) {
    number = parseInt(number)
    if (isNaN(number)) {
      return '0'
    }
    number += ''
    let reg = /(?=(?!(\b))(\d{3})+$)/g
    return number.replace(reg, ',')
  },
  // 格式化百分比
  formatterToPercent: function (number, decimals) {
    number = parseFloat(number)
    if (isNaN(number)) {
      return ''
    }
    decimals = decimals || 2
    return (Math.round(number * Math.pow(10, decimals + 2)) / Math.pow(10, decimals)).toFixed(decimals) + '%'
  }
}
export default formatters

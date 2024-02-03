/*
*根据权限控制是否脱敏
*@param:formatters formatter参数
 */
export const sensitiveFilter = (formatters) => {
  // 根据权限删除脱敏过滤器
  const filters = JSON.parse(JSON.stringify(formatters));
  const rightCodeObj = window.FRAME_CONFIG.rightcodeObj || window.LOCAL_CONFIG.rightcodeObj || {};
  const sensitiveList = (rightCodeObj && Object.keys(rightCodeObj).length > 0)
    ? rightCodeObj.showSensitiveInfo
    : [];
  if (sensitiveList && sensitiveList.length > 0) {
    const typeList = [];
    const sensitive = 'sensitive-type-';
    sensitiveList.forEach(item => {
      switch (item) {
        case 'showAddressInfo':
          typeList.push(sensitive + '1011');
          typeList.push(`${sensitive}1011(;)`);
          break;
        case 'showIdCardInfo':
          typeList.push(sensitive + '1012');
          typeList.push(`${sensitive}1012(;)`);
          break;
        case 'showEmailInfo':
          typeList.push(sensitive + '1013');
          typeList.push(`${sensitive}1013(;)`);
          break;
        case 'showMobilePhoneInfo':
          typeList.push(sensitive + '1014');
          typeList.push(`${sensitive}1014(;)`);
          break;
        case 'showTelephoneInfo':
          typeList.push(sensitive + '1015');
          typeList.push(`${sensitive}1015(;)`);
          break;
      }
    });
    if (typeList.length) {
      for (const attr in filters) {
        if (typeList.indexOf(filters[attr].split(':')[0]) > -1) {
          delete filters[attr];
        }
      }
    }
  }
  return filters;
};

/**
 * @name: 43236
 * @description: 创建任意长度的数组,数组内容为当前下标值
 * @param {Number} len 需要创建的数组长度
 * @returns {Array} 创建的新数组
 */
export const createArrayFn = len => [...new Array(len).keys()];

/**
 * @name: 43236
 * @description: 获取数据类型
 * @param {any} val string, number, boolean, object, array, null, undefined等
 * @return {any} string, number, boolean, object, array, null, undefined等
 * @Date: 2021-12-01 14:44:20
 *
 */
export const getValueType = (val) => {
  const type = typeof val;
  if (type !== 'object') {
    return type.toLocaleLowerCase();
  }
  return Object.prototype.toString.call(val).replace(/^\[object (\S+)\]$/, '$1').toLocaleLowerCase();
};

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
export const formatDate = (val, type) => {
  val = val ? val + '' : ''; // 确保val为string类型
  type = type ? type.toLocaleLowerCase() : '';
  if (val && val.length === 8 && getValueType(+val) === 'number' && !isNaN(+val)) {
    val = val.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1/$2/$3');
  }
  if (val && val.length === 6 && getValueType(+val) === 'number' && !isNaN(+val)) {
    val = val.replace(/^(\d{4})(\d{1})(\d{1})$/, '$1/$2/$3');
  }
  if (!isNaN(+val) && (val.length === 10 || val.length === 13)) { // 处理时间戳形式的数据
    val = +val;
  }
  const date = val ? new Date(val) : new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let second = date.getSeconds();
  month = month >= 10 ? month : `0${month}`;
  day = day >= 10 ? day : `0${day}`;
  hours = hours >= 10 ? hours : `0${hours}`;
  minutes = minutes >= 10 ? minutes : `0${minutes}`;
  second = second >= 10 ? second : `0${second}`;

  switch (type) {
    case 'yyyy':
      return `${year}`;
    case 'mm':
      return `${month}`;
    case 'dd':
      return `${day}`;
    case 'yyyymm':
      return `${year}${month}`;
    case 'yyyymmdd':
      return `${year}${month}${day}`;
    case 'yyyy-mm':
      return `${year}-${month}`;
    case 'yyyy-mm-dd':
      return `${year}-${month}-${day}`;
    case 'yyyy/mm/dd':
      return `${year}/${month}/${day}`;
    case 'yyyy-mm-dd hh:mm:ss':
      return `${year}-${month}-${day} ${hours}:${minutes}:${second}`;
    case 'yyyy/MM/dd HH:MM:SS':
      return `${year}/${month}/${day} ${hours}:${minutes}:${second}`;
    case 'hh:mm:ss':
      return `${hours}:${minutes}:${second}`;
    default:
      if (type) {
        console.error(`不支持 ${type} 类型日期格式化，请检查！`);
      }
      return `${year}-${month}-${day}`;
  }
};

/**
 * @param {String, Object} info 需要移除空格的值
 * @return {String, Object}
 */
export const removeSpace = (info) => {
  let newInfo = JSON.parse(JSON.stringify(info));
  const infoType = getValueType(newInfo);
  if (infoType === 'object') {
    const keys = Object.keys(newInfo);
    keys.forEach(key => {
      const valType = getValueType(newInfo[key]);
      if (valType === 'string') {
        newInfo[key] = (newInfo[key] && newInfo[key].trim) ? newInfo[key].trim() : '';
      } else if (valType === 'array' || valType === 'object') {
        newInfo[key] = removeSpace(newInfo[key]);
      }
    });
  }
  if (infoType === 'string') {
    newInfo = (newInfo && newInfo.trim) ? newInfo.trim() : '';
  }
  if (infoType === 'array') {
    newInfo = newInfo.map(item => {
      return removeSpace(item);
    });
  }
  return newInfo;
};

/**
 * @name: 43236
 * @description: 将下划线字符串转为驼峰
 * @return {String} 驼峰形式的字符串
 * @Date: 2021-12-17 14:02:12
 * @param s
 */
export const underlineToHump = (s) => {
  if (typeof s !== 'string') return s;
  if (s.indexOf('_') <= 0) return s;
  return s.replace(/_(\w)/g, (all, letter) => {
    return letter.toUpperCase();
  });
};

/**
 * @name: 43236
 * @description: 将下划线形式的 JSON对象 转为 驼峰形式的JSON对象
 * @return {Array | Object} 驼峰形式的JSON对象
 * @Date: 2021-12-17 14:03:04
 * @param obj
 */
export const jsonToHump = (obj) => {
  const objType = getValueType(obj);
  if (obj && (objType === 'array' || objType === 'object')) {
    obj = JSON.parse(JSON.stringify(obj));
  }

  if (objType === 'array') {
    obj = obj.map(item => {
      if (getValueType(item) === 'array' || getValueType(item) === 'object') {
        item = jsonToHump(item);
      }
      return item;
    });
  } else if (objType === 'object') {
    Object.keys(obj).forEach((key) => {
      const newKey = underlineToHump(key);
      if (newKey !== key) {
        obj[newKey] = obj[key];
        delete obj[key];
      }
      if (getValueType(obj[newKey]) === 'array' || getValueType(obj[newKey]) === 'object') {
        obj[newKey] = jsonToHump(obj[newKey]);
      }
    });
  }
  return obj;
};

/**
 * @name: 43236
 * @description: 将驼峰转为下划线字符串
 * @return {String} 下划线的字符串
 * @Date: 2021-12-17 14:04:20
 * @param s
 */
const humpToUnderline = (s) => {
  if (typeof s !== 'string') return s;
  if (!/[A-Z]/g.test(s)) return s;
  return s.replace(/([A-Z])/g, '_$1').toLowerCase();
};

/**
 * @name: 43236
 * @description: 将驼峰形式的JSON对象 转为 下划线形式JSON对象
 * @return {Array | Object} 下划线形式JSON对象
 * @Date: 2021-12-17 14:05:00
 * @param obj
 */
const jsonToUnderline = (obj) => {
  const objType = getValueType(obj);
  if (obj && (objType === 'array' || objType === 'object')) {
    obj = JSON.parse(JSON.stringify(obj));
  }
  if (objType === 'array') {
    obj = obj.map(item => {
      if (getValueType(item) === 'array' || getValueType(item) === 'object') {
        item = jsonToUnderline(item);
      }
      return item;
    });
  } else if (objType === 'object') {
    Object.keys(obj).forEach((key) => {
      const newKey = humpToUnderline(key);
      if (newKey !== key) {
        obj[newKey] = obj[key];
        delete obj[key];
      }
      if (getValueType(obj[newKey]) === 'array' || getValueType(obj[newKey]) === 'object') {
        obj[newKey] = jsonToUnderline(obj[newKey]);
      }
    });
  }
  return obj;
};

/**
    * @name: 43236
    * @description: 滚动至可视区域
    * @param {HTMLElement} scrollDom overflow：auto元素 父元素 （必须为相对定位，使得子元素offsetTop以滚动的元素为准）
    * @param {Number} toPos 滚动的位置
    * @param {Function} cb 滚动完成的回调函数
    * @Date: 2022-01-20 11:05:17
    */
export const scrollToView = (scrollDom, toPos, cb) => {
  let times = Date.now();
  const beginTime = Date.now();
  const beginValue = scrollDom.scrollTop;
  const rAF = window.requestAnimationFrame || function(func) {
    return setTimeout(func, 16);
  };
  const frameFunc = () => {
    const progress = (Date.now() - beginTime) / 500;
    if (progress < 1) {
      scrollDom.scrollTop = beginValue + ((toPos - beginValue) * easeInOutCubicAnimate(progress));
      rAF(frameFunc);
    } else {
      scrollDom.scrollTop = toPos;
      times = Date.now() - times;
      cb && cb(times);
    }
  };
  return rAF(frameFunc);
};

const easeInOutCubicAnimate = (value) => {
  return value < 0.5 ? cubicFn(value * 2) / 2 : 1 - cubicFn((1 - value) * 2) / 2;
};

const cubicFn = (value) => {
  return Math.pow(value, 3);
};

/**
  * @author 43236
  * @param {HTMLElement} container overflow: auto元素,即滚动区域的元素
  * @param {HTMLElement} selected 当前选中元素
  */
export function scrollIntoView(container, selected) {
  if (!selected) {
    container.scrollTop = 0;
    return;
  }

  const offsetParents = [];
  let pointer = selected.offsetParent;
  while (pointer && container !== pointer && container.contains(pointer)) {
    offsetParents.push(pointer);
    pointer = pointer.offsetParent;
  }
  const top = selected.offsetTop + offsetParents.reduce((prev, curr) => (prev + curr.offsetTop), 0); // 当前元素相对offsetParent的top位置,若该元素的offsetParent非container, 需加上该元素offsetParent的offsetTop值
  const bottom = top + selected.offsetHeight; // 当前选择元素底部(bottom)相对offsetParent的top位置
  const viewRectTop = container.scrollTop; // 可是区域的最小位置
  const viewRectBottom = viewRectTop + container.clientHeight; // 可视区域的最大位置
  // 当前元素不在可视区域内(top < viewRectTop | bottom > viewRectBottom)
  if (top < viewRectTop) {
    container.scrollTop = top;
  } else if (bottom > viewRectBottom) {
    container.scrollTop = bottom - container.clientHeight;
  }
}

/**
  * 43236  节流函数
  * @param {*} cb 回调函数
  * @param {*} delay 时间
  */
export const throttleFn = (cb, delay) => {
  let timer = null;
  delay = +delay || 1000;
  return () => {
    if (!timer) {
      cb && cb();
      timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
      }, delay);
    }
  };
};

/**
 * 43236  防抖函数
 * @param {*} cb 回调函数
 * @param {*} delay 时间
 * @param {*} delayType 类型
 * @returns
 */
export const debounceFn = (cb, delay, delayType) => {
  let timer = null;
  delay = +delay || 1000;
  delayType = delayType || 1;
  return () => {
    if (delayType === 1) {
      if (timer) clearTimeout(timer);
      timer = null;
      timer = setTimeout(() => {
        cb && cb();
        timer = null;
      }, delay);
    } else {
      if (timer) clearTimeout(timer);
      const callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, delay);
      if (callNow) {
        cb && cb();
      }
    }
  };
};

/**
 * 43236  获取随机字符串
 * @param {number} digit 字符串位数
 * @returns {string} random
 */
export const getRandom = (digit = 32) => {
  digit = +digit || 32;
  let randomStr = '';
  const charStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const rangeList = createArrayFn(digit);
  rangeList.forEach(_ => {
    randomStr += charStr.charAt(Math.floor(Math.random() * charStr.length));
  });
  return randomStr;
};

/**
 * 数据库列名转属性(下划线转驼峰)
 * @param columnName: string 数据库列名
 * @return string
 */
export const columnNameToFieldName = (columnName) => {
  let result = '';
  let upcaseFlag = false;
  if (!columnName || columnName === '') return columnName;
  for (let i = 0; i < columnName.length; i++) {
    const ch = columnName[i];
    if (ch === '_') {
      upcaseFlag = true;
    } else if (upcaseFlag) {
      result += ('' + ch).toUpperCase();
      upcaseFlag = false;
    } else {
      result += ch;
      upcaseFlag = false;
    }
  }
  return result;
};

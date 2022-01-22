const clone = (function() {
  const classof = function(o) {
    if (o === null) {
      return 'null'
    }
    if (o === undefined) {
      return 'undefined'
    }
    // 这里的Object.prototype.toString很可能用的就是Object.prototype.constructor.name
    // 这里使用Object.prototype.toString来生成类型字符串
    const className = Object.prototype.toString.call(o).slice(8, -1)
    return className
  }

  // 这里这个变量我们用来存储已经保存过的属性，目的在于处理循环引用的问题
  let references = null

  // 遇到不同类型的对象的处理方式
  const handlers = {
    'RegExp': (reg) => {
      let flags = ''
      flags += reg.global ? 'g' : ''
      flags += reg.multiline ? 'm' : ''
      flags += reg.ignoreCase ? 'i' : ''
      return new RegExp(reg.source, flags)
    },
    'Date': (date) => {
      return new Date(+date)
    },
    'Array': (arr, shallow) => {
      const newArr = []
      let i = 0
      for (i = 0; i < arr.length; i++) {
        if (shallow) {
          newArr[i] = arr[i]
        } else {
          if (references.indexOf(arr[i]) !== -1) {
            continue
          }
          const handler = handlers[classof(arr[i])]
          if (handler) {
            references.push(arr[i])
            newArr[i] = handler(arr[i], false)
          } else {
            newArr[i] = arr[i]
          }
        }
      }
      return newArr
    },
    // 正常对象的处理 第二个参数为是否做浅拷贝
    'Object': (obj, shallow) => {
      let newObj = {}, prop, handler
      for (prop in obj) {
        // 关于原型中属性的处理太过复杂，我们这里暂时不做处理
        // 所以只对对象本身的属性做拷贝
        if (obj.hasOwnProperty(prop)) {
          if (shallow) {
            newObj[prop] = obj[prop]
          } else {
            // 这里还是处理循环引用的问题
            if (references.indexOf(obj[prop]) !== -1) {
              continue
            }

            handler = handlers[classof(obj[prop])]
            // 如果没有对应的处理方式，那么就直接复制
            if (handler) {
              references.push(obj[prop])
              newObj[prop] = handler(obj[prop], false)
            } else {
              newObj[prop] = obj[prop]
            }
          }
        }
      }
      return newObj
    }
  }

  return function(obj, shallow) {
    // 首先重置我们用来处理循环引用的这个变量
    references = []
    shallow = shallow === undefined
    const handler = handlers[classof(obj)]
    return handler ? handler(obj, shallow) : obj
  }
}())

export const downloadFile = (url: string, fileName = '') => {
  const ajax = new XMLHttpRequest()
  ajax.open('GET', url, true)
  ajax.responseType = 'blob'
  ajax.onload = function(oEvent) {
    const content = ajax.response
    const a = document.createElement('a')
    const fileType = getFileTypeOrName(url)
    a.download = fileName ? `${fileName}.${fileType}` : `${getRandomStr()}.${fileType}`
    a.style.display = 'none'
    const blob = new Blob([content])
    a.href = URL.createObjectURL(blob)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
  ajax.send()
}

export const getFileTypeOrName = (name: string, type = 'type') => {
  const nameList = name.split('.')
  const fType = nameList[nameList.length - 1]
  const newNm = nameList[0]
  return type === 'type' ? fType : newNm
}

export const getRandomStr = (isDate = true) => {
  const str = Math.random().toString(36).substr(2)
  const times = new Date().getTime()
  return isDate ? `${times}${str}` : str
}


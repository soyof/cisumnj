/* istanbul ignore next */
export const on = (function() {
  // @ts-ignore
  if (document.addEventListener) {
    return function(element: HTMLElement, event: string, handler: any) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  }
  return function(element: HTMLElement, event: string, handler: any) {
    if (element && event && handler) {
      // @ts-ignore
      element.attachEvent('on' + event, handler)
    }
  }
})()

/* istanbul ignore next */
export const off = (function() {
  // @ts-ignore
  if (document.removeEventListener) {
    return function(element: HTMLElement, event: string, handler: any) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  }
  return function(element: HTMLElement, event: string, handler: any) {
    if (element && event) {
      // @ts-ignore
      element.detachEvent('on' + event, handler)
    }
  }
})()

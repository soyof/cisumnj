export default {
  mounted(el: any, binding: any) {
    let mouseDom = el
    if (binding.value) {
      mouseDom = el.querySelector(binding.value)
    }
    // 头部加上可拖动cursor
    mouseDom.style.cursor = 'move'
    mouseDom.onmousedown = (e: any) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const body: any = document.querySelector('body')
      const cw = body.clientWidth
      const ch = body.clientHeight
      const curW = el.clientWidth
      const curH = el.clientHeight
      const disX = e.clientX - el.offsetLeft
      const disY = e.clientY - el.offsetTop
      // 获取到的值带px 正则匹配替换
      // const styL = 0
      // const styT = 0
      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      // if (sty.left.includes('%')) {
      //   styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)
      //   styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)
      // } else {
      //   styL = +sty.left.replace(/\px/g, '')
      //   styT = +sty.top.replace(/\px/g, '')
      // }
      document.onmousemove = function(e) {
        // 通过事件委托，计算移动的距离
        let l = e.clientX - disX
        let t = e.clientY - disY
        if (l > cw - curW) {
          l = cw - curW
        }
        if (t > ch - curH) {
          t = ch - curH
        }
        if (l < 0) {
          l = 0
        }
        if (t < 0) {
          t = 0
        }
        // 移动当前元素
        el.style.left = `${l}px`
        el.style.top = `${t}px`
        // 将此时的位置传出去
        // binding.value({x:e.pageX,y:e.pageY})
      }
      document.onmouseup = function(e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}

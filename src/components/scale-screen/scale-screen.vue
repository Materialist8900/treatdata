<template>
  <div class="screen-wrapper" ref="screenWrapper" :style="wrapperStyle">
    <slot></slot>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick, defineProps } from 'vue'
// 定义组件props
const props = defineProps({
  width: { type: [String, Number], default: 1920 },
  height: { type: [String, Number], default: 1080 },
  fullScreen: { type: Boolean, default: false },
  autoScale: { type: [Object, Boolean], default: true },
  selfAdaption: { type: Boolean, default: true },
  delay: { type: Number, default: 500 },
  boxStyle: { type: Object, default: () => ({}) },
  wrapperStyle: { type: Object, default: () => ({}) },
})

const screenWrapper = ref(null)
const currentWidth = ref(0)
const currentHeight = ref(0)
const originalWidth = ref(0)
const originalHeight = ref(0)
const observer = ref(null)

// 防抖函数
const debounce = (fn, delay) => {
  let timer = null
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

/**
 * 监听窗口调整大小的处理函数
 */
const onResize = debounce(() => {
  resize()
}, props.delay)
/**
 * 初始化尺寸
 */
const initSize = () => {
  return new Promise(resolve => {
    screenWrapper.value.parentNode.style.overflow = 'hidden'
    screenWrapper.value.parentNode.scrollLeft = 0
    screenWrapper.value.parentNode.scrollTop = 0

    nextTick(() => {
      // 获取大屏真实尺寸
      console.log('Props width and height:', props.width, props.height)
      if (props.width && props.height) {
        currentWidth.value = props.width
        currentHeight.value = props.height
      } else {
        currentWidth.value = screenWrapper.value.clientWidth
        currentHeight.value = screenWrapper.value.clientHeight
      }
      // 获取画布尺寸
      if (!originalHeight.value || !originalWidth.value) {
        originalWidth.value = window.screen.width
        originalHeight.value = window.screen.height
      }
      console.log('Initial size:', currentWidth.value, currentHeight.value)
      resolve()
    })
  })
}
/**
 * 更新尺寸
 */
const updateSize = () => {
  if (currentWidth.value && currentHeight.value) {
    screenWrapper.value.style.width = `${currentWidth.value}px`
    screenWrapper.value.style.height = `${currentHeight.value}px`
  } else {
    screenWrapper.value.style.width = `${originalWidth.value}px`
    screenWrapper.value.style.height = `${originalHeight.value}px`
  }
}
//处理自动缩放
const handleAutoScale = scale => {
  if (!props.autoScale) return
  const domWidth = screenWrapper.value.clientWidth
  const domHeight = screenWrapper.value.clientHeight
  const currentWidth = document.body.clientWidth
  const currentHeight = document.body.clientHeight
  screenWrapper.value.style.transform = `scale(${scale},${scale}) `
  let mx = Math.max((currentWidth - domWidth * scale) / 2, 0)
  let my = Math.max((currentHeight - domHeight * scale) / 2, 0)
  if (typeof props.autoScale === 'object') {
    !props.autoScale.x && (mx = 0)
    !props.autoScale.y && (my = 0)
  }
  screenWrapper.value.style.margin = `${my}px ${mx}px`
}
/**
 * 更新缩放
 */
// const updateScale = () => {
//   const currentWidth = document.body.clientWidth
//   const currentHeight = document.body.clientHeight
//   console.log('Current window size:', currentWidth, currentHeight)
//   const realWidth = currentWidth.value || originalWidth.value
//   const realHeight = currentHeight.value || originalHeight.value
//   const widthScale = currentWidth / realWidth
//   const heightScale = currentHeight / realHeight
//   // 若要铺满全屏，则按照各自比例缩放
//   if (props.fullScreen) {
//     screenWrapper.value.style.transform = `scale(${widthScale},${heightScale})`
//     return false
//   }
//   // 按照宽高最小比例进行缩放
//   const scale = Math.min(widthScale, heightScale)
//   console.log('Scale:', scale)
//   handleAutoScale(scale)
// }
const updateScale = () => {
  // 获取当前窗口的宽高
  const currentBodyWidth = document.body.clientWidth
  const currentBodyHeight = document.body.clientHeight

  // 打印调试信息
  console.log('Current Body Size:', currentBodyWidth, currentBodyHeight)
  console.log('Current Width:', currentWidth.value, 'Original Width:', originalWidth.value)
  console.log('Current Height:', currentHeight.value, 'Original Height:', originalHeight.value)

  // 如果 currentWidth 和 currentHeight 是无效值，使用 originalWidth 和 originalHeight
  const realWidth = currentWidth.value || originalWidth.value
  const realHeight = currentHeight.value || originalHeight.value

  // 获取缩放比例
  const widthScale = currentBodyWidth / realWidth
  const heightScale = currentBodyHeight / realHeight

  console.log('Width Scale:', widthScale, 'Height Scale:', heightScale)

  if (props.fullScreen) {
    screenWrapper.value.style.transform = `scale(${widthScale}, ${heightScale})`
    return
  }

  // 按照宽高最小比例进行缩放
  const scale = Math.min(widthScale, heightScale)
  handleAutoScale(scale)
}
/**
 * 清除监听器
 */
const clearListener = () => {
  window.removeEventListener('resize', onResize)
}
/**
 * 添加监听器
 */
const addListener = () => {
  window.addEventListener('resize', onResize)
}
/**
 * 清除样式
 */
const clearStyle = () => {
  const screenWrapper = screenWrapper.value
  screenWrapper.parentNode.style.overflow = 'auto'
  screenWrapper.style = ''
}
/**
 * 调整大小
 */
const resize = async () => {
  if (!props.selfAdaption) {
    return
  }
  await initSize()
  updateSize()
  updateScale()
}
// 挂载后进行初始化操作
onMounted(() => {
  if (props.selfAdaption) {
    resize()
    addListener()
  }
})
// 销毁前清除监听器
onBeforeUnmount(() => {
  clearListener()
})
// 监听 selfAdaption 属性变化
watch(
  () => props.selfAdaption,
  val => {
    if (val) {
      resize()
      addListener()
    } else {
      clearListener()
      clearStyle()
    }
  }
)
</script>

<style lang="less" scoped>
.screen-box {
  overflow: hidden;
  background-size: 100% 100%;
  background: #000;
  width: 100vw;
  height: 100vh;
}

.screen-wrapper {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 500ms;
  position: relative;
  overflow: hidden;
  z-index: 100;
  transform-origin: left top;
}
</style>

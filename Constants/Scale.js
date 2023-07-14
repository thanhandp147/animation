import { Dimensions } from 'react-native'
const window = Dimensions.get('window')
const _width = window.width > window.height ? window.height : window.width
const _height = window.width > window.height ? window.width : window.height

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375
const guidelineBaseHeight = 812

const _widthScale = size => (size / guidelineBaseWidth) * _width
const _heightScale = size => (size / guidelineBaseHeight) * _height


const scale = size => (_width / guidelineBaseWidth) * size
const _moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor

export { _widthScale, _heightScale, _width, _height, _moderateScale }

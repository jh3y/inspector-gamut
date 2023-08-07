import ColorUtils from 'colorjs.io'
// @ts-ignore-next-line
import ColorBasic from 'color'

const generateColor = (colorString: string) => {
  const newColor = new ColorUtils(colorString)
  const basicColor = new ColorBasic(colorString)
  return {
    hsl: newColor.to('hsl').toString(),
    oklab: newColor.to('oklab').toString(),
    oklch: newColor.to('oklch').toString(),
    p3: newColor.to('p3').toString(),
    hex: basicColor.hex().toString(),
    rgb: basicColor.rgb().toString(),
  }
}

const palettes = [
  'base',
  'triadic_complementary',
  'analogous',
  'split_complementary',
  'tetradic',
  'complementary',
  'monochromatic',
]

const convertColor = (data: ColorData) => {
  const converted: ConvertedColorData = {
    base: [],
    triadic_complementary: [],
    analogous: [],
    split_complementary: [],
    tetradic: [],
    complementary: [],
  }
  palettes.forEach((palette: string) => {
    converted[palette as keyof ColorData] = data[palette as keyof ColorData].map(colorString => generateColor(colorString))
  })
  return converted
}

export default convertColor
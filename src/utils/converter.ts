import ColorUtils from 'colorjs.io'
// @ts-ignore-next-line
import ColorBasic from 'color'

const newSpaceSanitize = (color: ColorUtils) => color.coords.map(c => c.toFixed(4)).join(' ')

const generateColor = (colorString: string) => {
  const newColor = new ColorUtils(colorString)
  const basicColor = new ColorBasic(colorString)

  const hsl = newColor.to('hsl')
  const oklab = newColor.to('oklab')
  const oklch = newColor.to('oklch')
  const p3 = newColor.to('p3')

  const conversion = {
    hsl: `hsl(${hsl.coords[0]} ${hsl.coords.slice(1).map(c => `${c}%`).join(' ')})`,
    oklab: `oklab(${newSpaceSanitize(oklab)})`,
    oklch: `oklch(${newSpaceSanitize(oklch)})`,
    p3: `color(display-p3 ${newSpaceSanitize(p3)})`,
    hex: basicColor.hex().toString(),
    rgb: basicColor.rgb().toString(),
    dark: basicColor.isDark(),
  }

  // Weirdness where colors aren't being generated on the server...
  // https://github.com/LeaVerou/color.js/issues/260
  // Hence doing the weird coord stuff above...
  return conversion 
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
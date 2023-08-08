interface ColorData {
  base: string[]
  triadic_complementary: string[]
  analogous: string[]
  split_complementary: string[]
  tetradic: string[]
  complementary: string[]
}

interface Color {
  hsl: string
  oklab: string
  oklch: string
  hex: string
  rgb: string
  p3: string
  dark?: boolean
}

interface ConvertedColorData {
  base: Color[]
  triadic_complementary: Color[]
  analogous: Color[]
  split_complementary: Color[]
  tetradic: Color[]
  complementary: Color[]
}
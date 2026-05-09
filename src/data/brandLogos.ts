import { DEALER_BRANDS } from '@/data/constants'

const brandLogo = (brand: string) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="220" height="44" viewBox="0 0 220 44">
      <text x="110" y="28" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-size="20" font-weight="700" fill="#0d3b6e">${brand}</text>
    </svg>
  `
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

export const dealerBrandLogos = DEALER_BRANDS.map((brand) => ({
  src: brandLogo(brand),
  alt: brand,
  width: 132,
  height: 26,
}))

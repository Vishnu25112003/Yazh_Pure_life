import { COMPANY } from '@/data/constants'

export const buildWhatsAppURL = (message: string): string => {
  return `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(message)}`
}

export const buildProductWhatsAppURL = (productName: string): string => {
  return buildWhatsAppURL(`Hi, I am interested in your product: ${productName}. Please provide more details.`)
}

export const openWhatsApp = (message: string): void => {
  window.open(buildWhatsAppURL(message), '_blank', 'noopener,noreferrer')
}

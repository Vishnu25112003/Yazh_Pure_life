export type ProductCategory = 'all' | 'home' | 'commercial' | 'hotcold'

export interface Product {
  id: number
  name: string
  type: string
  stages?: number
  storage: string
  price: number
  mrp?: number
  category: Exclude<ProductCategory, 'all'>
  isISI: boolean
  image: string
  features: string[]
}

export interface Service {
  id: number
  title: string
  description: string
  icon: string
}

export interface Branch {
  name: string
  address: string
  mapEmbedUrl?: string
}

export interface NavLink {
  label: string
  path: string
}

export interface Stat {
  value: number
  suffix: string
  label: string
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
}

export interface EnquiryFormData {
  name: string
  mobile: string
  email: string
  message: string
}

export interface GalleryImage {
  src: string
  width: number
  height: number
  alt: string
  category: ProductCategory
}

export type ButtonVariant = 'primary' | 'whatsapp' | 'download' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

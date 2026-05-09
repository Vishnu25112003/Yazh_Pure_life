import type { Branch, NavLink, SocialLink, Stat } from '@/types'

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'Company', path: '/company' },
  { label: 'Products', path: '/products' },
  { label: 'Services', path: '/services' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact Us', path: '/contact' },
]

export const COMPANY = {
  name: 'Yazh Pure Life',
  tagline: 'RO Water Purifier - Sales & Services',
  sub: 'Domestic & Commercial',
  cert: 'ISO 9001:2015 Certified',
  rating: 4.8,
  reviews: 1014,
  phone1: '+91-97865 69973',
  phone2: '+91-80980 94111',
  whatsapp: '919786569973',
  email: 'yazhpurelife@gmail.com',
  website: 'www.yazhpurelife.in',
  address: 'No.19, Venkateshwara Nagar, Teachers Colony, Kadappa Road, Kolathur, Chennai, Tamil Nadu - 600099',
  mapUrl: 'https://maps.app.goo.gl/pCozD5Ne714YkgeV6',
}

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'Facebook', url: 'https://www.facebook.com/yazhpurelifeRO/', icon: 'Facebook' },
  { platform: 'Twitter', url: 'https://twitter.com/LifeYazh', icon: 'Twitter' },
  { platform: 'YouTube', url: 'https://www.youtube.com/channel/UC_T8fMK5YR-Mky3GwYTCT3g', icon: 'Youtube' },
  { platform: 'WhatsApp', url: 'https://wa.me/919786569973', icon: 'MessageCircle' },
]

export const DEALER_BRANDS = ['Aquaguard', 'Kent', 'Blue Star', 'Whirlpool', 'LG', 'Genpure', 'Prolife']

export const BRANCHES: Branch[] = [
  { name: 'Head Office', address: 'No.19, Venkateshwara Nagar, Teachers Colony, Kadappa Road, Kolathur, Chennai-600099' },
  { name: 'Kolathur', address: 'Kolathur, Chennai' },
  { name: 'Avadi', address: 'Avadi, Chennai' },
  { name: 'Tada', address: 'Tada, Andhra Pradesh' },
]

export const STATS: Stat[] = [
  { value: 5000, suffix: '+', label: 'Happy Customers' },
  { value: 13, suffix: '+', label: 'Products' },
  { value: 10, suffix: '+', label: 'Years Experience' },
  { value: 3, suffix: '', label: 'Branch Offices' },
]

import type { Product } from '@/types'
import { COMPANY } from '@/data/constants'

const drawRoundedRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

const drawText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
  const words = text.split(' ')
  let line = ''
  let currentY = y

  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, currentY)
      line = word
      currentY += lineHeight
    } else {
      line = testLine
    }
  })

  if (line) ctx.fillText(line, x, currentY)
  return currentY
}

const drawProductVisual = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  const body = ctx.createLinearGradient(x, y, x + 260, y + 320)
  body.addColorStop(0, '#ffffff')
  body.addColorStop(0.58, '#f7fcff')
  body.addColorStop(1, '#c9e6fb')

  drawRoundedRect(ctx, x + 58, y + 18, 150, 260, 34)
  ctx.fillStyle = body
  ctx.fill()
  ctx.strokeStyle = 'rgba(21,101,192,0.18)'
  ctx.lineWidth = 4
  ctx.stroke()

  const panel = ctx.createLinearGradient(x + 78, y + 52, x + 188, y + 112)
  panel.addColorStop(0, '#00bcd4')
  panel.addColorStop(1, '#1565c0')
  drawRoundedRect(ctx, x + 78, y + 52, 110, 58, 22)
  ctx.fillStyle = panel
  ctx.fill()

  ctx.fillStyle = '#ffffff'
  ctx.font = '700 18px Poppins'
  ctx.textAlign = 'center'
  ctx.fillText('YPL', x + 133, y + 88)

  ctx.beginPath()
  ctx.arc(x + 133, y + 200, 36, 0, Math.PI * 2)
  ctx.fillStyle = '#ffffff'
  ctx.fill()
  ctx.strokeStyle = '#42a5f5'
  ctx.lineWidth = 9
  ctx.stroke()

  ctx.fillStyle = 'rgba(10,22,40,0.14)'
  ctx.beginPath()
  ctx.ellipse(x + 133, y + 300, 92, 14, 0, 0, Math.PI * 2)
  ctx.fill()
}

export const downloadProductCard = (product: Product): void => {
  const canvas = document.createElement('canvas')
  canvas.width = 1200
  canvas.height = 720
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.textBaseline = 'alphabetic'
  const bg = ctx.createLinearGradient(0, 0, 1200, 720)
  bg.addColorStop(0, '#f8fcff')
  bg.addColorStop(0.52, '#eef8ff')
  bg.addColorStop(1, '#d8efff')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, 1200, 720)

  ctx.fillStyle = 'rgba(0,188,212,0.12)'
  ctx.beginPath()
  ctx.arc(1010, 92, 190, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = 'rgba(21,101,192,0.09)'
  ctx.beginPath()
  ctx.arc(90, 660, 220, 0, Math.PI * 2)
  ctx.fill()

  drawRoundedRect(ctx, 48, 42, 1104, 636, 28)
  ctx.fillStyle = '#ffffff'
  ctx.fill()
  ctx.strokeStyle = 'rgba(187,222,251,0.8)'
  ctx.lineWidth = 2
  ctx.stroke()

  const header = ctx.createLinearGradient(48, 42, 1152, 42)
  header.addColorStop(0, '#0a1628')
  header.addColorStop(0.58, '#0d3b6e')
  header.addColorStop(1, '#1565c0')
  drawRoundedRect(ctx, 48, 42, 1104, 116, 28)
  ctx.fillStyle = header
  ctx.fill()

  ctx.fillStyle = '#ffffff'
  ctx.textAlign = 'left'
  ctx.font = '700 34px Poppins'
  ctx.fillText('Yazh Pure Life', 92, 102)
  ctx.font = '500 17px Poppins'
  ctx.fillStyle = '#bbdefb'
  ctx.fillText(`${COMPANY.tagline} | ${COMPANY.sub}`, 94, 132)

  ctx.textAlign = 'right'
  ctx.font = '600 18px Poppins'
  ctx.fillStyle = '#ffffff'
  ctx.fillText('Product Information Card', 1108, 91)
  ctx.font = '500 15px Poppins'
  ctx.fillStyle = '#bbdefb'
  ctx.fillText(COMPANY.cert, 1108, 121)

  drawRoundedRect(ctx, 92, 188, 326, 404, 24)
  ctx.fillStyle = '#f0f8ff'
  ctx.fill()
  ctx.strokeStyle = '#d6ecff'
  ctx.lineWidth = 2
  ctx.stroke()
  drawProductVisual(ctx, 126, 228)

  if (product.isISI) {
    drawRoundedRect(ctx, 306, 210, 72, 34, 17)
    ctx.fillStyle = '#ffd700'
    ctx.fill()
    ctx.fillStyle = '#0a1628'
    ctx.font = '800 16px Poppins'
    ctx.textAlign = 'center'
    ctx.fillText('ISI', 342, 233)
  }

  ctx.textAlign = 'left'
  ctx.fillStyle = '#1565c0'
  ctx.font = '700 17px Poppins'
  ctx.fillText('PRODUCT MODEL', 462, 214)
  ctx.fillStyle = '#0a1628'
  ctx.font = '700 40px Poppins'
  drawText(ctx, product.name, 462, 266, 420, 46)

  ctx.fillStyle = '#0d3b6e'
  ctx.font = '600 21px Poppins'
  drawText(ctx, product.type, 462, 322, 430, 30)

  drawRoundedRect(ctx, 928, 198, 176, 88, 20)
  ctx.fillStyle = '#f0f8ff'
  ctx.fill()
  ctx.fillStyle = '#1565c0'
  ctx.textAlign = 'center'
  ctx.font = '700 32px Poppins'
  ctx.fillText(`₹${product.price.toLocaleString('en-IN')}`, 1016, 250)
  if (product.mrp) {
    ctx.fillStyle = '#78909c'
    ctx.font = '500 17px Poppins'
    ctx.fillText(`MRP ₹${product.mrp.toLocaleString('en-IN')}`, 1016, 274)
    ctx.strokeStyle = '#78909c'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(972, 267)
    ctx.lineTo(1060, 267)
    ctx.stroke()
  }

  const details = [
    ['Purification', product.stages ? `${product.stages} Stage` : 'RO Hot & Cold'],
    ['Storage', product.storage],
    ['Category', product.category === 'home' ? 'Home Use' : product.category === 'commercial' ? 'Commercial' : 'Hot & Cold'],
    ['Guarantee', 'One Year Guarantee'],
  ]

  details.forEach(([label, value], index) => {
    const x = 462 + (index % 2) * 244
    const y = 382 + Math.floor(index / 2) * 84
    drawRoundedRect(ctx, x, y, 210, 58, 14)
    ctx.fillStyle = '#f8fcff'
    ctx.fill()
    ctx.fillStyle = '#607d8b'
    ctx.font = '500 13px Poppins'
    ctx.textAlign = 'left'
    ctx.fillText(label.toUpperCase(), x + 16, y + 22)
    ctx.fillStyle = '#0a1628'
    ctx.font = '600 16px Poppins'
    drawText(ctx, value, x + 16, y + 45, 178, 20)
  })

  drawRoundedRect(ctx, 462, 556, 642, 76, 18)
  ctx.fillStyle = '#eef8ff'
  ctx.fill()
  ctx.fillStyle = '#0a1628'
  ctx.font = '700 17px Poppins'
  ctx.fillText('Key Features', 486, 584)
  ctx.font = '500 14px Poppins'
  ctx.fillStyle = '#0d3b6e'
  drawText(ctx, product.features.slice(0, 3).join('  |  '), 486, 612, 586, 21)

  ctx.fillStyle = '#1565c0'
  ctx.fillRect(48, 646, 1104, 32)
  ctx.fillStyle = '#ffffff'
  ctx.font = '600 15px Poppins'
  ctx.textAlign = 'center'
  ctx.fillText(`${COMPANY.phone1}  |  ${COMPANY.phone2}  |  ${COMPANY.email}  |  ${COMPANY.website}`, 600, 668)

  const link = document.createElement('a')
  link.download = `YPL_${product.name.replace(/\s+/g, '_')}_Card.png`
  link.href = canvas.toDataURL('image/png')
  link.click()
}

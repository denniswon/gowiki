import { shade, tint, transparentize } from 'polished'

/** Apply alpha level 0.1 = almost transparent */
export const alpha = (alphaAmount: number, color: string) => transparentize(1 - alphaAmount, color)

/** Add white to color. 0.9 = almost white  */
export const whiten = (amount: number, color: string) => tint(amount, color)

/** Add black to color. 0.9 = almost black  */
export const blacken = (amount: number, color: string) => shade(amount, color)

import { defaultBreakpoints } from "./styledSystems";

const { isArray } = Array

const DEFAULT_MEDIA_KEY = 'base'

export const is = (n: any) => n !== undefined && n !== null
export const isNum = (n: any): boolean => typeof n === 'number' && !isNaN(n)
export const parseUnit = (n: number | string) => isNum(n) ? n + 'px' : n
export const isNegative = (n: number) => n < 0
export const createMediaQuery = (n: number | string) => `@media screen and (max-width: ${parseUnit(n)})`

export const defaultBreakpointsObject = {
  sm: defaultBreakpoints[0],
  md: defaultBreakpoints[1],
  lg: defaultBreakpoints[2],
}

export enum MediaValues {
  base = 'base',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xlg = 'xlg',
}
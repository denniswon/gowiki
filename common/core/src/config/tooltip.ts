export class TooltipAction {
  label?: string

  sublabel?: string

  description?: string

  icon?: string

  iconUrl?: string

  iconColor?: string

  endIcon?: string

  command?: string

  args?: any

  enabled?: boolean

  highlight?: boolean

  compact?: boolean

  type?: TooltipActionType

  value?: number

}

export enum TooltipActionType {
  TITLE,
  SEPARATOR,
  SLIDER
}

export type TooltipUser = {
  id: string

  name: string

  nickname: string

  profileImg?: string

  inCall?: boolean

  agent?: string

  idleMinutes?: number

  dnd?: boolean

  limited?: boolean

  timezone?: string

  collapsed?: boolean

  offline?: boolean

}

export enum TooltipType {
  USER = 'user',
  MENU = 'menu',
}

export enum ToastSubtype {
  WARNING = 'warning',
  INFO = 'info',
  ONBOARDING = 'onbo',
  ERROR = 'error'
}

export enum ToastPriority {
  HIGH = 3,
  LOW = 1,
  ZERO = 0
}

export enum TooltipTheme {
  LIGHT = 'light',
  DARK = 'dark'
}


export class TooltipData {
  public type: TooltipType

  public pos: 'h' | 'v'

  public orientation?: 'above' | 'below' | 'left' | 'right'

  public dims?: { width: number; height: number }

  public subtype?: string

  public target?: { width: number, height: number, left: number, right: number, top: number, bottom: number }

  public user?: TooltipUser

  public actions?: TooltipAction[]

  public message?: string

  public bounds?: any

  public theme?: TooltipTheme

  public title?: string

}

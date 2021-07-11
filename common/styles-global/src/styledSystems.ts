type UnitValue = (string | number) & (string | number | string[] | number[])
type StringValue = (string | string[])
type NumberValue = number | number[]

// based on styled-system 4.1.1

export const defaultBreakpoints = [40, 52, 64].map(n => n + 'em')

const cloneFunction = fn => (...args) => fn(...args)

const get = (obj, ...paths) => {
  const value = paths.reduce((a, path) => {
    if (is(a)) return a
    const keys = typeof path === 'string' ? path.split('.') : [path]
    return keys.reduce((a, key) => (a && is(a[key]) ? a[key] : null), obj)
  }, null)
  return is(value) ? value : paths[paths.length - 1]
}

const themeGet = (path, fallback = null) => props =>
  get(props.theme, path, fallback)

const is = n => n !== undefined && n !== null

const isObject = n => typeof n === 'object' && n !== null

const num = n => typeof n === 'number' && !isNaN(n)

const px = n => (num(n) && n !== 0 ? n + 'px' : n)

const createMediaQuery = n => `@media screen and (min-width: ${px(n)})`

const getValue = (n, scale) => get(scale, n)

type StyleProps = {
  prop: string,
  cssProperty?: string,
  alias?: string,
  key?: string,
  transformValue?: any,
  scale?: any,
}
const style = ({
  prop,
  cssProperty,
  alias,
  key,
  transformValue = getValue,
  scale: defaultScale = {},
}: StyleProps) => {
  const property = cssProperty || prop
  const func = props => {
    const value = get(props, prop, alias, null)
    if (!is(value)) return null
    const scale = get(props.theme, key, defaultScale)
    const createStyle = n =>
      is(n)
        ? {
          [property]: transformValue(n, scale),
        }
        : null

    if (!isObject(value)) return createStyle(value)

    const breakpoints = get(props.theme, 'breakpoints', defaultBreakpoints)

    const styles = []
    if (Array.isArray(value)) {
      styles.push(createStyle(value[0]))
      for (let i = 1; i < value.slice(0, breakpoints.length + 1).length; i++) {
        const rule = createStyle(value[i])
        if (rule) {
          const media = createMediaQuery(breakpoints[i - 1])
          styles.push({ [media]: rule })
        }
      }
    } else {
      for (let key in value) {
        const breakpoint = breakpoints[key]
        const media = createMediaQuery(breakpoint)
        const rule = createStyle(value[key])
        if (!breakpoint) {
          styles.unshift(rule)
        } else {
          styles.push({ [media]: rule })
        }
      }
      styles.sort()
    }

    return styles
  }

  return func
}

const compose = (...funcs) => {
  const func = props => {
    const n = funcs.map(fn => fn(props)).filter(Boolean)
    return n
  }

  return func
}

const mapProps = mapper => func => {
  const next = props => func(mapper(props))
  for (const key in func) {
    next[key] = func[key]
  }
  return next
}

// space
const spaceScale = [0, 4, 8, 16, 32, 64, 128, 256, 512]

const getSpace = (n, scale) => {
  if (!num(n)) {
    return px(get(scale, n, n))
  }

  const isNegative = n < 0
  const absolute = Math.abs(n)
  const value = get(scale, absolute)
  if (!num(value)) {
    return isNegative ? '-' + value : value
  }
  return px(value * (isNegative ? -1 : 1))
}

const margin = style({
  prop: 'margin',
  alias: 'm',
  key: 'space',
  transformValue: getSpace,
  // scale: spaceScale,
})

const marginTop = style({
  prop: 'marginTop',
  alias: 'mt',
  key: 'space',
  transformValue: getSpace,
  // scale: spaceScale,
})

const marginBottom = style({
  prop: 'marginBottom',
  alias: 'mb',
  key: 'space',
  transformValue: getSpace,
  // scale: spaceScale,
})

const marginLeft = style({
  prop: 'marginLeft',
  alias: 'ml',
  key: 'space',
  transformValue: getSpace,
  // scale: spaceScale,
})

const marginRight = style({
  prop: 'marginRight',
  alias: 'mr',
  key: 'space',
  transformValue: getSpace,
  // scale: spaceScale,
})

const padding = style({
  prop: 'padding',
  alias: 'p',
  key: 'space',
  transformValue: getSpace,
  // scale: spaceScale,
})

const paddingTop = style({
  prop: 'paddingTop',
  alias: 'pt',
  key: 'space',
  transformValue: getSpace,
  // scale: spaceScale,
})

const paddingBottom = style({
  prop: 'paddingBottom',
  alias: 'pb',
  key: 'space',
  transformValue: getSpace,
  // scale: spaceScale,
})

const paddingLeft = style({
  prop: 'paddingLeft',
  alias: 'pl',
  key: 'space',
  transformValue: getSpace,
  // scale: spaceScale,
})

const paddingRight = style({
  prop: 'paddingRight',
  alias: 'pr',
  key: 'space',
  transformValue: getSpace,
  // scale: spaceScale,
})

export const spacing = mapProps(props => ({
  ...props,
  mt: is(props.mv) ? props.mv : props.mt,
  mb: is(props.mv) ? props.mv : props.mb,
  ml: is(props.mh) ? props.mh : props.ml,
  mr: is(props.mh) ? props.mh : props.mr,
  pt: is(props.pv) ? props.pv : props.pt,
  pb: is(props.pv) ? props.pv : props.pb,
  pl: is(props.ph) ? props.ph : props.pl,
  pr: is(props.ph) ? props.ph : props.pr,
}))(
  compose(
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    padding,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight
  )
)

type SpacingProps = {
  m?: UnitValue,
  mh?: UnitValue,
  mv?: UnitValue,
  mt?: UnitValue,
  mr?: UnitValue,
  mb?: UnitValue,
  ml?: UnitValue,

  p?: UnitValue,
  ph?: UnitValue,
  pv?: UnitValue,
  pt?: UnitValue,
  pr?: UnitValue,
  pb?: UnitValue,
  pl?: UnitValue,
}

// typography

const getPx = (n, scale) => px(get(scale, n))

const fontSize = style({
  prop: 'fontSize',
  key: 'fontSizes',
  alias: 'fs',
  transformValue: getPx,
  // scale: [12, 14, 16, 20, 24, 32, 48, 64, 72],
})

const fontFamily = style({
  prop: 'fontFamily',
  key: 'fonts',
})

const fontWeight = style({
  prop: 'fontWeight',
  alias: 'weight',
  key: 'fontWeights',
})

const lineHeight = style({
  prop: 'lineHeight',
  key: 'lineHeights',
  alias: 'lh',
})

// using quickProps
// const textAlign = style({
//   prop: 'textAlign',
// })

const fontStyle = style({
  prop: 'fontStyle',
})

const letterSpacing = style({
  prop: 'letterSpacing',
  key: 'letterSpacings',
  alias: 'ls',
  transformValue: getPx,
})

export const typography = compose(
  fontSize,
  fontFamily,
  fontWeight,
  lineHeight,
  fontStyle,
  letterSpacing,
)

export type TypographyProps = {
  fontSize?: UnitValue,
  fontFamily?: string & StringValue,
  fontWeight?: (string | number) & NumberValue,
  lineHeight?: StringValue,
  fontStyle?: (string | number) & StringValue,
  letterSpacing?: (string | number) & StringValue,
}


// layout

const display = style({
  prop: 'display',
})

const getWidth = (n, scale) => (!num(n) || n > 1 ? px(n) : n * 100 + '%')

const width = style({
  prop: 'width',
  key: 'widths',
  alias: 'w',
  transformValue: getWidth,
})

const maxWidth = style({
  prop: 'maxWidth',
  key: 'maxWidths',
  alias: 'maxw',
  transformValue: getPx,
})

const minWidth = style({
  prop: 'minWidth',
  key: 'minWidths',
  alias: 'minw',
  transformValue: getPx,
})

const height = style({
  prop: 'height',
  key: 'heights',
  alias: 'h',
  transformValue: getPx,
})

const maxHeight = style({
  prop: 'maxHeight',
  key: 'maxHeights',
  alias: 'maxh',
  transformValue: getPx,
})

const minHeight = style({
  prop: 'minHeight',
  key: 'minHeights',
  alias: 'minh',
  transformValue: getPx,
})

const size = mapProps(props => ({
  ...props,
  width: props.sz,
  height: props.sz,
}))(
  compose(
    width,
    height
  )
)

const verticalAlign = style({ prop: 'verticalAlign' })

export const layout = compose(
  display,
  width,
  maxWidth,
  minWidth,
  height,
  maxHeight,
  minHeight,
  size,
  verticalAlign,
)

type LayoutProps = {
  w?: UnitValue,
  maxw?: UnitValue,
  minw?: UnitValue,

  h?: UnitValue,
  minh?: UnitValue,
  maxh?: UnitValue,

  display?: (string | number) & StringValue,
  sz?: UnitValue,
  verticalAlign?: StringValue,
}


// flexbox
// const alignItems = style({ prop: 'alignItems' })
// const alignContent = style({ prop: 'alignContent' })
// const justifyItems = style({ prop: 'justifyItems' })
// const justifyContent = style({ prop: 'justifyContent' })
// const flex = style({ prop: 'flex' })
// const justifySelf = style({ prop: 'justifySelf' })

const order = style({ prop: 'order' })
const flexWrap = style({ prop: 'flexWrap' })
const flexShrink = style({ prop: 'flexShrink' })
const flexBasis = style({ prop: 'flexBasis', transformValue: getWidth })
const flexDirection = style({ prop: 'flexDirection' })
const alignSelf = style({ prop: 'alignSelf' })

const flex = compose(
  order,
  flexWrap,
  flexShrink,
  flexBasis,
  flexDirection,
  alignSelf,
)

type FlexProps = {
  order?: (string | number) & NumberValue,
  flexWrap?: StringValue,
  flexShrink?: NumberValue | StringValue,
  flexBasis?: StringValue,
  flexDirection?: StringValue,
  alignSelf?: StringValue,
}

// grid
// const gridGap = style({
//   prop: 'gridGap',
//   key: 'space',
//   transformValue: getPx,
//   scale: spaceScale,
// })

// const gridColumnGap = style({
//   prop: 'gridColumnGap',
//   key: 'space',
//   transformValue: getPx,
//   scale: spaceScale,
// })

// const gridRowGap = style({
//   prop: 'gridRowGap',
//   key: 'space',
//   transformValue: getPx,
//   scale: spaceScale,
// })

// const gridColumn = style({ prop: 'gridColumn' })
// const gridRow = style({ prop: 'gridRow' })
// const gridAutoFlow = style({ prop: 'gridAutoFlow' })
// const gridAutoColumns = style({ prop: 'gridAutoColumns' })
// const gridAutoRows = style({ prop: 'gridAutoRows' })
// const gridTemplateColumns = style({ prop: 'gridTemplateColumns' })
// const gridTemplateRows = style({ prop: 'gridTemplateRows' })
// const gridTemplateAreas = style({ prop: 'gridTemplateAreas' })
// const gridArea = style({ prop: 'gridArea' })



// color
const textColor = style({
  prop: 'color',
  key: 'colors',
})

const backgroundColor = style({
  prop: 'backgroundColor',
  alias: 'bg',
  key: 'colors',
})

// borders
const border = style({
  prop: 'border',
  key: 'borders',
})

const borderWidth = style({
  prop: 'borderWidth',
  key: 'borderWidths',
  transformValue: getPx,
})

const borderStyle = style({
  prop: 'borderStyle',
  key: 'borderStyles',
})

const borderColor = style({
  prop: 'borderColor',
  key: 'colors',
})

const borderTop = style({
  prop: 'borderTop',
  key: 'borders',
})

const borderRight = style({
  prop: 'borderRight',
  key: 'borders',
})

const borderBottom = style({
  prop: 'borderBottom',
  key: 'borders',
})

const borderLeft = style({
  prop: 'borderLeft',
  key: 'borders',
})

const borderRadius = style({
  prop: 'borderRadius',
  alias: 'br',
  key: 'radii',
  transformValue: getPx,
})

const borders = compose(
  border,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  borderWidth,
  borderStyle,
  borderColor,
  borderRadius
)

// TODO convert these to quickProps
type BorderProps = {
  border?: UnitValue,
  borderTop?: UnitValue,
  borderRight?: UnitValue,
  borderBottom?: UnitValue,
  borderLeft?: UnitValue,
  borderWidth?: UnitValue,
  borderStyle?: UnitValue,
  borderColor?: string, // UnitValue,
  borderRadius?: UnitValue,
}

const boxShadow = style({ prop: 'boxShadow', key: 'shadows', alias: 'bs' })

const opacity = style({ prop: 'opacity', alias: 'op' })
const overflow = style({ prop: 'overflow' })

// backgrounds
const background = style({ prop: 'background' })
const backgroundImage = style({ prop: 'backgroundImage' })
const backgroundSize = style({ prop: 'backgroundSize' })
const backgroundPosition = style({ prop: 'backgroundPosition' })
const backgroundRepeat = style({ prop: 'backgroundRepeat' })

const appearance = compose(
  borders,
  backgroundColor,
  textColor,
  boxShadow,
  opacity,
  overflow,
  background,
  backgroundImage,
  backgroundSize,
  backgroundPosition,
  backgroundRepeat,
)

type AppearanceProps = BorderProps & {
  /** background-color */
  bg?: string,

  /** color */
  color?: string,

  /** background */
  background?: StringValue,

  /** box-sadow */
  bs?: StringValue,

  /** border-radius: 50% | 8 */
  br?: UnitValue,

  /** opacity => Depracted, use op  */
  opacity?: UnitValue,

  /** opacity  */
  op?: UnitValue,

  overflow?: 'hidden' | 'visible' | 'scroll' | 'auto',

  boxShadow?: StringValue,

  backgroundImage?: StringValue,

  backgroundSize?: StringValue,

  backgroundPosition?: StringValue,

  backgroundRepeat?: StringValue,

  anchor?: boolean
}


// position
const position = style({ prop: 'position', alias: 'pos' })
const zIndex = style({ prop: 'zIndex', alias: 'zi', key: 'zIndices' })
const top = style({ prop: 'top', transformValue: getPx })
const right = style({ prop: 'right', transformValue: getPx })
const bottom = style({ prop: 'bottom', alias: 'bot', transformValue: getPx })
const left = style({ prop: 'left', alias: 'left', transformValue: getPx })

const positionProps = compose(
  position,
  zIndex,
  top,
  right,
  bottom,
  left,
)

type PositionProps = {
  /** position */
  pos?: StringValue,

  /** z-index */
  zi?: NumberValue,

  top?: UnitValue,

  right?: UnitValue,

  bottom?: UnitValue,

  left?: UnitValue,
}


export const systemBox = compose(
  layout,
  typography,
  spacing,
  appearance,
  positionProps,
  flex,
)

export type StyledSystemPropsTypes = LayoutProps & TypographyProps & SpacingProps & AppearanceProps & PositionProps & FlexProps
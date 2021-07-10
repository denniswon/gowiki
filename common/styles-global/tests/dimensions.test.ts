import { layout } from '../src/styledSystems'

// TODO @bernat fixme
describe.skip('Dimension Props Tests', () => {

  it('is a function', () => {
    expect(typeof layout).toBe('function')
  })

  test('Dimension Props - simple number values', () => {
    const p = {
      w: 100, h: 100,
      maxw: 100, minw: 100,
      maxh: 100, minh: 100
    }
    expect(layout(p)).toEqual({
      width: '100px', height: '100px',
      maxWidth: '100px', minWidth: '100px',
      maxHeight: '100px', minHeight: '100px',
    })
  })

  test('Dimension Props - simple string values ', () => {
    const p = { w: 'auto', h: '100%' }
    expect(layout(p)).toEqual({
      width: 'auto', height: '100%',
    })
  })

  test('Dimensions Props - propArrayKeys', () => {
    const p = { sz: 100 }
    expect(layout(p)).toEqual({
      width: '100px', height: '100px',
    })
  })

  test('Dimension props - media array', () => {
    const p = { w: [100, 200] }
    expect(layout(p)).toEqual({
      '@media screen and (max-width: 576px)': { width: '200px' }, width: '100px'
    })
  })

  test('Dimension props - media Object', () => {
    const p = { w: { base: 400, lg: 200, sm: 100 } }
    expect(layout(p)).toEqual({
      '@media screen and (max-width: 576px)': {
        width: '100px'
      },
      '@media screen and (max-width: 992px)': {
        width: '200px'
      },
      width: '400px'
    })
  })

})
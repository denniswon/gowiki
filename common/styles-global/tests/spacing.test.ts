import { spacing } from '../src/styledSystems'

// TODO @bernat fixme
describe.skip('Spacing Props Tests', () => {
  it('is a function', () => {
    expect(typeof spacing).toBe('function')
  })

  test('spacing Props - simple values', () => {
    const p = {
      p: 100, m: 100,
      pt: 100, mt: 100,
      pb: 100, mb: 100
    }
    expect(spacing(p)).toEqual({
      padding: '100px', margin: '100px',
      paddingTop: '100px', marginTop: '100px',
      paddingBottom: '100px', marginBottom: '100px',
    })
  })

  test('spacing props - propArrayKeys', () => {
    const p = { mh: 100, ph: 100 }
    expect(spacing(p)).toEqual({
      marginLeft: '100px', marginRight: '100px',
      paddingLeft: '100px', paddingRight: '100px',
    })
  })

  test('spacing props - media array', () => {
    const p = { p: [100, 200] }
    expect(spacing(p)).toEqual({
      '@media screen and (max-width: 576px)': { padding: '200px' }, padding: '100px'
    })
  })

  test('spacing props - media Object', () => {
    const p = { p: { base: 400, lg: 200, sm: 100} }
    expect(spacing(p)).toEqual({
      '@media screen and (max-width: 576px)': {
        padding: '100px'
      },
      '@media screen and (max-width: 992px)': {
        padding: '200px'
      },
      padding: '400px'
    })
  })


})


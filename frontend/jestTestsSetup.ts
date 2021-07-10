import 'jest-styled-components'

// TODO, importing this library from the setup file will expose methods to all test.
// Currently the methods are not being captured globally. Some issues with typescript.
//import '@testing-library/jest-dom'

// log unhandled exceptions in promise
process.on('unhandledRejection', (reason) => {
	console.log('REJECTION', reason)
})

describe('timezones', () => {
  it('should always be UTC', () => {
      expect(new Date().getTimezoneOffset()).toBe(0)
  })
})
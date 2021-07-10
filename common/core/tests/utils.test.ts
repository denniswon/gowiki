import { beforeEach, expect, jest, test } from '@jest/globals'

import { emailToName, toTitleCase } from '../src'

test('to title case', () => {
  expect(toTitleCase('foo')).toEqual('Foo')
  expect(toTitleCase('')).toEqual('')
  expect(toTitleCase('Foo')).toEqual('Foo')
})

test('to name', () => {
  expect(emailToName('foo')).toEqual('Foo')
  expect(emailToName('Foo Bar')).toEqual('Foo Bar')
  expect(emailToName('tim')).toEqual('Tim')
  expect(emailToName('tim.su')).toEqual('Tim Su')
})
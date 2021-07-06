import { GlobalStyles } from './types'

export const s: GlobalStyles = {
  pabs: 'position: absolute;',
  prel: 'position: relative;',

  flex: 'display:flex;',
  flex1: 'flex: 1 1 0%; display:flex;',
  flxRow: 'flex-direction: row; display:flex;',
  flxCol: 'flex-direction: column; display:flex;',
  flxRowReverse: 'flex-direction: row-reverse; display:flex;',
  flxColReverse: 'flex-direction: column-reverse; display:flex;',
  flxWrap: 'flex-wrap: wrap; display:flex;',
  aifs: 'align-items: flex-start; display:flex;',
  aic: 'align-items: center; display:flex;',
  ais: 'align-items: stretch; display:flex;',
  aife: 'align-items: flex-end; display:flex;',
  aib: 'align-items: baseline; display:flex;',

  /** Blah blah */
  jcc: 'justify-content: center; display:flex;',
  jcfs: 'justify-content: flex-start; display:flex;',
  jcfe: 'justify-content: flex-end; display:flex;',
  jcsb: 'justify-content: space-between; display:flex;',
  jcsa: 'justify-content: space-around; display:flex;',

  asfs: 'align-self: flex-start; display:flex;',
  asfe: 'align-self: flex-end; display:flex;',
  asc: 'align-self: center; display:flex;',
  ass: 'align-self: stretch; display:flex;',

  jsfs: 'justify-self: flex-start; display:flex;',
  jsfe: 'justify-self: flex-end; display:flex;',
  jsc: 'justify-self: center; display:flex;',
  jss: 'justify-self: stretch; display:flex;',

  if: 'display:inline-flex;',

  tal: 'text-align: left;',
  tac: 'text-align: center;',
  tar: 'text-align: right;',

  ofh: 'overflow: hidden;',

  cover: 'background-size: cover;',
  contain: 'background-size: contain;',

  anchor: 'cursor: pointer;',

  full: 'width:100%; height:100%; left:0; top:0; bottom:0; right:0;',
  ellipsis: 'text-overflow: ellipsis; overflow: hidden; white-space: nowrap;',
}

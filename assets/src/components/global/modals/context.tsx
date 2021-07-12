import React from 'react'

const defaultValue = {
}

const Context = React.createContext(defaultValue)

export type ProviderProps = {
  value?: any
  children?: any
}
export function Provider({ value: valueProp, children }: ProviderProps) {
  const value = {
    ...defaultValue,
  }

  return <Context.Provider value={valueProp ? {...value, ...valueProp} : value}>{children}</Context.Provider>
}

export default Context

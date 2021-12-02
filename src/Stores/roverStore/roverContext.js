import React from 'react'
import { roverstore } from './roverStore'
import { useLocalStore } from 'mobx-react'

const RoverContext = React.createContext(null)

export const RoverProvider = ({children}) => {
  const roverStore = useLocalStore(roverstore)

  return <RoverContext.Provider value={roverStore}>
    {children}
  </RoverContext.Provider>
}

export const useRoverStore = () => React.useContext(RoverContext)
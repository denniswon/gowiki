import React, { useEffect } from 'react'
import { WorkInProgress } from '../styles/global'

const Notifications = () => {

  useEffect(() => {
    document.getElementsByTagName('body')[0].style.cssText =
      'position:fixed; overflow-y: scroll;'
  }, [])

  useEffect(
    () => () => (document.getElementsByTagName('body')[0].style.cssText = ''),
    [],
  )

  return <WorkInProgress className="workInProgress">This is a work in progress</WorkInProgress>
}

export default Notifications

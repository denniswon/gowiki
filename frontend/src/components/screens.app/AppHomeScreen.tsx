import React, { useEffect } from 'react'
import { tracker } from 'services'

import AppSidebar from 'components/screens.app/AppSidebar'
import initializationService from 'services/initializationService'

// generate a random id so useEffect is called again on reload
const hotModuleId = Math.random()

function AppHomeScreen() {
  useEffect(() => {
    tracker.home()
    initializationService.initMainWindow()
  }, [hotModuleId])

  return <AppSidebar />
}

export default AppHomeScreen

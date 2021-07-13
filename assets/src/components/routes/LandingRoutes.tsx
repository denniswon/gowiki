import { navigate } from 'hookrouter'
import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { paths } from '@gowiki/core'

import LandingScreen from 'components/screens.landing/LandingScreen'
import PrivacyScreen from 'components/screens.terms/PrivacyScreen'
import TermsScreen from 'components/screens.terms/TermsScreen'

export default class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path={paths.ROOT} exact component={LandingScreen} />
        <Route path={paths.TERMS} exact component={TermsScreen} />
        <Route path={paths.PRIVACY} exact component={PrivacyScreen} />
        <Redirect to={paths.ROOT} />
      </Switch>
    )
  }
}

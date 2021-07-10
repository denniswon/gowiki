import { paths } from 'config/paths'
import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

export default class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path={paths.ROOT} exact component={LandingScreen} />
        <Route path={paths.BETA} exact component={LandingScreen} />
        <Route path={paths.INTEGRATIONS} exact component={IntegrationsScreen} />
        <Route path={paths.TERMS} exact component={TermsScreen} />
        <Route path={paths.PRIVACY} exact component={PrivacyScreen} />
        <Redirect to={paths.ROOT} />
      </Switch>
    )
  }
}

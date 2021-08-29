import React, { Suspense, lazy } from 'react'
import {
  Route,
  Switch,
  BrowserRouter,
  Redirect,
  withRouter,
} from 'react-router-dom'
import { StoreProvider } from './store/store'
import 'dotenv/config'
import Loader from './components/Loader'
import Nav from './components/Nav'
import Login from './components/Login'
import Signup from './components/Signup'
import Tweet from './components/Tweet'
import Bookmarks from './components/Bookmarks'
import Lists from './components/Lists'
import ListPage from './components/ListPage'
import Explore from './components/Explore'
import Feed from './components/Feed'
import Notifications from './components/Notifications'
import Messages from './components/Messages'
import Alerts from './components/Alerts'
import ChatPage from './components/ChatPage'
import { Box } from 'styles'
import {
  BodyWrap, Main, MiddleSection, RightSection, Header
} from './styles/global'

const Home = lazy(() => import('./components/Home')) // eslint-disable-line
const Profile = lazy(() => import('./components/Profile')) // eslint-disable-line

const DefaultContainer = withRouter(({ history }) => (
  <BodyWrap>
    <Main>
      <MiddleSection
        w={history.location.pathname.slice(0, 9) !== '/messages' ? '100%' : undefined}>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home" exact>
          <Home />
        </Route>
        <Route path="/profile/:username" exact>
          <Profile />
        </Route>
        <Route path="/tweet/:username/:id" exact>
          <Tweet />
        </Route>
        <Route path="/bookmarks" exact>
          <Bookmarks />
        </Route>
        <Route path="/lists" exact>
          <Lists />
        </Route>
        <Route path="/lists/:id" exact>
          <ListPage />
        </Route>
        <Route path="/explore" exact>
          <Explore />
        </Route>
        <Route path="/notifications" exact>
          <Notifications />
        </Route>
        <Route path="/messages">
          <Messages />
        </Route>
      </MiddleSection>
      <Route path="/messages">
        <ChatPage />
      </Route>
      {history.location.pathname.slice(0, 9) !== '/messages' && (
        <RightSection>
          <Feed />
        </RightSection>
      )}
    </Main>
    <Header>
      <Nav />
    </Header>
  </BodyWrap>
))

function App() {
  return (
    <Box>
      <StoreProvider>
        <BrowserRouter>
          <Suspense fallback={<Loader />}>
            <Alerts />
            <Switch>
              <Route path="/login" exact>
                <Login />
              </Route>
              <Route path="/signup" exact>
                <Signup />
              </Route>
              <Route component={DefaultContainer} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </StoreProvider>
    </Box>
  )
}

export default App

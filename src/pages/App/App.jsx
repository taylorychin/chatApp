import { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import ChannelListPage from '../ChannelListPage/ChannelListPage';
import NewChannelPage from '../NewChannelPage/NewChannelPage';
import NavBar from '../../components/NavBar/NavBar';
import ChannelDetailPage from "../../pages/ChannelDetailPage/ChannelDetailPage";

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      {user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <Switch>
            <Route path="/channels/new">
              <NewChannelPage />
            </Route>

            <Route path="/channels/:id">
              <ChannelDetailPage />
            </Route>

            <Route path="/channels">
              <ChannelListPage />
            </Route>

            {/* <Redirect to="/channels" /> */}
          </Switch>
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main >
  );
}
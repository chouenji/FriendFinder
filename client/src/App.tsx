import './App.css';
import { useEffect } from 'react';
import { Route, Switch } from 'wouter';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Cookies from 'js-cookie';
import Matches from './pages/Matches';
import Profile from './pages/Profile';
import MyProfile from './pages/MyProfile';
import Chats from './pages/Chats';
import Chat from './pages/Chat';
import Navbar from './components/Navbar';

function App() {
  const token: string = Cookies.get('token') || '';
  let user: User = {
    id: -1,
    name: '',
    token: token || '',
  };

  // If there is a token, decode it and get the user's id, name, and picture
  if (user.token) {
    const [, payloadBase64] = token.split('.');
    const decodedPayload = atob(payloadBase64);
    const parsedToken = JSON.parse(decodedPayload);

    user = {
      id: parseInt(parsedToken.userId),
      name: parsedToken.name,
      token: token,
    };
  }

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/auth/verify', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 401) {
          Cookies.remove('token');
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (token) {
      verifyToken();
    }
  }, [token]);

  return (
    <div className="App">
      <Navbar user={user} />
      <Switch>
        <Route path="/">
          <Home user={user} />
        </Route>
        <Route path="/register">
          <Register user={user} />
        </Route>
        <Route path="/login">
          <Login user={user} />
        </Route>
        <Route path="/matches">
          <Matches user={user} />
        </Route>
        <Route path="/profile/:id">
          <Profile user={user} />
        </Route>
        <Route path="/my_profile">
          <MyProfile user={user} />
        </Route>
        <Route path="/chats">
          <Chats user={user} />
        </Route>
        <Route path="/chats/:id">
          <Chat user={user} />
        </Route>
        <Route>
          <div className="text-center">Not found 404</div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;

import './App.css';
import { useEffect, useState } from 'react';
import { Link, Route, Switch } from 'wouter';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Cookies from 'js-cookie';
import Matches from './pages/Matches';
import Profile from './pages/Profile';

function App() {
  const token: string = Cookies.get('token') || '';
  let user: User = {
    id: -1,
    name: '',
  };
  const [loggedIn, setLoggedIn] = useState(false);

  // If there is a token, decode it and get the user's id and name
  if (token) {
    const [, payloadBase64] = token.split('.');
    const decodedPayload = atob(payloadBase64);
    const parsedToken = JSON.parse(decodedPayload);

    user = {
      id: parseInt(parsedToken.userId),
      name: parsedToken.name || '',
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
          setLoggedIn(false);
        } else {
          setLoggedIn(true);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (token) {
      verifyToken();
    }
  }, [token, loggedIn]);

  return (
    <div className="App">
      <nav className="flex justify-center">
        <Link to="/" className="mr-4">
          Home
        </Link>
        {!token && (
          <>
            <Link to="/register" className="mr-4">
              Register
            </Link>
            <Link to="/login" className="mr-4">
              Login
            </Link>
          </>
        )}
        {token && (
          <div className="flex justify-center">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4"
              onClick={() => {
                Cookies.remove('token');
                setLoggedIn(false);
              }}
            >
              Logout
            </button>
            <h1>Hello {user.name}!</h1>
            <Link to="/matches" className="ml-4">
              My Matches
            </Link>
          </div>
        )}
      </nav>
      <Switch>
        <Route path="/">
          <Home user={user} token={token} />
        </Route>
        <Route path="/register">
          <Register token={token} />
        </Route>
        <Route path="/login">
          <Login token={token} />
        </Route>
        <Route path="/matches">
          <Matches user={user} token={token} />
        </Route>
        <Route path="/profile/:id">
          <Profile user={user} token={token} />
        </Route>
        <Route>
          <div className="w-80 mx-auto">
            <div className="flex justify-center">
              <h1>404 - Not Found</h1>
            </div>
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;

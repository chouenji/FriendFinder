import { useState } from 'react';
import Cookies from 'js-cookie';

function Login(props: { user: User }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState({
    error: false,
    message: '',
  });

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Cookies.get('token')) {
      setError({ error: true, message: 'Already logged in' });
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      setError({ error: false, message: data.error });
      if (data.error) {
        setError({ error: true, message: data.error });
      } else {
        Cookies.set('token', data.token);
        window.location.href = '/';
      }
    } catch (err) {
      setError({ error: true, message: err as string });
      console.log(err);
    }

    setEmail('');
    setPassword('');
    setSubmit(true);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  if (props.user.token) {
    return (
      <div className="w-80 mx-auto">
        <div className="flex justify-center">
          <h1>You are already logged in!</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <br />
      {error &&
        submit &&
        (error.message ? (
          <p className="text-red-500 mb-4">{error.message}</p>
        ) : (
          <p className="text-green-500 mb-4">Login Successfully!</p>
        ))}

      <form
        onSubmit={handleSubmit}
        className="bg-gray-300 w-80 mx-auto rounded-lg mt-4 p-4"
        action="POST"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <br />
        <input
          onChange={handleEmailChange}
          className="mb-2 p-2"
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          required
        />
        <br />
        <input
          onChange={handlePasswordChange}
          className="mb-2 p-2"
          type="password"
          name="password"
          id="passowrd"
          placeholder="Password"
          value={password}
          required
        />
        <br />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;

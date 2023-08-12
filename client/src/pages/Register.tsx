import { useState } from 'react';

function Register(props: { user: User }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [picture, setPicture] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState({
    error: false,
    message: '',
  });

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError({ error: true, message: 'Passwords do not match' });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('picture', picture as File);

      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.error) {
        setError({ error: true, message: data.error });
      } else {
        window.location.href = '/login';
      }
    } catch (err) {
      setError({ error: true, message: err as string });
      console.log(err);
    }

    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setSubmit(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPicture(file);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  if (props.user.token) {
    return (
      <div className="w-80 mx-auto">
        <div className="flex justify-center">
          <p className="text-2xl font-bold">Already logged in</p>
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
          <p className="text-green-500 mb-4">Successfully Registered</p>
        ))}

      <form
        onSubmit={handleSubmit}
        className="bg-gray-300 w-80 mx-auto rounded-lg mt-4 p-4"
        action="POST"
      >
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <br />
        <input
          onChange={handleNameChange}
          className="mb-2 p-2"
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          value={name}
          required
        />
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
        <label htmlFor="picture">Profile Picture</label>
        <input
          onChange={handlePictureChange}
          className="mb-2 p-2"
          type="file"
          name="picture"
          id="picture"
        />
        <br />
        <input
          onChange={handleConfirmPasswordChange}
          className="mb-2 p-2"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          required
        />
        <br />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Register;

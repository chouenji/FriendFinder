import { Link } from 'wouter';
import Cookies from 'js-cookie';

export default function Navbar(props: { user: User }) {
  return (
    <nav className="flex flex-col md:flex-row justify-between items-center bg-blue-500 py-2 md:py-4 px-4 md:px-6">
      <div className="flex items-center justify-center md:justify-start flex-grow">
        <Link
          to="/"
          className="text-white mr-2 md:mr-4 text-base md:text-lg font-semibold hover:text-blue-300 transition duration-300"
        >
          Home
        </Link>
        {props.user.token && (
          <>
            <Link
              to="/chats"
              className="text-white mr-4 text-base md:text-lg font-semibold hover:text-blue-300 transition duration-300"
            >
              Chats
            </Link>
            <Link
              to="/matches"
              className="text-white mr-4 text-base md:text-lg font-semibold hover:text-blue-300 transition duration-300"
            >
              Matches
            </Link>
          </>
        )}
      </div>
      <div className="flex items-center">
        {props.user.token ? (
          <div className="flex items-center space-x-2 md:space-x-4">
            <h1 className="text-white text-base md:text-lg font-semibold mr-2 md:mr-3">
              Hello {props.user.name}!
            </h1>
            <Link
              to="/my_profile"
              className="text-white mr-2 text-base md:text-lg font-semibold hover:text-blue-300 transition duration-300"
            >
              Profile
            </Link>
            <button
              className="bg-red-500 hover:bg-red-700 text-white text-base md:text-lg font-semibold py-2 px-3 md:px-4 rounded transition duration-300"
              onClick={() => {
                Cookies.remove('token');
                window.location.href = '/';
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link
              to="/login"
              className="text-white text-base md:text-lg font-semibold hover:text-blue-300 transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-white text-base md:text-lg font-semibold hover:text-blue-300 transition duration-300"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

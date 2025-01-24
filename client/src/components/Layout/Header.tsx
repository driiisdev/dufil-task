import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

export const Header = () => {
  const { isAuthenticated, clearAuth } = useAuthStore();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <nav className="flex space-x-4">
          <Link to="/" className="text-gray-700 hover:text-gray-900">
            Home
          </Link>
          {isAuthenticated && (
            <Link to="/dashboard" className="text-gray-700 hover:text-gray-900">
              Dashboard
            </Link>
          )}
        </nav>
        <div className="flex space-x-4">
          {isAuthenticated ? (
            <button
              onClick={clearAuth}
              className="text-gray-700 hover:text-gray-900"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-gray-900">
                Login
              </Link>
              <Link to="/register" className="text-gray-700 hover:text-gray-900">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

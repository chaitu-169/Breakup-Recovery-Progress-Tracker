import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, User, LogOut, LogIn } from 'lucide-react';
import { User as UserType } from '../types';

interface NavbarProps {
  user: UserType | null;
  onLoginAsGuest: () => void;
  onShowAuth: () => void;
  onLogout: () => void;
  recoveryPercentage: number;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  user, 
  onLoginAsGuest, 
  onShowAuth,
  onLogout, 
  recoveryPercentage 
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/logs', label: 'Daily Logs' },
    { path: '/music', label: 'Music' },
    { path: '/profile', label: 'Profile' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-purple-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                RecoveryPath
              </span>
              {user && (
                <div className="text-xs text-gray-500">
                  {Math.round(recoveryPercentage)}% recovered
                </div>
              )}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors ${
                  isActive(item.path)
                    ? 'text-purple-600 font-semibold'
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700">
                    {user.name} {user.isGuest && '(Guest)'}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-1 px-3 py-1 text-sm text-red-600 hover:text-red-700 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={onShowAuth}
                  className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </button>
                <button
                  onClick={onLoginAsGuest}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
                >
                  Try as Guest
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 px-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-purple-50 text-purple-600 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-200">
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 py-2 px-3">
                    <User className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-700">
                      {user.name} {user.isGuest && '(Guest)'}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 py-2 px-3 text-red-600 hover:bg-red-50 rounded-lg w-full text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      onShowAuth();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 py-2 px-3 text-purple-600 hover:bg-purple-50 rounded-lg w-full text-left"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Sign In</span>
                  </button>
                  <button
                    onClick={() => {
                      onLoginAsGuest();
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
                  >
                    Try as Guest
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
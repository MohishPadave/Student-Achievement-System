import { useAuthStore } from "../context/authStore";
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import vesLogo from '../assets/ves_logo.png'

const LoginPage = () => {
  const { login, getTestAccounts, user } = useAuthStore();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [testAccounts, setTestAccounts] = useState([]);
  const [showTestAccounts, setShowTestAccounts] = useState(false);

  useEffect(() => {
    if (user) {
      // Navigate based on user role
      if (user.role === 'student') navigate('/student');
      else if (user.role === 'faculty') navigate('/faculty');
      else if (user.role === 'admin') navigate('/admin');
    }
  }, [user, navigate]);

  useEffect(() => {
    // Load test accounts
    const loadTestAccounts = async () => {
      const accounts = await getTestAccounts();
      setTestAccounts(accounts);
    };
    loadTestAccounts();
  }, [getTestAccounts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      // Navigation will be handled by the useEffect above when user state updates
    }
  };

  const handleTestAccountClick = (account) => {
    setEmail(account.email);
    setPassword(account.password);
    setShowTestAccounts(false);
  };

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f6f1] px-4">
      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-xl max-w-4xl w-full overflow-hidden">
        
        {/* Illustration on top (mobile) and right (desktop) */}
        <div className="flex md:flex-1 items-center justify-center bg-[#f4b400] p-6 md:p-0">
          <img
            src={vesLogo}
            alt="Illustration"
            className="max-h-48 sm:max-h-56 md:max-h-64"
          />
        </div>

        {/* Login form below on mobile and left on desktop */}
        <div className="flex-1 p-6 sm:p-8 md:p-12 flex flex-col items-center justify-center space-y-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Student Achievements Portal</h2>
          <p className="text-gray-500 text-xs sm:text-sm text-center">Sign in with test credentials</p>

          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="w-full max-w-sm">
            <button
              onClick={() => setShowTestAccounts(!showTestAccounts)}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              {showTestAccounts ? 'Hide' : 'Show'} Test Accounts
            </button>

            {showTestAccounts && (
              <div className="mt-3 p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-gray-600 mb-2">Click to use test credentials:</p>
                {testAccounts.map((account, index) => (
                  <button
                    key={index}
                    onClick={() => handleTestAccountClick(account)}
                    className="block w-full text-left p-2 text-xs hover:bg-gray-100 rounded border-b border-gray-200 last:border-b-0"
                  >
                    <div className="font-medium">{account.role.toUpperCase()}</div>
                    <div className="text-gray-600">{account.email}</div>
                    <div className="text-gray-500">Password: {account.password}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <p className="text-xs sm:text-sm text-green-600 mt-2 text-center">
            <span className="font-medium">Test Environment</span> - Use dummy credentials above
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

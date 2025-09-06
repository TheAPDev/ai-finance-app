import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User, Crown } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-emerald-100 px-8 py-4 shadow-lg w-full">
      <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-900 bg-clip-text text-transparent">
              WealthWise
            </h1>
            <p className="text-sm text-gray-600 font-medium">Premium Financial Education</p>
          </div>
        </div>

        <div className="flex-1 flex justify-end">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4 bg-gradient-to-r from-emerald-50 to-gray-50 rounded-2xl px-6 py-3 border border-emerald-200 shadow-lg">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center shadow-md">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-gray-900 flex items-center">
                  <span className="flex items-center text-emerald-700 font-mono text-sm bg-emerald-100 px-3 py-1 rounded-lg">
                    {user?.name ? (
                      <>
                        {user.name}
                        <span className="ml-1">#{user.specialId}</span>
                      </>
                    ) : (
                      <>Guest#----</>
                    )}
                  </span>
                </div>
                <div className="text-sm text-gray-600">{user?.email}</div>
              </div>
            </div>

            <button
              onClick={logout}
              className="p-3 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 shadow-lg hover:shadow-red-500/25"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from './Header';
import NavigationHub from './NavigationHub';
import FinanceGuide from './FinanceGuide';
import DailyWealthTips from './DailyWealthTips';
import MoneyMoves from './MoneyMoves';

type ActiveSection = 'finance-guide' | 'wealth-tips' | 'money-moves' | null;

const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>(null);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'finance-guide':
        return <FinanceGuide />;
      case 'wealth-tips':
        return <DailyWealthTips />;
      case 'money-moves':
        return <MoneyMoves />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-2xl mx-auto">
              <div className="w-32 h-32 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full mx-auto mb-8 flex items-center justify-center shadow-2xl">
                <svg className="w-16 h-16 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-900 bg-clip-text text-transparent mb-4">
                Welcome to WealthWise
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Your premium financial education platform. Navigate through our sophisticated tools to master the art of wealth building.
              </p>
              <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-2xl p-6 border border-emerald-200">
                <p className="text-emerald-800 font-medium">
                  Click the navigation button on the left to explore our exclusive finance education modules.
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-gray-100 overflow-hidden">
      <Header />
      
      <NavigationHub 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      
      <main className="h-[calc(100vh-80px)] px-8 py-6 ml-32">
        <div className="h-full max-w-7xl mx-auto">
          {renderActiveSection()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
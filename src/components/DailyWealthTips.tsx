import React, { useState } from 'react';
import { TrendingUp, DollarSign, PiggyBank, Target, Lightbulb, Star } from 'lucide-react';

interface TipCard {
  id: string;
  title: string;
  content: string;
  category: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const DailyWealthTips: React.FC = () => {
  const [selectedTip, setSelectedTip] = useState<string | null>(null);

  const tips: TipCard[] = [
    {
      id: '1',
      title: 'The 50/30/20 Rule',
      content: 'Allocate 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment. This simple rule helps maintain a balanced financial lifestyle while building wealth consistently.',
      category: 'Budgeting',
      icon: <PiggyBank className="w-6 h-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: '2',
      title: 'Compound Interest Magic',
      content: 'Starting to invest early, even with small amounts, can lead to substantial wealth due to compound interest. A $100 monthly investment at 7% annual return becomes over $260,000 in 30 years!',
      category: 'Investing',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: '3',
      title: 'Emergency Fund Priority',
      content: 'Build an emergency fund covering 3-6 months of expenses before investing heavily. This financial cushion prevents you from going into debt during unexpected situations.',
      category: 'Savings',
      icon: <Target className="w-6 h-6" />,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: '4',
      title: 'High-Interest Debt First',
      content: 'Pay off credit card debt before investing. With average credit card interest rates around 20%, paying off this debt guarantees a 20% return on your money.',
      category: 'Debt Management',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: '5',
      title: 'Dollar-Cost Averaging',
      content: 'Invest a fixed amount regularly regardless of market conditions. This strategy reduces the impact of market volatility and helps build wealth steadily over time.',
      category: 'Investment Strategy',
      icon: <Lightbulb className="w-6 h-6" />,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      id: '6',
      title: 'Track Your Net Worth',
      content: 'Calculate your net worth (assets minus liabilities) monthly. This gives you a clear picture of your financial progress and helps identify areas for improvement.',
      category: 'Financial Planning',
      icon: <Star className="w-6 h-6" />,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Daily Wealth Tips</h1>
        <p className="text-gray-600 text-lg">
          Discover powerful financial insights to accelerate your wealth-building journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
              selectedTip === tip.id ? 'ring-2 ring-green-500 shadow-2xl scale-105' : ''
            }`}
            onClick={() => setSelectedTip(selectedTip === tip.id ? null : tip.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${tip.bgColor}`}>
                <span className={tip.color}>{tip.icon}</span>
              </div>
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {tip.category}
              </span>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-3">{tip.title}</h3>

            <div className={`transition-all duration-300 ${
              selectedTip === tip.id ? 'max-h-96 opacity-100' : 'max-h-20 opacity-75'
            } overflow-hidden`}>
              <p className="text-gray-600 leading-relaxed text-sm">
                {tip.content}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <button className="text-green-600 text-sm font-medium hover:text-green-700 transition-colors">
                {selectedTip === tip.id ? 'Show less' : 'Read more →'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedTip && (
        <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
              <Lightbulb className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Pro Tip</h3>
          </div>
          <p className="text-gray-700">
            Start implementing this tip today! Small, consistent actions compound over time to create significant financial results. 
            Remember, the best time to start building wealth was yesterday, but the second-best time is now.
          </p>
        </div>
      )}
    </div>
  );
};

export default DailyWealthTips;
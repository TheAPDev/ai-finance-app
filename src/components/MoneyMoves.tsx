import React, { useState } from 'react';
import { ChevronRight, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

interface Scenario {
  id: string;
  title: string;
  description: string;
  situation: string;
  questions: Question[];
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const MoneyMoves: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const scenarios: Scenario[] = [
    {
      id: '1',
      title: 'The First Job Dilemma',
      description: 'Navigate your first paycheck and financial decisions',
      situation: 'You just landed your first job earning $3,500 per month after taxes. You live with roommates, paying $800/month rent, and have $5,000 in student loans with 5% interest. You also want to start building your future but don\'t know where to begin.',
      questions: [
        {
          id: '1',
          question: 'What should be your first priority with your new income?',
          options: [
            'Immediately start investing 20% in stocks',
            'Build a $1,000 emergency fund first',
            'Pay off student loans aggressively',
            'Upgrade your lifestyle and enjoy your success'
          ],
          correctAnswer: 1,
          explanation: 'Building a small emergency fund ($1,000) should be your first priority. This prevents you from going into debt for unexpected expenses while you establish other financial habits.'
        },
        {
          id: '2',
          question: 'After establishing your emergency fund, what should be your next step?',
          options: [
            'Start investing immediately in index funds',
            'Save for a house down payment',
            'Focus on paying minimum on student loans and invest the rest',
            'Build a larger emergency fund (3-6 months of expenses)'
          ],
          correctAnswer: 3,
          explanation: 'With a 5% interest rate on student loans, building a full 3-6 month emergency fund is more important. This gives you financial stability before optimizing between debt payoff and investing.'
        },
        {
          id: '3',
          question: 'How much should you allocate monthly for discretionary spending (entertainment, dining out, etc.)?',
          options: [
            'Whatever is left after all other expenses',
            'About $500-700 (20% of income)',
            'No more than $200 to maximize savings',
            '$1,000+ because you deserve to enjoy life'
          ],
          correctAnswer: 1,
          explanation: 'Following the 50/30/20 rule, about $500-700 (roughly 20% of your $3,500 income) is reasonable for wants. This balances enjoying life while building wealth.'
        }
      ]
    },
    {
      id: '2',
      title: 'The Investment Crossroads',
      description: 'Choose the right investment strategy for your situation',
      situation: 'You\'re 28 years old with $15,000 saved up, no debt, and steady income. The stock market has been volatile lately, and you\'re hearing conflicting advice about when and how to invest. You want to make smart decisions for your long-term wealth.',
      questions: [
        {
          id: '1',
          question: 'Given the market volatility, what\'s the best approach to start investing?',
          options: [
            'Wait for the market to stabilize before investing',
            'Invest all $15,000 immediately in individual stocks',
            'Use dollar-cost averaging with broad market index funds',
            'Put everything in high-yield savings accounts'
          ],
          correctAnswer: 2,
          explanation: 'Dollar-cost averaging with diversified index funds reduces timing risk and takes advantage of market volatility. Trying to time the market consistently is nearly impossible.'
        },
        {
          id: '2',
          question: 'What percentage of your portfolio should be in stocks versus bonds at age 28?',
          options: [
            '50% stocks, 50% bonds for safety',
            '80-90% stocks, 10-20% bonds',
            '100% stocks for maximum growth',
            '30% stocks, 70% bonds to be conservative'
          ],
          correctAnswer: 1,
          explanation: 'With 35+ years until retirement, a young investor can handle more risk. 80-90% stocks provides growth potential while some bonds add stability.'
        },
        {
          id: '3',
          question: 'How should you handle your investments during market downturns?',
          options: [
            'Sell everything to avoid further losses',
            'Stop contributing until markets recover',
            'Continue regular contributions and potentially increase them',
            'Switch to individual stock picking for better returns'
          ],
          correctAnswer: 2,
          explanation: 'Market downturns are opportunities to buy more shares at lower prices. Consistent investing, especially during downturns, has historically led to better long-term returns.'
        }
      ]
    }
  ];

  const handleScenarioSelect = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setIsCompleted(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newAnswers);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    const scenario = scenarios.find(s => s.id === selectedScenario);
    if (!scenario) return;

    if (currentQuestion < scenario.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsCompleted(true);
    }
  };

  const getCurrentScenario = () => scenarios.find(s => s.id === selectedScenario);
  const getCurrentQuestion = () => getCurrentScenario()?.questions[currentQuestion];

  const getScore = () => {
    const scenario = getCurrentScenario();
    if (!scenario) return 0;
    
    return userAnswers.reduce((score, answer, index) => {
      return score + (answer === scenario.questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  if (!selectedScenario) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Money Moves</h1>
          <p className="text-gray-600 text-lg">
            Practice real-world financial decisions through interactive scenarios
          </p>
        </div>

        <div className="grid gap-6">
          {scenarios.map((scenario) => (
            <div
              key={scenario.id}
              onClick={() => handleScenarioSelect(scenario.id)}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{scenario.title}</h3>
                  <p className="text-gray-600 mb-4">{scenario.description}</p>
                  <div className="flex items-center text-green-600 font-medium">
                    <span>Start scenario</span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
                <div className="ml-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {scenario.id}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const scenario = getCurrentScenario();
  const question = getCurrentQuestion();

  if (!scenario || !question) return null;

  if (isCompleted) {
    const score = getScore();
    const percentage = Math.round((score / scenario.questions.length) * 100);
    
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
            percentage >= 70 ? 'bg-green-100' : 'bg-yellow-100'
          }`}>
            {percentage >= 70 ? (
              <CheckCircle className="w-10 h-10 text-green-600" />
            ) : (
              <XCircle className="w-10 h-10 text-yellow-600" />
            )}
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Scenario Complete!</h2>
          <p className="text-gray-600 mb-6">
            You scored {score} out of {scenario.questions.length} ({percentage}%)
          </p>
          
          <div className="mb-8">
            {percentage >= 70 ? (
              <p className="text-green-600 font-medium">
                Excellent work! You're making smart financial decisions.
              </p>
            ) : (
              <p className="text-yellow-600 font-medium">
                Good effort! Review the explanations to strengthen your financial knowledge.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <button
              onClick={() => setSelectedScenario(null)}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              Try Another Scenario
            </button>
            <button
              onClick={() => handleScenarioSelect(scenario.id)}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Restart This Scenario
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">{scenario.title}</h1>
          <div className="flex items-center justify-between">
            <span className="text-green-100">
              Question {currentQuestion + 1} of {scenario.questions.length}
            </span>
            <div className="flex space-x-1">
              {scenario.questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index < currentQuestion ? 'bg-white' :
                    index === currentQuestion ? 'bg-green-300' : 'bg-green-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Situation Context */}
        {currentQuestion === 0 && (
          <div className="p-6 bg-gray-50 border-b border-gray-100">
            <h3 className="font-bold text-gray-900 mb-2">Situation:</h3>
            <p className="text-gray-700 leading-relaxed">{scenario.situation}</p>
          </div>
        )}

        {/* Question */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">{question.question}</h3>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                  selectedAnswer === index
                    ? showExplanation
                      ? index === question.correctAnswer
                        ? 'bg-green-50 border-green-500 text-green-700'
                        : 'bg-red-50 border-red-500 text-red-700'
                      : 'bg-green-50 border-green-500 text-green-700'
                    : showExplanation && index === question.correctAnswer
                    ? 'bg-green-50 border-green-500 text-green-700'
                    : 'bg-gray-50 border-gray-200 hover:border-green-300 hover:bg-green-50'
                } ${showExplanation ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-white border-2 border-gray-300 mr-3 flex items-center justify-center text-sm font-medium">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                  {showExplanation && index === question.correctAnswer && (
                    <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                  )}
                  {showExplanation && selectedAnswer === index && index !== question.correctAnswer && (
                    <XCircle className="w-5 h-5 text-red-600 ml-auto" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-bold text-blue-900 mb-2">Explanation:</h4>
              <p className="text-blue-800 leading-relaxed">{question.explanation}</p>
            </div>
          )}

          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setSelectedScenario(null)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Back to scenarios
            </button>
            
            {!showExplanation ? (
              <button
                onClick={handleAnswerSubmit}
                disabled={selectedAnswer === null}
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all duration-200 flex items-center"
              >
                {currentQuestion < scenario.questions.length - 1 ? 'Next Question' : 'View Results'}
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoneyMoves;
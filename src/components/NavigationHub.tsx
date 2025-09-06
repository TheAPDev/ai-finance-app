
import React, { useState } from 'react';
import { Brain, TrendingUp, Target, Menu, Home } from 'lucide-react';

interface NavigationHubProps {
  activeSection: string | null;
  onSectionChange: (section: 'finance-guide' | 'wealth-tips' | 'money-moves' | null) => void;
}

const BUTTONS = [
  {
    key: 'home',
    icon: <Home className="w-6 h-6 mx-auto" />,
    label: 'Home',
    color: 'from-emerald-500 to-emerald-700 border-emerald-400/20 ring-emerald-300',
    shadow: 'shadow-emerald-500/25',
    isHome: true,
  },
  {
    key: 'finance-guide',
    icon: <Brain className="w-6 h-6 mx-auto" />,
    label: 'Finance Guide',
    color: 'from-blue-600 to-blue-700 border-blue-400/20 ring-blue-300',
    shadow: 'shadow-blue-500/25',
  },
  {
    key: 'wealth-tips',
    icon: <TrendingUp className="w-6 h-6 mx-auto" />,
    label: 'Daily Tips',
    color: 'from-amber-500 to-amber-600 border-amber-400/20 ring-amber-300',
    shadow: 'shadow-amber-500/25',
  },
  {
    key: 'money-moves',
    icon: <Target className="w-6 h-6 mx-auto" />,
    label: 'Money Moves',
    color: 'from-purple-600 to-purple-700 border-purple-400/20 ring-purple-300',
    shadow: 'shadow-purple-500/25',
  },
];

const RADIUS = 110; // px, distance from center for buttons
const LABEL_RADIUS = 180; // px, distance from center for labels
const ANGLE_START = 210; // degrees
const ANGLE_STEP = 60; // degrees between buttons

const NavigationHub: React.FC<NavigationHubProps> = ({ activeSection, onSectionChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    if (isExpanded && activeSection) {
      onSectionChange(null);
    }
    setIsExpanded(!isExpanded);
  };

  const handleSectionClick = (section: string) => {
    if (section === 'home') {
      window.location.href = '/';
      return;
    }
    onSectionChange(section as 'finance-guide' | 'wealth-tips' | 'money-moves');
    setIsExpanded(false);
  };

  // Center of the container
  const containerSize = 320;
  const mainBtnSize = 80;
  const centerX = containerSize / 2;
  const centerY = containerSize / 2;

  return (
  <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50">
      <div className="relative w-[320px] h-[320px]">
        {/* Main circular button centered */}
        <button
          onClick={toggleExpansion}
          title="Open navigation menu"
          className={`w-20 h-20 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 transform hover:scale-110 ${
            isExpanded ? 'rotate-90' : ''
          } border-4 border-emerald-400/20 absolute`}
          style={{
            left: `calc(50% - 40px)`,
            top: `calc(50% - 40px)`
          }}
        >
          <Menu className="w-8 h-8 mx-auto" />
        </button>

        {/* Semicircular expanded buttons around the main button */}
        {BUTTONS.map((btn, i) => {
          // Spread in a semicircle: right side (e.g., 270°, 330°, 30°, 90°) for 4 buttons
          const angle = 270 + (i * 60); // 4 buttons: 270, 330, 30, 90
          const rad = (angle * Math.PI) / 180;
          const r = RADIUS;
          const x = centerX + r * Math.cos(rad) - 32; // 32 = half button size (w-16)
          const y = centerY + r * Math.sin(rad) - 32;
          return (
            <button
              key={btn.key}
              onClick={() => handleSectionClick(btn.key)}
              className={`absolute w-16 h-16 rounded-full bg-gradient-to-br ${btn.color} text-white shadow-xl hover:${btn.shadow} transition-all duration-500 transform hover:scale-110 border-3 ${btn.color.split(' ')[2]} ${
                activeSection === btn.key ? `ring-4 ${btn.color.split(' ')[3]} scale-110` : ''
              } ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transitionDelay: isExpanded ? `${200 + i * 100}ms` : '0ms',
                zIndex: 10,
              }}
            >
              {btn.icon}
            </button>
          );
        })}

        {/* Elegant labels with luxury styling, also in semicircle */}
        {isExpanded && (
          <div className="absolute inset-0 pointer-events-none">
            {BUTTONS.map((btn, i) => {
              const angle = 270 + (i * 60); // match button arc for 4 buttons
              const rad = (angle * Math.PI) / 180;
              const r = LABEL_RADIUS;
              const x = centerX + r * Math.cos(rad) - 60; // 60 = half min label width
              const y = centerY + r * Math.sin(rad) - 20;
              return (
                <div
                  key={btn.label}
                  className="absolute text-lg font-bold text-emerald-800 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-emerald-200 opacity-0 animate-fade-in min-w-[120px] text-center"
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    animationDelay: `${600 + i * 100}ms`,
                    animationFillMode: 'forwards',
                  }}
                >
                  {btn.label}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationHub;
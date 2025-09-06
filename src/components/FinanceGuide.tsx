import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Send, Mic, MicOff, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const FinanceGuide: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hello, ${user?.name} 👋 Welcome to your personal Finance Guide! I'm your AI mentor, here to help you master the sophisticated world of wealth building. Whether you're curious about advanced investment strategies, portfolio optimization, or building generational wealth, I'm ready to provide expert guidance tailored to your financial aspirations. What would you like to explore today?`,
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognition = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognition.current.onerror = () => {
        setIsListening(false);
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // System prompt for Finance Guide
    const systemPrompt = `You are a friendly, professional, and accurate AI finance mentor called 'Finance Guide'. Your goal is to help teens and beginners understand finance, money management, and taxes in a simple, engaging way.\n\nTone & Style Rules:\n- Keep replies short, clear, and to the point.\n- Always sound approachable and supportive, never robotic.\n- Use everyday examples to explain complex ideas.\n- Avoid jargon unless explained simply.\n- Maintain professionalism, but keep a friendly vibe.\n\nBehavior Rules:\n- If asked a question, give a direct, accurate answer.\n- If the topic is complex, break it down into simple steps or analogies.\n- Encourage learning with motivational nudges (e.g., “Great question!”, “Nice step forward!”).\n- Never give financial investment advice, only educational explanations.\n- If user input is unclear, politely ask for clarification.\n\nIdentity:\n- Introduce yourself as “Finance Guide” when asked who you are.\n- Always stay on-topic about finance, money, budgeting, saving, investing basics, and taxes.`;

    try {
      console.log('Sending to API:', inputText);
      const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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',
        },
        body: JSON.stringify({
          model: 'deepseek-ai/deepseek-v3.1',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: inputText }
          ],
          temperature: 0.2,
          top_p: 0.7,
          max_tokens: 8192,
          extra_body: { chat_template_kwargs: { thinking: true } }
        })
      });
      console.log('API response status:', response.status);
      const data = await response.json();
      console.log('API response data:', data);
      const aiText = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiText,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('API error:', error);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, there was an error connecting to the AI service. ' + (error instanceof Error ? error.message : ''),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }
  };

  // Removed getAIResponse; now using real API call

  const handleMicClick = () => {
    if (!recognition.current) {
      alert('Speech recognition is not supported in your browser');
      return;
    }

    if (isListening) {
      recognition.current.stop();
      setIsListening(false);
    } else {
      recognition.current.start();
      setIsListening(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center mr-4 shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-900 bg-clip-text text-transparent">
              Finance Guide
            </h1>
            <p className="text-gray-600 font-medium">Your AI-powered wealth mentor</p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-emerald-100 flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-2xl px-6 py-4 rounded-3xl shadow-lg ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-br-lg'
                    : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 rounded-bl-lg border border-gray-200'
                }`}
              >
                <p className="leading-relaxed font-medium">{message.text}</p>
                <p className={`text-sm mt-3 opacity-70 ${
                  message.sender === 'user' ? 'text-emerald-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-8 border-t border-emerald-100 bg-gradient-to-r from-emerald-50/50 to-gray-50/50">
          <div className="flex items-end space-x-4">
            <div className="flex-1 relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about wealth building, investments, or financial strategy..."
                className="w-full px-6 py-4 pr-16 border-2 border-emerald-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none max-h-32 transition-all duration-300 bg-white/90 backdrop-blur-sm font-medium placeholder-gray-500"
                rows={1}
              />
              <button
                onClick={handleMicClick}
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all duration-300 ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse shadow-lg'
                    : 'text-emerald-600 hover:text-white hover:bg-emerald-600 hover:shadow-lg'
                }`}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-2xl hover:from-emerald-700 hover:to-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-emerald-500/25 font-semibold"
              aria-label="Send message"
              title="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceGuide;
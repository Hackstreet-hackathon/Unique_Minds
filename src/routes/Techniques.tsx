import React from 'react';
import { motion } from 'framer-motion';
import { Clock, BookOpen, BrainCircuit, MessageSquare, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Techniques() {
  const techniques = [
    {
      title: 'Pomodoro Technique',
      icon: <Clock className="w-12 h-12 text-primary-blue" />,
      description: 'Work for 25 minutes, then take a 5-minute break. This helps maintain focus and prevents mental fatigue.',
      details: 'After 4 sessions, take a longer 15-30 minute break.',
      link: '/techniques/pomodoro'
    },
    {
      title: 'Spaced Repetition',
      icon: <BrainCircuit className="w-12 h-12 text-[#10B981]" />,
      description: 'Review information at gradually increasing intervals. Best for long-term retention of facts and vocabulary.',
      details: 'Using flashcards or algorithms like Anki ensures you review right before you forget.',
      link: '/techniques/spaced-repetition'
    },
    {
      title: 'Active Recall',
      icon: <BookOpen className="w-12 h-12 text-[#F59E0B]" />,
      description: 'Test yourself on the material rather than passively re-reading it. It strengthens memory retrieval.',
      details: 'Close your book and write down everything you remember about the topic.',
      link: '/techniques/active-recall'
    },
    {
      title: 'Feynman Technique',
      icon: <MessageSquare className="w-12 h-12 text-[#8B5CF6]" />,
      description: 'Explain a concept in plain, simple terms as if teaching it to a child. Get AI feedback!',
      details: 'If you struggle to explain it simply, that identifies gaps in your own understanding.',
      link: '/techniques/feynman'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex items-center"
        >
          <Link to="/" className="text-gray-400 hover:text-white mr-4 transition duration-300">
            <ArrowLeft className="w-8 h-8" />
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold">Study Techniques</h1>
        </motion.div>
        
        <p className="text-xl text-gray-300 mb-16 max-w-3xl">
          Supercharge your learning with science-backed study methods. Select a technique to start an interactive session.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techniques.map((tech, idx) => (
            <Link to={tech.link} key={idx}>
              <motion.div 
                className="bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700 hover:border-primary-blue transition-colors duration-300 h-full flex flex-col cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="mb-6">{tech.icon}</div>
                <h2 className="text-2xl font-bold mb-4">{tech.title}</h2>
                <p className="text-gray-300 mb-4 flex-grow">{tech.description}</p>
                <div className="bg-gray-900 rounded-lg p-4 text-sm text-gray-400 border-l-4 border-primary-blue mb-4">
                  <span className="font-semibold text-white">Pro Tip: </span>{tech.details}
                </div>
                <div className="flex items-center text-primary-blue font-semibold mt-auto">
                  Start Session <ArrowRight className="ml-2 w-5 h-5" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, X, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

const flashcards = [
  { q: "What is the mitochondria?", a: "The powerhouse of the cell." },
  { q: "What is React?", a: "A JavaScript library for building user interfaces." },
  { q: "What does CSS stand for?", a: "Cascading Style Sheets." }
];

export default function SpacedRepetitionPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      setCompleted(true);
    }
  };

  const reset = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
    setCompleted(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center"
        >
          <Link to="/techniques" className="text-gray-400 hover:text-white mr-4 transition duration-300">
            <ArrowLeft className="w-8 h-8" />
          </Link>
          <h1 className="text-3xl font-bold">Spaced Repetition</h1>
        </motion.div>
        
        {completed ? (
          <div className="text-center bg-gray-800 p-12 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-bold mb-4">Deck Complete!</h2>
            <p className="text-gray-400 mb-6">You've reviewed all your cards for today.</p>
            <button onClick={reset} className="bg-primary-blue hover:bg-blue-600 px-6 py-3 rounded-lg flex items-center justify-center mx-auto transition-colors">
              <RotateCcw className="mr-2" /> Start Over
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center mt-12">
            <div 
              className="bg-gray-800 w-full max-w-lg min-h-[300px] flex items-center justify-center p-8 rounded-xl shadow-lg border border-gray-700 cursor-pointer hover:border-primary-blue transition-colors"
              onClick={() => setShowAnswer(!showAnswer)}
            >
              <h2 className="text-2xl text-center font-medium">
                {showAnswer ? flashcards[currentIndex].a : flashcards[currentIndex].q}
              </h2>
            </div>
            
            <p className="mt-4 text-gray-400">Click card to flip</p>

            {showAnswer && (
              <div className="mt-8 flex space-x-4">
                <button onClick={handleNext} className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg flex items-center transition-colors">
                  <X className="mr-2" /> Hard
                </button>
                <button onClick={handleNext} className="bg-primary-blue hover:bg-blue-600 px-6 py-3 rounded-lg flex items-center transition-colors">
                  Good
                </button>
                <button onClick={handleNext} className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg flex items-center transition-colors">
                  <Check className="mr-2" /> Easy
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

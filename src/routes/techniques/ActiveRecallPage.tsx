import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

export default function ActiveRecallPage() {
  const [isRevealed, setIsRevealed] = useState(false);

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
          <h1 className="text-3xl font-bold">Active Recall</h1>
        </motion.div>
        
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-primary-blue">Topic: Photosynthesis</h2>
            <button 
              onClick={() => setIsRevealed(!isRevealed)}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded flex items-center transition-colors"
            >
              {isRevealed ? <EyeOff className="mr-2 w-4 h-4" /> : <Eye className="mr-2 w-4 h-4" />}
              {isRevealed ? "Hide Text" : "Reveal Text"}
            </button>
          </div>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods from carbon dioxide and water.
            </p>
            <p className={`transition-all duration-300 ${isRevealed ? '' : 'blur-md select-none bg-gray-900 rounded p-1'}`}>
              It generally involves the green pigment chlorophyll and generates oxygen as a byproduct. The overall equation is 6CO2 + 6H2O → C6H12O6 + 6O2.
            </p>
            <p className={`transition-all duration-300 ${isRevealed ? '' : 'blur-md select-none bg-gray-900 rounded p-1'}`}>
              The process occurs in two main stages: light-dependent reactions and light-independent reactions (Calvin cycle).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

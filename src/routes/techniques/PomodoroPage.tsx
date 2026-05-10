import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import PomodoroTimer from '../../components/PomodoroTimer';

export default function PomodoroPage() {
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
          <h1 className="text-3xl font-bold">Pomodoro Technique</h1>
        </motion.div>
        
        <div className="flex justify-center mt-12">
          <PomodoroTimer />
        </div>
      </div>
    </div>
  );
}

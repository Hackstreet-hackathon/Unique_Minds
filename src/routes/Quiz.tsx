"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, ChevronRight, Trophy, ListTodo, User } from 'lucide-react'
import Header from '../components/Header'

const quizQuestion = {
  question: "What is the capital of France?",
  options: ["London", "Berlin", "Paris", "Madrid"],
  correctAnswer: "Paris"
}

export default function QuizPageWithHeader() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isChecked, setIsChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [points, setPoints] = useState(0)
  const [showPointsAnimation, setShowPointsAnimation] = useState(false)

  const handleOptionSelect = (option: string) => {
    if (!isChecked) {
      setSelectedOption(option)
    }
  }

  const handleCheck = () => {
    if (selectedOption) {
      setIsChecked(true)
      const correct = selectedOption === quizQuestion.correctAnswer
      setIsCorrect(correct)
      setShowPointsAnimation(true)
      if (correct) {
        setPoints(prevPoints => prevPoints + 2)
      } else {
        setPoints(prevPoints => Math.max(0, prevPoints - 1))
      }
      setTimeout(() => setShowPointsAnimation(false), 1000)
    }
  }

  const handleSkip = () => {
    setSelectedOption(null)
    setIsChecked(false)
    setIsCorrect(null)
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <Header/>

      {/* Quiz Content */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6 w-full max-w-md relative">
          <h2 className="text-2xl font-bold text-white mb-4">{quizQuestion.question}</h2>
          <div className="space-y-3">
            {quizQuestion.options.map((option, index) => (
              <motion.button
                key={index}
                className={`w-full p-3 text-left rounded-lg transition-colors duration-200 ${
                  selectedOption === option
                    ? isChecked
                      ? isCorrect
                        ? 'bg-[#10B981] text-white'
                        : 'bg-[#EF4444] text-white'
                      : 'bg-[#3B82F6] text-white'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
                onClick={() => handleOptionSelect(option)}
                disabled={isChecked}
                whileHover={!isChecked ? { scale: 1.03 } : {}}
                whileTap={!isChecked ? { scale: 0.98 } : {}}
              >
                {option}
                {isChecked && selectedOption === option && (
                  <motion.span
                    className="float-right"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  >
                    {isCorrect ? (
                      <CheckCircle className="text-white" />
                    ) : (
                      <XCircle className="text-white" />
                    )}
                  </motion.span>
                )}
              </motion.button>
            ))}
          </div>
          <div className="mt-6 flex justify-between">
            <motion.button
              className={`px-4 py-2 rounded-full text-white font-semibold ${
                selectedOption && !isChecked
                  ? 'bg-[#10B981] hover:bg-[#4caf00]'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              onClick={handleCheck}
              disabled={!selectedOption || isChecked}
              whileHover={selectedOption && !isChecked ? { scale: 1.05 } : {}}
              whileTap={selectedOption && !isChecked ? { scale: 0.95 } : {}}
            >
              Check
            </motion.button>
            <motion.button
              className="px-4 py-2 rounded-full bg-gray-700 text-white font-semibold hover:bg-gray-600"
              onClick={handleSkip}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Skip
              <ChevronRight className="inline-block ml-1" />
            </motion.button>
          </div>
          {isChecked && (
            <motion.div
              className={`mt-4 p-3 rounded-lg ${
                isCorrect ? 'bg-[#e5ffd4] text-[#10B981]' : 'bg-[#ffd5d5] text-[#EF4444]'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {isCorrect ? (
                <p className="font-semibold">Correct! Well done!</p>
              ) : (
                <p className="font-semibold">
                  Incorrect. The correct answer is {quizQuestion.correctAnswer}.
                </p>
              )}
            </motion.div>
          )}
          <AnimatePresence>
            {showPointsAnimation && (
              <motion.div
                className={`absolute ${
                  isCorrect ? 'text-[#10B981]' : 'text-[#EF4444]'
                } font-bold text-2xl`}
                initial={{ opacity: 0, y: 50, x: '-50%' }}
                animate={{ opacity: 1, y: -50 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.5 }}
                style={{ left: '50%', bottom: '0' }}
              >
                {isCorrect ? '+2' : '-1'}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
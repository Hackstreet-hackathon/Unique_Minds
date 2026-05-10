import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import { singlePrompt } from '../../store/gemini';

export default function FeynmanPage() {
  const [concept, setConcept] = useState('How Gravity Works');
  const [explanation, setExplanation] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!explanation.trim()) return;
    
    setLoading(true);
    setFeedback('');
    
    const prompt = `Act as an expert mentor evaluating a student using the Feynman Technique. 
    The student is trying to explain the concept of "${concept}".
    Their explanation: "${explanation}"
    
    Provide encouraging feedback. Point out what they got right, what they explained well simply, and identify any gaps in their understanding or areas where they used jargon that could be simplified further. Keep it concise.`;

    try {
      const response = await singlePrompt(prompt);
      setFeedback(response);
    } catch (error) {
      setFeedback("Sorry, I couldn't process your explanation right now. Please try again.");
    } finally {
      setLoading(false);
    }
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
          <h1 className="text-3xl font-bold">Feynman Technique</h1>
        </motion.div>
        
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 mt-12">
          <p className="text-gray-300 mb-6">Explain a concept simply, as if you were teaching it to a child. Our AI mentor will review your explanation and find gaps.</p>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-2">Concept to explain</label>
            <input 
              type="text" 
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-primary-blue transition-colors"
              placeholder="e.g. Gravity, Photosynthesis, React Hooks"
            />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">Your Explanation</label>
              <textarea 
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                rows={5}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:border-primary-blue transition-colors resize-none"
                placeholder={`Explain ${concept} simply...`}
              />
            </div>
            
            <button 
              type="submit"
              disabled={loading || !explanation.trim()}
              className="w-full bg-primary-blue hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg flex items-center justify-center transition-colors"
            >
              {loading ? (
                <span className="animate-pulse">Analyzing...</span>
              ) : (
                <>
                  <Send className="mr-2 w-5 h-5" /> Get Mentor Feedback
                </>
              )}
            </button>
          </form>

          {feedback && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-gray-900 p-6 rounded-lg border-l-4 border-green-500"
            >
              <div className="flex items-center mb-4 text-green-400">
                <Sparkles className="mr-2 w-5 h-5" />
                <h3 className="font-semibold text-lg">AI Mentor Feedback</h3>
              </div>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{feedback}</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

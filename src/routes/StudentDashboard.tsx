"use client"

import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ChevronUp, Award, Trophy, Book, Star, ChevronDown, CheckCircle, XCircle, MessageCircle, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import PomodoroTimer from '../components/PomodoroTimer'

const subjects = [
  { name: "Mathematics", progress: 75, color: "#3B82F6" },
  { name: "Science", progress: 60, color: "#10B981" },
  { name: "History", progress: 85, color: "#F59E0B" },
  { name: "Literature", progress: 70, color: "#EF4444" },
  { name: "Computer Science", progress: 90, color: "#8B5CF6" },
]

const generateWeekData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  return days.map(day => ({
    day,
    score: Math.floor(Math.random() * 100) + 1
  }))
}

const leaderboardData = [
  { name: "Alex", points: 1250, avatar: "/avt-3.png" },
  { name: "Emma", points: 1180, avatar: "/avt-3.png" },
  { name: "Michael", points: 1050, avatar: "/avt-3.png" },
  { name: "Sophia", points: 980, avatar: "/avt-3.png" },
  { name: "Daniel", points: 920, avatar: "/avt-3.png" },
]

const badges = [
  { name: "Quick Learner", icon: <ChevronUp className="h-6 w-6" /> },
  { name: "Top Performer", icon: <Trophy className="h-6 w-6" /> },
  { name: "Bookworm", icon: <Book className="h-6 w-6" /> },
]

const uncompletedTasks = [
  { name: "Complete Math Quiz", progress: 75, subject: "Mathematics" },
  { name: "Read History Chapter 5", progress: 30, subject: "History" },
  { name: "Submit Science Project", progress: 0, subject: "Science" },
  { name: "Write Literature Essay", progress: 50, subject: "Literature" },
  { name: "Complete Coding Challenge", progress: 20, subject: "Computer Science" },
]

export default function EnhancedStudentDashboard() {
  const [points, setPoints] = useState(1120)
  const [streak, setStreak] = useState(5)
  const [rank, setRank] = useState(0)
  const [selectedSubject, setSelectedSubject] = useState(subjects[0])
  const [weekData, setWeekData] = useState(generateWeekData())
  const [animatingBadge, setAnimatingBadge] = useState(null)
  const [showAllLeaderboard, setShowAllLeaderboard] = useState(false)
  const [showAllTasks, setShowAllTasks] = useState(false)
  const [showMentorMessage, setShowMentorMessage] = useState(false)

  useEffect(() => {
    const newLeaderboard = [...leaderboardData, { name: "You", points: points, avatar: "/placeholder.svg?height=40&width=40" }]
    newLeaderboard.sort((a, b) => b.points - a.points)
    const newRank = newLeaderboard.findIndex(user => user.name === "You") + 1
    setRank(newRank)
  }, [points])

  const earnPoints = () => {
    setPoints(prevPoints => prevPoints + 10)
    setStreak(prevStreak => prevStreak + 1)
    setWeekData(generateWeekData())
  }

  const animateBadge = (badgeName:any) => {
    setAnimatingBadge(badgeName)
    setTimeout(() => setAnimatingBadge(null), 1000)
  }

  const getNextFocusRecommendation = () => {
    const lowestProgressTask = uncompletedTasks.reduce((min, task) => task.progress < min.progress ? task : min)
    return `Focus on ${lowestProgressTask.subject}: ${lowestProgressTask.name}`
  }

  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-900 font-sans">
        <Header/>
      <div className="max-w-7xl mx-auto">
        <header className="bg-gray-800 border border-gray-700 rounded-lg mt-10 shadow-sm p-6 mb-6 flex flex-wrap justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <img src="/avt-2.png" alt="Student" className="w-16 h-16 rounded-full mr-4" />
            <div>
              <h1 className="text-2xl font-bold text-white">Welcome back, Student!</h1>
              <p className="text-gray-400">Keep up the great work!</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-xl font-semibold text-[#3B82F6]">{points}</p>
              <p className="text-sm text-gray-400">Points</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold text-[#F59E0B]">{streak}</p>
              <p className="text-sm text-gray-400">Day Streak</p>
            </div>
            <button
              onClick={()=>{
                // earnPoints
                navigate('/quiz')
              }}
              className="px-4 py-2 bg-[#10B981] hover:bg-[#059669] text-white rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:ring-opacity-50"
            >
              Practice Now
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-6">
            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-white">Weekly Performance</h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weekData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-white">Subject Performance</h2>
              <div className="space-y-4">
                {subjects.map((subject) => (
                  <div key={subject.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-200">{subject.name}</span>
                      <span className="text-sm font-medium text-gray-200">{subject.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div
                        className="h-2.5 rounded-full"
                        style={{ width: `${subject.progress}%`, backgroundColor: subject.color }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-white">Uncompleted Tasks</h2>
              <div className="space-y-4">
                {(uncompletedTasks.slice(0, 3)).map((task) => (
                  <div key={task.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      {task.progress > 0 ? (
                        <CheckCircle className="text-[#10B981] mr-2" />
                      ) : (
                        <XCircle className="text-[#EF4444] mr-2" />
                      )}
                      <span className="text-gray-200">{task.name}</span>
                    </div>
                    <div className="w-24 bg-gray-700 rounded-full h-2.5">
                      <div
                        className="h-2.5 rounded-full bg-[#10B981]"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              {uncompletedTasks.length > 3 && (
                <button
                  onClick={() => navigate('/task')}
                  className="mt-4 text-[#3B82F6] hover:underline flex items-center"
                >
                  {showAllTasks ? 'View Less' : 'View More'}
                  <ChevronRight className="ml-1" />
                </button>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <PomodoroTimer />
            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-white">Leaderboard</h2>
              <ol className="space-y-2">
                {(showAllLeaderboard ? leaderboardData : leaderboardData.slice(0, 5)).map((user, index) => (
                  <li key={user.name} className={`flex items-center space-x-3 p-2 rounded-lg ${user.name === 'You' ? 'bg-[#3B82F6] text-white' : ''}`}>
                    <span className="font-semibold w-6">{index + 1}.</span>
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                    <span className="flex-1 text-gray-200">{user.name}</span>
                    <span className="font-semibold text-white">{user.points}</span>
                  </li>
                ))}
                {rank > 5 && !showAllLeaderboard && (
                  <li className="flex items-center space-x-3 p-2 rounded-lg bg-[#3B82F6] text-white">
                    <span className="font-semibold w-6">{rank}.</span>
                    <img src="/placeholder.svg?height=40&width=40" alt="You" className="w-10 h-10 rounded-full" />
                    <span className="flex-1 text-gray-200">You</span>
                    <span className="font-semibold text-white">{points}</span>
                  </li>
                )}
              </ol>
              { (
                <button
                  onClick={() => navigate('/leaderboard')}
                  className="mt-4 text-[#3B82F6] hover:underline flex items-center"
                >
                  {showAllLeaderboard ? 'View Less' : 'View More'}
                  <ChevronRight className="ml-1" />
                </button>
              )}
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-white">Your Badges</h2>
              <div className="flex flex-wrap gap-2">
                {badges.map((badge) => (
                  <div
                    key={badge.name}
                    className={`flex items-center space-x-2 bg-gray-900 rounded-full px-3 py-1 cursor-pointer transition-all duration-300 ${
                      animatingBadge === badge.name ? 'animate-pulse scale-110' : ''
                    }`}
                    onClick={() => animateBadge(badge.name)}
                  >
                    {badge.icon}
                    <span className="text-gray-200">{badge.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-white">Connect with Mentor</h2>
              <div className="flex items-center space-x-4 mb-4">
                <img src="/mentor.png" alt="Mentor" className="w-16 h-16 rounded-full" />
                <div>
                  <h3 className="font-semibold text-white">Dr. Smith</h3>
                  <p className="text-sm text-gray-400">Mathematics Expert</p>
                </div>
              </div>
              <button
                onClick={() => {setShowMentorMessage(!showMentorMessage)
                  navigate('/chat')
                }}
                className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white py-2 rounded-lg transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-opacity-50 flex items-center justify-center"
              >
                <MessageCircle className="mr-2" />
                Message Mentor
              </button>
              {showMentorMessage && (
                <div className="mt-4 p-4 bg-gray-900 rounded-lg">
                  <p className="text-sm text-gray-200">{getNextFocusRecommendation()}</p>
                </div>
              )}
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-white">Practice Now</h2>
              <div className="space-y-4">
                <p className="text-gray-400">Choose a subject to practice:</p>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((subject) => (
                    <button
                      key={subject.name}
                      onClick={() => setSelectedSubject(subject)}
                      className={`px-4 py-2 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                        selectedSubject.name === subject.name
                          ? 'bg-[#3B82F6] text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-300'
                      }`}
                    >
                      {subject.name}
                    </button>
                  ))}
                </div>
                <button
                  onClick={earnPoints}
                  className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-2 rounded-lg transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:ring-opacity-50"
                >
                  Start {selectedSubject.name} Lesson
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
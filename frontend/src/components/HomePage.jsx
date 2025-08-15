import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Activity, Target, Calendar, TrendingUp, Users, Clock } from 'lucide-react';

const HomePage = ({ onStartAssessment }) => {
  const features = [
    {
      icon: <Target className="h-8 w-8 neon-blue" />,
      title: "Personalized Assessment",
      description: "Get a custom fitness plan based on your body measurements and fitness level"
    },
    {
      icon: <Activity className="h-8 w-8 neon-green" />,
      title: "Body Fat Analysis",
      description: "Calculate your body fat percentage using proven Navy Method measurements"
    },
    {
      icon: <Calendar className="h-8 w-8 text-purple-400" />,
      title: "Monthly Programs",
      description: "Full-body workouts 3 times per week with progressive overload"
    },
    {
      icon: <TrendingUp className="h-8 w-8 neon-orange" />,
      title: "Progressive Training",
      description: "Exercises tailored to beginner, intermediate, or advanced fitness levels"
    }
  ];

  const stats = [
    { number: "6-8", label: "Exercises per workout", icon: <Activity className="h-5 w-5" /> },
    { number: "3", label: "Days per week", icon: <Calendar className="h-5 w-5" /> },
    { number: "45-60", label: "Minutes per session", icon: <Clock className="h-5 w-5" /> },
    { number: "100%", label: "Personalized", icon: <Users className="h-5 w-5" /> }
  ];

  return (
    <div className="min-h-screen bg-brand-gradient">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Your Fitness
              <span className="neon-orange block">
                Journey Starts Here
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Get a personalized monthly workout program based on your body composition, 
              fitness level, and preferred training location. Science-backed assessments 
              meet customized programming with 3D exercise demonstrations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={onStartAssessment}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-4 text-lg font-semibold shadow-xl transform transition hover:scale-105 pulse-orange"
              >
                Start Your Assessment
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-orange-500/50 hover:border-orange-500 text-orange-400 hover:bg-orange-500/10 px-8 py-4 text-lg font-semibold"
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="text-orange-400 mr-2">{stat.icon}</div>
                    <div className="text-3xl font-bold neon-orange">{stat.number}</div>
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500/20 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-green-500/20 rounded-full opacity-20 animate-pulse"></div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose Our Program?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Every aspect of your program is tailored to your unique body composition, 
              experience level, and workout preferences with visual exercise demonstrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gray-800/50 border-orange-500/30">
                <CardContent className="p-8 text-center">
                  <div className="mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* New Features Section */}
      <div className="py-24 bg-gradient-to-r from-gray-900/80 to-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Enhanced Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-orange-500/10 p-6 rounded-lg border border-orange-500/30">
              <div className="text-4xl neon-orange mb-4">📊</div>
              <h3 className="text-xl font-semibold text-white mb-2">Calorie Tracking</h3>
              <p className="text-gray-400">Advanced calorie counter with macro tracking and personalized nutrition goals</p>
            </div>
            <div className="bg-green-500/10 p-6 rounded-lg border border-green-500/30">
              <div className="text-4xl neon-green mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-white mb-2">3D Exercise Demos</h3>
              <p className="text-gray-400">Visual demonstrations showing proper form and technique for every exercise</p>
            </div>
            <div className="bg-blue-500/10 p-6 rounded-lg border border-blue-500/30">
              <div className="text-4xl neon-blue mb-4">💊</div>
              <h3 className="text-xl font-semibold text-white mb-2">Supplement Guide</h3>
              <p className="text-gray-400">Evidence-based supplement recommendations with dosages and timing</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-orange-600 to-red-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Fitness?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Take our comprehensive assessment and get your personalized monthly 
            workout program with 3D exercise demonstrations and calorie tracking in just 5 minutes.
          </p>
          <Button 
            size="lg"
            onClick={onStartAssessment}
            className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl transform transition hover:scale-105"
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Activity, Target, Calendar, TrendingUp, Users, Clock } from 'lucide-react';

const HomePage = ({ onStartAssessment }) => {
  const features = [
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: "Personalized Assessment",
      description: "Get a custom fitness plan based on your body measurements and fitness level"
    },
    {
      icon: <Activity className="h-8 w-8 text-green-600" />,
      title: "Body Fat Analysis",
      description: "Calculate your body fat percentage using proven Navy Method measurements"
    },
    {
      icon: <Calendar className="h-8 w-8 text-purple-600" />,
      title: "Monthly Programs",
      description: "Full-body workouts 3 times per week with progressive overload"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-orange-600" />,
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Your Fitness
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                Journey Starts Here
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Get a personalized monthly workout program based on your body composition, 
              fitness level, and preferred training location. Science-backed assessments 
              meet customized programming.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={onStartAssessment}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-xl transform transition hover:scale-105"
              >
                Start Your Assessment
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-gray-300 hover:border-blue-600 px-8 py-4 text-lg font-semibold"
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="text-blue-600 mr-2">{stat.icon}</div>
                    <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
                  </div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Program?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every aspect of your program is tailored to your unique body composition, 
              experience level, and workout preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Fitness?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Take our comprehensive assessment and get your personalized monthly 
            workout program in just 5 minutes.
          </p>
          <Button 
            size="lg"
            onClick={onStartAssessment}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl transform transition hover:scale-105"
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
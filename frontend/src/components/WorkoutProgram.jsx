import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { ArrowLeft, Calendar, Clock, Target, TrendingUp } from 'lucide-react';

const WorkoutProgram = ({ userData, onBack }) => {
  // Calculate body fat percentage using Navy Method
  const calculateBodyFat = () => {
    const { height, waistSize, neckSize, hipSize, gender } = userData;
    const heightCm = parseFloat(height);
    const waist = parseFloat(waistSize);
    const neck = parseFloat(neckSize);
    const hip = parseFloat(hipSize);

    if (gender === 'male') {
      const bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(heightCm)) - 450;
      return Math.max(5, Math.min(50, bodyFat));
    } else {
      const bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(heightCm)) - 450;
      return Math.max(10, Math.min(50, bodyFat));
    }
  };

  const bodyFatPercentage = calculateBodyFat().toFixed(1);

  // Mock workout data based on user preferences
  const workoutPlan = {
    beginner: {
      home: [
        { name: 'Bodyweight Squats', sets: '3', reps: '10-15', rest: '60s' },
        { name: 'Push-ups (Modified if needed)', sets: '3', reps: '5-12', rest: '60s' },
        { name: 'Lunges', sets: '3', reps: '8-12 each leg', rest: '60s' },
        { name: 'Plank', sets: '3', reps: '20-30s', rest: '45s' },
        { name: 'Glute Bridges', sets: '3', reps: '12-15', rest: '45s' },
        { name: 'Wall Sit', sets: '2', reps: '20-30s', rest: '60s' }
      ],
      gym: [
        { name: 'Goblet Squats', sets: '3', reps: '10-12', rest: '90s' },
        { name: 'Chest Press Machine', sets: '3', reps: '10-12', rest: '90s' },
        { name: 'Lat Pulldown', sets: '3', reps: '10-12', rest: '90s' },
        { name: 'Leg Press', sets: '3', reps: '12-15', rest: '90s' },
        { name: 'Shoulder Press Machine', sets: '3', reps: '10-12', rest: '60s' },
        { name: 'Assisted Dips', sets: '2', reps: '8-10', rest: '90s' }
      ]
    },
    intermediate: {
      home: [
        { name: 'Jump Squats', sets: '4', reps: '12-15', rest: '60s' },
        { name: 'Push-ups', sets: '4', reps: '10-15', rest: '60s' },
        { name: 'Single-leg Deadlifts', sets: '3', reps: '8-10 each leg', rest: '60s' },
        { name: 'Pike Push-ups', sets: '3', reps: '8-12', rest: '60s' },
        { name: 'Mountain Climbers', sets: '3', reps: '20-30', rest: '45s' },
        { name: 'Burpees', sets: '3', reps: '5-8', rest: '90s' },
        { name: 'Plank to Downward Dog', sets: '3', reps: '8-12', rest: '45s' }
      ],
      gym: [
        { name: 'Barbell Squats', sets: '4', reps: '8-10', rest: '2-3min' },
        { name: 'Bench Press', sets: '4', reps: '8-10', rest: '2-3min' },
        { name: 'Bent-over Rows', sets: '4', reps: '8-10', rest: '2min' },
        { name: 'Overhead Press', sets: '3', reps: '8-10', rest: '2min' },
        { name: 'Romanian Deadlifts', sets: '3', reps: '10-12', rest: '2min' },
        { name: 'Dips', sets: '3', reps: '8-12', rest: '90s' },
        { name: 'Pull-ups/Chin-ups', sets: '3', reps: '5-8', rest: '2min' }
      ]
    },
    advanced: {
      home: [
        { name: 'Pistol Squats (Assisted)', sets: '4', reps: '5-8 each leg', rest: '90s' },
        { name: 'Archer Push-ups', sets: '4', reps: '6-10 each side', rest: '90s' },
        { name: 'Single-arm Plank', sets: '3', reps: '30-45s each', rest: '60s' },
        { name: 'Jump Lunges', sets: '4', reps: '10-15 each leg', rest: '60s' },
        { name: 'Handstand Push-ups (Wall)', sets: '3', reps: '5-8', rest: '2min' },
        { name: 'Explosive Burpees', sets: '4', reps: '8-12', rest: '90s' },
        { name: 'L-Sit Hold', sets: '3', reps: '15-30s', rest: '90s' }
      ],
      gym: [
        { name: 'Back Squats', sets: '5', reps: '5-6', rest: '3min' },
        { name: 'Deadlifts', sets: '4', reps: '5-6', rest: '3min' },
        { name: 'Incline Barbell Press', sets: '4', reps: '6-8', rest: '2-3min' },
        { name: 'Weighted Pull-ups', sets: '4', reps: '6-8', rest: '2-3min' },
        { name: 'Bulgarian Split Squats', sets: '3', reps: '8-10 each leg', rest: '90s' },
        { name: 'Barbell Rows', sets: '4', reps: '6-8', rest: '2min' },
        { name: 'Weighted Dips', sets: '3', reps: '8-10', rest: '2min' }
      ]
    }
  };

  const exercises = workoutPlan[userData.fitnessLevel][userData.location];

  const getBodyFatCategory = (percentage) => {
    const pct = parseFloat(percentage);
    if (userData.gender === 'male') {
      if (pct < 10) return { category: 'Essential Fat', color: 'bg-red-500' };
      if (pct < 14) return { category: 'Athletic', color: 'bg-green-500' };
      if (pct < 18) return { category: 'Fitness', color: 'bg-blue-500' };
      if (pct < 25) return { category: 'Average', color: 'bg-yellow-500' };
      return { category: 'Above Average', color: 'bg-orange-500' };
    } else {
      if (pct < 16) return { category: 'Essential Fat', color: 'bg-red-500' };
      if (pct < 20) return { category: 'Athletic', color: 'bg-green-500' };
      if (pct < 25) return { category: 'Fitness', color: 'bg-blue-500' };
      if (pct < 32) return { category: 'Average', color: 'bg-yellow-500' };
      return { category: 'Above Average', color: 'bg-orange-500' };
    }
  };

  const bodyFatInfo = getBodyFatCategory(bodyFatPercentage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="flex items-center space-x-2 mr-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Assessment</span>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Your Personalized Program</h1>
        </div>

        {/* Body Fat Analysis */}
        <Card className="mb-8 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-6 w-6" />
              <span>Body Composition Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{bodyFatPercentage}%</div>
                <p className="text-gray-600">Body Fat Percentage</p>
              </div>
              <div className="text-center">
                <Badge className={`${bodyFatInfo.color} text-white px-4 py-2 text-lg`}>
                  {bodyFatInfo.category}
                </Badge>
                <p className="text-gray-600 mt-2">Category</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {userData.location === 'gym' ? 'Gym' : 'Home'} Ready
                </div>
                <p className="text-gray-600">Workout Location</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Workout Schedule */}
        <Card className="mb-8 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-6 w-6" />
              <span>Monthly Workout Schedule</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="font-bold text-green-700">3 Days/Week</div>
                <p className="text-sm text-gray-600">Full Body Workouts</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="font-bold text-blue-700">Rest Days</div>
                <p className="text-sm text-gray-600">Active Recovery</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="font-bold text-purple-700">Progressive</div>
                <p className="text-sm text-gray-600">Increase Weekly</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Recommended Schedule:</h4>
              <p className="text-sm text-gray-600">
                <strong>Week Pattern:</strong> Monday, Wednesday, Friday (or any 3 non-consecutive days)<br />
                <strong>Rest Days:</strong> Light walking, stretching, or complete rest<br />
                <strong>Progression:</strong> Increase reps by 1-2 every week or add 5-10lbs to weights
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Workout Exercises */}
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6" />
              <span>Your {userData.fitnessLevel.charAt(0).toUpperCase() + userData.fitnessLevel.slice(1)} Workout Plan</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6 flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>45-60 minutes per session</span>
              </div>
              <div className="flex items-center space-x-1">
                <Target className="h-4 w-4" />
                <span>{exercises.length} exercises per workout</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {exercises.map((exercise, index) => (
                <Card key={index} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg text-gray-900 mb-2">
                          {index + 1}. {exercise.name}
                        </h4>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Sets:</span>
                            <div className="font-semibold text-blue-600">{exercise.sets}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Reps:</span>
                            <div className="font-semibold text-green-600">{exercise.reps}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Rest:</span>
                            <div className="font-semibold text-purple-600">{exercise.rest}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border-l-4 border-l-orange-500">
              <h4 className="font-semibold text-orange-800 mb-2">Important Notes:</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Warm up for 5-10 minutes before starting</li>
                <li>• Focus on proper form over heavy weights</li>
                <li>• Cool down with 5-10 minutes of stretching</li>
                <li>• Stay hydrated throughout your workout</li>
                <li>• Listen to your body and rest when needed</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkoutProgram;
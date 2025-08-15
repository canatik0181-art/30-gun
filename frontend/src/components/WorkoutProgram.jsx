import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Calendar, Clock, Target, TrendingUp, Plus, Minus, Utensils, Pill } from 'lucide-react';

const WorkoutProgram = ({ userData, onBack }) => {
  const [selectedWeek, setSelectedWeek] = useState(1);
  
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

  // Calculate nutrition based on body weight (assuming 70kg for demo)
  const estimatedWeight = 70; // This would come from user input in real app
  const proteinGrams = estimatedWeight * 2;
  const fatGrams = estimatedWeight * 1;
  const proteinCalories = proteinGrams * 4;
  const fatCalories = fatGrams * 9;
  const totalCalories = userData.fitnessLevel === 'beginner' ? 2200 : userData.fitnessLevel === 'intermediate' ? 2400 : 2600;
  const carbCalories = totalCalories - proteinCalories - fatCalories;
  const carbGrams = Math.round(carbCalories / 4);

  // Enhanced workout data with multiple exercise options
  const workoutPlan = {
    beginner: {
      home: [
        { 
          name: 'Bodyweight Squats', 
          sets: '3', 
          reps: '12-15', 
          rest: '60s',
          alternatives: ['Wall Sit Squats', 'Chair Squats', 'Pulse Squats']
        },
        { 
          name: 'Push-ups (Modified if needed)', 
          sets: '3', 
          reps: '8-12', 
          rest: '60s',
          alternatives: ['Knee Push-ups', 'Wall Push-ups', 'Incline Push-ups']
        },
        { 
          name: 'Lunges', 
          sets: '3', 
          reps: '10-12 each leg', 
          rest: '60s',
          alternatives: ['Static Lunges', 'Reverse Lunges', 'Side Lunges']
        },
        { 
          name: 'Plank', 
          sets: '3', 
          reps: '20-30s', 
          rest: '45s',
          alternatives: ['Knee Plank', 'Wall Plank', 'Plank Hold']
        },
        { 
          name: 'Glute Bridges', 
          sets: '3', 
          reps: '12-15', 
          rest: '45s',
          alternatives: ['Single-leg Bridges', 'Bridge Hold', 'Marching Bridge']
        },
        { 
          name: 'Pike Push-ups (Overhead Press Movement)', 
          sets: '3', 
          reps: '5-8', 
          rest: '60s',
          alternatives: ['Wall Pike Push-ups', 'Seated Pike Push-ups', 'Standing Pike']
        }
      ],
      gym: [
        { 
          name: 'Goblet Squats', 
          sets: '3', 
          reps: '10-12', 
          rest: '90s',
          alternatives: ['Back Squats (Light)', 'Leg Press', 'Box Squats']
        },
        { 
          name: 'Chest Press Machine', 
          sets: '3', 
          reps: '10-12', 
          rest: '90s',
          alternatives: ['Dumbbell Bench Press', 'Incline Chest Press', 'Push-ups']
        },
        { 
          name: 'Seated Overhead Press Machine', 
          sets: '3', 
          reps: '8-10', 
          rest: '90s',
          alternatives: ['Dumbbell Shoulder Press', 'Military Press (Light)', 'Pike Push-ups']
        },
        { 
          name: 'Lat Pulldown', 
          sets: '3', 
          reps: '10-12', 
          rest: '90s',
          alternatives: ['Assisted Pull-ups', 'Seated Row', 'Band Pull-downs']
        },
        { 
          name: 'Leg Press', 
          sets: '3', 
          reps: '12-15', 
          rest: '90s',
          alternatives: ['Squats', 'Bulgarian Split Squats', 'Step-ups']
        },
        { 
          name: 'Assisted Dips', 
          sets: '3', 
          reps: '8-10', 
          rest: '90s',
          alternatives: ['Tricep Dips on Bench', 'Close-grip Push-ups', 'Tricep Extensions']
        }
      ]
    },
    intermediate: {
      home: [
        { 
          name: 'Jump Squats', 
          sets: '4', 
          reps: '12-15', 
          rest: '60s',
          alternatives: ['Bodyweight Squats', 'Pulse Squats', 'Single-leg Squats']
        },
        { 
          name: 'Push-ups', 
          sets: '4', 
          reps: '12-15', 
          rest: '60s',
          alternatives: ['Diamond Push-ups', 'Wide Push-ups', 'Decline Push-ups']
        },
        { 
          name: 'Pike Push-ups (Overhead Press)', 
          sets: '4', 
          reps: '8-12', 
          rest: '60s',
          alternatives: ['Handstand Push-ups (Wall)', 'Pike Walks', 'Shoulder Taps']
        },
        { 
          name: 'Single-leg Deadlifts', 
          sets: '3', 
          reps: '8-10 each leg', 
          rest: '60s',
          alternatives: ['Romanian Deadlifts', 'Good Mornings', 'Hip Hinges']
        },
        { 
          name: 'Mountain Climbers', 
          sets: '4', 
          reps: '20-30', 
          rest: '45s',
          alternatives: ['High Knees', 'Burpees', 'Bear Crawls']
        },
        { 
          name: 'Burpees', 
          sets: '3', 
          reps: '8-12', 
          rest: '90s',
          alternatives: ['Half Burpees', 'Squat Thrusts', 'Jump Squats']
        },
        { 
          name: 'Plank to Downward Dog', 
          sets: '3', 
          reps: '10-15', 
          rest: '45s',
          alternatives: ['Regular Plank', 'Side Planks', 'Plank Up-downs']
        }
      ],
      gym: [
        { 
          name: 'Back Squats', 
          sets: '4', 
          reps: '8-10', 
          rest: '2-3min',
          alternatives: ['Front Squats', 'Goblet Squats', 'Leg Press']
        },
        { 
          name: 'Bench Press', 
          sets: '4', 
          reps: '8-10', 
          rest: '2-3min',
          alternatives: ['Dumbbell Bench Press', 'Incline Bench Press', 'Chest Press Machine']
        },
        { 
          name: 'Overhead Press (Military Press)', 
          sets: '4', 
          reps: '6-8', 
          rest: '2-3min',
          alternatives: ['Dumbbell Shoulder Press', 'Push Press', 'Seated Press']
        },
        { 
          name: 'Bent-over Rows', 
          sets: '4', 
          reps: '8-10', 
          rest: '2min',
          alternatives: ['T-Bar Rows', 'Cable Rows', 'Dumbbell Rows']
        },
        { 
          name: 'Romanian Deadlifts', 
          sets: '3', 
          reps: '10-12', 
          rest: '2min',
          alternatives: ['Sumo Deadlifts', 'Stiff-leg Deadlifts', 'Hip Thrusts']
        },
        { 
          name: 'Dips', 
          sets: '3', 
          reps: '8-12', 
          rest: '90s',
          alternatives: ['Assisted Dips', 'Tricep Dips', 'Close-grip Bench Press']
        },
        { 
          name: 'Pull-ups/Chin-ups', 
          sets: '3', 
          reps: '6-10', 
          rest: '2min',
          alternatives: ['Assisted Pull-ups', 'Lat Pulldowns', 'Inverted Rows']
        }
      ]
    },
    advanced: {
      home: [
        { 
          name: 'Pistol Squats (Assisted)', 
          sets: '4', 
          reps: '5-8 each leg', 
          rest: '90s',
          alternatives: ['Jump Squats', 'Shrimp Squats', 'Bulgarian Split Squats']
        },
        { 
          name: 'Archer Push-ups', 
          sets: '4', 
          reps: '6-10 each side', 
          rest: '90s',
          alternatives: ['One-arm Push-ups', 'Clapping Push-ups', 'Diamond Push-ups']
        },
        { 
          name: 'Handstand Push-ups (Wall)', 
          sets: '4', 
          reps: '5-8', 
          rest: '2min',
          alternatives: ['Pike Push-ups', 'Handstand Hold', 'Shoulder Taps']
        },
        { 
          name: 'Single-arm Plank', 
          sets: '3', 
          reps: '30-45s each', 
          rest: '60s',
          alternatives: ['Plank Up-downs', 'Side Planks', 'Plank to Pike']
        },
        { 
          name: 'Jump Lunges', 
          sets: '4', 
          reps: '12-16 each leg', 
          rest: '60s',
          alternatives: ['Bulgarian Split Squats', 'Jumping Split Squats', 'Lateral Lunges']
        },
        { 
          name: 'Explosive Burpees', 
          sets: '4', 
          reps: '10-15', 
          rest: '90s',
          alternatives: ['Regular Burpees', 'Burpee Box Jumps', 'Burpee Pull-ups']
        },
        { 
          name: 'L-Sit Hold', 
          sets: '3', 
          reps: '15-30s', 
          rest: '90s',
          alternatives: ['Hanging Leg Raises', 'V-Sits', 'Russian Twists']
        }
      ],
      gym: [
        { 
          name: 'Back Squats (Heavy)', 
          sets: '5', 
          reps: '5-6', 
          rest: '3min',
          alternatives: ['Front Squats', 'Box Squats', 'Pause Squats']
        },
        { 
          name: 'Bench Press (Progressive)', 
          sets: '5', 
          reps: '5-6', 
          rest: '3min',
          alternatives: ['Incline Bench Press', 'Close-grip Bench', 'Dumbbell Press']
        },
        { 
          name: 'Overhead Press (Heavy)', 
          sets: '4', 
          reps: '4-6', 
          rest: '3min',
          alternatives: ['Push Press', 'Seated Press', 'Dumbbell Press']
        },
        { 
          name: 'Deadlifts', 
          sets: '4', 
          reps: '5-6', 
          rest: '3min',
          alternatives: ['Sumo Deadlifts', 'Romanian Deadlifts', 'Trap Bar Deadlifts']
        },
        { 
          name: 'Weighted Pull-ups', 
          sets: '4', 
          reps: '6-8', 
          rest: '2-3min',
          alternatives: ['Regular Pull-ups', 'Chin-ups', 'Lat Pulldowns (Heavy)']
        },
        { 
          name: 'Bulgarian Split Squats (Weighted)', 
          sets: '3', 
          reps: '8-10 each leg', 
          rest: '90s',
          alternatives: ['Lunges', 'Step-ups', 'Single-leg Press']
        },
        { 
          name: 'Weighted Dips', 
          sets: '3', 
          reps: '8-10', 
          rest: '2min',
          alternatives: ['Regular Dips', 'Close-grip Bench', 'Tricep Extensions']
        }
      ]
    }
  };

  const exercises = workoutPlan[userData.fitnessLevel][userData.location];

  const supplements = [
    {
      name: 'Creatine Monohydrate',
      dosage: '3-5g daily',
      benefits: [
        'Increases muscle strength and power output',
        'Improves high-intensity exercise performance',
        'Accelerates muscle recovery between sets',
        'Supports muscle mass growth when combined with resistance training',
        'Enhances brain function and mental clarity'
      ],
      timing: 'Take anytime - timing doesn\'t matter for creatine'
    },
    {
      name: 'Whey Protein Powder',
      dosage: '25-30g per serving',
      benefits: [
        'Provides high-quality complete protein for muscle building',
        'Fast absorption for post-workout recovery',
        'Helps meet daily protein requirements easily',
        'Contains all essential amino acids including BCAAs',
        'Supports muscle protein synthesis for up to 3 hours'
      ],
      timing: 'Post-workout within 30 minutes, or anytime to meet protein goals'
    }
  ];

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

  const progressiveWeeks = [
    { week: 1, modifier: 1.0, note: 'Base week - focus on form' },
    { week: 2, modifier: 1.1, note: 'Increase reps by 10%' },
    { week: 3, modifier: 1.2, note: 'Increase reps by 20% or add weight' },
    { week: 4, modifier: 0.8, note: 'Deload week - reduce intensity' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="flex items-center space-x-2 mr-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Assessment</span>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Your Complete Fitness Program</h1>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="workouts">Workouts</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="supplements">Supplements</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Body Fat Analysis */}
            <Card className="shadow-xl">
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

            {/* Program Overview */}
            <Card className="shadow-xl">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-6 w-6" />
                  <span>Monthly Program Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="font-bold text-green-700">3 Days/Week</div>
                    <p className="text-sm text-gray-600">Full Body Workouts</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="font-bold text-blue-700">{exercises.length} Exercises</div>
                    <p className="text-sm text-gray-600">Per workout session</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="font-bold text-purple-700">Progressive</div>
                    <p className="text-sm text-gray-600">Weekly increases</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="font-bold text-orange-700">45-60min</div>
                    <p className="text-sm text-gray-600">Per session</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workouts" className="space-y-8">
            {/* Progressive Overload Schedule */}
            <Card className="shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-6 w-6" />
                  <span>4-Week Progressive Overload Plan</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  {progressiveWeeks.map((week) => (
                    <div 
                      key={week.week}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedWeek === week.week 
                          ? 'border-purple-500 bg-purple-50' 
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                      onClick={() => setSelectedWeek(week.week)}
                    >
                      <div className="font-bold text-gray-900">Week {week.week}</div>
                      <div className="text-sm text-purple-600">
                        {week.modifier === 1.0 ? 'Base' : week.modifier < 1.0 ? 'Deload' : `+${Math.round((week.modifier - 1) * 100)}%`}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{week.note}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Workout Exercises */}
            <Card className="shadow-xl">
              <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-6 w-6" />
                  <span>Your {userData.fitnessLevel.charAt(0).toUpperCase() + userData.fitnessLevel.slice(1)} Workout Plan - Week {selectedWeek}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {exercises.map((exercise, index) => {
                    const currentWeek = progressiveWeeks[selectedWeek - 1];
                    const adjustedReps = exercise.reps.includes('-') 
                      ? exercise.reps.split('-').map(r => Math.round(parseInt(r) * currentWeek.modifier)).join('-')
                      : exercise.reps;
                    
                    return (
                      <Card key={index} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg text-gray-900 mb-2">
                                {index + 1}. {exercise.name}
                              </h4>
                              <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                                <div>
                                  <span className="text-gray-600">Sets:</span>
                                  <div className="font-semibold text-blue-600">{exercise.sets}</div>
                                </div>
                                <div>
                                  <span className="text-gray-600">Reps:</span>
                                  <div className="font-semibold text-green-600">{adjustedReps}</div>
                                </div>
                                <div>
                                  <span className="text-gray-600">Rest:</span>
                                  <div className="font-semibold text-purple-600">{exercise.rest}</div>
                                </div>
                              </div>
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-sm text-gray-700 font-medium mb-2">Alternative Exercises:</p>
                                <div className="flex flex-wrap gap-2">
                                  {exercise.alternatives.map((alt, altIndex) => (
                                    <Badge key={altIndex} variant="outline" className="text-xs">
                                      {alt}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border-l-4 border-l-orange-500">
                  <h4 className="font-semibold text-orange-800 mb-2">Week {selectedWeek} Focus:</h4>
                  <p className="text-orange-700 mb-4">{progressiveWeeks[selectedWeek - 1].note}</p>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Warm up for 5-10 minutes before starting</li>
                    <li>• Focus on proper form over heavy weights</li>
                    <li>• Cool down with 5-10 minutes of stretching</li>
                    <li>• {userData.fitnessLevel === 'advanced' ? 'Use progressive overload - add weight when you can complete all sets with perfect form' : 'Master the movement pattern before increasing intensity'}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nutrition" className="space-y-8">
            <Card className="shadow-xl">
              <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-700 text-white">
                <CardTitle className="flex items-center space-x-2">
                  <Utensils className="h-6 w-6" />
                  <span>Personalized Nutrition Plan</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">{proteinGrams}g</div>
                    <p className="text-gray-600">Protein Daily</p>
                    <p className="text-xs text-gray-500">2x body weight</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-3xl font-bold text-yellow-600">{fatGrams}g</div>
                    <p className="text-gray-600">Fats Daily</p>
                    <p className="text-xs text-gray-500">1x body weight</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">{carbGrams}g</div>
                    <p className="text-gray-600">Carbs Daily</p>
                    <p className="text-xs text-gray-500">Remaining calories</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600">{totalCalories}</div>
                    <p className="text-gray-600">Total Calories</p>
                    <p className="text-xs text-gray-500">Daily target</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-3">Protein Sources</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Chicken breast (25g per 100g)</li>
                      <li>• Lean beef (26g per 100g)</li>
                      <li>• Fish/Salmon (25g per 100g)</li>
                      <li>• Eggs (6g per egg)</li>
                      <li>• Greek yogurt (10g per 100g)</li>
                      <li>• Protein powder (25g per scoop)</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-3">Healthy Fats</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Avocado (15g per half)</li>
                      <li>• Nuts/Almonds (14g per 30g)</li>
                      <li>• Olive oil (14g per tbsp)</li>
                      <li>• Salmon (13g per 100g)</li>
                      <li>• Egg yolks (5g per yolk)</li>
                      <li>• Nut butters (16g per 2 tbsp)</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-3">Complex Carbs</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Brown rice (23g per 100g cooked)</li>
                      <li>• Oats (12g per 100g cooked)</li>
                      <li>• Sweet potato (20g per 100g)</li>
                      <li>• Quinoa (22g per 100g cooked)</li>
                      <li>• Whole grain bread (12g per slice)</li>
                      <li>• Fruits and vegetables</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-4">Food Tracking Tips</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>
                      <p className="font-medium mb-2">Meal Timing:</p>
                      <ul className="space-y-1">
                        <li>• Pre-workout: Carbs + small protein (1-2h before)</li>
                        <li>• Post-workout: Protein + carbs (within 30 min)</li>
                        <li>• Spread protein evenly throughout the day</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Tracking Methods:</p>
                      <ul className="space-y-1">
                        <li>• Use apps like MyFitnessPal or Cronometer</li>
                        <li>• Weigh foods for accuracy</li>
                        <li>• Track everything you eat and drink</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="supplements" className="space-y-8">
            <Card className="shadow-xl">
              <CardHeader className="bg-gradient-to-r from-orange-600 to-red-700 text-white">
                <CardTitle className="flex items-center space-x-2">
                  <Pill className="h-6 w-6" />
                  <span>Recommended Supplements</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-8">
                  {supplements.map((supplement, index) => (
                    <Card key={index} className="border-l-4 border-l-orange-500">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{supplement.name}</h3>
                            <p className="text-lg text-orange-600 font-semibold">{supplement.dosage}</p>
                          </div>
                          <Badge className="bg-orange-100 text-orange-800">Essential</Badge>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-800 mb-2">Benefits:</h4>
                          <ul className="space-y-2">
                            {supplement.benefits.map((benefit, benefitIndex) => (
                              <li key={benefitIndex} className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-700">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="bg-orange-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-orange-800 mb-1">When to Take:</h4>
                          <p className="text-orange-700">{supplement.timing}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-l-blue-500">
                  <h4 className="font-semibold text-blue-800 mb-2">Important Notes:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Supplements are additions to, not replacements for, a balanced diet</li>
                    <li>• Consult with a healthcare provider before starting any new supplements</li>
                    <li>• Quality matters - choose reputable brands with third-party testing</li>
                    <li>• Stay consistent with timing and dosage for best results</li>
                    <li>• Creatine may take 2-4 weeks to show full effects</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-8">
            <Card className="shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-700 text-white">
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-6 w-6" />
                  <span>Progress Tracking</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Workout Progress</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">Track these metrics weekly:</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Reps completed for each exercise</li>
                        <li>• Weight used (if applicable)</li>
                        <li>• Rest time between sets</li>
                        <li>• Overall workout duration</li>
                        <li>• Energy levels (1-10)</li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Body Progress</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">Measure monthly:</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Body weight</li>
                        <li>• Body measurements (waist, chest, arms)</li>
                        <li>• Progress photos</li>
                        <li>• How clothes fit</li>
                        <li>• Strength improvements</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WorkoutProgram;
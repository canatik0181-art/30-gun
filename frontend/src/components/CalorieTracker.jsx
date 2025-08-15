import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { Plus, Minus, Utensils, Target, TrendingUp, Clock, Trash2 } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const CalorieTracker = ({ userData }) => {
  const [meals, setMeals] = useState([]);
  const [newMeal, setNewMeal] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    mealType: 'breakfast'
  });
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const { toast } = useToast();

  // Calculate daily targets based on user data
  const weight = userData?.weight ? parseFloat(userData.weight) : 70;
  const dailyTargets = {
    calories: userData?.fitnessLevel === 'beginner' ? 2200 : userData?.fitnessLevel === 'intermediate' ? 2400 : 2600,
    protein: weight * 2,
    fat: weight * 1,
    carbs: 0 // Will be calculated
  };
  dailyTargets.carbs = Math.round((dailyTargets.calories - (dailyTargets.protein * 4) - (dailyTargets.fat * 9)) / 4);

  // Calculate current totals
  const currentTotals = meals.reduce((totals, meal) => ({
    calories: totals.calories + (parseFloat(meal.calories) || 0),
    protein: totals.protein + (parseFloat(meal.protein) || 0),
    carbs: totals.carbs + (parseFloat(meal.carbs) || 0),
    fat: totals.fat + (parseFloat(meal.fat) || 0)
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  const addMeal = () => {
    if (!newMeal.name || !newMeal.calories) {
      toast({
        title: "Missing Information",
        description: "Please enter at least meal name and calories.",
        variant: "destructive"
      });
      return;
    }

    const meal = {
      id: Date.now(),
      ...newMeal,
      calories: parseFloat(newMeal.calories) || 0,
      protein: parseFloat(newMeal.protein) || 0,
      carbs: parseFloat(newMeal.carbs) || 0,
      fat: parseFloat(newMeal.fat) || 0,
      timestamp: new Date().toLocaleTimeString()
    };

    setMeals([...meals, meal]);
    setNewMeal({
      name: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      mealType: 'breakfast'
    });

    toast({
      title: "Meal Added!",
      description: `${meal.name} has been added to your food log.`
    });
  };

  const removeMeal = (mealId) => {
    setMeals(meals.filter(meal => meal.id !== mealId));
    toast({
      title: "Meal Removed",
      description: "Meal has been removed from your food log."
    });
  };

  const calculateProgress = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const getMealTypeColor = (mealType) => {
    const colors = {
      breakfast: 'bg-yellow-500',
      lunch: 'bg-green-500',
      dinner: 'bg-blue-500',
      snack: 'bg-purple-500'
    };
    return colors[mealType] || 'bg-gray-500';
  };

  // Quick add common foods
  const quickFoods = [
    { name: 'Banana', calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
    { name: 'Chicken Breast (100g)', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { name: 'Brown Rice (1 cup)', calories: 216, protein: 5, carbs: 45, fat: 1.8 },
    { name: 'Greek Yogurt (200g)', calories: 130, protein: 20, carbs: 9, fat: 0.4 },
    { name: 'Almonds (30g)', calories: 174, protein: 6.4, carbs: 6.1, fat: 15.2 },
    { name: 'Oats (50g dry)', calories: 190, protein: 6.7, carbs: 32.4, fat: 3.4 }
  ];

  const addQuickFood = (food) => {
    const meal = {
      id: Date.now(),
      ...food,
      mealType: newMeal.mealType,
      timestamp: new Date().toLocaleTimeString()
    };
    setMeals([...meals, meal]);
    toast({
      title: "Quick Food Added!",
      description: `${food.name} has been added to your food log.`
    });
  };

  return (
    <div className="space-y-8">
      {/* Daily Overview */}
      <Card className="calorie-card shadow-xl">
        <CardHeader className="bg-gradient-to-r from-orange-600 to-red-700 text-white">
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-6 w-6" />
            <span>Daily Nutrition Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Calories */}
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="rgba(255, 69, 0, 0.2)"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="#FF4500"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - calculateProgress(currentTotals.calories, dailyTargets.calories) / 100)}`}
                    className="progress-ring"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold neon-orange">
                    {Math.round(calculateProgress(currentTotals.calories, dailyTargets.calories))}%
                  </span>
                </div>
              </div>
              <div className="text-2xl font-bold neon-orange">{Math.round(currentTotals.calories)}</div>
              <div className="text-sm text-gray-400">/ {dailyTargets.calories} cal</div>
              <div className="text-xs text-gray-500 mt-1">Calories</div>
            </div>

            {/* Protein */}
            <div className="text-center">
              <div className="mb-4">
                <div className="text-2xl font-bold neon-blue">{Math.round(currentTotals.protein)}g</div>
                <div className="text-sm text-gray-400">/ {dailyTargets.protein}g</div>
                <Progress 
                  value={calculateProgress(currentTotals.protein, dailyTargets.protein)} 
                  className="mt-2 h-2"
                />
              </div>
              <div className="text-xs text-gray-500">Protein</div>
            </div>

            {/* Carbs */}
            <div className="text-center">
              <div className="mb-4">
                <div className="text-2xl font-bold neon-green">{Math.round(currentTotals.carbs)}g</div>
                <div className="text-sm text-gray-400">/ {dailyTargets.carbs}g</div>
                <Progress 
                  value={calculateProgress(currentTotals.carbs, dailyTargets.carbs)} 
                  className="mt-2 h-2"
                />
              </div>
              <div className="text-xs text-gray-500">Carbs</div>
            </div>

            {/* Fat */}
            <div className="text-center">
              <div className="mb-4">
                <div className="text-2xl font-bold text-yellow-400">{Math.round(currentTotals.fat)}g</div>
                <div className="text-sm text-gray-400">/ {dailyTargets.fat}g</div>
                <Progress 
                  value={calculateProgress(currentTotals.fat, dailyTargets.fat)} 
                  className="mt-2 h-2"
                />
              </div>
              <div className="text-xs text-gray-500">Fat</div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <div className="text-sm text-gray-400">
              Remaining: <span className="neon-orange font-semibold">
                {Math.max(0, dailyTargets.calories - currentTotals.calories)} calories
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Add Food */}
        <Card className="calorie-card shadow-xl">
          <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-700 text-white">
            <CardTitle className="flex items-center space-x-2">
              <Plus className="h-6 w-6" />
              <span>Add Food</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Food Name</Label>
                <Input
                  className="calorie-input"
                  placeholder="e.g., Grilled Chicken"
                  value={newMeal.name}
                  onChange={(e) => setNewMeal({...newMeal, name: e.target.value})}
                />
              </div>
              <div>
                <Label>Meal Type</Label>
                <Select value={newMeal.mealType} onValueChange={(value) => setNewMeal({...newMeal, mealType: value})}>
                  <SelectTrigger className="calorie-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                    <SelectItem value="snack">Snack</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label>Calories</Label>
                <Input
                  className="calorie-input"
                  type="number"
                  placeholder="250"
                  value={newMeal.calories}
                  onChange={(e) => setNewMeal({...newMeal, calories: e.target.value})}
                />
              </div>
              <div>
                <Label>Protein (g)</Label>
                <Input
                  className="calorie-input"
                  type="number"
                  placeholder="25"
                  value={newMeal.protein}
                  onChange={(e) => setNewMeal({...newMeal, protein: e.target.value})}
                />
              </div>
              <div>
                <Label>Carbs (g)</Label>
                <Input
                  className="calorie-input"
                  type="number"
                  placeholder="30"
                  value={newMeal.carbs}
                  onChange={(e) => setNewMeal({...newMeal, carbs: e.target.value})}
                />
              </div>
              <div>
                <Label>Fat (g)</Label>
                <Input
                  className="calorie-input"
                  type="number"
                  placeholder="10"
                  value={newMeal.fat}
                  onChange={(e) => setNewMeal({...newMeal, fat: e.target.value})}
                />
              </div>
            </div>

            <Button 
              onClick={addMeal}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Food
            </Button>

            {/* Quick Add Foods */}
            <div className="border-t border-orange-500/20 pt-4">
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Quick Add:</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {quickFoods.map((food, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => addQuickFood(food)}
                    className="text-xs border-orange-500/30 hover:border-orange-500 hover:bg-orange-500/10"
                  >
                    {food.name}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Food Log */}
        <Card className="calorie-card shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <CardTitle className="flex items-center space-x-2">
              <Utensils className="h-6 w-6" />
              <span>Today's Food Log</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {meals.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <Utensils className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>No meals logged yet today</p>
                  <p className="text-sm">Start by adding your first meal!</p>
                </div>
              ) : (
                meals.map((meal) => (
                  <div key={meal.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-orange-500/20">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getMealTypeColor(meal.mealType)}`}></div>
                      <div>
                        <div className="font-semibold text-white">{meal.name}</div>
                        <div className="text-sm text-gray-400">
                          {Math.round(meal.calories)} cal | P: {Math.round(meal.protein)}g | C: {Math.round(meal.carbs)}g | F: {Math.round(meal.fat)}g
                        </div>
                        <div className="text-xs text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {meal.timestamp}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeMeal(meal.id)}
                      className="border-red-500/30 hover:border-red-500 hover:bg-red-500/10 text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Summary */}
      <Card className="calorie-card shadow-xl">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-700 text-white">
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-6 w-6" />
            <span>Nutrition Tips</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
              <h4 className="font-semibold neon-blue mb-2">Pre-Workout</h4>
              <p className="text-sm text-gray-300">
                Eat 30-60g carbs and 15-25g protein 1-2 hours before training for optimal energy.
              </p>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <h4 className="font-semibold neon-green mb-2">Post-Workout</h4>
              <p className="text-sm text-gray-300">
                Within 30 minutes, consume 25-40g protein and 30-60g carbs to maximize recovery.
              </p>
            </div>
            <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
              <h4 className="font-semibold neon-orange mb-2">Hydration</h4>
              <p className="text-sm text-gray-300">
                Drink at least 2.5-3L water daily. Add 500-750ml per hour of intense training.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalorieTracker;
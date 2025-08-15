import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { ChevronRight, ChevronLeft, Activity, Target, Home, Dumbbell, Scale } from 'lucide-react';

const AssessmentForm = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    location: '',
    age: '',
    height: '',
    weight: '',
    waistSize: '',
    neckSize: '',
    hipSize: '',
    gender: '',
    fitnessLevel: ''
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.location !== '';
      case 2:
        return formData.age && formData.height && formData.weight && formData.gender;
      case 3:
        return formData.waistSize && formData.neckSize && (formData.gender === 'male' || formData.hipSize);
      case 4:
        return formData.fitnessLevel !== '';
      case 5:
        return true; // Summary step
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Activity className="mx-auto h-12 w-12 neon-orange mb-4" />
              <h2 className="text-2xl font-bold text-white">Where will you work out?</h2>
              <p className="text-gray-400 mt-2">Choose your preferred workout location</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card 
                className={`cursor-pointer transition-all bg-gray-800/50 border-orange-500/30 ${formData.location === 'home' ? 'ring-2 ring-orange-500 bg-orange-500/20' : 'hover:shadow-md hover:border-orange-500/50'}`}
                onClick={() => handleInputChange('location', 'home')}
              >
                <CardContent className="p-6 text-center">
                  <Home className="mx-auto h-8 w-8 neon-blue mb-3" />
                  <h3 className="font-semibold text-white">Home Workout</h3>
                  <p className="text-sm text-gray-400 mt-1">Bodyweight and minimal equipment</p>
                </CardContent>
              </Card>
              <Card 
                className={`cursor-pointer transition-all bg-gray-800/50 border-orange-500/30 ${formData.location === 'gym' ? 'ring-2 ring-orange-500 bg-orange-500/20' : 'hover:shadow-md hover:border-orange-500/50'}`}
                onClick={() => handleInputChange('location', 'gym')}
              >
                <CardContent className="p-6 text-center">
                  <Dumbbell className="mx-auto h-8 w-8 neon-blue mb-3" />
                  <h3 className="font-semibold text-white">Gym Workout</h3>
                  <p className="text-sm text-gray-400 mt-1">Full equipment and machines</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Target className="mx-auto h-12 w-12 neon-blue mb-4" />
              <h2 className="text-2xl font-bold text-white">Basic Information</h2>
              <p className="text-gray-400 mt-2">Tell us about yourself</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="age" className="text-gray-300">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="bg-gray-800/50 border-orange-500/30 text-white placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height" className="text-gray-300">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Enter your height"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  className="bg-gray-800/50 border-orange-500/30 text-white placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-gray-300">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Enter your weight"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="bg-gray-800/50 border-orange-500/30 text-white placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-gray-300">Gender</Label>
                <Select onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger className="bg-gray-800/50 border-orange-500/30 text-white">
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-orange-500/30">
                    <SelectItem value="male" className="text-white hover:bg-orange-500/20">Male</SelectItem>
                    <SelectItem value="female" className="text-white hover:bg-orange-500/20">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Scale className="mx-auto h-12 w-12 neon-green mb-4" />
              <h2 className="text-2xl font-bold text-white">Body Measurements</h2>
              <p className="text-gray-400 mt-2">We need these to calculate your body fat percentage</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="waist" className="text-gray-300">Waist Size (cm)</Label>
                <Input
                  id="waist"
                  type="number"
                  placeholder="Measure at naval level"
                  value={formData.waistSize}
                  onChange={(e) => handleInputChange('waistSize', e.target.value)}
                  className="bg-gray-800/50 border-orange-500/30 text-white placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="neck" className="text-gray-300">Neck Size (cm)</Label>
                <Input
                  id="neck"
                  type="number"
                  placeholder="Measure around your neck"
                  value={formData.neckSize}
                  onChange={(e) => handleInputChange('neckSize', e.target.value)}
                  className="bg-gray-800/50 border-orange-500/30 text-white placeholder:text-gray-500"
                />
              </div>
              {formData.gender === 'female' && (
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="hip" className="text-gray-300">Hip Size (cm)</Label>
                  <Input
                    id="hip"
                    type="number"
                    placeholder="Measure at widest point"
                    value={formData.hipSize}
                    onChange={(e) => handleInputChange('hipSize', e.target.value)}
                    className="bg-gray-800/50 border-orange-500/30 text-white placeholder:text-gray-500"
                  />
                </div>
              )}
            </div>
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <h4 className="font-semibold neon-blue mb-2">Measurement Tips:</h4>
              <ul className="text-sm text-blue-300 space-y-1">
                <li>• <strong>Waist:</strong> Measure at the narrowest point, usually just above the belly button</li>
                <li>• <strong>Neck:</strong> Measure just below the Adam's apple (men) or at the narrowest point (women)</li>
                {formData.gender === 'female' && (
                  <li>• <strong>Hips:</strong> Measure at the widest point of your hips</li>
                )}
                <li>• Use a flexible measuring tape and don't pull too tight</li>
              </ul>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Activity className="mx-auto h-12 w-12 neon-orange mb-4" />
              <h2 className="text-2xl font-bold text-white">Fitness Level</h2>
              <p className="text-gray-400 mt-2">What's your current fitness experience?</p>
            </div>
            <div className="space-y-4">
              {[
                { 
                  value: 'beginner', 
                  title: 'Beginner', 
                  desc: 'New to working out or less than 6 months experience',
                  details: 'Focus on form, basic movements, and building consistency'
                },
                { 
                  value: 'intermediate', 
                  title: 'Intermediate', 
                  desc: '6 months to 2 years of regular exercise',
                  details: 'Ready for progressive overload and compound movements'
                },
                { 
                  value: 'advanced', 
                  title: 'Advanced', 
                  desc: 'More than 2 years of consistent training',
                  details: 'Can handle heavy weights and complex movement patterns'
                }
              ].map((level) => (
                <Card 
                  key={level.value}
                  className={`cursor-pointer transition-all bg-gray-800/50 border-orange-500/30 ${formData.fitnessLevel === level.value ? 'ring-2 ring-orange-500 bg-orange-500/20' : 'hover:shadow-md hover:border-orange-500/50'}`}
                  onClick={() => handleInputChange('fitnessLevel', level.value)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-4 h-4 rounded-full border-2 mt-1 ${formData.fitnessLevel === level.value ? 'bg-orange-500 border-orange-500' : 'border-gray-500'}`} />
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{level.title}</h3>
                        <p className="text-sm text-gray-400">{level.desc}</p>
                        <p className="text-xs neon-blue mt-1">{level.details}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Target className="mx-auto h-12 w-12 neon-green mb-4" />
              <h2 className="text-2xl font-bold text-white">Assessment Complete!</h2>
              <p className="text-gray-400 mt-2">Review your information before generating your program</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-orange-500/30">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Personal Info</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Age:</span>
                    <span className="font-semibold text-white">{formData.age} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Gender:</span>
                    <span className="font-semibold text-white capitalize">{formData.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Height:</span>
                    <span className="font-semibold text-white">{formData.height} cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Weight:</span>
                    <span className="font-semibold text-white">{formData.weight} kg</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-orange-500/30">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Program Details</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Location:</span>
                    <span className="font-semibold text-white capitalize">{formData.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Level:</span>
                    <span className="font-semibold text-white capitalize">{formData.fitnessLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Waist:</span>
                    <span className="font-semibold text-white">{formData.waistSize} cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Neck:</span>
                    <span className="font-semibold text-white">{formData.neckSize} cm</span>
                  </div>
                  {formData.gender === 'female' && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Hips:</span>
                      <span className="font-semibold text-white">{formData.hipSize} cm</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-brand-gradient py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-white">Fitness Assessment</h1>
            <span className="text-sm text-gray-400">Step {currentStep} of {totalSteps}</span>
          </div>
          <Progress value={progress} className="h-2 bg-gray-700" />
        </div>

        <Card className="shadow-xl bg-gray-800/50 border-orange-500/30">
          <CardContent className="p-8">
            {renderStep()}
          </CardContent>
        </Card>

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center space-x-2 border-orange-500/50 text-orange-400 hover:bg-orange-500/10"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
          >
            <span>{currentStep === totalSteps ? 'Generate Program' : 'Next'}</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentForm;
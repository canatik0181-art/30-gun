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
              <Activity className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Where will you work out?</h2>
              <p className="text-gray-600 mt-2">Choose your preferred workout location</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card 
                className={`cursor-pointer transition-all ${formData.location === 'home' ? 'ring-2 ring-blue-600 bg-blue-50' : 'hover:shadow-md'}`}
                onClick={() => handleInputChange('location', 'home')}
              >
                <CardContent className="p-6 text-center">
                  <Home className="mx-auto h-8 w-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold">Home Workout</h3>
                  <p className="text-sm text-gray-600 mt-1">Bodyweight and minimal equipment</p>
                </CardContent>
              </Card>
              <Card 
                className={`cursor-pointer transition-all ${formData.location === 'gym' ? 'ring-2 ring-blue-600 bg-blue-50' : 'hover:shadow-md'}`}
                onClick={() => handleInputChange('location', 'gym')}
              >
                <CardContent className="p-6 text-center">
                  <Dumbbell className="mx-auto h-8 w-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold">Gym Workout</h3>
                  <p className="text-sm text-gray-600 mt-1">Full equipment and machines</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Target className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
              <p className="text-gray-600 mt-2">Tell us about yourself</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Enter your height"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Enter your weight"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
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
              <Scale className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Body Measurements</h2>
              <p className="text-gray-600 mt-2">We need these to calculate your body fat percentage</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="waist">Waist Size (cm)</Label>
                <Input
                  id="waist"
                  type="number"
                  placeholder="Measure at naval level"
                  value={formData.waistSize}
                  onChange={(e) => handleInputChange('waistSize', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="neck">Neck Size (cm)</Label>
                <Input
                  id="neck"
                  type="number"
                  placeholder="Measure around your neck"
                  value={formData.neckSize}
                  onChange={(e) => handleInputChange('neckSize', e.target.value)}
                />
              </div>
              {formData.gender === 'female' && (
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="hip">Hip Size (cm)</Label>
                  <Input
                    id="hip"
                    type="number"
                    placeholder="Measure at widest point"
                    value={formData.hipSize}
                    onChange={(e) => handleInputChange('hipSize', e.target.value)}
                  />
                </div>
              )}
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Measurement Tips:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
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
              <Activity className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Fitness Level</h2>
              <p className="text-gray-600 mt-2">What's your current fitness experience?</p>
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
                  className={`cursor-pointer transition-all ${formData.fitnessLevel === level.value ? 'ring-2 ring-blue-600 bg-blue-50' : 'hover:shadow-md'}`}
                  onClick={() => handleInputChange('fitnessLevel', level.value)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-4 h-4 rounded-full border-2 mt-1 ${formData.fitnessLevel === level.value ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`} />
                      <div className="flex-1">
                        <h3 className="font-semibold">{level.title}</h3>
                        <p className="text-sm text-gray-600">{level.desc}</p>
                        <p className="text-xs text-blue-600 mt-1">{level.details}</p>
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
              <Target className="mx-auto h-12 w-12 text-green-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Assessment Complete!</h2>
              <p className="text-gray-600 mt-2">Review your information before generating your program</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Personal Info</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Age:</span>
                    <span className="font-semibold">{formData.age} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gender:</span>
                    <span className="font-semibold capitalize">{formData.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Height:</span>
                    <span className="font-semibold">{formData.height} cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weight:</span>
                    <span className="font-semibold">{formData.weight} kg</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Program Details</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-semibold capitalize">{formData.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Level:</span>
                    <span className="font-semibold capitalize">{formData.fitnessLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Waist:</span>
                    <span className="font-semibold">{formData.waistSize} cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Neck:</span>
                    <span className="font-semibold">{formData.neckSize} cm</span>
                  </div>
                  {formData.gender === 'female' && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hips:</span>
                      <span className="font-semibold">{formData.hipSize} cm</span>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Fitness Assessment</h1>
            <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="shadow-xl">
          <CardContent className="p-8">
            {renderStep()}
          </CardContent>
        </Card>

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
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
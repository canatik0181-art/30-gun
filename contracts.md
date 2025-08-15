# Fitness Assessment App - Backend Integration Contracts

## Current Frontend Implementation Status
- ✅ Complete 5-step assessment form with validation
- ✅ Body fat calculation using Navy Method
- ✅ Progressive overload workout plans (4-week cycles)
- ✅ Personalized nutrition plans with macro calculations
- ✅ Supplement recommendations (Creatine + Protein)
- ✅ Exercise alternatives and variations
- ✅ Multi-tab interface (Overview, Workouts, Nutrition, Supplements, Progress)

## Mock Data Currently Used
The frontend currently uses mock/calculated data in `WorkoutProgram.jsx`:
1. **Body weight estimation**: Fixed at 70kg (line 18)
2. **Workout exercises**: Static arrays based on fitness level and location
3. **Macro calculations**: Based on estimated weight (2x protein, 1x fat)
4. **Progressive weeks**: Static 4-week cycle structure
5. **Supplement data**: Static recommendations

## API Contracts Needed

### 1. User Assessment Endpoint
```
POST /api/assessments
Body: {
  location: "home" | "gym",
  age: number,
  height: number,
  weight: number,
  waistSize: number,
  neckSize: number,
  hipSize?: number,
  gender: "male" | "female",
  fitnessLevel: "beginner" | "intermediate" | "advanced"
}
Response: {
  id: string,
  userId: string,
  bodyFatPercentage: number,
  bodyFatCategory: string,
  bmr: number,
  tdee: number,
  createdAt: timestamp
}
```

### 2. Workout Program Generation
```
POST /api/programs/generate
Body: {
  assessmentId: string,
  preferences?: {
    exerciseAlternatives: boolean,
    progressiveOverload: boolean
  }
}
Response: {
  id: string,
  assessmentId: string,
  workoutPlan: Exercise[],
  nutritionPlan: NutritionPlan,
  supplementPlan: Supplement[],
  progressiveWeeks: Week[]
}
```

### 3. Progress Tracking
```
POST /api/progress
Body: {
  programId: string,
  week: number,
  exerciseProgress: {
    exerciseId: string,
    setsCompleted: number,
    repsCompleted: number,
    weightUsed?: number
  }[]
}
```

### 4. Food Tracking
```
POST /api/nutrition/track
Body: {
  userId: string,
  date: string,
  meals: {
    name: string,
    calories: number,
    protein: number,
    carbs: number,
    fat: number
  }[]
}
```

## Database Schema Requirements

### Users Collection
```javascript
{
  _id: ObjectId,
  email: string,
  name?: string,
  createdAt: Date,
  updatedAt: Date
}
```

### Assessments Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  location: string,
  age: number,
  height: number,
  weight: number,
  waistSize: number,
  neckSize: number,
  hipSize?: number,
  gender: string,
  fitnessLevel: string,
  bodyFatPercentage: number,
  bodyFatCategory: string,
  bmr: number,
  tdee: number,
  createdAt: Date
}
```

### WorkoutPrograms Collection
```javascript
{
  _id: ObjectId,
  assessmentId: ObjectId,
  userId: ObjectId,
  exercises: [{
    name: string,
    sets: string,
    reps: string,
    rest: string,
    alternatives: string[],
    targetMuscles: string[]
  }],
  nutritionPlan: {
    totalCalories: number,
    protein: { grams: number, calories: number },
    carbs: { grams: number, calories: number },
    fat: { grams: number, calories: number }
  },
  supplements: [{
    name: string,
    dosage: string,
    benefits: string[],
    timing: string
  }],
  progressiveWeeks: [{
    week: number,
    modifier: number,
    note: string
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Progress Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  programId: ObjectId,
  week: number,
  date: Date,
  exercises: [{
    exerciseId: string,
    setsCompleted: number,
    repsCompleted: number,
    weightUsed?: number,
    notes?: string
  }],
  overallRating: number, // 1-10
  createdAt: Date
}
```

### FoodTracking Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  date: Date,
  meals: [{
    name: string,
    calories: number,
    protein: number,
    carbs: number,
    fat: number,
    mealType: "breakfast" | "lunch" | "dinner" | "snack"
  }],
  totalCalories: number,
  totalProtein: number,
  totalCarbs: number,
  totalFat: number,
  createdAt: Date
}
```

## Frontend Integration Changes Required

### 1. Replace Mock Data in WorkoutProgram.jsx
- Remove hardcoded `estimatedWeight = 70`
- Use actual weight from `userData.weight`
- Replace static workout arrays with API calls
- Use real assessment data for calculations

### 2. Add API Service Layer
Create `src/services/api.js`:
```javascript
export const createAssessment = async (assessmentData) => {
  // POST to /api/assessments
}

export const generateProgram = async (assessmentId) => {
  // POST to /api/programs/generate
}

export const trackProgress = async (progressData) => {
  // POST to /api/progress
}

export const trackFood = async (foodData) => {
  // POST to /api/nutrition/track
}
```

### 3. Update State Management
- Add loading states for API calls
- Handle error states gracefully
- Store user session/authentication

## Business Logic Implementation

### 1. Body Fat Calculation (Navy Method)
Already implemented in frontend, move to backend for consistency:
```python
def calculate_body_fat(height_cm, waist_cm, neck_cm, hip_cm=None, gender='male'):
    if gender == 'male':
        body_fat = 495 / (1.0324 - 0.19077 * math.log10(waist - neck) + 0.15456 * math.log10(height)) - 450
    else:
        body_fat = 495 / (1.29579 - 0.35004 * math.log10(waist + hip - neck) + 0.22100 * math.log10(height)) - 450
    return max(5 if gender == 'male' else 10, min(50, body_fat))
```

### 2. Workout Generation Logic
Prioritize basic exercises as requested:
- **Primary movements**: Squat, Bench Press, Overhead Press, Deadlift
- **Accessory movements**: Rows, Pull-ups, Dips, Lunges
- **Progressive overload**: 4-week cycles with deload week
- **Exercise alternatives**: 3-4 options per main exercise

### 3. Nutrition Calculations
Based on user weight:
- **Protein**: 2g per kg body weight
- **Fat**: 1g per kg body weight  
- **Carbs**: Remaining calories (total - protein calories - fat calories) / 4
- **Total calories**: Based on fitness level (beginner: 2200, intermediate: 2400, advanced: 2600)

### 4. Progressive Overload Implementation
- **Week 1**: Base weights/reps
- **Week 2**: +10% reps or +5% weight
- **Week 3**: +20% reps or +10% weight
- **Week 4**: Deload (-20% intensity)

## Testing Strategy
1. **Unit tests**: All calculation functions
2. **Integration tests**: API endpoints
3. **E2E tests**: Complete user flow from assessment to program generation
4. **Mock data**: Ensure frontend works with real API responses

## Security Considerations
- Input validation for all assessment data
- Rate limiting on program generation
- User authentication for progress tracking
- Data encryption for sensitive health information
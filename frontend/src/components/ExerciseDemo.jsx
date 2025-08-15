import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Play, Pause, RotateCcw, Info } from 'lucide-react';

const ExerciseDemo = ({ exerciseName, exerciseIndex }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  // Exercise demonstration images
  const exerciseImages = {
    'Back Squats (Heavy)': 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxzdHJlbmd0aCUyMHRyYWluaW5nfGVufDB8fHx8MTc1NTI3MzI0NHww&ixlib=rb-4.1.0&q=85',
    'Bench Press (Progressive)': 'https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxmaXRuZXNzJTIwd29ya291dHxlbnwwfHx8fDE3NTUyNzMyMzl8MA&ixlib=rb-4.1.0&q=85',
    'Overhead Press (Heavy)': 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxzdHJlbmd0aCUyMHRyYWluaW5nfGVufDB8fHx8MTc1NTI3MzI0NHww&ixlib=rb-4.1.0&q=85',
    'Deadlifts': 'https://images.unsplash.com/photo-1521804906057-1df8fdb718b7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHxzdHJlbmd0aCUyMHRyYWluaW5nfGVufDB8fHx8MTc1NTI3MzI0NHww&ixlib=rb-4.1.0&q=85',
    'Weighted Pull-ups': 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwzfHxzdHJlbmd0aCUyMHRyYWluaW5nfGVufDB8fHx8MTc1NTI3MzI0NHww&ixlib=rb-4.1.0&q=85',
    'Bulgarian Split Squats (Weighted)': 'https://images.unsplash.com/photo-1591258370814-01609b341790?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHw0fHxzdHJlbmd0aCUyMHRyYWluaW5nfGVufDB8fHx8fDE3NTUyNzMyNDR8MA&ixlib=rb-4.1.0&q=85',
    'Weighted Dips': 'https://images.unsplash.com/photo-1597075958693-75173d1c837f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwzfHxleGVyY2lzZSUyMGRlbW9uc3RyYXRpb258ZW58MHx8fHwxNzU1MjczMjM0fDA&ixlib=rb-4.1.0&q=85',
    'Back Squats': 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxzdHJlbmd0aCUyMHRyYWluaW5nfGVufDB8fHx8MTc1NTI3MzI0NHww&ixlib=rb-4.1.0&q=85',
    'Bench Press': 'https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxmaXRuZXNzJTIwd29ya291dHxlbnwwfHx8fDE3NTUyNzMyMzl8MA&ixlib=rb-4.1.0&q=85',
    'Overhead Press (Military Press)': 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxzdHJlbmd0aCUyMHRyYWluaW5nfGVufDB8fHx8MTc1NTI3MzI0NHww&ixlib=rb-4.1.0&q=85',
    'Bent-over Rows': 'https://images.unsplash.com/photo-1521804906057-1df8fdb718b7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHxzdHJlbmd0aCUyMHRyYWluaW5nfGVufDB8fHx8MTc1NTI3MzI0NHww&ixlib=rb-4.1.0&q=85',
    'Romanian Deadlifts': 'https://images.unsplash.com/photo-1521804906057-1df8fdb718b7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHxzdHJlbmd0aCUyMHRyYWluaW5nfGVufDB8fHx8MTc1NTI3MzI0NHww&ixlib=rb-4.1.0&q=85',
    'Dips': 'https://images.unsplash.com/photo-1597075958693-75173d1c837f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwzfHxleGVyY2lzZSUyMGRlbW9uc3RyYXRpb258ZW58MHx8fHwxNzU1MjczMjM0fDA&ixlib=rb-4.1.0&q=85',
    'Pull-ups/Chin-ups': 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwzfHxzdHJlbmd0aCUyMHRyYWluaW5nfGVufDB8fHx8MTc1NTI3MzI0NHww&ixlib=rb-4.1.0&q=85',
    // Home exercises
    'Jump Squats': 'https://images.unsplash.com/photo-1720788073779-04a9e709935c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHxleGVyY2lzZSUyMGRlbW9uc3RyYXRpb258ZW58MHx8fHwxNzU1MjczMjM0fDA&ixlib=rb-4.1.0&q=85',
    'Push-ups': 'https://images.unsplash.com/photo-1720788073779-04a9e709935c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHxleGVyY2lzZSUyMGRlbW9uc3RyYXRpb258ZW58MHx8fHwxNzU1MjczMjM0fDA&ixlib=rb-4.1.0&q=85',
    'Pike Push-ups (Overhead Press)': 'https://images.unsplash.com/photo-1734873477108-6837b02f2b9d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxleGVyY2lzZSUyMGRlbW9uc3RyYXRpb258ZW58MHx8fHwxNzU1MjczMjM0fDA&ixlib=rb-4.1.0&q=85',
    'Single-leg Deadlifts': 'https://images.pexels.com/photos/176782/pexels-photo-176782.jpeg',
    'Mountain Climbers': 'https://images.pexels.com/photos/5794019/pexels-photo-5794019.jpeg',
    'Burpees': 'https://images.unsplash.com/photo-1666423489426-0c4db69512fc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHw0fHxleGVyY2lzZSUyMGRlbW9uc3RyYXRpb258ZW58MHx8fHwxNzU1MjczMjM0fDA&ixlib=rb-4.1.0&q=85',
    'Plank to Downward Dog': 'https://images.pexels.com/photos/176782/pexels-photo-176782.jpeg',
    // Beginner exercises
    'Bodyweight Squats': 'https://images.unsplash.com/photo-1720788073779-04a9e709935c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHxleGVyY2lzZSUyMGRlbW9uc3RyYXRpb258ZW58MHx8fHwxNzU1MjczMjM0fDA&ixlib=rb-4.1.0&q=85',
    'Push-ups (Modified if needed)': 'https://images.unsplash.com/photo-1720788073779-04a9e709935c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHxleGVyY2lzZSUyMGRlbW9uc3RyYXRpb258ZW58MHx8fHwxNzU1MjczMjM0fDA&ixlib=rb-4.1.0&q=85',
    'Lunges': 'https://images.pexels.com/photos/5794019/pexels-photo-5794019.jpeg',
    'Plank': 'https://images.pexels.com/photos/176782/pexels-photo-176782.jpeg',
    'Glute Bridges': 'https://images.unsplash.com/photo-1591258370814-01609b341790?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHw0fHxzdHJlbmd0aCUyMHRyYWluaW5nfGVufDB8fHx8fDE3NTUyNzMyNDR8MA&ixlib=rb-4.1.0&q=85',
    'Pike Push-ups (Overhead Press Movement)': 'https://images.unsplash.com/photo-1734873477108-6837b02f2b9d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxleGVyY2lzZSUyMGRlbW9uc3RyYXRpb258ZW58MHx8fHwxNzU1MjczMjM0fDA&ixlib=rb-4.1.0&q=85'
  };

  // Get image for current exercise or fallback
  const getExerciseImage = () => {
    return exerciseImages[exerciseName] || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHw1fHxleGVyY2lzZSUyMGRlbW9uc3RyYXRpb258ZW58MHx8fHwxNzU1MjczMjM0fDA&ixlib=rb-4.1.0&q=85';
  };

  // Exercise form tips
  const getFormTips = () => {
    const tips = {
      'Back Squats (Heavy)': [
        'Keep your chest up and core tight',
        'Break at the hips first, then knees',
        'Go down until thighs are parallel to floor',
        'Drive through your heels to stand up'
      ],
      'Bench Press (Progressive)': [
        'Retract shoulder blades and arch slightly',
        'Lower bar to chest with control',
        'Keep feet planted on the ground',
        'Press up in a straight line'
      ],
      'Overhead Press (Heavy)': [
        'Start with bar at shoulder height',
        'Keep core tight and glutes engaged',
        'Press straight up, not forward',
        'Lock out overhead with biceps by ears'
      ],
      'Deadlifts': [
        'Start with bar over mid-foot',
        'Keep back straight and chest up',
        'Hinge at hips, don\'t squat down',
        'Drive hips forward to lockout'
      ],
      'Push-ups': [
        'Start in high plank position',
        'Keep core tight and body straight',
        'Lower chest to floor with control',
        'Push up explosively'
      ],
      'Bodyweight Squats': [
        'Feet shoulder-width apart',
        'Keep weight on heels',
        'Go down until thighs parallel',
        'Stand up through your heels'
      ]
    };
    return tips[exerciseName] || [
      'Focus on proper form over speed',
      'Control the movement in both directions',
      'Breathe steadily throughout',
      'Stop if you feel any pain'
    ];
  };

  return (
    <div className="exercise-demo-container h-64 relative">
      <img
        src={getExerciseImage()}
        alt={`${exerciseName} demonstration`}
        className="exercise-demo-image w-full h-full object-cover"
        onError={(e) => {
          e.target.src = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHw1fHxleGVyY2lzZSUyMGRlbW9uc3RyYXRpb258ZW58MHx8fHwxNzU1MjczMjM0fDA&ixlib=rb-4.1.0&q=85';
        }}
      />
      
      {/* Overlay controls */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-white font-semibold text-sm">{exerciseName}</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowInfo(!showInfo)}
              className="bg-black/50 border-orange-500/50 text-white hover:bg-orange-500/20"
            >
              <Info className="h-3 w-3" />
            </Button>
          </div>
          
          {showInfo && (
            <Card className="bg-black/80 border-orange-500/30 text-white">
              <CardContent className="p-3">
                <h5 className="text-xs font-semibold neon-orange mb-2">Form Tips:</h5>
                <ul className="text-xs space-y-1">
                  {getFormTips().map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-orange-500 mr-1">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Exercise number badge */}
      <div className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center">
        {exerciseIndex + 1}
      </div>

      {/* "3D Demo" badge */}
      <div className="absolute top-2 right-2 bg-gradient-to-r from-green-500 to-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
        Demo
      </div>
    </div>
  );
};

export default ExerciseDemo;
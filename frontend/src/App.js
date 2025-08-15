import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import HomePage from "./components/HomePage";
import AssessmentForm from "./components/AssessmentForm";
import WorkoutProgram from "./components/WorkoutProgram";

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [userData, setUserData] = useState(null);

  const handleStartAssessment = () => {
    setCurrentView('assessment');
  };

  const handleAssessmentComplete = (data) => {
    setUserData(data);
    setCurrentView('program');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setUserData(null);
  };

  const handleBackToAssessment = () => {
    setCurrentView('assessment');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage onStartAssessment={handleStartAssessment} />;
      case 'assessment':
        return <AssessmentForm onComplete={handleAssessmentComplete} />;
      case 'program':
        return <WorkoutProgram userData={userData} onBack={handleBackToAssessment} />;
      default:
        return <HomePage onStartAssessment={handleStartAssessment} />;
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={renderCurrentView()} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
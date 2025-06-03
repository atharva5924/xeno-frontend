import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import SearchExercises from "./components/SearchExercises.jsx";
import ExerciseDetail from "./pages/ExerciseDetail.jsx";
import Exercises from "./components/Exercises.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchExercises />} />
        <Route path="/s" element={<Exercises />} />
        <Route path="/exercise/:id" element={<ExerciseDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

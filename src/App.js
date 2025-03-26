import './App.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginView from './views/LoginView';

// npm install react-router-dom
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginView />} />
      </Routes>
    </Router>

  );
}

export default App;

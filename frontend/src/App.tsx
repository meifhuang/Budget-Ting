import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Homepage } from './components/pages/Homepage.tsx';
import { SignInPage } from './components/pages/SignInPage.tsx';
import { SignUpPage } from './components/pages/SignUpPage.tsx';
import { Dashboard } from './components/pages/Dashboard.tsx';
import { Income } from "./components/pages/Income.tsx"; 
import { Budget } from "./components/pages/Budget.tsx";
import { Expense } from "./components/pages/Expense.tsx";


export const App = () => {
  return (
    <>   
          <Router>
            <Routes>
              <Route path="/" element={ <Homepage /> } />
              <Route path="/signin" element={ <SignInPage/> } />
              <Route path="/signup" element= { <SignUpPage/> } />
              <Route path="/dashboard" element= { <Dashboard/> } />
              <Route path="/income" element={<Income />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/expense" element={<Expense />} />
            </Routes>
          </Router>
    </>
  )
}
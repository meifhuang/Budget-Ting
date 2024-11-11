import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Homepage } from './Homepage.tsx';
import { SignInPage } from './components/SignInPage';
import { SignUpPage } from './components/SignUpPage';



export const App = () => {
  return (
    <>
        <Router>
          <Routes>
            <Route path="/" element={ <Homepage /> } />
            <Route path="/signin" element={ <SignInPage/> } />
            <Route path="/signup" element= { <SignUpPage/> } />
          </Routes>
        </Router>
    </>
  )
}
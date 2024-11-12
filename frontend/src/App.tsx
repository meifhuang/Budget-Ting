import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Homepage } from './components/pages/Homepage.tsx';
import { SignInPage } from './components/pages/SignInPage.tsx';
import { SignUpPage } from './components/pages/SignUpPage.tsx';



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
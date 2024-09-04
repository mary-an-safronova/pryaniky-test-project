import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { SignInPage } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/" element={<h1>Hello!</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { MainPage, SignInPage } from './pages';
import { ProtectedRouteElement } from "./components";
import { PATH } from "./utils/constants";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.SIGNIN} element={<SignInPage />} />
        <Route path={PATH.HOME} element={<ProtectedRouteElement element={<MainPage />}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

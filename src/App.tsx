import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { MainPage, SignInPage } from "./pages";
import { ProtectedRouteElement } from "./components";
import { PATH } from "./utils/constants";
import { LoadingProvider } from "./services/LoadingProvider";

function App() {
  return (
    <LoadingProvider>
      <BrowserRouter>
        <Routes>
          <Route path={PATH.SIGNIN} element={<SignInPage />} />
          <Route
            path={PATH.HOME}
            element={<ProtectedRouteElement element={<MainPage />} />}
          />
        </Routes>
      </BrowserRouter>
    </LoadingProvider>
  );
}

export default App;

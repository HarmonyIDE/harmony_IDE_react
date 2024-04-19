import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import EditorPage from "./components/pages/EditorPage";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
        {/* <Route path="/:restaurantId" element={<ReservationRoute />}> */}
        {/* <Route index element={<ReservePage />} /> */}
        {/* <Route path="admin" element={<AdminPage />} /> */}
        {/* </Route> */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<EditorPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

function ReservationRoute() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import EditorPage from "./components/pages/EditorPage";

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
        <Route path="/" element={<EditorPage />} />

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

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import BackgroundVideo from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import EditorPage from "./pages/EditorPage";
import SignUpPage from "./pages/SignUpPage";
import BoardPage from "./pages/BoardPage";
import PostForm from "./pages/PostForm";
import PostDetail from "./pages/PostDetail";
import EditPost from "./pages/EditPost";
import MyPage from "./pages/MyPage";


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
        <Route path="/" element={<BackgroundVideo />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<EditorPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/create" element={<PostForm />} />
        <Route path="/board/post/:id" element={<PostDetail />} />
        <Route path="/edit/:id" element={<EditPost />} /> 
        <Route path="/myPage" element={<MyPage />} />
      </Routes>
    </Router>
  );
}

export default App;

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
import PostForm from './components/PostForm';
import BoardPage from './components/BoardPage';
import PostDetail from './components/PostDetail';
import EditPost from './components/EditPost'; // EditPost 컴포넌트를 import 합니다.
import MyPage from './components/pages/MyPage';
import BackgroundVideo from "./components/BackgroundVideo";

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
        <Route path="/edit/:id" element={<EditPost />} /> {/* EditPost 컴포넌트에 대한 경로 설정 */}
        <Route path="/myPage" element={<MyPage />} />
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

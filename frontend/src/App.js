import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, lazy, Suspense } from "react";

import "./App.css";
import Loader from "./Components/Loader/Loader";
import { loadUser } from "./Services/userService";
import ToasterComp from "./Components/Toaster/ToasterComp";
const Header = lazy(() => import("./Components/Header/Header"));
const Login = lazy(() => import("./Components/Login/Login"));
const HomePage = lazy(() => import("./Components/Home/HomePage"));
const UserAccount = lazy(() => import("./Components/UserAccount/UserAccount"));
const CreatePost = lazy(() => import("./Components/CreatePost/CreatePost"));
const SignUp = lazy(() => import("./Components/SignUp/SignUp"));
const UpdateProfile = lazy(() =>
  import("./Components/UpdateProfile/UpdateProfile")
);
const UpdatePassword = lazy(() =>
  import("./Components/UpdatePassword/UpdatePassword")
);
const ForgetPassword = lazy(() =>
  import("./Components/Password/ForgetPassword")
);
const ResetPassword = lazy(() => import("./Components/Password/ResetPassword"));
const UserProfile = lazy(() => import("./Components/UserProfile/UserProfile"));
const Search = lazy(() => import("./Components/Search/Search"));
const NotFound = lazy(() => import("./Components/NotFound/NotFound"));
const Bookmark = lazy(() => import("./Components/Bookmark/Bookmark"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Router>
          {isAuthenticated && <Header />}
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <HomePage /> : <Login />}
            />
            <Route
              path="/account"
              element={isAuthenticated ? <UserAccount /> : <Login />}
            />
            <Route
              path="/bookmark"
              element={isAuthenticated ? <Bookmark /> : <Login />}
            />
            <Route
              path="/newpost"
              element={isAuthenticated ? <CreatePost /> : <Login />}
            />
            <Route
              path="/register"
              element={isAuthenticated ? <UserAccount /> : <SignUp />}
            />
            <Route
              path="/update/profile"
              element={isAuthenticated ? <UpdateProfile /> : <Login />}
            />
            <Route
              path="/update/password"
              element={isAuthenticated ? <UpdatePassword /> : <Login />}
            />
            <Route
              path="/forget/password"
              element={
                isAuthenticated ? <UpdatePassword /> : <ForgetPassword />
              }
            />
            <Route
              path="/password/reset/:token"
              element={isAuthenticated ? <UpdatePassword /> : <ResetPassword />}
            />
            <Route
              path="/user/:id"
              element={isAuthenticated ? <UserProfile /> : <Login />}
            />
            <Route
              path="/search"
              element={isAuthenticated ? <Search /> : <Login />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </Suspense>
      <ToasterComp />
    </div>
  );
}

export default App;

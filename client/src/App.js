import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "./hoc/mainLayout";
import Header from "./components/Navigation/header";
import Home from "./components/Home";
import Auth from "./components/Auth";
import Article from "./components/Articles/article";
import VerifyAccount from "./components/Auth/verification";
import Dashboard from "./components/Dashboard";
import AdminArticles from "./components/Dashboard/Articles";
import AdminProfile from "./components/Dashboard/Profile";
import MainDashboard from "./components/Dashboard/main";
import AddArticle from "./components/Dashboard/Articles/Add/add";
import EditArticle from "./components/Dashboard/Articles/Edit/edit";
import { Loader } from "./utils/helper";
import { isAuth } from "./store/actions/users";
import AuthGuard from "./hoc/authGuard";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(isAuth());
  }, []);

  useEffect(() => {
    if (users.auth !== null) {
      setLoading(false);
    }
  }, [users]);

  return (
    <BrowserRouter>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <MainLayout>
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <AuthGuard>
                    <Dashboard />
                  </AuthGuard>
                }
              >
                <Route index element={<MainDashboard />} />
                <Route path="profile" element={<AdminProfile />} />
                <Route path="articles" element={<AdminArticles />} />
                <Route path="articles/add" element={<AddArticle />} />
                <Route
                  path="articles/edit/:articleId"
                  element={<EditArticle />}
                />
              </Route>
              <Route path="/verification" element={<VerifyAccount />} />
              <Route path="/articles/article/:id" element={<Article />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </MainLayout>
        </>
      )}
    </BrowserRouter>
  );
};

export default App;

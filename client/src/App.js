import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "./hoc/mainLayout";
import Header from "./components/Navigation/header";
import Home from "./components/Home";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import { Loader } from "./utils/helper";
import { isAuth } from "./store/actions/users";

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
              <Route path="/dashboard" element={<Dashboard />} />
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

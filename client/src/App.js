import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainLayout from "./hoc/mainLayout";
import Header from "./components/Navigation/header";
import Home from "./components/Home";
import Auth from "./components/Auth";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <MainLayout>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;

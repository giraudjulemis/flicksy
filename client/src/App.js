import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainLayout from "./hoc/mainLayout";
import Header from "./components/Navigation/header";
import Home from "./components/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Navigation/header";
import Home from "./components/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

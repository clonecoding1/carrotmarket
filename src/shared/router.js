import { Route, Routes } from "react-router-dom";
import Example from "../pages/Example";
import Home from "../pages/Home";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Example />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default Router;

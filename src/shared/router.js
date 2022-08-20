import {Route, Routes} from "react-router-dom";
import Example from "../pages/Example";
import Login from "../pages/Login";
import Write from "../pages/Write";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Example />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/write" element={<Write />} />
    </Routes>
  );
};

export default Router;

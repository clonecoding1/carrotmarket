import {Route, Routes} from "react-router-dom";
import Example from "../pages/Example";
import Login from "../pages/Login";


const Router = () => {
  return (
      <Routes>
        <Route path="/" element={<Example/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
  )
}

export default Router
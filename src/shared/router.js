import {Route, Routes} from "react-router-dom";
import Example from "../pages/Example";


const Router = () => {
  return (
      <Routes>
        <Route path="/" element={<Example/>}/>
      </Routes>
  )
}

export default Router
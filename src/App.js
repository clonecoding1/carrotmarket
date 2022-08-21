import Router from "./shared/router";
import Layout from "./components/common/Layout";
import Main from "./components/common/Main";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import {getCookie} from "./utils/cookie";
import {logIn} from "./redux/modules/tokenSlice";
import {useDispatch} from "react-redux";
import jwtDecode from "jwt-decode";




function App() {
  const dispatch=useDispatch()
  if(getCookie("token")) {
    dispatch(logIn())
    console.log(new Date(jwtDecode(getCookie("token")).exp*1000))
  }
  return (
    <Layout>
      <Header />
      <Main>
        <Router />
      </Main>
      <Footer />
    </Layout>
  );
}

export default App;

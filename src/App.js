import Router from "./shared/router";
import Layout from "./components/common/Layout";
import Main from "./components/common/Main";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import {getCookie} from "./utils/cookie";
import {logIn} from "./redux/modules/tokenSlice";
import {useDispatch} from "react-redux";




function App() {
  const dispatch=useDispatch()
  if(getCookie("token")) {
    dispatch(logIn())
    console.log("로그인했냐")
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

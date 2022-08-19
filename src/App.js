import Router from "./shared/router";
import Layout from "./components/common/Layout";
import Main from "./components/common/Main";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

function App() {
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

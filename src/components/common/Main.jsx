import styled from "styled-components";

const Main = (props) => {
  return <StMain>{props.children}</StMain>;
};

export default Main;

const StMain = styled.main`
  flex: 1;
  overflow: auto;
`;
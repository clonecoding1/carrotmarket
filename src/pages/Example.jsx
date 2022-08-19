import styled from "styled-components";

const Example = () => {
  return <StExample></StExample>;
};

export default Example;

const StExample = styled.div`
  display: flex;
  flex-flow: column;
  button {
    margin-top: 3rem;
  }
`;

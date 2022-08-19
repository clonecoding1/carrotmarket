import styled from "styled-components";
import Swal from "sweetalert2";

const Example = () => {
  const test = () => {
    alert("그냥버튼임");
  };

  const test2 = () => {
    Swal.fire({ icon: "error", text: "스윗버튼" });
  };
  return (
    <StExample>
      <button onClick={test}>그냥 alert</button>
      <button onClick={test2}>스윗 alert</button>
    </StExample>
  );
};

export default Example;

const StExample = styled.div`
  display: flex;
  flex-flow: column;
  button {
    margin-top: 3rem;
  }
`;

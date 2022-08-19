import styled from "styled-components";

const Footer = (props) => {
  return (
    <StFooter>
      {props.children}
    </StFooter>
  )
}

export default Footer

const StFooter = styled.footer`
  height: 100px;
  background-color: red;
`

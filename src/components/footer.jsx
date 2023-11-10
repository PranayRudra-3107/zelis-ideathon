import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  color: #666;
  text-align: center;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>© 2023 Zelis Healthcare All Rights Reserved</p>
      <p>
        <a href="#">Privacy Policy</a> | <a href="#">Terms of Use</a>
      </p>
    </FooterContainer>
  );
};

export default Footer;

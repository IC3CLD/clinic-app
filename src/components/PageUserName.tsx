import React from "react";
import styled from "styled-components";

const Text = styled.p`
  font-weight: 600;
  font-size: 15px;
  line-height: 1.3;
  color: #202225;
`;

type TextProps = {
  children: React.ReactNode;
};

const PageUserName = ({ children }: TextProps) => {
  return <Text>{children}</Text>;
};

export default PageUserName;

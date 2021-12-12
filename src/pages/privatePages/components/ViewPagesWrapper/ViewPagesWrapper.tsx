import React from "react";
import * as Styled from "./ViewPagesWrapperStyles";

// media
import logo from "media/logo.png";
import { useSelector } from "react-redux";
import { getCurrentUserSelector } from "redux/selectors";

type ViewPagesWrapperProps = {
  children: React.ReactNode,
}

const ViewPagesWrapper = ({ children }: ViewPagesWrapperProps) => {
  const currentUser = useSelector(getCurrentUserSelector);
  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.Logo src={logo} alt="Palm Clinic logo" />
        <Styled.HeaderLogoWrapper>
          <Styled.HeaderUserNAmeWrapper>
            <p>
              {currentUser.firstName} {currentUser.lastName}
            </p>
            <p>{currentUser.roleName}</p>
          </Styled.HeaderUserNAmeWrapper>
          <Styled.HeaderUserAvatarWrapper>
            <img src={currentUser.photo} alt="user avatar" />
            <Styled.HeaderUserStatus></Styled.HeaderUserStatus>
          </Styled.HeaderUserAvatarWrapper>
        </Styled.HeaderLogoWrapper>
      </Styled.Header>
      <Styled.AppCardsSection>{children}</Styled.AppCardsSection>
    </Styled.Container>
  );
};

export default ViewPagesWrapper;
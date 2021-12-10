import styled from "styled-components";

// media
import timeSvg from "media/clock-three.svg";
import clipboardSvg from "media/clipboard-blank.svg";

export const ListItem = styled.li`
  padding-left: 24px;
  padding-right: 16px;
  padding-top: 16px;
  padding-bottom: 24px;
  height: 100%;

  background-color: ${(props) => props.theme.colors.inputBackgroundColor};
  box-shadow: 0px 4px 32px rgba(218, 228, 255, 0.24);
  border-radius: 12px;

  @media ${(props) => props.theme.media.tablet} {
    padding: 24px 32px;
    padding-bottom: 40px;
    min-width: 524px;
  }

  @media screen and (min-width: 1440px) {
    min-width: 0;
    width: 406px;
  }
`;

export const ListItemInfoWrapper = styled.div`
  position: relative;
  padding-bottom: 16px;

  display: flex;
  align-items: center;
  &::after {
    position: absolute;
    content: "";

    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;

    background: ${(props) => props.theme.colors.asideInputBorderColor};
    opacity: 0.5;
  }
`;

export const ListItemInfoAvatar = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 16px;
`;

export const ListItemInfoName = styled.p`
  font-weight: ${(props) => props.theme.fonts.boldFontWeight};
  font-size: 17px;
  line-height: 130%;
`;

export const ListItemStatusWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ListItemStatus = styled.span`
  display: block;
  width: ${(props) => props.theme.borderRadius.borderRadius};
  height: ${(props) => props.theme.borderRadius.borderRadius};
  margin-right: ${(props) => props.theme.borderRadius.borderRadius};

  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.pointerColor};
`;

export const ListItemStatusAppointment = styled.p`
  font-size: 13px;
  line-height: 130%;
  color: ${(props) => props.theme.colors.secondaryTextColor};
`;

export const ListItemInfoText = styled.p`
  position: relative;
  margin-top: ${(props) => (props.description ? "23px" : "16px")};
  padding-left: 36px;
  &::before {
    position: absolute;
    content: "";

    top: 0;
    left: 0;

    width: 24px;
    height: 24px;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url(${(props) =>props.description ? clipboardSvg : timeSvg});
  }
  @media ${(props) => props.theme.media.tablet} {
    margin-top: ${(props) => (props.description ? "24px" : "23px")};
  } ;
`;

export const ListItemMore = styled.img`
  width: 24px;
  height: 24px;
  margin-left: auto;
`;

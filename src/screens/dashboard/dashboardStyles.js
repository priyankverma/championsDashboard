import styled from "styled-components";
import { AutoComplete, List } from "antd";
import { device } from "./../../utils/helpers";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: white;
  overflow-y: scroll;
  height: ${(props) => props.height + "px"};
  margin: ${(props) => props.margin};
`;

export const LoaderWrap = styled.div`
  display: flex;
  flex: 1;

  align-items: center;
  justify-content: center;
`;

export const CardWrap = styled.div`
  display: flex;
  margin: 2%;

  border-radius: 1%;

  background-color: transparent;
  width: 68%;
  overflow-x: hidden;
  box-shadow: 0px 0px 10px 2px grey;
  &:hover {
    box-shadow: 0px 0px 15px 5px grey;
  }

  @media ${device.mobileS} {
    width: 90%;
  }
  @media ${device.tablet} {
    width: 68%;
  }
  @media ${device.desktop} {
    width: 68%;
  }
`;

export const StyledAutoComplete = styled(AutoComplete)`
  width: 70%;
  align-self: center;
  @media ${device.mobileS} {
    width: 70%;
  }
  @media ${device.tablet} {
    width: 70%;
  }
  @media ${device.desktop} {
    width: 70%;
  }
`;

export const StyledList = styled(List)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const ModalWrap = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 4%;
`;

export const BoldName = styled.b`
  font-size: 18px;
`;

export const AutoCompleteList = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  background-color: white;
  flex-direction: row;
  align-items: center;
  position: sticky;
  top: 1px;
  z-index: 100;
  padding-top: 6%;
  padding-bottom: 1%;

  @media ${device.mobileS} {
    padding-top: 6%;
  }
  @media ${device.tablet} {
    padding-top: 6%;
  }
  @media ${device.desktop} {
    padding-top: 1%;
  }
`;

export const CardImage = styled.img`
  height: ${(props) => props.height + "px"};
`;

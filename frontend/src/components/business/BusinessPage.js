import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { selectBusiness } from "../../store/businesses";
import ErrorPage from "../common/ErrorPage";
import Container from "../styled/Container";

const PhotoHeader = styled.div`
  background-color: #333;
  color: #fff;
  height: 426px;
  position: relative;
  width: 100%;
`;

const PhotoHeaderContentContainer = styled.div`
  display: flex;
  align-items: flex-end;
  bottom: 0;
  left: 0;
  margin: auto;
  padding: ${(props) => props.theme.spacing.gen(5, 8)};
  position: absolute;
  right: 0;
  top: 0;
`;

const PhotoHeaderContent = styled.div`
  flex: 1 auto;
  pointer-events: none;
  position: relative;
  z-index: 1;
  padding-right: ${(props) => props.theme.spacing.gen(2)};
`;

const MainContainer = styled(Container).attrs(() => ({ as: "main" }))`
  display: flex;
  margin-top: ${(props) => props.theme.spacing.gen(3)};
`;

const MainLeft = styled.div`
  width: 100%;

  ${(props) => props.theme.breakpoints.up("lg")} {
    width: ${(2 / 3) * 100}%;
  }
`;

const MainRight = styled.div`
  display: none;
  width: ${(1 / 3) * 100}%;

  ${(props) => props.theme.breakpoints.up("lg")} {
    display: block;
  }
`;

const Sidebar = styled.div`
  position: sticky;
  top: 18px;
`;

const BusinessPage = () => {
  const { businessId } = useParams();

  const business = useSelector(selectBusiness(businessId));

  return business ? (
    <>
      <PhotoHeader>
        <PhotoHeaderContentContainer>
          <Container>
            <PhotoHeaderContent>
              <h1>{business.name}</h1>
            </PhotoHeaderContent>
          </Container>
        </PhotoHeaderContentContainer>
      </PhotoHeader>
      <MainContainer>
        <MainLeft></MainLeft>
        <MainRight>
          <Sidebar></Sidebar>
        </MainRight>
      </MainContainer>
    </>
  ) : (
    <ErrorPage />
  );
};

export default BusinessPage;

import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

import Card from "../common/Card";
import CardContent from "../common/CardContent";
import Container from "../styled/Container";
import ErrorPage from "../common/ErrorPage";
import Typography from "../common/Typography";
import { Button } from "../styled/Button";
import { addOpacityToHex } from "../../utils/theme";
import { selectBusiness } from "../../store/businesses";
import { useSessionUser } from "../../store/session";

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

  & > * {
    pointer-events: auto;
  }
`;

const EditButton = styled(Button)`
  background-color: ${(props) =>
    addOpacityToHex("fff", props.theme.palette.action.hoverOpacity)};
  font-size: 12px;

  &:hover {
    background-color: ${(props) =>
      addOpacityToHex("fff", props.theme.palette.action.hoverOpacity * 3)};
  }
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

  & > section:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.palette.divider};
    margin-bottom: ${(props) => props.theme.spacing.gen(4)};
    padding-bottom: ${(props) => props.theme.spacing.gen(4)};
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
  const user = useSessionUser();

  return business ? (
    <>
      <PhotoHeader>
        <PhotoHeaderContentContainer>
          <Container>
            <PhotoHeaderContent>
              <Typography variant="h1" gutterBottom>
                {business.name}
              </Typography>
              {business.ownerId === user?.id && (
                <EditButton
                  color="white"
                  variant="text"
                  as={Link}
                  to={`/biz/${businessId}/edit`}
                >
                  Edit
                </EditButton>
              )}
            </PhotoHeaderContent>
          </Container>
        </PhotoHeaderContentContainer>
      </PhotoHeader>
      <MainContainer>
        <MainLeft>
          <section>
            <Typography variant="h4" gutterBottom>
              Location
            </Typography>
            <Typography>
              {business.address}, {business.city}, {business.state}{" "}
              {business.zipCode}
            </Typography>
          </section>
          {business.description && (
            <section>
              <Typography variant="h4" gutterBottom>
                About the Business
              </Typography>
              <Typography>{business.description}</Typography>
            </section>
          )}
        </MainLeft>
        <MainRight>
          <Sidebar>
            <Card>
              <CardContent>
                <Typography>
                  {business.address}, {business.city}, {business.state}{" "}
                  {business.zipCode}
                </Typography>
              </CardContent>
            </Card>
          </Sidebar>
        </MainRight>
      </MainContainer>
    </>
  ) : (
    <ErrorPage />
  );
};

export default BusinessPage;

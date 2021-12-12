import logo from "../../images/logo.png";

import PropTypes from "prop-types";
import styled, { useTheme } from "styled-components";
import { Link, useLocation } from "react-router-dom";

import AuthModals from "./AuthModals";
import Container from "../styled/Container";
import ProfileButton from "./ProfileButton";
import { useSessionUser } from "../../store/session";
import Typography from "../common/Typography";
import NestedThemeProvider from "../theme/NestedThemeProvider";

const Nav = styled.div`
  display: flex;
  height: 64px;
  padding: 2px 0;
  position: ${(props) => props.position};
  width: 100%;
`;

const NavContent = styled(Container)`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
`;

const LogoContainer = styled(Link)`
  align-items: center;
  display: flex;
  text-decoration: none;
`;

const RightNavContainer = styled.div`
  align-items: center;
  display: flex;
`;

const Logo = styled.img`
  height: 60px;
  width: 60px;
`;

const LogoText = styled(Typography)`
  color: ${(props) => props.theme.palette.text.primary};
`;

/**
 *
 * @param {{isLoaded: boolean}} props
 */
const Navigation = ({ isLoaded }) => {
  const sessionUser = useSessionUser();

  const location = useLocation();
  const theme = useTheme();

  const isHomePage = location.pathname === "/";

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} isHomePage={isHomePage} />;
  } else {
    sessionLinks = <AuthModals isHomePage={isHomePage} />;
  }

  return (
    <NestedThemeProvider
      inverted={isHomePage && theme.palette.mode === "light"}
    >
      <Nav position={isHomePage ? "absolute" : "static"}>
        <NavContent justifyContent={isHomePage ? "flex-end" : "space-between"}>
          {!isHomePage && (
            <LogoContainer to="/">
              <LogoText as="span" variant="h4">
                Slurp
              </LogoText>
              <Logo src={logo} alt="" />
            </LogoContainer>
          )}
          <RightNavContainer>{isLoaded && sessionLinks}</RightNavContainer>
        </NavContent>
      </Nav>
    </NestedThemeProvider>
  );
};

Navigation.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
};

export default Navigation;

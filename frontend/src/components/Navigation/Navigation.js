import logo from "../../images/logo.png";

import PropTypes from "prop-types";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

import AuthModals from "./AuthModals";
import Container from "../styled/Container";
import ProfileButton from "./ProfileButton";
import { useSessionUser } from "../../store/session";

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
`;

const RightNavContainer = styled.div`
  align-items: center;
  display: flex;
`;

const Logo = styled.img`
  height: 60px;
  width: 60px;
`;

/**
 *
 * @param {{isLoaded: boolean}} props
 */
const Navigation = ({ isLoaded }) => {
  const sessionUser = useSessionUser();

  const location = useLocation();

  const isHomePage = location.pathname === "/";

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} isHomePage={isHomePage} />;
  } else {
    sessionLinks = <AuthModals isHomePage={isHomePage} />;
  }

  return (
    <Nav position={isHomePage ? "absolute" : "static"}>
      <NavContent justifyContent={isHomePage ? "end" : "space-between"}>
        {!isHomePage && (
          <LogoContainer to="/">
            <span>Slurp</span>
            <Logo src={logo} alt="" />
          </LogoContainer>
        )}
        <RightNavContainer>{isLoaded && sessionLinks}</RightNavContainer>
      </NavContent>
    </Nav>
  );
};

Navigation.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
};

export default Navigation;

import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import { LoginFormModal } from "../login/LoginFormModal";
import SignupFormModal from "../signup/SignupFormModal";
import ProfileButton from "./ProfileButton";
import { useSessionUser } from "../../store/session";

/**
 *
 * @param {{isLoaded: boolean}} props
 */
const Navigation = ({ isLoaded }) => {
  const sessionUser = useSessionUser();

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <ul>
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
};

Navigation.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
};

export default Navigation;

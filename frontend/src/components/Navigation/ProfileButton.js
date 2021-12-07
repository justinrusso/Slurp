import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { logout } from "../../store/session";

/**
 *
 * @param {{username: string, email: string}} props
 * @returns
 */
const ProfileButton = ({ user }) => {
  const dispatch = useDispatch();

  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    if (!menuVisible) {
      return;
    }

    const closeMenu = () => setMenuVisible(false);

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [menuVisible]);

  const preventPropagation = (e) => {
    e.stopPropagation();
  };

  const toggleMenu = (e) => {
    preventPropagation(e);
    setMenuVisible((isVisible) => !isVisible);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout());
    setMenuVisible(false);
  };

  return (
    <>
      <button onClick={toggleMenu}>
        <FontAwesomeIcon icon={faUserCircle} />
      </button>
      {menuVisible && (
        <ul className="profile-dropdown" onClick={preventPropagation}>
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={handleLogout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
};

ProfileButton.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileButton;

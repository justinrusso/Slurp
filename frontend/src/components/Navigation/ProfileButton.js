import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { logout } from "../../store/session";

const ProfileButton = ({ user }) => {
  const dispatch = useDispatch();

  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => {
    if (menuVisible) {
      return;
    }
    setMenuVisible(true);
  };

  useEffect(() => {
    if (!menuVisible) {
      return;
    }

    const closeMenu = () => setMenuVisible(false);

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  });

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <>
      <button onClick={openMenu}>
        <FontAwesomeIcon icon={faUserCircle} />
      </button>
      {menuVisible && (
        <ul className="profile-dropdown">
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

export default ProfileButton;

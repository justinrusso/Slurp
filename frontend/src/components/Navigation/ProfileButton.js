import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useState } from "react";

import IconButton from "../styled/IconButton";
import Menu from "../common/Menu";
import MenuItem from "../common/MenuItem";
import Typography from "../common/Typography";
import { logout } from "../../store/session";
import { Link } from "react-router-dom";

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  border-bottom: 1px solid ${(props) => props.theme.palette.divider};
  padding-bottom: 4px;
  margin-bottom: 4px;
`;

const PlainLi = styled.li`
  appearance: none;
  background-color: transparent;
  border: 0;
  text-decoration: none;
`;

/**
 *
 * @param {{username: string, email: string}} props
 * @returns
 */
const ProfileButton = ({ isHomePage, user }) => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const showMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout());
  };

  return (
    <>
      <IconButton onClick={showMenu} color={isHomePage ? "white" : "primary"}>
        <FontAwesomeIcon icon={faUserCircle} />
      </IconButton>
      <Menu
        id="profile-dropdown"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem plain>
          <UserInfo>
            <Typography gutterBottom>{user.username}</Typography>
            <Typography gutterBottom>{user.email}</Typography>
          </UserInfo>
        </MenuItem>
        <PlainLi>
          <MenuItem as={Link} to="/biz/new" onClick={() => closeMenu()}>
            Add Business
          </MenuItem>
        </PlainLi>
        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
      </Menu>
    </>
  );
};

ProfileButton.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  isHomePage: PropTypes.bool.isRequired,
};

export default ProfileButton;

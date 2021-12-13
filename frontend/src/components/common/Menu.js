import PropTypes from "prop-types";
import styled from "styled-components";

import Modal from "../Modal";
import Paper from "./Paper";
import { getViewOffset } from "../../utils";

const MenuRoot = styled(Paper)`
  position: fixed;
`;

const MenuList = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
`;

const Menu = ({ anchorEl, children, id, onClose, open }) => {
  if (!open) return null;

  return (
    <Modal hideBackground onClose={onClose}>
      <MenuRoot id={id} style={getViewOffset(anchorEl)} elevation={8}>
        <MenuList>{children}</MenuList>
      </MenuRoot>
    </Modal>
  );
};

Menu.propTypes = {
  anchorEl: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

export default Menu;

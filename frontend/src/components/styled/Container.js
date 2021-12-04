import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

export const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const ContainerContent = styled.div`
  max-width: 960px;
  padding: 0 15px;
  width: 100%;
`;

/**
 *
 * @param {{children: React.ReactNode | React.ReactNode[]}} props
 * @returns
 */
const Container = ({ children }) => {
  return (
    <ContainerWrapper>
      <ContainerContent>{children}</ContainerContent>
    </ContainerWrapper>
  );
};

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Container;

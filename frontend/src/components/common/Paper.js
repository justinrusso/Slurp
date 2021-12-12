import styled from "styled-components";

import { getOverlayAlpha } from "../../utils/theme";

const Paper = styled.div`
  box-shadow: ${(props) => props.theme.shadows[props.elevation]};
  background-color: ${(props) => props.theme.palette.background};
  background-image: ${(props) =>
    props.theme.palette.mode === "dark" &&
    `linear-gradient(rgba(255, 255, 255, ${getOverlayAlpha(
      props.elevation
    )}), rgba(255, 255, 255, ${getOverlayAlpha(props.elevation)}))`};
`;

Paper.defaultProps = {
  elevation: 0,
};

export default Paper;

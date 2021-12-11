import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";
import Typography from "../common/Typography";

import Container from "../styled/Container";
import IconButton from "../styled/IconButton";
import { faCode } from "@fortawesome/free-solid-svg-icons";

const FooterRoot = styled.footer`
  display: flex;
  padding: ${(props) => props.theme.spacing.gen(3)} 0;
  position: ${(props) => props.position};
  width: 100%;
`;

const FooterContent = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Name = styled(Typography)`
  font-weight: 600;
`;

const Socials = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2em;
`;

const Footer = () => {
  return (
    <FooterRoot>
      <FooterContent>
        <Typography>
          Created by <Name as="span">Justin Russo</Name>
        </Typography>
        <Socials>
          <IconButton
            as="a"
            target="_blank"
            href="https://www.linkedin.com/in/justin-k-russo/"
          >
            <FontAwesomeIcon icon={faLinkedinIn} />
          </IconButton>
          <IconButton
            as="a"
            target="_blank"
            href="https://github.com/justinrusso"
          >
            <FontAwesomeIcon icon={faGithub} />
          </IconButton>
          <IconButton
            color="secondary"
            as="a"
            target="_blank"
            href="https://github.com/justinrusso/Slurp"
          >
            <FontAwesomeIcon icon={faCode} />
          </IconButton>
        </Socials>
      </FooterContent>
    </FooterRoot>
  );
};

export default Footer;

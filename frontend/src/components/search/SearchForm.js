import styled, { useTheme } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { useState } from "react";

import Box from "../styled/Box";
import Typography from "../common/Typography";
import { Button } from "../styled/Button";

const LabelWrapper = styled.div`
  flex: 1;
  min-height: 0;
  min-width: 0;
`;

const Label = styled(Box).attrs({ as: "label" })`
  background-color: ${(props) => props.theme.palette.background};
  display: block;
  padding: ${(props) => props.theme.spacing.gen(1.5)};
  position: relative;
  width: 100%;
`;

const LabelText = styled(Typography).attrs((props) => {
  return {
    ...props,
    as: "span",
  };
})`
  font-weight: 700;
  margin-right: ${(props) => props.theme.spacing.gen(1.5)};
  user-select: none;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LeftInputWrapper = styled(InputWrapper)`
  &::after {
    background-color: ${(props) => props.theme.palette.divider};
    bottom: ${(props) => props.theme.spacing.gen(1)};
    content: "";
    position: absolute;
    right: 0;
    top: ${(props) => props.theme.spacing.gen(1)};
    width: 1px;
  }
`;

const Input = styled.input`
  background: transparent;
  border: 0;
  outline: 0;
  width: 100%;
`;

const SearchButton = styled(Button)`
  border-radius: ${(props) =>
    `0 ${props.theme.borderRadius}px ${props.theme.borderRadius}px 0`};
  font-size: ${(props) => props.theme.spacing.gen(2.5)};
  padding: ${(props) => props.theme.spacing.gen(1, 2.5)};
`;

const SearchForm = () => {
  const theme = useTheme();

  const history = useHistory();

  const [desc, setDesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (desc.length > 0) {
      params.set("find_desc", desc);
    }

    let url = "/search";
    const paramsString = params.toString();
    if (paramsString.length > 0) {
      url += `?${paramsString}`;
    }
    history.push(url);
  };

  return (
    <Box as="form" display="flex" onSubmit={handleSubmit}>
      <LabelWrapper>
        <Label
          borderRadius={`${theme.borderRadius}px 0 0 ${theme.borderRadius}px`}
        >
          <LeftInputWrapper>
            <LabelText>Find</LabelText>
            <Input
              placeholder="ramen restaurants"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></Input>
          </LeftInputWrapper>
        </Label>
      </LabelWrapper>
      <SearchButton>
        <FontAwesomeIcon icon={faSearch} />
      </SearchButton>
    </Box>
  );
};

export default SearchForm;

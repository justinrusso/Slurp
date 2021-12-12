import PropTypes from "prop-types";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, loginDemo } from "../../store/session";
import { Button } from "../styled/Button";
import HelperText from "../common/HelperText";
import InputField from "../common/InputField";

const InputWrapper = styled.div`
  margin: 8px 0;
  display: inline-flex;
  width: 100%;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: ${(props) => props.theme.spacing.gen(2)};
`;

const DemoHelperText = styled(HelperText)`
  margin: 0 !important;
  padding: ${(props) => props.theme.spacing.gen(1, 0)};
`;

const DemoLoginButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.palette.primary.main};
  cursor: pointer;
  outline: none;
  padding: 0;
`;

/**
 *
 * @param {{
 *  setVisible: () => void;
 *  switchForms: () => void;
 * }} props
 */
export const LoginForm = ({ setVisible, switchForms }) => {
  const dispatch = useDispatch();

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(login(credential, password))
      .then(() => setVisible(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const handleDemoLogin = () => {
    setErrors({});
    return dispatch(loginDemo())
      .then(() => setVisible(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <>
      <form id="login" onSubmit={handleSubmit}>
        <InputWrapper>
          <InputField
            label="Username or Email"
            fullWidth
            id="credential"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            inputProps={{
              autoFocus: true,
              type: "text",
            }}
            error={!!errors.credential || !!errors.credentials}
            helperText={errors.credential}
            required
          />
        </InputWrapper>
        <InputWrapper>
          <InputField
            label="Password"
            fullWidth
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            inputProps={{
              type: "password",
            }}
            error={!!errors.password || !!errors.credentials}
            helperText={errors.password}
            required
          />
        </InputWrapper>
        {errors.credentials && (
          <InputWrapper>
            <HelperText error showIcon>
              {errors.credentials}
            </HelperText>
          </InputWrapper>
        )}
      </form>
      <DemoHelperText>
        Looking to try out the website?{" "}
        <DemoLoginButton onClick={handleDemoLogin}>
          Login as Demo
        </DemoLoginButton>
      </DemoHelperText>
      <Actions>
        <Button
          variant="text"
          onClick={(e) => {
            e.preventDefault();
            switchForms();
          }}
          type="button"
        >
          Create Account
        </Button>
        <Button form="login" type="submit">
          Log In
        </Button>
      </Actions>
    </>
  );
};

LoginForm.propTypes = {
  setVisible: PropTypes.func.isRequired,
  switchForms: PropTypes.func.isRequired,
};

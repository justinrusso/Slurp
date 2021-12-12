import PropTypes from "prop-types";
import styled from "styled-components";
import { Redirect } from "react-router";
import { useState } from "react";
import { useDispatch } from "react-redux";

import HelperText from "../common/HelperText";
import InputField from "../common/InputField";
import { Button } from "../styled/Button";
import { signup, useSessionUser } from "../../store/session";

const InputsWrapper = styled.div`
  gap: 8px;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

const InputWrapper = styled.div`
  flex: 1;
  flex-basis: fit-content;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: ${(props) => props.theme.spacing.gen(2)};
`;

const PasswordHelperTextWrapper = styled.div`
  width: 100%;
`;

/**
 *
 * @param {{switchForms: () => void}} props
 */
const SignupForm = ({ switchForms }) => {
  const dispatch = useDispatch();
  const sessionUser = useSessionUser();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});

  if (sessionUser) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(signup(username, email, password, confirmPassword)).catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
    }
    return setErrors({
      confirmPassword:
        confirmPassword.length > 0
          ? "Those passwords didn't match. Try again."
          : "Confirm your password",
    });
  };

  return (
    <>
      <form id="signup" onSubmit={handleSubmit}>
        <InputsWrapper>
          <InputField
            fullWidth
            label="Email"
            value={email}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            inputProps={{
              autoFocus: true,
              type: "text",
            }}
            error={!!errors.email}
            helperText={errors.email}
            required
          />
          <InputField
            fullWidth
            label="Username"
            value={username}
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            inputProps={{
              type: "text",
            }}
            error={!!errors.username}
            helperText={errors.username}
            required
          />
          <InputWrapper>
            <InputField
              fullWidth
              label="Password"
              value={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              inputProps={{
                type: "password",
              }}
              error={!!errors.password}
              required
            />
          </InputWrapper>
          <InputWrapper>
            <InputField
              fullWidth
              label="Confirm Password"
              value={confirmPassword}
              id="confirm-password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              inputProps={{
                type: "password",
              }}
              error={!!errors.confirmPassword}
              required
            />
          </InputWrapper>
          {(errors.password || errors.confirmPassword) && (
            <PasswordHelperTextWrapper>
              <HelperText error showIcon>
                {errors.password?.toLowerCase() === "enter a password"
                  ? errors.password
                  : errors.confirmPassword || errors.password}
              </HelperText>
            </PasswordHelperTextWrapper>
          )}
        </InputsWrapper>
      </form>
      <Actions>
        <Button
          variant="text"
          onClick={(e) => {
            e.preventDefault();
            switchForms();
          }}
          type="button"
        >
          Sign in instead
        </Button>
        <Button form="signup" type="submit">
          Sign Up
        </Button>
      </Actions>
    </>
  );
};

SignupForm.propTypes = {
  switchForms: PropTypes.func.isRequired,
};

export default SignupForm;

import styled from "styled-components";
import { Redirect } from "react-router";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { Button } from "../styled/Button";
import InputField from "../common/InputField";
import { signup, useSessionUser } from "../../store/session";

const InputsWrapper = styled.div`
  gap: 8px;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

const InputWrapper = styled.div`
  flex: 1;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: ${(props) => props.theme.spacing.gen(2)};
`;

const SignupForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSessionUser();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState([]);

  if (sessionUser) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(signup({ email, username, password })).catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  return (
    <>
      <form>
        <ul>
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
        <InputsWrapper>
          <InputField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            inputProps={{
              autoFocus: true,
              required: true,
              type: "text",
            }}
          />
          <InputField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            inputProps={{
              required: true,
              type: "text",
            }}
          />
          <InputWrapper>
            <InputField
              fullWidth
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              inputProps={{
                required: true,
                type: "password",
              }}
            />
          </InputWrapper>
          <InputWrapper>
            <InputField
              fullWidth
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              inputProps={{
                required: true,
                type: "password",
              }}
            />
          </InputWrapper>
        </InputsWrapper>
      </form>
      <Actions>
        <Button variant="text">Sign in instead</Button>
        <Button type="submit" onClick={handleSubmit}>
          Sign Up
        </Button>
      </Actions>
    </>
  );
};

export default SignupForm;

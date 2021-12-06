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
  margin: 0;
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

export const LoginForm = () => {
  const dispatch = useDispatch();

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(login(credential, password)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  const handleDemoLogin = () => {
    setErrors([]);
    return dispatch(loginDemo()).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <>
      <form>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <InputWrapper>
          <InputField
            label="Username or Email"
            fullWidth
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            inputProps={{
              autoFocus: true,
              required: true,
              type: "text",
            }}
          />
        </InputWrapper>
        <InputWrapper>
          <InputField
            label="Password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            inputProps={{
              required: true,
              type: "password",
            }}
          />
        </InputWrapper>
      </form>
      <DemoHelperText>
        Looking to try out the website?{" "}
        <DemoLoginButton onClick={handleDemoLogin}>
          Login as Demo
        </DemoLoginButton>
      </DemoHelperText>
      <Actions>
        <Button variant="text">Create Account</Button>
        <Button type="submit" onClick={handleSubmit}>
          Log In
        </Button>
      </Actions>
    </>
  );
};

import * as React from "react";
import { Field, Form, FormSpy } from "react-final-form";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import Typography from "./modules/components/Typography";
import AppForm from "./modules/views/AppForm";
import { email, required } from "./modules/form/validation";
import RFTextField from "./modules/form/RFTextField";
import FormButton from "./modules/form/FormButton";
import FormFeedback from "./modules/form/FormFeedback";
import withRoot from "../withRoot";
import { FormItems, Labels } from "../utils/Consts";
import { RepositoryFactory } from "../api/RepositoryFactory";
import { Alert, Button, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../utils/AuthContext";

function SignIn() {
  const [sent, setSent] = React.useState(false);
  const [toastOpen, setOpen] = React.useState(false);

  const validate = (values: { [index: string]: string }) => {
    const errors = required(["email", "password"], values);

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

  const handleSubmit = (values: { "": string }) => {
    setSent(true);
    const value = Object.entries(values).map((x) => x);
    userResponse(value[0][1], value[1][1]);
  };

  /**
   * テストユーザーでログインボタン
   */
  const inputValEm = React.useRef<HTMLInputElement>(null);
  const inputValPw = React.useRef<HTMLInputElement>(null);
  const handleTestBtn = () => {
    const testEm = "user@example.com";
    const testPw = "password";
    if (inputValEm.current != null && inputValPw.current != null) {
      inputValEm.current.value = testEm;
      inputValPw.current.value = testPw;
    }
    setOpen(false);
    setSent(true);
    userResponse(testEm, testPw);
  };

  // API
  const userRepository = RepositoryFactory.get("login");
  const navigate = useNavigate();
  const { setIsAuth } = useAuth();
  const userResponse = async (email: string, password: string) => {
    try {
      await userRepository.login(email, password);
      setIsAuth(true);
      navigate("/mypage");
    } catch (e) {
      setOpen(true);
      setSent(false);
    }
  };

  return (
    <React.Fragment>
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            {Labels.SIGN_IN}
          </Typography>
          <Typography variant="body2" align="center">
            {""}
            <Link to="/sign-up/">{Labels.NOT_REGISTERED}</Link>
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box
              component="form"
              onSubmit={handleSubmit2}
              noValidate
              sx={{ mt: 6 }}
            >
              <Collapse in={toastOpen}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  <strong>ログインできません</strong>
                  <br />
                  メールアドレスかパスワードに誤りがあります。
                </Alert>
              </Collapse>
              <Field
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label={FormItems.EMAIL}
                margin="normal"
                name="email"
                required
                size="large"
                inputRef={inputValEm}
              />
              <Field
                fullWidth
                size="large"
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="current-password"
                label={FormItems.PASSWORD}
                type="password"
                margin="normal"
                inputRef={inputValPw}
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <Typography align="center" sx={{ mt: 1 }}>
                <Button
                  disabled={submitting || sent}
                  onClick={(e: any) => {
                    handleTestBtn();
                  }}
                >
                  テストユーザーでログインできます
                </Button>
              </Typography>
              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting || sent ? Labels.PROGRESS_SIGNIN : Labels.SIGN_IN}
              </FormButton>
            </Box>
          )}
        </Form>
        <Typography align="center">
          <Link to="/forgot-password/">{Labels.FORGOT_PASSWORD_USER}</Link>
        </Typography>
      </AppForm>
    </React.Fragment>
  );
}

export default withRoot(SignIn);

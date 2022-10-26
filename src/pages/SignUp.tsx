import * as React from "react";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { Field, Form, FormSpy } from "react-final-form";
import Typography from "./modules/components/Typography";
import AppForm from "./modules/views/AppForm";
import { email, required } from "./modules/form/validation";
import RFTextField from "./modules/form/RFTextField";
import FormButton from "./modules/form/FormButton";
import FormFeedback from "./modules/form/FormFeedback";
import withRoot from "../withRoot";
import { FormItems, Labels } from "../utils/Consts";
import { btnStyle } from "../utils/Styles";
import { RepositoryFactory } from "../api/RepositoryFactory";
import { useAuth } from "../utils/AuthContext";
import { Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function SignUp() {
  const [sent, setSent] = React.useState(false);
  const [toastOpen, setOpen] = React.useState(false);

  const validate = (values: { [index: string]: string }) => {
    const errors = required(["userName", "email", "password"], values);

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
    userResponse(value[0][1], value[1][1], value[2][1]);
  };

  // API
  const userRepository = RepositoryFactory.get("register");
  const navigate = useNavigate();
  const { setIsAuth } = useAuth();
  const userResponse = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      await userRepository.register(name, email, password);
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
            {Labels.SIGN_UP}
          </Typography>
          <Typography variant="body2" align="center">
            <Link to="/sign-in/">{Labels.ALREADY_EXISTS}</Link>
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
                  <strong>登録に失敗しました。</strong>
                  <br />
                  入力内容をご確認ください。
                </Alert>
              </Collapse>
              <Field
                component={RFTextField}
                disabled={submitting || sent}
                autoComplete="given-name"
                fullWidth
                label={FormItems.USER_NAME}
                placeholder={FormItems.PLACEHOLDER_USER_NAME}
                name="userName"
                required
              />
              <Field
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label={FormItems.EMAIL}
                placeholder={FormItems.PLACEHOLDER_USER_EMAIL}
                margin="normal"
                name="email"
                required
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="new-password"
                label={FormItems.PASSWORD}
                type="password"
                margin="normal"
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
              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                size="large"
                color="secondary"
                fullWidth
                style={btnStyle}
              >
                {submitting || sent ? Labels.PROGRESS_SIGNUP : Labels.SIGN_UP}
              </FormButton>
            </Box>
          )}
        </Form>
      </AppForm>
    </React.Fragment>
  );
}

export default withRoot(SignUp);

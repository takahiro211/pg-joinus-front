import * as React from "react";
import { Field, Form, FormSpy } from "react-final-form";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Typography from "./modules/components/Typography";
import AppForm from "./modules/views/AppForm";
import { email, required } from "./modules/form/validation";
import RFTextField from "./modules/form/RFTextField";
import FormButton from "./modules/form/FormButton";
import FormFeedback from "./modules/form/FormFeedback";
import withRoot from "../withRoot";
import { FormItems, Labels } from "../utils/Consts";

function SignIn() {
  const [sent, setSent] = React.useState(false);

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

  const handleSubmit = () => {
    setSent(true);
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

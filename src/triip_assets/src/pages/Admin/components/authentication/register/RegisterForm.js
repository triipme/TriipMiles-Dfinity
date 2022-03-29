import React from "react";
import * as Yup from "yup";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useFormik, Form, FormikProvider } from "formik";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { useNavigate } from "react-router-dom";
// material
import { Stack, TextField, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useSelector } from "react-redux";

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { actor } = useSelector(state => state.user);
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("First name required"),
    lastName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Last name required"),
    email: Yup.string().email("Email must be a valid email address").required("Email is required"),
    secret_key: Yup.string().required("Secret Key is required")
  });
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      secret_key: ""
    },
    validationSchema: RegisterSchema,
    onSubmit: async values => {
      const { secret_key, ...a } = values;
      try {
        if (!!actor?.registerAdmin) {
          const rs = await actor?.registerAdmin(secret_key, {
            admin: {
              first_name: [a.firstName],
              last_name: [a.lastName],
              email: [a.email]
            }
          });
          if ("ok" in rs) {
            navigate("/triip-admin/dashboard/app", { replace: true });
            formik.resetForm();
          } else {
            throw rs?.err;
          }
        }
      } catch (error) {
        console.log(Object.keys(error)[0]);
        switch (Object.keys(error)[0]) {
          case "Failed":
            formik.setErrors({
              secret_key: "Please check secret key again!."
            });
            break;
          default:
            break;
        }
      } finally {
      }
      // navigate("/dashboard", { replace: true });
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps("firstName")}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps("lastName")}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-secret_key"
            type={showPassword ? "text" : "password"}
            label="Secret Key"
            {...getFieldProps("secret_key")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword(prev => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.secret_key && errors.secret_key)}
            helperText={touched.secret_key && errors.secret_key}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}>
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

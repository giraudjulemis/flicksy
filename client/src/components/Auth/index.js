import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { errorHelper } from "../../utils/helper";
import { registerUser, signInUser } from "../../store/actions/users";
import { Box, TextField, Button } from "@mui/material";

const Auth = () => {
  const [register, setRegister] = useState(false);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { email: "francis7@gmail.com", password: "testing123" },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Sorry email is required")
        .email("Please enter a valid email"),
      password: Yup.string().required("Sorry the password is required"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    if (register) {
      dispatch(registerUser(values));
    } else {
      dispatch(signInUser(values));
    }
  };

  return (
    <div className="auth_container">
      <h1>{!register ? "Log in" : "Sign up"}</h1>
      <Box
        component="form"
        sx={{ "& .MuiTextField-root": { width: "100%", marginTop: "20px" } }}
        onSubmit={formik.handleSubmit}
      >
        <TextField
          name="email"
          label="Enter your email"
          variant="standard"
          {...formik.getFieldProps("email")}
          {...errorHelper(formik, "email")}
        />
        <TextField
          name="password"
          label="Enter your password"
          type="password"
          variant="standard"
          {...formik.getFieldProps("password")}
          {...errorHelper(formik, "password")}
        />
        <div className="mt-2">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
          >
            {register ? "Register" : "Login"}
          </Button>
          <Button
            className="mt-3"
            variant="outlined"
            color="secondary"
            type="submit"
            size="small"
            onClick={() => setRegister(!register)}
          >
            Want to {!register ? "Register" : "Login"}?
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default Auth;

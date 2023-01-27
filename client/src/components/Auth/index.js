import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { errorHelper, Loader } from "../../utils/helper";
import { registerUser, signInUser } from "../../store/actions/users";
import PreventSignIn from "../../hoc/preventSignIn";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Auth = () => {
  const [register, setRegister] = useState(false);
  let navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
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

  useEffect(() => {
    if (notifications && notifications.global.success) {
      navigate("/dashboard");
    }
  }, [notifications]);

  return (
    <PreventSignIn users={users}>
      <div className="auth_container">
        <h1>{!register ? "Log in" : "Sign up"}</h1>
        {users.loading ? (
          <Loader />
        ) : (
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { width: "100%", marginTop: "20px" },
            }}
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
        )}
      </div>
    </PreventSignIn>
  );
};

export default Auth;

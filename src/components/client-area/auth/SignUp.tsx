import * as React from "react";
import { useSelector } from "react-redux";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CircularProgress from "@mui/material/CircularProgress";

import handleErrorMessage from "../../../api/handleErrorMessages";

import {
  timeoutErrorSet,
  validateEmail,
  validatePasswordFormat,
} from "../../../composables/authFormHelpers";
import { signUp, signInWithProvider } from "../../../api/dataBaseAuthMethods";

import Stack from "@mui/material/Stack";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [values, setValues] = React.useState<any>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    remember: false,
    showPassword: false,
    showConfirmPassword: false,
  });

  const navigateTo = useNavigate();
  const authUser = useSelector((state: any) => state.auth.user);

  const [loading, setLoading] = React.useState(false);

  const [errorMessage, setErrorMessage] = React.useState<null | string>(null);
  console.log("my user is", authUser);
  if (typeof authUser?.uid === "string") {
    // if the user is signed up then redirect to home
    navigateTo("/dance-gavin-dance-edyego-clone");
  }

  async function handleSubmit(event: any) {
    event.preventDefault();

    if (loading) {
      return;
    }
    if (values.firstName === "" || values.lastName === "") {
      timeoutErrorSet(setErrorMessage, "Please complete all the fields !");
      return;
    }

    if (validateEmail(values.email) === false) {
      timeoutErrorSet(setErrorMessage, "Please enter a valid email !");
      return;
    }
    if (validatePasswordFormat(values.password) === false) {
      timeoutErrorSet(
        setErrorMessage,
        "Password must contain at least 8 characters long !"
      );
      return;
    }

    setLoading(true);

    const signedUpUserResponse = await signUp(values);

    setLoading(false);

    if (signedUpUserResponse.error) {
      timeoutErrorSet(
        setErrorMessage,
        handleErrorMessage(signedUpUserResponse.message),
        5000
      );
      return;
    }
    navigateTo("/dance-gavin-dance-edyego-clone");
  }

  async function handleProviderSubmit(providerName: string) {
    const providerList: {
      [key: string]: () => Promise<
        | { data: any; error: boolean }
        | { error: boolean; message: any }
        | undefined
      >;
    } = {
      google: async () => {
        // sign up with google here
        const result = await signInWithProvider("google", true);
        return result;
      },
    };
    const signedInWithProvider = await providerList[providerName]();
    if (signedInWithProvider === undefined || signedInWithProvider?.error)
      return;
    navigateTo("/dance-gavin-dance-edyego-clone");

    // if data.error don t push
  }

  const handleChange =
    (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  return (
    <div className="login-page-container ">
      <div className="login-container flex flex-col gap-16  items-center">
        <div className="login-container__title text-center mt-12">
          <div className="first-title  text-[1.8rem] md:text-[2.2rem] text-[#1D1D1D]">
            REGISTER
          </div>
          <div className="second-title mt-3  font-sans text-lg text-[#1D1D1D]">
            Please fill in the fields below:
          </div>
        </div>
        <div className="login-container__inputs flex w-full justify-center">
          <div className="inputs-container  w-[90%] max-w-[36rem]">
            <div className="card">
              {errorMessage != null && (
                <div className="error-message-container flex items-center gap-2 text-[#e4ffa6] bg-[#36c7c4]  p-6 mb-7">
                  <div className="error-icon">
                    <ErrorOutlineIcon />
                  </div>
                  <div className="error-message">{errorMessage}</div>
                </div>
              )}
              <label className="input">
                <input
                  className="input__field"
                  type="text"
                  placeholder=" "
                  value={values.firstName}
                  onChange={handleChange("firstName")}
                />
                <span className="input__label font-sans text-[18px] text-gray-700">
                  First name
                </span>
              </label>
              <div className="invisible-line-between py-[0.56rem]"></div>
              <label className="input">
                <input
                  className="input__field"
                  type="text"
                  placeholder=" "
                  value={values.laststName}
                  onChange={handleChange("lastName")}
                />
                <span className="input__label font-sans text-[18px] text-gray-700">
                  Last name
                </span>
              </label>
              <div className="invisible-line-between py-[0.56rem]"></div>
              <label className="input">
                <input
                  className="input__field"
                  type="text"
                  placeholder=" "
                  value={values.email}
                  onChange={handleChange("email")}
                />
                <span className="input__label font-sans text-[18px] text-gray-700">
                  E-mail
                </span>
              </label>
              <div className="invisible-line-between py-[0.56rem]"></div>
              <label className="input">
                <input
                  className="input__field"
                  type="password"
                  placeholder=" "
                  value={values.password}
                  onChange={handleChange("password")}
                />
                <span className="input__label font-sans text-[18px] text-gray-700">
                  Password
                </span>
              </label>

              <div
                className="login-button button-action fill-animation bg-[#E84841]  p-[0.88rem] mt-8"
                onClick={handleSubmit}
              >
                <div className="login-action-text text-white text-center">
                  {loading ? (
                    <Stack
                      sx={{
                        color: "grey.500",
                        height: "25px",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "10px",
                        padding: "0 0",
                        margin: "0 0",
                      }}
                      spacing={2}
                    >
                      <CircularProgress color="inherit" />
                    </Stack>
                  ) : (
                    "CREATE ACCOUNT"
                  )}
                </div>
              </div>

              <div className="new-customer-link flex gap-2 text-gray-700 mt-6 justify-center mb-16">
                <div className=" font-sans">Already have an account?</div>

                <Link
                  to="/dance-gavin-dance-edyego-clone/login"
                  className="font-sans underline"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <ThemeProvider theme={theme}>
    //   <Container component="main" maxWidth="xs">
    //     <CssBaseline />
    //     <Box
    //       sx={{
    //         marginTop: 2,
    //         display: "flex",
    //         flexDirection: "column",
    //         alignItems: "center",
    //       }}
    //     >
    //       <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
    //         <LockOutlinedIcon />
    //       </Avatar>
    //       <Typography component="h1" variant="h5">
    //         Sign up
    //       </Typography>

    //       {
    //         <div
    //           className={`error-message-container text-center p-1  text-red-600 ${
    //             errorMessage === "invisible" ? errorMessage : ""
    //           }`}
    //         >
    //           {errorMessage}
    //         </div>
    //       }
    //       <Box
    //         component="form"
    //         noValidate
    //         onSubmit={handleSubmit}
    //         sx={{ mt: 1 }}
    //       >
    //         <Grid container spacing={2}>
    //           <Grid item xs={12} sm={6}>
    //             <TextField
    //               value={values.firstName}
    //               onChange={handleChange("firstName")}
    //               autoComplete="given-name"
    //               name="firstName"
    //               required
    //               fullWidth
    //               id="firstName"
    //               label="First Name"
    //               autoFocus
    //             />
    //           </Grid>
    //           <Grid item xs={12} sm={6}>
    //             <TextField
    //               value={values.lastName}
    //               onChange={handleChange("lastName")}
    //               required
    //               fullWidth
    //               id="lastName"
    //               label="Last Name"
    //               name="lastName"
    //               autoComplete="family-name"
    //             />
    //           </Grid>
    //           <Grid item xs={12}>
    //             <TextField
    //               value={values.email}
    //               onChange={handleChange("email")}
    //               required
    //               fullWidth
    //               id="email"
    //               label="Email Address"
    //               name="email"
    //               autoComplete="email"
    //             />
    //           </Grid>
    //           <Grid item xs={12}>
    //             <TextField
    //               value={values.password}
    //               onChange={handleChange("password")}
    //               required
    //               fullWidth
    //               name="password"
    //               label="Password"
    //               type="password"
    //               id="password"
    //               autoComplete="new-password"
    //             />
    //           </Grid>
    //           <Grid item xs={12}>
    //             <TextField
    //               value={values.confirmPassword}
    //               onChange={handleChange("confirmPassword")}
    //               required
    //               fullWidth
    //               name="confirmPassword"
    //               label="Confirm Password"
    //               type="password"
    //               id="confirm-password"
    //               autoComplete="new-password"
    //             />
    //           </Grid>
    //           <Grid item xs={12}>
    //             <FormControlLabel
    //               control={
    //                 <Checkbox
    //                   color="primary"
    //                   value={values.remember}
    //                   onChange={() => {
    //                     setValues({ ...values, remember: !values.remember });
    //                   }}
    //                 />
    //               }
    //               label="Remember me"
    //             />
    //           </Grid>
    //         </Grid>

    //         <div className="flex items-center justify-center or-sign-method-row ">
    //           <div className="self-center w-5/12 bg-gray-600 border-t border-b border-gray-600"></div>
    //           <p className="pb-1 mx-4 mt-1 font-bold text-black">OR</p>
    //           <div className="self-center w-5/12 bg-gray-600 border-t border-b border-gray-600"></div>
    //         </div>

    //         <div className="flex justify-center provider-sign-method-row ">
    //           <Stack direction="row" alignItems="center" spacing={2}>
    //             <label htmlFor="icon-button-file">
    //               <Input
    //                 onClick={() => {
    //                   handleProviderSubmit("google");
    //                 }}
    //                 id="icon-button-file"
    //                 type="button"
    //               />
    //               <IconButton
    //                 color="primary"
    //                 aria-label="upload picture"
    //                 component="span"
    //               >
    //                 <GoogleIcon />
    //               </IconButton>
    //             </label>
    //           </Stack>
    //         </div>

    //         {loading === false && (
    //           <Button
    //             type="submit"
    //             fullWidth
    //             variant="contained"
    //             sx={{ mt: 1, mb: 2 }}
    //           >
    //             Sign Up
    //           </Button>
    //         )}

    //         {loading && (
    //           <Button
    //             type="submit"
    //             fullWidth
    //             disabled={true}
    //             variant="contained"
    //             sx={{ mt: 1, mb: 2 }}
    //           >
    //             <LoadingButton loading={true} variant="text" disabled>
    //               disabled
    //             </LoadingButton>
    //           </Button>
    //         )}
    //         {/* <Grid container justifyContent="flex-end">
    //           <Grid item>
    //             <Link href="#" variant="body2">
    //               Already have an account? Sign in
    //             </Link>
    //           </Grid>
    //         </Grid> */}
    //       </Box>
    //     </Box>
    //   </Container>
    // </ThemeProvider>
  );
}

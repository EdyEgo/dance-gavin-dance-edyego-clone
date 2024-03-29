import * as React from "react";
import { useSelector } from "react-redux";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import handleErrorMessage from "../../../api/handleErrorMessages";
import {
  signIn,
  signInWithProvider,
  signOut,
} from "../../../api/dataBaseAuthMethods";

import Stack from "@mui/material/Stack";

import {
  timeoutErrorSet,
  validateEmail,
  validatePasswordFormat,
} from "../../../composables/authFormHelpers";
import FitCurrencyIcon from "../../../composables/generalHelpers/FitCurrencyIcon";

import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [values, setValues] = React.useState<any>({
    email: "",
    remember: false,
    password: "",

    showPassword: false,
  });
  const authUser = useSelector((state: any) => state.auth.user);
  const userObject = useSelector((state: any) => state.users.currentUser);

  // when you make an order and you are logged in update the user object too

  const [loading, setLoading] = React.useState(false);

  const [errorMessage, setErrorMessage] = React.useState<null | string>(null);

  async function handleSubmit(event: any) {
    event.preventDefault();

    if (loading) {
      return;
    }

    setErrorMessage(null);

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

    const signedInUserResponse = await signIn(values);

    setLoading(false);

    if (signedInUserResponse.error) {
      timeoutErrorSet(
        setErrorMessage,
        handleErrorMessage(signedInUserResponse.message),
        5000
      );
      return;
    }

    navigate("/dance-gavin-dance-edyego-clone");
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
        const result = await signInWithProvider("google");
        return result;
      },
    };
    const signedInWithProvider = await providerList[providerName]();
    if (signedInWithProvider === undefined || signedInWithProvider?.error)
      return;
    // navigateTo("/dance-gavin-dance-edyego-clone");

    // if data.error don t push
  }

  const handleChange =
    (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  return (
    <div className="login-page-container ">
      {authUser?.uid == null && (
        <div className="login-container flex flex-col gap-16 w-full items-center ">
          <div className="login-container__title text-center mt-12">
            <div className="first-title text-[1.8rem] md:text-[2.2rem] text-[#1D1D1D]">
              LOGIN
            </div>
            <div className="second-title mt-3 font-sans text-lg text-[#1D1D1D]">
              Please enter your e-mail and password:
            </div>
          </div>
          <div className="login-container__inputs flex w-full justify-center">
            <div className="inputs-container w-[90%] max-w-[36rem]">
              {/* <TextField
              margin="normal"
              value={values.email}
              onChange={handleChange("email")}
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              value={values.password}
              onChange={handleChange("password")}
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            /> */}

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

                <div className="forgot-password-container py-3 flex justify-center">
                  <Link
                    className="forgot-password font-sans underline text-[#1D1D1D]"
                    to="/dance-gavin-dance-edyego-clone/forgot-password"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div
                  className="login-button button-action fill-animation bg-[#E84841]  p-[0.88rem]"
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
                      "LOGIN"
                    )}
                  </div>
                </div>

                <div className="new-customer-link flex gap-2 text-gray-700 mt-6 justify-center mb-16">
                  <div className=" font-sans">New customer?</div>

                  <Link
                    to="/dance-gavin-dance-edyego-clone/signup"
                    className="font-sans underline"
                  >
                    Create an account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* user is logged in page */}
      {typeof authUser?.uid === "string" && (
        <div className="user-is-logged-in-container bg-[#25c3c8] p-10 min-h-[62vh]">
          <div className="content-container  ">
            <div className="profile-container border border-gray-400 p-5">
              <div className="profile-card-container">
                <div className="title py-3 text-[1.2rem] ">Profile details</div>
                <div className="profile-content flex gap-5 items-center">
                  <div className="profile-image-container">
                    {typeof authUser.photoURL === "string" && (
                      <Avatar
                        alt="Remy Sharp"
                        src={authUser.photoURL}
                        // sx={{ width: 56, height: 56 }}
                      />
                    )}
                    {authUser.photoURL === null && (
                      <Avatar>{authUser.displayName[0]}</Avatar>
                    )}
                  </div>
                  <div className="details flex flex-col gap-4">
                    <div className="fullname flex gap-4">
                      <div>Name:</div>
                      <div>{authUser.displayName}</div>
                    </div>
                    <div className="email flex gap-4">
                      <div>Email</div>
                      <div>{authUser.email}</div>
                    </div>
                    <div className="logout flex gap-4">
                      <div
                        className="log-user-out-btn text-gray-600 hover:text-gray-700 transition-all duration-200 ease-in-out cursor-pointer"
                        onClick={async () => {
                          await signOut();
                          navigate("/dance-gavin-dance-edyego-clone");
                        }}
                      >
                        Logout
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="orders-made-container pt-5">
              {userObject?.orders == null && (
                <div className="empty-orders-container">
                  <div className="empty-orders-card">
                    <div className="title py-3">NO ORDERS</div>
                    <div className="second-title py-3">
                      You have not placed any orders yet.
                    </div>
                    <div className="action-button-container flex">
                      <Link
                        to="/dance-gavin-dance-edyego-clone/collections/dance-gavin-dance"
                        className="action-button text-white fill-animation login-button button-action p-5 bg-[#E6433C]"
                      >
                        START SHOPPING
                      </Link>
                    </div>
                  </div>
                </div>
              )}
              {userObject?.orders != null && (
                <div className="user-orders">
                  <div className="orders-tite ">Orders list:</div>
                  <div className="order-list">
                    {Object.entries(userObject.orders).map(
                      ([orderId, orderObjectValue]: any) => {
                        return (
                          <div className="order-item border-b border-gray-400 p-2">
                            <div className="order-id flex flex-col gap-2 py-4">
                              <div className="order-title-id">Order Id:</div>
                              <div className="order-id font-sans font-bold">
                                {orderId}
                              </div>
                            </div>
                            <div className="order-container-details">
                              <div className="ordered-at-container flex gap-4">
                                <div>Ordered at:</div>
                                <div>
                                  {orderObjectValue.orderedAt?.seconds != null
                                    ? new Date(
                                        orderObjectValue.orderedAt.toDate()
                                      ).toDateString()
                                    : new Date(
                                        orderObjectValue.orderedAt
                                      ).toDateString()}
                                </div>
                              </div>
                              <div className="totalToPay-container flex gap-4">
                                <div>Total to pay:</div>
                                <div className="price-container flex gap-2 items-center">
                                  <FitCurrencyIcon
                                    productsSelectedCurrency={
                                      orderObjectValue.totalToPay
                                        .productsSelectedCurrency
                                    }
                                  />

                                  <div className="price-number">
                                    {
                                      orderObjectValue.totalToPay
                                        .totalToPayNumber
                                    }
                                  </div>
                                </div>
                                {/* <div>{orderObjectValue.totalToPay}</div> */}
                              </div>
                              <div className="totalQuantityItems-container flex gap-4">
                                <div>Total products ordered:</div>
                                <div>{orderObjectValue.totalQuantityItems}</div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

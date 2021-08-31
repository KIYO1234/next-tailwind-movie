import { useRouter } from "next/router";
import React, { Fragment, useContext, useRef, useState } from "react";
import { LoginAuth, SignUpAuth } from "../Types";
import { signIn } from 'next-auth/client';
import HeadTag from "../components/HeadTag";
import bcrypt from "bcryptjs";

const AuthForm = () => {

  const router = useRouter();
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const loginSignUpHandler = async (event) => {
    event.preventDefault();
    const enteredEmail: string = emailRef.current.value;
    const enteredPassword: string = passwordRef.current.value;
    
    const loginAuthData: LoginAuth = {
      email: enteredEmail,
      password: enteredPassword,
    };

    if (haveAccount) {
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });
      console.log("👆 result of sign in: ", result);
      if (result.error) {
        alert("Invalid email or password");
      } else {
        alert("Successfully logged you in!");
        router.push('/');
     }
    } else {
      // console.log("SignUp");
      // console.log("enteredEmail: ", enteredEmail);
      // console.log("enteredPassword: ", enteredPassword);
      const enteredUsername: string = usernameRef.current.value;
      const enteredConfirmPassword: string = confirmPasswordRef.current.value;
      const hashedPassword: string = await bcrypt.hash(enteredConfirmPassword, 12);
      // console.log('🔑 hashedPassword: ', hashedPassword);

      const signUpAuthData: SignUpAuth = {
        username: enteredUsername,
        email: enteredEmail,
        password: hashedPassword,
        confirmPassword: enteredConfirmPassword,
      };

      if (enteredPassword !== enteredConfirmPassword) {
        alert('Passwords must match');
        return;
      }
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(signUpAuthData),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      console.log("data: ", data);
      if (data.status === "Conflict") {
        alert(data.message);
      } else if (data.status === 'Success') {
        alert(data.message);
        router.push('/');
      }
    }
  };

  const [haveAccount, setHaveAccount] = useState(true);
  const loginSignUpChangeHandler = () => {
    setHaveAccount((prev) => !prev);
  };

  return (
    <Fragment>
      <HeadTag title="Auth Form" description="This is an authentication form in which users enter their credentials" />
      <form onSubmit={loginSignUpHandler}>
        <div className="w-1/2 mx-auto relative mt-28">
          <div className="text-center text-xl mb-10">
            {haveAccount ? "Login" : "Sign Up"}
          </div>
          {!haveAccount && (
            <>
              <div className="mb-5">
                <span className="w-28 inline-block align-top">User Name</span>
                <input
                  type="text"
                  className="border-2 w-60 mb-3"
                  required
                  ref={usernameRef}
                />
              </div>
            </>
          )}
          <div className="mb-5">
            <span className="w-28 inline-block align-top">Email</span>
            <input
              type="email"
              className="border-2 w-60 mb-3"
              required
              ref={emailRef}
            />
          </div>
          <div className="mb-5">
            <span className="w-28 inline-block align-top">Password</span>
            <input
              type="password"
              className="border-2 w-60 mb-3"
              required
              ref={passwordRef}
            />
          </div>
          {!haveAccount && (
            <>
              <div className="mb-5">
                <span className="w-28 inline-block align-top">
                  Confirm Password
                </span>
                <input
                  type="password"
                  className="border-2 w-60 mt-2"
                  required
                  ref={confirmPasswordRef}
                />
              </div>
            </>
          )}
          {haveAccount ? (
            <div className="mb-10 text-center">
              Don't have an account? &nbsp;
              <span
                className="underline text-purple-500 cursor-pointer"
                onClick={loginSignUpChangeHandler}
              >
                Please sign up here
              </span>
            </div>
          ) : (
            <div className="mb-10 text-center">
              Already have an account? &nbsp;
              <span
                className="underline text-purple-500 cursor-pointer"
                onClick={loginSignUpChangeHandler}
              >
                Please login here
              </span>
            </div>
          )}
          <button className="bg-blue-500 hover:bg-blue-300 text-white rounded p-0.5 pl-10 pr-10 absolute right-0">
            {haveAccount ? "Login" : "Sign Up"}
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default AuthForm;

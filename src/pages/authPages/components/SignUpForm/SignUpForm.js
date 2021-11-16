import React, { useState } from "react";
import { Formik } from "formik";
import { SignUpSchema } from "utils/YupValidationSchemas";
import AuthPageInputs from "../AuthPageInputs/AuthPageInputs";
import * as Styled from "../../signUp/SignUpStyles";

// media
import userSvg from "media/user.svg";
import emailSvg from "media/email.svg";
import lockSvg from "media/lock.svg";
import checkSvg from "media/check.svg";

const SignUpForm = () => {
  const [passwordToggle, setPasswordToggle] = useState(false);
  const [passwordConfirmToggle, setPasswordConfirmToggle] = useState(false);
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={SignUpSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Styled.AsideForm action="">
          <Styled.FormInputWrapper svg={userSvg}>
            <AuthPageInputs
              name="firstName"
              type="text"
              placeholder="First name"
            />
          </Styled.FormInputWrapper>
          <Styled.FormInputWrapper svg={userSvg}>
            <AuthPageInputs name="lastName" placeholder="Last name" />
          </Styled.FormInputWrapper>
          <Styled.FormInputWrapper svg={emailSvg}>
            <AuthPageInputs
              name="email"
              type="email"
              placeholder="Email"
              errored={errors.email && touched.email ? "true" : ""}
            />
            {errors.email && touched.email ? (
              <Styled.ErrorMessage>{errors.email}</Styled.ErrorMessage>
            ) : null}
          </Styled.FormInputWrapper>
          <Styled.FormInputWrapper svg={lockSvg}>
            <AuthPageInputs
              name="password"
              type={passwordToggle ? "text" : "password"}
              placeholder="Password"
              errored={errors.password && touched.password ? "true" : ""}
              password="true"
            />
            <Styled.PasswordEyeSpan
              onClick={() => setPasswordToggle(!passwordToggle)}
            ></Styled.PasswordEyeSpan>
            {errors.password && touched.password ? (
              <Styled.ErrorMessage>{errors.password}</Styled.ErrorMessage>
            ) : null}
          </Styled.FormInputWrapper>
          <Styled.FormInputWrapper svg={checkSvg}>
            <AuthPageInputs
              name="confirmPassword"
              type={passwordConfirmToggle ? "text" : "password"}
              placeholder="Confirm Password"
              password="true"
            />
            <Styled.PasswordEyeSpan
              onClick={() => setPasswordConfirmToggle(!passwordConfirmToggle)}
            ></Styled.PasswordEyeSpan>
          </Styled.FormInputWrapper>
          <Styled.Button type="submit">
            Sign up <Styled.ButtonVector />
          </Styled.Button>
        </Styled.AsideForm>
      )}
    </Formik>
  );
};

export default SignUpForm;

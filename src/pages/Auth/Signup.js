import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Input from "../../components/Input.js";
import { withTranslation } from "react-i18next";
import Translation from "../../components/Translation.js";

const Signup = (props) => {
  const { t, i18n } = props;
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);
  const [validateEmail, setValidateEmail] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    // debugger;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const { userName, email, password } = formData;
    // const result = {};
    axios
      .post(
        "api/1.0/users",
        {
          username: userName,
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": i18n.language,
          },
        }
      )
      .then((res) => {
        setValidateEmail(true);
      })
      .catch((err) => {
        let errors = err.response.data.validationErrors;
        if (Object.keys(errors).length) {
          setErrors(errors);
        }
      });
  };

  useEffect(() => {
    const { password, confirmPassword } = formData;
    if (password || confirmPassword) setCanSubmit(password === confirmPassword);
  }, [formData]);

  return (
    <>
      <div data-testid="signupPage">
        {!validateEmail ? (
          <div
            data-testid="form"
            className="mx-auto card col-md-6 mt-5 mx-sm-4 p-4"
          >
            <h1 className="card-title">{t("signupTitle")}</h1>
            <div className="mt-3">
              <Input
                label={t("userName")}
                testId="userName"
                name="userName"
                handleOnChange={handleOnChange}
                value={formData.userName}
                error={errors?.username}
              />
            </div>
            <div className="">
              <Input
                label={t("email")}
                testId="email"
                name="email"
                handleOnChange={handleOnChange}
                value={formData.email}
                error={errors?.email}
              />
            </div>
            <div className="">
              <Input
                label={t("password")}
                testId="password"
                name="password"
                handleOnChange={handleOnChange}
                value={formData.password}
                error={errors?.password}
              />
            </div>
            <div className="mt-3">
              <Input
                label={t("confirmPassword")}
                testId="confirmPassword"
                name="confirmPassword"
                handleOnChange={handleOnChange}
                value={formData.confirmPassword}
                error={errors?.confirmPassword}
              />
            </div>
            <div className="row mt-3">
              <button
                className="btn btn-primary"
                data-testid="submit"
                disabled={!canSubmit}
                onClick={handleSubmit}
              >
                {t("signUpButton")}
              </button>
            </div>
          </div>
        ) : (
          <div data-testid="message" className="row">
            <p className="alert alert-primary m-4 col-md-6">{t("message")}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default withTranslation()(Signup);

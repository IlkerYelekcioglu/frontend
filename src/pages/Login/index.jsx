import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "@/shared/components/Alert";
import { Input } from "@/shared/components/Input";
import { Button } from "@/shared/components/Button";
import { useNavigate } from "react-router-dom";
import { login } from "./api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/shared/state/redux";

export function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [apiProgress, setApiProgress] = useState();
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState();
  const { t } = useTranslation();
  const navigate = useNavigate();
  // const dispatch = useAuthDispatch();
  const dispatch = useDispatch();

  useEffect(() => {
    setErrors(function (lastErrors) {
      return {
        ...lastErrors,
        email: undefined,
      };
    });
  }, [email]);

  useEffect(() => {
    setErrors(function (lastErrors) {
      return {
        ...lastErrors,
        password: undefined,
      };
    });
  }, [password]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setGeneralError();
    setApiProgress(true);
    try {
      const response = await login({ email, password });
      dispatch({ type: "login-success", data: response.data });
      navigate("/");
    } catch (AxiosError) {
      if (AxiosError.response?.data) {
        if (AxiosError.response.data.status === 400) {
          setErrors(AxiosError.response.data.validationErrors);
        } else {
          setGeneralError(AxiosError.response.data.message);
        }
      } else {
        setGeneralError(t("genericError"));
      }
    } finally {
      setApiProgress(false);
    }
  };

  return (
    <div className="container">
      <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2">
        <form className="card" onSubmit={onSubmit}>
          <div className="text-center card-header">
            <h1>{t("login")}</h1>
          </div>
          <div className="card-body">
            <Input
              id="email"
              label={t("email")}
              errors={errors.email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              id="password"
              label={t("password")}
              error={errors.password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
            />
            {generalError && <Alert styleType="danger">{generalError}</Alert>}

            <div className="text-center">
              <Button disabled={!email && !password} apiProgress={apiProgress}>
                {t("login")}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

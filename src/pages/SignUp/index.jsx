import { useEffect, useMemo, useState } from "react";
import { signUp } from "./api";
import { Input } from "./components/Input";
import { useTranslation } from "react-i18next";
import { Alert } from "@/shared/components/Alert";
import { Spinner } from "@/shared/components/Spinner";

export function SignUp() {
  const [username, setUsername] = useState(); //Bu bir React Hook
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordRepeat, setPasswordRepeat] = useState();
  const [apiProgress, setApiProgress] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState();
  const { t } = useTranslation();

  //useEffect hook kısmını kullan.React hooklara bak

  useEffect(() => {
    setErrors(function (lastErrors) {
      return {
        ...lastErrors,
        username: undefined,
      };
    });
  }, [username]);

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
    setSuccessMessage();
    setApiProgress(true);
    try {
      const response = await signUp({
        username,
        email,
        password,
      });
      setSuccessMessage(response.data.message);
    } catch (AxiosError) {
      if (AxiosError.response?.data) {
        if (AxiosError.response.data.status === 400) {
          setErrors(AxiosError.response.data.validationErrors);
        } else {
          setGeneralError(AxiosError.response.data.me);
        }
      } else {
        setGeneralError(t("genericError"));
      }
    } finally {
      setApiProgress(false);
    }
  };

  const passwordRepeatError = useMemo(() => {
    if (password && password !== passwordRepeat) {
      console.log("always running");
      return t("passwordMismatch");
    }
    return "";
  }, [password, passwordRepeat]);

  /*

fonksiyona dışarıdan erişilebilmesi için export kullanımı gerekmektedir.
*/
  return (
    <div className="container">
      <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2">
        <form className="card" onSubmit={onSubmit}>
          <div className="text-center card-header">
            <h1>{t("signUp")}</h1>
          </div>
          <div className="card-body">
            <Input
              id="username"
              label={t("username")}
              errors={errors.username}
              onChange={(event) => setUsername(event.target.value)}
            />
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
            <Input
              id="passwordRepeat"
              label={t("passwordRepeat")}
              error={errors.passwordRepeat}
              type="password"
              onChange={(event) => setPasswordRepeat(event.target.value)}
            />
            {successMessage && <Alert>{successMessage}</Alert>}
            {generalError && <Alert styşeType="danger">{generalError}</Alert>}

            <div className="text-center">
              <button
                className="btn-btn-primary"
                disabled={
                  apiProgress || !password || password !== passwordRepeat
                }
              >
                {apiProgress && <Spinner sm={true} />}
                {t("signUp")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

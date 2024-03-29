import { useEffect, useState } from "react";
import Axios, { AxiosError } from "axios";
import { signUp } from "./api";

export function SignUp() {
  const [username, setUsername] = useState(); //Bu bir React Hook
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordRepeat, setPasswordRepeat] = useState();
  const [apiProgress, setApiProgress] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [errors, setErrors] = useState({});

  //useEffect hook kısmını kullan

  useEffect(() => {
    setErrors({});
  }, [username]);

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
      if (
        AxiosError.response?.data &&
        AxiosError.response.data.status === 400
      ) {
        setErrors(AxiosError.response.data.validationErrors);
      }
    } finally {
      setApiProgress(false);
    }
  };

  /*

fonksiyona dışarıdan erişilebilmesi için export kullanımı gerekmektedir.
*/
  return (
    <div className="container">
      <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2">
        xw
        <form className="card" onSubmit={onSubmit}>
          <div className="text-center card-header">
            <h1>SignUp</h1>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                id="username"
                className={
                  errors.username ? "form-control is-invalid" : "form-control"
                }
                onChange={(event) => setUsername(event.target.value)}
              />
              <div className="invalid-feedback">{errors.username}</div>
            </div>
            <div>
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                className="form-control"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                className="form-control"
                type="password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="passwordRepeat" className="form-label">
                Password Repeat
              </label>
              <input
                id="passwordRepeat"
                className="form-control"
                type="password"
                onChange={(event) => setPasswordRepeat(event.target.value)}
              />
            </div>

            {successMessage && <div>{successMessage}</div>}

            <div className="text-center">
              <button
                className="btn-btn-primary"
                disabled={
                  apiProgress || !password || password !== passwordRepeat
                }
              >
                {apiProgress && (
                  <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                )}
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

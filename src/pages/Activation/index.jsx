import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { activateUser } from "./api";
import { Alert } from "@/shared/components/Alert";
import { Spinner } from "@/shared/components/Spinner";
import { useRouteParamApiRequest } from "@/shared/hooks/useRouteParamApiRequest";

export function Activation() {
  const { apiProgress, data, error } = useRouteParamApiRequest(
    "token",
    activateUser
  );
  // const { token } = useParams();
  // const [apiProgress, setApiProgress] = useState();
  // const [successMessage, setSuccessMessage] = useState();
  // const [errorMessage, setErrorMessage] = useState();
  // useEffect(() => {
  //   async function activate() {
  //     setApiProgress(true);
  //     try {
  //       const response = await activateUser(token);
  //       setSuccessMessage(response.data.message);
  //     } catch (AxiosError) {
  //       setErrorMessage(AxiosError.response.data.message);
  //     } finally {
  //       setApiProgress(false);
  //     }
  //   }
  //   activate();
  // }, [token]);

  return (
    <>
      {apiProgress && (
        <Alert styleType="secondary" center>
          <Spinner />
        </Alert>
      )}
      {data?.message && <Alert>{data.message}</Alert>}
      {error && <Alert styleType="danger">{error.message}</Alert>}
    </>
  );
}

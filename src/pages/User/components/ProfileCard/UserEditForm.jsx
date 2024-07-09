import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useAuthState } from "@/shared/state/context";
import { Alert } from "@/shared/components/Alert";
import { Input } from "@/shared/components/Input";
import { Button } from "@/shared/components/Button";
import { updateUser } from "./api";

export function UserEditForm() {
  const authState = useAuthState();
  const { t } = useTranslation();
  const [newUsername, setNewUsername] = useState(authState.username);
  const [apiProgress, setApiProgress] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState();
  const dispatch = useAuthDispatch();

  const onChangeUsername = (event) => {
    setNewUsername(event.target.value);
    setErrors({});
  };

  const onClickCancel = () => {
    setEditMode(false);
    setNewUsername(authState.username);
  };

  const onSubmit = async () => {
    setApiProgress(true);
    setErrors({});
    setGeneralError();
    try {
      await updateUser(authState.id, { username: newUsername });
      dispatch({
        type: "user-update-success",
        data: { username: newUsername },
      });
      setEditMode(false);
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
    <form onSubmit={onSubmit}>
      <Input
        label={t("username")}
        defaultValue={authState.username}
        onChange={onChangeUsername}
        error={errors.username}
      />
      {generalError && <Alert styleType="danger">{generalError}</Alert>}
      <Button apiProgress={apiProgress} onClick={onClickSave}>
        Save
      </Button>
      <div className="d-inline m-1"></div>
      <Button
        styleType="outline-secondary"
        onClick={onClickCancel}
        type="button"
      >
        Cancel
      </Button>
    </form>
  );
}

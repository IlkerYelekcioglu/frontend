import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useAuthState } from "@/shared/state/context";
import { Alert } from "@/shared/components/Alert";
import { Input } from "@/shared/components/Input";
import { Button } from "@/shared/components/Button";
import { updateUser } from "./api";

export function UserEditForm(setEditMode, setTempImage) {
  const authState = useAuthState();
  const { t } = useTranslation();
  const [newUsername, setNewUsername] = useState(authState.username);
  const [apiProgress, setApiProgress] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState();
  const dispatch = useAuthDispatch();
  const [newImage, setNewImage] = useState();

  const onChangeUsername = (event) => {
    setNewUsername(event.target.value);
    setErrors(function (lastErrors) {
      return {
        ...lastErrors,
        username: undefined,
      };
    });
    useEffect(() => {}, [username]);
  };

  const onClickCancel = () => {
    setEditMode(false);
    setNewUsername(authState.username);
    setNewImage();
    setTempImage();
  };

  const onSelectImage = (event) => {
    setErrors(function (lastErrors) {
      return {
        ...lastErrors,
        image: undefined,
      };
    });
    if (event.target.files.length < 1) return;
    const file = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      const data = fileReader.result;
      setNewImage(data);
      setTempImage(data);
    };

    fileReader.readAsDataURL(file);
  };

  const onSubmit = async () => {
    setApiProgress(true);
    setErrors({});
    setGeneralError();
    try {
      const { data } = await updateUser(authState.id, {
        username: newUsername,
        image: newImage,
      });
      dispatch({
        type: "user-update-success",
        data: { username: data.username, image: data.image },
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
      <Input
        label="Profile Image"
        type="file"
        onChange={onSelectImage}
        error={errors.image}
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

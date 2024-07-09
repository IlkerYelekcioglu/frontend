import { Button } from "@/shared/components/Button";
import { useState } from "react";
import { ProfileImage } from "@/shared/components/profileImage";
import { UserEditForm } from "./userEditForm";
import { useAuthState } from "@/shared/state/context";

export function ProfileCard({ user }) {
  const authState = useAuthState();
  const [editMode, setEditMode] = useState(false);

  const isEditButtonVisible = !editMode && authState.id === user.id;
  const visibleUsername =
    authState.id === user.id ? authState.username : user.username;
  return (
    <div className="card">
      <div className="card-header text-center">
        <ProfileImage width={200} />
      </div>
      <div className="card-body text-center">
        <span className="fs-3 d-block">{visibleUsername}</span>
        {isEditButtonVisible && (
          <Button onClick={() => setEditMode(true)}>Edit</Button>
        )}
        {editMode && <UserEditForm setEditMode={setEditMode} />}
      </div>
    </div>
  );
}

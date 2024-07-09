import { ProfileImage } from "@/shared/components/profileImage";
import { Link } from "react-router-dom";

export function UserListItem({ user }) {
  return (
    <Link
      className="list-group-item list-group-item-action"
      to={`/user/${user.id}`}
      style={{ textDecoration: "none" }}
    >
      <ProfileImage width={30} />
      <span className="ms-2">{user.username}</span>
    </Link>
  );
}

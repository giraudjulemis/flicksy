import UserProfile from "./profile";
import AuthProfile from "./auth";
import { AdminTitle } from "../../../utils/helper";

const AdminProfile = () => {
  return (
    <>
      <AdminTitle title="Profile" />
      <AuthProfile />
      <UserProfile />
    </>
  );
};

export default AdminProfile;

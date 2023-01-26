import UserProfile from "./profile";
import { AdminTitle } from "../../../utils/helper";

const AdminProfile = () => {
  return (
    <>
      <AdminTitle title="Profile" />
      <UserProfile />
    </>
  );
};

export default AdminProfile;

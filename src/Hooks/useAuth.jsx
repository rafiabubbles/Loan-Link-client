import { useContext } from "react";
import AuthContext from "../Contexts/Context/AuthContext";

const useAuth = () => {
  const authInfo = useContext(AuthContext);
//   console.log(authInfo);

  if (!authInfo) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return authInfo;
};

export default useAuth;

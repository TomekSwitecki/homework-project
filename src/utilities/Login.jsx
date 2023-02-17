
import { getAuth, signOut } from "firebase/auth";

export const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        window.location.reload();
        console.log("Signed out");
      })
      .catch((error) => {
        console.log("Error");
      });
  };
  
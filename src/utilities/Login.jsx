
import { getAuth, signOut } from "firebase/auth";
import { showSuccessMessage, showErrorMessage, showInfoMessage } from '../utilities/Notifications';
export const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        window.location.reload();
        showInfoMessage("Signed out", "You have been successfully signed out.");
        console.log("Signed out");
      })
      .catch((error) => {
        console.log("Error");
      });
  };
  
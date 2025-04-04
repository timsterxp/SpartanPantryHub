
import { processGoogleLogin } from "../models/loginAuthModel";
import { saveUser} from "../models/UserModel";


// Function to handle the successful login
export const handleLoginSuccess = (credentialResponse, navigate) => {
    const user = processGoogleLogin(credentialResponse);

    if (user) {
        saveUser(user); // Save user data in localStorage
        navigate("/home"); // Redirect to Home View
    }
};

// Function to handle login failure
export const handleLoginError = () => {
    console.error("Login Failed");
    alert("There was an error logging in. Please try again.");
};
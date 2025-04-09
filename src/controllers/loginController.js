
import { processGoogleLogin } from "../models/loginAuthModel";
import { saveUser} from "../models/UserModel";
import { UserModelMongo} from "../models/UserModelMongo";


// Function to handle the successful login
export const checkDB = (user) => {

    UserModelMongo.findOrCreateUser(user);
};

// Function to handle login failure
export const handleLoginError = () => {
    console.error("Login Failed");
    alert("There was an error logging in. Please try again.");
};
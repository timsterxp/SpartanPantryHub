
import { UserModelMongo} from "../models/UserModelMongo";


// Function to handle the successful login
// Ensures new users get a new DB or old ones can retrieve information
export const checkDB = (user) => {

    UserModelMongo.findOrCreateUser(user);
};

// Function to alert user that login failed
export const handleLoginError = () => {
    console.error("Login Failed");
    alert("There was an error logging in. Please try again.");
};
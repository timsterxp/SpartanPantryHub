//Token may be used for future authentications but we probably won't need it for this project
//As we are only requiring auth for login itself and should not require anymore auths

//npm install @react-oauth/google

import { jwtDecode } from "jwt-decode";

/**
 * Process and gain information about a user. Picture is not used but may be used in future features.
 * @param credentialResponse -> The response is then given to Google's decoder to retrieve information.
 * @returns {{name: *, email: *, picture: *}|null}
 */
export const processGoogleLogin = (credentialResponse) => {
    try {
        const decoded = jwtDecode(credentialResponse.credential);
        const user = {
            name: decoded.name,
            email: decoded.email,
            picture: decoded.picture, // Optional
        };
        return user;
    } catch (error) {
        console.error("Failed to decode Google token:", error);
        return null;
    }
};


//Model may potentially hold database operations?

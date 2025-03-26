import { decodeJwt } from "../models/loginAuthModel";

const CLIENT_ID = ""; // Replace with your actual Google Client ID

export function initializeGoogleLogin(handleCredentialResponse) {
    window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCredentialResponse,  // Pass the response to the callback function
    });

    window.google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size: "large" }  // Customize button style
    );
}
export function handleGoogleResponse(response, setUser) {
    const jwt = response.credential;
    const user = decodeJwt(jwt);
    setUser(user);
}

export function handleLogout(setUser) {
    setUser(null);
}

//Add code to send data to database after retrieving the info from user
import { decodeJwt } from "../models/loginAuthModel";


const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID; //Currently using env files for this. Recommend moving our project over to backend auth later on. However, env will be enough for now

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


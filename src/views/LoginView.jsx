import { useEffect, useState } from "react";
import { initializeGoogleLogin, handleGoogleResponse, handleLogout } from "../controllers/loginController";

export default function GoogleLogin() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        initializeGoogleLogin((response) => handleGoogleResponse(response, setUser));
    }, []);

    return (
        <div>
            <img src="/PantryLogo.png" alt="Logo" />
            <h1>Welcome to PantryHub, your one stop for the food pantry located on campus!</h1>
            <h2>The pantry is located next to the Student Union, in front of the Engineering Building and is open Monday - Friday from 10:00 AM - 5:00 PM</h2>

            {!user ? (

                <div id="signInDiv"></div> // Google Sign-In Button

            ) : (
                <div>
                    <h2>You are logged in with the following information:</h2>
                    <h2>Name: {user.name}</h2>
                    <p>Email: {user.email}</p>
                    <button onClick = {()=>handleLogout(setUser)}>Logout</button>
                </div>

            )}

        </div>

    );
}
import {getUser, clearUser, addMoreFields} from "../models/UserModel";
import {useNavigate, Link} from "react-router-dom";
import {useEffect} from "react";
import "./HomeView.css";


const HomeView = () => {
    const navigate = useNavigate();
    const user = getUser();

    //Clear user by removing them in localStorage and navigating back to the login page.
    //Reload will ensure extra page renderings are not shown
    const handleLogout = () => {
        clearUser();
        navigate("/");
        window.location.reload();
    };

    //When accessing the home page, retrieve user information as to set up the rest of the pages
    useEffect(() => {
        //Used to test DB
        const pingDB = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/test-db-connection");
                const data = await res.json();
                console.log("✅ DB Response:", data.message);
            } catch (err) {
                console.error("❌ Could not connect to DB:", err);
            }
        };

        //Used to test retrieval
        const retrieveUser = async (name, email) => {
            try {
                const res = await fetch("http://localhost:5000/api/user-check", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({name, email}),
                });

                const data = await res.json();
                return data;
            } catch (error) {
                console.error("❌ Error retrieving user:", error);
                return null;
            }
        };


        //Set up User, and ensures any extra information is also retrieved from database
        const init = async () => {
            if (user) {
                await pingDB();
                const userData = await retrieveUser(user.name, user.email);
                console.log("👤 Retrieved User:", userData);
                if (userData) {
                    if (userData.text) {
                        addMoreFields("text", userData.text);
                    }
                    if (userData.role) {
                        addMoreFields("role", userData.role);
                    }
                    if (userData.visits) {
                        addMoreFields("visits", userData.visits);
                    }
                }
            }
        };

        init();
    }, [user]);

    return (
        <div>

            {user ? (
                <>

                    <h1 className="centered">Hello, {user.name}
                        . <button onClick={() => handleLogout()}>Logout</button></h1>

                    <div className="image-container">
                        <figure className="button-3d">
                            <Link to="/recipe"> <img
                                src="https://www.iconpacks.net/icons/2/free-opened-book-icon-3163-thumb.png" alt="Logo"
                                className="image"/> </Link>
                            <figcaption> Recipes</figcaption>
                        </figure>
                        <figure className="button-3d">
                            <Link to="/RoleRequest"> <img src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
                                                          alt="Logo" className="image"/> </Link>
                            <figcaption> Profile</figcaption>
                        </figure>
                        <figure className="button-3d">
                            <Link to="/Inventory"> <img src="https://cdn-icons-png.flaticon.com/512/3081/3081986.png"
                                                        alt="Logo" className="image"/> </Link>
                            <figcaption> Inventory</figcaption>
                        </figure>
                        <figure className="button-3d">
                            <Link to="/Checkout"> <img
                                src="https://cdn0.iconfinder.com/data/icons/shopping-and-commerce-outline/512/Shopping_and_Commerce_-_Outline_21-512.png"
                                alt="Logo" className="image"/> </Link>
                            <figcaption> Checkout</figcaption>
                        </figure>
                        <figure className="button-3d">
                            <Link to="/Orders"> <img src="https://static.thenounproject.com/png/3157802-200.png"
                                                     alt="Logo" className="image"/> </Link>
                            <figcaption> Order History</figcaption>
                        </figure>

                    </div>
                    <div className="centered">
                        <h1> Welcome to PantryHub, your one stop for the food pantry located on campus!</h1>
                        <img src="/PantryLogo.png" alt="Logo"/>
                        <p style={{fontSize: '35px'}}> The pantry is located next to the Student Union, in front of the
                            Engineering Building and is
                            open:
                        </p>

                    </div>
                    <div className="hours-container">
                        <div className="hours" style={{paddingLeft: '100px'}}>
                            <p style={{fontSize: '30px'}}><span style={{fontWeight: 'bold'}}> Monday </span> 10:00 AM -
                                5:00 PM</p>
                            <p style={{fontSize: '30px'}}><span style={{fontWeight: 'bold'}}> Tuesday </span> 10:00 AM -
                                5:00 PM</p>
                            <p style={{fontSize: '30px'}}><span style={{fontWeight: 'bold'}}> Wednesday </span> 10:00 AM
                                - 5:00 PM</p>
                            <p style={{fontSize: '30px'}}><span style={{fontWeight: 'bold'}}> Thursday </span> 10:00 AM
                                - 5:00 PM</p>
                            <p style={{fontSize: '30px'}}><span style={{fontWeight: 'bold'}}> Friday </span> 10:00 AM -
                                5:00 PM</p>
                            <p style={{fontSize: '30px'}}><span style={{fontWeight: 'bold'}}> Saturday </span> Closed
                            </p>
                            <p style={{fontSize: '30px'}}><span style={{fontWeight: 'bold'}}> Sunday </span> Closed</p>
                        </div>

                        <div className="map">
                            <img src="https://i.gyazo.com/4e4f36b0100c7b385bb79cf00da8d4ce.png" alt="Map Location"/>
                        </div>
                    </div>


                </>
            ) : (
                <Link to='/'>
                    <p>Please log in.</p>
                </Link>

            )}


        </div>
    );
};

export default HomeView;
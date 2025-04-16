import { getUser, clearUser } from "../models/UserModel";
import { useNavigate, Link } from "react-router-dom";
import {useEffect} from "react";
import "./HomeView.css";


const HomeView = () => {
    const navigate = useNavigate();
    const user = getUser();

    const handleLogout = () => {
        clearUser();
        navigate("/");
    };

    useEffect(() => {
        const pingDB = async() => {
            try {
                const res = await fetch("http://localhost:5000/api/test-db-connection");
                const data = await res.json();
                console.log("✅ DB Response:", data.message);
            } catch (err) {
                console.error("❌ Could not connect to DB:", err);
            }
        };

       async function retrieveUser(name, email){
            try {
                const res = await fetch("http://localhost:5000/api/user-check", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({name: name, email:email}),
                });


            } catch (error){
                console.log(error);
            }

        };

        if (user) {
            console.log (user.name, user.email);
            pingDB();
            console.log (user.name, user.email);
            retrieveUser(user.name,user.email);
        }
    }, [user]);

    return (
        <div>

            {user ? (
                <>

                    <h2 className="centered">Welcome, {user.name}</h2>
                    <div className="image-container">
                        <figure>
                            <Link to="/recipe">  <img src ="/placeholder.png" alt="Logo" className ="image" />  </Link>
                            <figcaption> Recipes</figcaption>
                        </figure>
                        <figure>
                            <Link to="/RoleRequest">  <img src ="/placeholder.png" alt="Logo" className ="image" />  </Link>
                            <figcaption> Profile</figcaption>
                        </figure>
                        <figure>
                            <Link to="/Inventory">  <img src ="/placeholder.png" alt="Logo" className ="image" />  </Link>
                            <figcaption> Inventory </figcaption>
                        </figure>
                        <figure>
                            <Link to="/Checkout">  <img src ="/placeholder.png" alt="Logo" className ="image" />  </Link>
                            <figcaption> Checkout </figcaption>
                        </figure>
                        <figure>
                            <Link to="/Orders">  <img src ="/placeholder.png" alt="Logo" className ="image" />  </Link>
                            <figcaption> Order History </figcaption>
                        </figure>

                    </div>
                    <div className="centered">
                        <h1> This is PantryHub, your one stop for the food pantry located on campus!</h1>
                        <h2>The pantry is located next to the Student Union, in front of the Engineering Building and is open:
                        </h2>
                        <h2> Monday 10:00 AM - 5:00 PM</h2>
                        <h2> Tuesday 10:00 AM - 5:00 PM</h2>
                        <h2> Wednesday 10:00 AM - 5:00 PM</h2>
                        <h2> Thursday 10:00 AM - 5:00 PM</h2>
                        <h2> Friday 10:00 AM - 5:00 PM</h2>
                        <img src="/PantryLogo.png" alt="Logo" />
                        <th></th>
                        <button onClick = {()=>handleLogout()}>Logout</button></div>

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
import { getUser, clearUser } from "../models/UserModel";
import { useNavigate, Link } from "react-router-dom";


const HomeView = () => {
    const navigate = useNavigate();
    const user = getUser();

    const handleLogout = () => {
        clearUser();
        navigate("/");
    };

    return (
        <div>
            <h2>Welcome to the Home Page</h2>
            {user ? (
                <>
                    <img src="/PantryLogo.png" alt="Logo" />
                    <h1>Welcome to PantryHub, your one stop for the food pantry located on campus!</h1>
                    <h2>The pantry is located next to the Student Union, in front of the Engineering Building and is open Monday - Friday from 10:00 AM - 5:00 PM</h2>

                    <div className="image-container">
                        <figure>
                            <Link to="/recipe">  <img src ="/placeholder.png" alt="Logo" className ="image" />  </Link>
                            <figcaption> Recipes</figcaption>
                        </figure>
                        <figure>
                            <Link to="/RoleRequest">  <img src ="/placeholder.png" alt="Logo" className ="image" />  </Link>
                            <figcaption> Profile?/RoleRequest</figcaption>
                        </figure>
                        <figure>
                            <Link to="/Inventory">  <img src ="/placeholder.png" alt="Logo" className ="image" />  </Link>
                            <figcaption> Inventory </figcaption>
                        </figure>
                        <figure>
                            <Link to="/Checkout">  <img src ="/placeholder.png" alt="Logo" className ="image" />  </Link>
                            <figcaption> Checkout </figcaption>
                        </figure>

                    </div>

                    <h2>You are logged in with the following information:</h2>
                    <h2>Name: {user.name}</h2>
                    <p>Email: {user.email}</p>
                    <button onClick = {()=>handleLogout()}>Logout</button>
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
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginView from './views/LoginView';
import RecipeView from './views/RecipeView';
import RequestRoleView from "./views/RequestRoleView";
import InventoryView from './views/InventoryView';
import InventoryViewConcept from './views/InventoryViewConcept';
import DummyCheckout from './views/DummyCheckout';
import CheckoutView from './views/CheckoutView';
import HomeView from "./views/HomeView";
import {GoogleOAuthProvider} from "@react-oauth/google";
import UserProfileView from "./views/UserProfileView";


// npm install react-router-dom
const clientId= process.env.REACT_APP_GOOGLE_CLIENT_ID;
function App() {
  return (

    <GoogleOAuthProvider clientId={clientId}>


          <Router>
              <div>
                  <nav>
                      <div className ="appleNavigation">
                          <ul>
                              <li> <Link to= "/home" className="navItems"> Home</Link> </li>
                              <li> <Link to= "/recipe" className="navItems">Recipes</Link></li>
                              <li> <Link to= "/RoleRequest" className="navItems">Role Upgrade</Link></li>
                             <li><Link to= "/Inventory" className="navItems">Check Inventory</Link> </li>
                             <li> <Link to= "/Checkout" className="navItems">Checkout</Link></li>
                          </ul>
                      </div>

                  </nav>
              </div>
              <div className="mainContent">       <Routes>
                  <Route path="/" element={<LoginView />} />
                  <Route path="/home" element={<HomeView />} />
                  <Route path="/recipe" element = {<RecipeView />} />
                  <Route path="/RoleRequest" element = {<UserProfileView/>} />
                  <Route path="/Inventory" element = {<InventoryViewConcept/>} />
                  <Route path="/Checkout" element = {<DummyCheckout/>} />
              </Routes></div>





          </Router>


    </GoogleOAuthProvider>
  );
}

export default App;

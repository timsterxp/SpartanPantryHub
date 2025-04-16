import './App.css';
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginView from './views/LoginView';
import RecipeView from './views/RecipeView';
import RequestRoleView from "./views/RequestRoleView";
import InventoryView from './views/InventoryView';
import DummyCheckout from './views/DummyCheckout';
import CheckoutView from './views/CheckoutView';
import HomeView from "./views/HomeView";
import {GoogleOAuthProvider} from "@react-oauth/google";
import UserProfileView from "./views/UserProfileView";
import StaffView from "./views/StaffView";
import OrderView from "./views/OrdersView";


// npm install react-router-dom
const clientId= process.env.REACT_APP_GOOGLE_CLIENT_ID;
function App() {
  return (

    <GoogleOAuthProvider clientId={clientId}>


          <Router>
              <div className = "mainContent">
                  <nav>
                      <div className ="appleNavigation">
                          <ul>
                              <li> <Link to= "/home" className="navItems"> Home</Link> </li>
                              <li> <Link to= "/recipe" className="navItems">Recipes</Link></li>
                              <li> <Link to= "/RoleRequest" className="navItems">Profile</Link></li>
                             <li><Link to= "/Inventory" className="navItems">Check Inventory</Link> </li>
                             <li> <Link to= "/Checkout" className="navItems">Checkout</Link></li>
                              <li> <Link to="/Orders" className="navItems">Order History</Link></li>
                              <li><Link to="/StaffActions" className="navItems">Staff Actions</Link></li>
                          </ul>
                      </div>

                  </nav>
                  <div className="mainContent">       <Routes>
                      <Route path="/" element={<LoginView />} />
                      <Route path="/home" element={<HomeView />} />
                      <Route path="/recipe" element = {<RecipeView />} />
                      <Route path="/RoleRequest" element = {<UserProfileView/>} />
                      <Route path="/Inventory" element = {<InventoryView/>} />
                      <Route path="/Checkout" element = {<DummyCheckout/>} />
                      <Route path="/StaffActions" element = {<StaffView/>} />
                      <Route path="/Orders" element = {<OrderView/>} />
                  </Routes></div>
              </div>






          </Router>


    </GoogleOAuthProvider>
  );
}

export default App;

import './App.css';
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginView from './views/LoginView';
import RecipeView from './views/RecipeView';
import RequestRoleView from "./views/RequestRoleView";
import InventoryView from './views/InventoryView';
import CheckoutView from './views/CheckoutView';
// npm install react-router-dom
function App() {
  return (


          <Router>
              <div>
                  <nav>
                      <div className ="appleNavigation">
                          <ul>
                              <li> <Link to= "/" className="navItems"> LoginPage</Link> </li>
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
                  <Route path="/recipe" element = {<RecipeView />} />
                  <Route path="/RoleRequest" element = {<RequestRoleView/>} />
                  <Route path="/Inventory" element = {<InventoryView/>} />
                  <Route path="/Checkout" element = {<CheckoutView/>} />
              </Routes></div>





          </Router>



  );
}

export default App;

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
              <Routes>
                  <Route path="/" element={<LoginView />} />
                  <Route path="/recipe" element = {<RecipeView />} />
                  <Route path="/RoleRequest" element = {<RequestRoleView/>} />
                  <Route path="/Inventory" element = {<InventoryView/>} />
                  <Route path="/Checkout" element = {<CheckoutView/>} />
              </Routes>
              <nav>
                  <button>
                      <Link to= "/recipe">Recipes</Link>
                  </button>
                  <button>
                      <Link to= "/RoleRequest">Role Upgrade</Link>
                  </button>
                  <button>
                      <Link to= "/Inventory">Check Inventory</Link>
                  </button>
                  <button>
                      <Link to= "/Checkout">Checkout</Link>
                  </button>
              </nav>
          </Router>


  );
}

export default App;

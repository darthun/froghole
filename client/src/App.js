import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">View Order</Link>
            </li>
            <li>
              <Link to="/submit">Submit Orders</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<OrderList />} />
          <Route path="/submit" element={<OrderForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
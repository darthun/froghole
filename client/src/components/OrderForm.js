import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderForm.css';

function OrderForm() {
  const navigate = useNavigate();
  const [order, setOrder] = useState({
    order: '',
    requester: '',
    deliveredBefore: '',
    destinationRegion: '',
    destinationBuilding: '',
    destinationCoordinates: '',
    destinationReserve: '',
    destinationPublicStockpile: false,
    fromRegion: '',
    fromBuilding: '',
    fromCoordinates: '',
    fromReserve: '',
    fromPublicStockpile: false,
    status: 'Pending'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
      if (response.ok) {
        alert('Order submitted successfully!');
        setOrder({
          order: '',
          requester: '',
          deliveredBefore: '',
          destinationRegion: '',
          destinationBuilding: '',
          destinationCoordinates: '',
          destinationReserve: '',
          fromRegion: '',
          fromBuilding: '',
          fromCoordinates: '',
          fromReserve: '',
          status: 'Pending'
        });
        navigate('/'); // Navigate to the View Order page
      }
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="order-form">
      <h2>Submit New Order</h2>
      <div className="form-section">
  <h3>Details</h3>
  <div className="form-row">
    <div className="form-group">
      <label htmlFor="requester">Requester:</label>
      <input type="text" id="requester" name="requester" value={order.requester} onChange={handleChange} required />
    </div>
    <div className="form-group">
      <label htmlFor="deliveredBefore">Delivered Before:</label>
      <input 
        type="datetime-local" 
        id="deliveredBefore" 
        name="deliveredBefore" 
        value={order.deliveredBefore} 
        onChange={handleChange} 
        required 
      />
    </div>
  </div>
  <div className="form-row">
    <div className="form-group">
      <label htmlFor="order">Order:</label>
      <textarea id="order" name="order" value={order.order} onChange={handleChange} required rows="3" />
    </div>
  </div>
</div>
      <div className="form-section">
        <h3>Destination</h3>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="destinationRegion">Region:</label>
            <input type="text" id="destinationRegion" name="destinationRegion" value={order.destinationRegion} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="destinationBuilding">Building:</label>
            <input type="text" id="destinationBuilding" name="destinationBuilding" value={order.destinationBuilding} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="destinationCoordinates">Coordinates:</label>
            <input type="text" id="destinationCoordinates" name="destinationCoordinates" value={order.destinationCoordinates} onChange={handleChange} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="destinationReserve">Reserve:</label>
            <input type="text" id="destinationReserve" name="destinationReserve" value={order.destinationReserve} onChange={handleChange} />
          </div>
        </div>
      </div>
      <div className="form-section">
        <h3>From</h3>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="fromRegion">Region:</label>
            <input type="text" id="fromRegion" name="fromRegion" value={order.fromRegion} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="fromBuilding">Building:</label>
            <input type="text" id="fromBuilding" name="fromBuilding" value={order.fromBuilding} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="fromCoordinates">Coordinates:</label>
            <input type="text" id="fromCoordinates" name="fromCoordinates" value={order.fromCoordinates} onChange={handleChange} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="fromReserve">Reserve:</label>
            <input type="text" id="fromReserve" name="fromReserve" value={order.fromReserve} onChange={handleChange} />
          </div>
        </div>
      </div>
      <button type="submit">Submit Order</button>
    </form>
  );
}

export default OrderForm;
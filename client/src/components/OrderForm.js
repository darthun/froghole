import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderForm.css';

const regions = ['Basin Sionnach', 'Speaking Woods', 'ReachingTrail','Howl County','Callums Cape','The Moors',
  'Viper Pit','Clanshead Valley','Nevish Line','Stonecradle','Weathered Expanse','Morgens Crossing',
  'Farranac Coast','The Linn of Mercy','Callahans Passage','Marban Hollow','The Clastra','Stlican Shelf',
  'Godcrofts','Oathbreaker Isles','Endless Shore','Tempest Island','Fishermans Row','Westgate','Kings Cage',
  'Deadlands','The Drowned Vale','Allods Bight','Reavers Pass','The Fingers','Loch Mor'
];

const buildings = ['Coal Field', 'Component Field', 'Component Mine', 'Concrete Mixer', 'Construction Yard',
   'Engineering Center', 'Facilities', 'Factory', 'Field Hospital', 'Garage', 'Hospital', 'Mass Production Factory',
   'Material Pallet', 'Oil Field', 'Refinery', 'Resource Container', 'Rocket Launch Site', 'Salvage Field', 'Salvage Mine',
   'Seaport', 'Shipyard', 'Shipping Container', 'Shippable Crate', 'Storage Box',
   'Storage Depot', 'Storage Room', 'Sulfur Field', 'Sulfur Mine'];

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
    destinationPublicStockpile: true,
    fromRegion: '',
    fromBuilding: '',
    fromCoordinates: '',
    fromReserve: '',
    fromPublicStockpile: true,
    status: 'Pending'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

      // Create a copy of the order object
  const submittedOrder = { ...order };

  // Replace Reserve values with 'Public' if Public Stockpile is checked
  if (submittedOrder.destinationPublicStockpile) {
    submittedOrder.destinationReserve = 'Public';
  }
  if (submittedOrder.fromPublicStockpile) {
    submittedOrder.fromReserve = 'Public';
  }

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submittedOrder),
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
          destinationPublicStockpile: true,
          fromRegion: '',
          fromBuilding: '',
          fromCoordinates: '',
          fromReserve: '',
          fromPublicStockpile: true,
          status: 'Pending'
        });
        navigate('/'); // Navigate to the View Order page
      }
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setOrder({ ...order, [e.target.name]: value });
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
            <select
                id="destinationRegion"
                name="destinationRegion"
                value={order.destinationRegion}
                onChange={handleChange}
                required
              >
                <option value="">Select Region</option>
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
                </select>
          </div>
          <div className="form-group">
            <label htmlFor="destinationBuilding">Building:</label>
            <select
              id="destinationBuilding"
              name="destinationBuilding"
              value={order.destinationBuilding}
              onChange={handleChange}
              required
            >
              <option value="">Select Building</option>
              {buildings.map(building => (
                <option key={building} value={building}>{building}</option>
              ))}
            </select>
            </div>
          <div className="form-group">
            <label htmlFor="destinationCoordinates">Coordinates:</label>
            <input type="text" id="destinationCoordinates" name="destinationCoordinates" value={order.destinationCoordinates} onChange={handleChange} />
          </div>
        </div>
        <div className="form-row">
  <div className="form-group">
    <label htmlFor="destinationReserve">Reserve:</label>
    <input
      type="text"
      id="destinationReserve"
      name="destinationReserve"
      value={order.destinationReserve}
      onChange={handleChange}
      disabled={order.destinationPublicStockpile}
    />
  </div>
  <div className="checkbox-group">
    <label>
      <input
        type="checkbox"
        name="destinationPublicStockpile"
        checked={order.destinationPublicStockpile}
        onChange={handleChange}
      />
      Public Stockpile
    </label>
  </div>
</div>
      </div>
      <div className="form-section">
        <h3>From</h3>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="fromRegion">Region:</label>
            <select
                id="fromRegion"
                name="fromRegion"
                value={order.fromRegion}
                onChange={handleChange}
                required
              >
                <option value="">Select Region</option>
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
          </div>
          <div className="form-group">
            <label htmlFor="fromBuilding">Building:</label>
            <select
              id="fromBuilding"
              name="fromBuilding"
              value={order.fromBuilding}
              onChange={handleChange}
              required
            >
              <option value="">Select Building</option>
              {buildings.map(building => (
                <option key={building} value={building}>{building}</option>
              ))}
            </select>
            </div>
          <div className="form-group">
            <label htmlFor="fromCoordinates">Coordinates:</label>
            <input type="text" id="fromCoordinates" name="fromCoordinates" value={order.fromCoordinates} onChange={handleChange} />
          </div>
        </div>
        <div className="form-row">
  <div className="form-group">
    <label htmlFor="fromReserve">Reserve:</label>
    <input
      type="text"
      id="fromReserve"
      name="fromReserve"
      value={order.fromReserve}
      onChange={handleChange}
      disabled={order.fromPublicStockpile}
    />
  </div>
  <div className="checkbox-group">
    <label>
      <input
        type="checkbox"
        name="fromPublicStockpile"
        checked={order.fromPublicStockpile}
        onChange={handleChange}
      />
      Public Stockpile
    </label>
  </div>
</div>
      </div>
      <button type="submit">Submit Order</button>
    </form>
  );
}

export default OrderForm;
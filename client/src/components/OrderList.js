import React, { useState, useEffect } from 'react';
import './OrderList.css';

function formatDate(dateString) {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleAcceptOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/accept`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setOrders(orders.map(order => 
          order.id === orderId 
            ? { ...order, status: 'Accepted' } 
            : order
        ));
      } else {
        console.error('Failed to accept order');
      }
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
  
      if (response.ok) {
        setOrders(orders.map(order => 
          order.id === orderId 
            ? { ...order, status: newStatus } 
            : order
        ));
      } else {
        console.error('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };
  
  const [tempStatus, setTempStatus] = useState({});
  
  const handleStatusChange = (orderId, status) => {
    setTempStatus({ ...tempStatus, [orderId]: status });
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Pending' }),
      });

      if (response.ok) {
        setOrders(orders.map(order => 
          order.id === orderId 
            ? { ...order, status: 'Pending' } 
            : order
        ));
      } else {
        console.error('Failed to cancel order');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  return (
    <div className="order-list">
      <h2>Current Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="order-item">
          <h3>Order #{order.id}</h3>
          <div className="order-content">
            <div className="order-section details">
              <h4>Details</h4>
              <p><strong>Requester:</strong> {order.requester}</p>
              <p><strong>Order:</strong> {order.order}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Delivered Before:</strong> {formatDate(order.deliveredBefore).toLocaleString()}</p>
            </div>
            <div className="order-panels">
              <div className="order-section">
                <h4>Destination</h4>
                <p><strong>Region:</strong> {order.destinationRegion}</p>
                <p><strong>Building:</strong> {order.destinationBuilding}</p>
                <p><strong>Coordinates:</strong> {order.destinationCoordinates}</p>
                <p><strong>Reserve:</strong> {order.destinationReserve}</p>
              </div>
              <div className="order-section">
                <h4>From</h4>
                <p><strong>Region:</strong> {order.fromRegion}</p>
                <p><strong>Building:</strong> {order.fromBuilding}</p>
                <p><strong>Coordinates:</strong> {order.fromCoordinates}</p>
                <p><strong>Reserve:</strong> {order.fromReserve}</p>
              </div>
            </div>
            <div className="order-section accept-order">
              <h4>Actions</h4>
              {order.status === 'Pending' ? (
                <button onClick={() => handleAcceptOrder(order.id)}>
                  Accept Order
                </button>
              ) : (
                <>
                  <div className="status-update">
                    <label htmlFor={`status-${order.id}`}>Update Status:</label>
                    <select 
                      id={`status-${order.id}`}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      value={tempStatus[order.id] || order.status}
                    >
                      <option value="Accepted">Accepted</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Blocked">Blocked</option>
                    </select>
                    <button onClick={() => handleUpdateStatus(order.id, tempStatus[order.id] || order.status)}>
                      Update Status
                    </button>
                  </div>
                  <button className="cancel-button" onClick={() => handleCancelOrder(order.id)}>
                    Cancel Order
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderList;
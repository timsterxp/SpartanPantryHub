import React, { useEffect, useState } from "react";

function OrderEditView() {
  const [orders, setOrders] = useState([]);
  const [editOrderId, setEditOrderId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  const handleEditClick = (order) => {
    setEditOrderId(order._id);
    setEditForm({
      ...order,
      items: order.items.map(item => ({ ...item })) // deep copy
    });
  };
  
  const handleChangeQuantity = (index, value) => {
    const updatedItems = [...editForm.items];
    updatedItems[index].quantity = parseInt(value);
    setEditForm({ ...editForm, items: updatedItems });
  };
  
  const handleSave = async () => {
    await fetch(`http://localhost:5000/api/orders/${editOrderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
  
    const updated = await fetch("http://localhost:5000/api/orders").then(res => res.json());
    setOrders(updated);
    setEditOrderId(null);
  };

  return (
    <div>
      <h2>Edit Orders</h2>
      {orders.map((order) => {
        const hasItems = order.items && order.items.length > 0;
        const firstItem = hasItems ? order.items[0] : {};
  
        return (
          <div
            key={order._id}
            style={{ border: "1px solid #ccc", margin: "10px", padding: "10px", background: "#e6f1f7" }}
          >
            {hasItems ? (
              <>
                <p><strong>User:</strong> {firstItem.userName} (ID: {firstItem.userID})</p>
                <p><strong>Date Placed:</strong> {firstItem.datePlaced}</p>
                <p><strong>Status:</strong> {firstItem.status}</p>
                <p><strong>Notes:</strong> {firstItem.notes || "None"}</p>
  
                <h4>Items:</h4>
                {editOrderId === order._id ? (
                  <>
                    {editForm.items.map((item, idx) => (
                      <div key={idx}>
                        <span>{item.name}: </span>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleChangeQuantity(idx, e.target.value)}
                          min="0"
                        />
                      </div>
                    ))}
                    <button onClick={handleSave}>Save</button>
                  </>
                ) : (
                  <>
                    <ul>
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          {item.name}: {item.quantity}
                        </li>
                      ))}
                    </ul>
                    <button onClick={() => handleEditClick(order)}>Edit</button>
                  </>
                )}
              </>
            ) : (
              <p><em>No items in this order.</em></p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default OrderEditView;
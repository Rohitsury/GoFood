import React, {useState} from 'react';
import { useDispatchCart } from './ContextReducer';

export default function Card(props) {
  const options = props.options;
  const priceOptions = Object.keys(options).filter((option) => option !== '_id');
  const dispatch = useDispatchCart();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(priceOptions[0]); // Set the default size

  const handleQty = (e) => {
    setQty(e.target.value);
  };

  const handleOptions = (e) => {
    setSize(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this item?');
      if (confirmed) {
        const res = await fetch(`http://localhost:5000/admin/${id}`, {
          method: 'DELETE'
        });

        if (res.status === 400) {
          console.log('Failed to delete item');
        } 
        if (res.status === 200) {
          alert('Successfully deleted');
          window.location.reload();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const finalPrice = qty * parseInt(options[size]);

  return (
    <div>
      <div className="card mt-3" style={{ width: '18rem' }}>
        <img src={props.foodItems.img} className="card-img-top" alt="..." style={{ height: '200px', objectFit: 'fill' }} />
        <div className="card-body">
          <h5 className="card-title">{props.foodItems.name}</h5>
          <div className=" w-100">
          
            <select className="  h-100 bg-success" onChange={handleOptions} value={size}>
              {priceOptions.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
            
            <div className="d-inline h-100 fs-5 mx-5">Price ₹{finalPrice}</div>   <br />
            <button className="card-link btn btn-danger mt-2" onClick={() => handleDelete(props.foodItems._id)}>
              Delete
            </button>
          </div>
        
        </div>
      </div>
    </div>
  );
}

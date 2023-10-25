import React, { useState } from 'react'
import Delete from '@material-ui/icons/Delete'
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { Navigate } from 'react-router-dom';
import ClearIcon from '@material-ui/icons/Clear';

export default function Cart() {
  const apiUrl = 'https://gofoodbackend-8rp4.onrender.com' || 'http://localhost:5000' ;

  const data = useCart();
  const dispatch = useDispatchCart();
  const [Open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [order, setOrder] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  const [book, setBook] = useState({
    name: "Rohit Suryavanshi",
    price: totalPrice,
  });

  const phoneRegex = /^[6-9]\d{9}$/;

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_ats3Jzkgu2gDAq",
      amount: data.amount,
      currency: data.currency,
      name: book.name,
      description: "Test Transaction",
      image: book.img,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = `${apiUrl}/api/payment/verify`;
          const verifyResponse = await fetch(verifyUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(response),
          });
          const verifyData = await verifyResponse.json();
          console.log(verifyData);
          handlePaymentSuccess();
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
      alert('Please enter a valid name');
      return;
    }
    if (!phoneRegex.test(phone)) {
      alert('Please enter a valid phone number');
      return;
    }
    try {
      const orderUrl = `${apiUrl}/api/payment/orders`;
      const orderResponse = await fetch(orderUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: book.price }),
      });
      const orderData = await orderResponse.json();
      console.log(orderData);
      initPayment(orderData.data);
    } catch (error) {
      console.log(error);
    }
  };


  const nameRegex = /^[A-Za-z\s]+$/;

  if (data.length === 0) {
    return (
      <div>
        <div className=' w-100 text-center fs-3 '>The Cart is Empty!</div>
      </div>
    );
  }

  const handleRemove = (itemId) => {
    dispatch({ type: 'REMOVE', id: itemId });
  };

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch(`${apiUrl}/api/auth/orderData`, {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields here if needed
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
      alert('Please enter a valid name');
      return;
    }
    if (!phoneRegex.test(phone)) {
      alert('Please enter a valid phone number');
      return;
    }
    try {
      const res = await fetch(`${apiUrl}/api/auth/orderdetails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          phone,
          pin,
          address,
          paymentMethod,
          order_data: data,
          order_date: new Date().toDateString()
        })
      });

      const response = await res.json();

      if (res.status === 200) {
        alert("Successfully placed the order!");
        setOrder(true);
        setOpen(false);

      } else {
        alert('Error placing the order');
      }

    } catch (err) {
      console.log(err);
      alert('Error submitting the form');
    }
  };

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handlePaymentSuccess = () => {
    setPaymentCompleted(true);
  };


  return (
    <div style={{ height: 'auto', zIndex:'9999999' }} >
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md' >
      <div className='table-container' style={{ maxHeight: '300px', overflowY: 'auto' }}>
        <table className='table table-hover'>
          <thead className='text-success'>
            <tr>
              <th  scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody >
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td className=''>
                  <button type='button' className='btn p-0 ms-0 delbtn' onClick={() => handleRemove(food.id)}>
                    <Delete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div>
          <h1 className='fs-2 mt-3'>Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          {!order ? (<button className='btn bg-primary mt-5' onClick={() => openModal()}>
            Order Now
          </button>) : (
            <button className='btn bg-success mt-5' onClick={handleCheckOut}>
              Check Out
            </button>
          )
          }

          {Open && (
            <div className="overlay">
              <div className="form ">
                <form className='mt-lg-4' onSubmit={handleSubmit}>
                  <button className='btn bg-primary float-end mb-lg-4' onClick={() => closeModal()}>
                    <ClearIcon />
                  </button>
                  <div className="row w-100 ">
                    <div className='col-12 col-lg-3'>
                      <label className='me-lg-2 me-5 mt-lg-0 mt-3'>Name:</label>
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className='col-lg-3 col-12'>
                      <label className='me-lg-2 me-5 mt-lg-0 mt-3'>Phone </label>
                      <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                    <div className='col-lg-3 col-12'>
                      <label className='me-lg-2 me-4 mt-lg-0 mt-3'>Pin Code</label>
                      <input type="number" className='marginleft' value={pin} onChange={(e) => setPin(e.target.value)} required />
                    </div>
                    <div className='col-lg-3 col-12 mt-lg-0 mt-3'>
                      <label className='me-lg-2 me-4'>Address</label>
                      <input type='text' className='marginleftadd' value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </div>
                    <div className='mt-4 mb-4'>
                      <label className='me-lg-2 me-2'>Payment Method </label>
                      <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
                        <option value="">Select Payment Method</option>
                        <option value="cash_on_delivery">Cash on Delivery</option>
                        <option value="online_payment">Online Payment</option>
                      </select>
                    </div>

                    {paymentMethod === 'cash_on_delivery' && (
                      <>
                        <button type='submit' className='ms-lg-0 ms-3 px-0 btn btn-primary'>
                          Place Order
                        </button>
                      </>
                    )}
                    {paymentCompleted && (
                      <>
                        <button type='submit' className='btn btn-primary  '>
                          Place Order
                        </button>
                      </>
                    )}

                  </div>
                </form>


                {paymentMethod === 'online_payment' && !paymentCompleted && (
                  <>
                    <button onClick={handlePayment} className=" btn btn-primary ms-lg-0 ms-5">
                      Make Payment
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* <button className='btn bg-success mt-5' onClick={handleCheckOut}>
            Check Out
          </button> */}
        </div>
      </div>

      <style>
        {`
                     @media screen and (max-width: 768px) {
                       
                        /* Add this CSS to your component or import it from an external CSS file */
                      .overlay {
                        left: 0;
                        top:-30px;
                        position:fixed;
                        width: 100%;
                        height: 100vh;
                        background: rgba(0,0,0,.7);  
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        z-index: 999; /* Make sure the overlay is on top of other content */
                      }
                      th, td{
                        font-size:12px;
                      }
                       

                      /* Style the form inside the overlay */
                      .overlay .form {
                        background: white;
                        color:black;
                        padding: 20px;
                        border-radius: 5px;
                        margin-top:-40px;
                        width: 80%;
                        max-width: 400px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                      }
                      .overlay .form form input,  .overlay .form form label,  .overlay .form form select {
                        margin-left:18px;
                      }

                      .table-container {
                        max-height: 10px;
                        overflow-y: auto;
                      }

                     }
                  `}
      </style>
    </div>
  );
}

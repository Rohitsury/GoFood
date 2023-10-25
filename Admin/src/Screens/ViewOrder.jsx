import React, { useState, useEffect } from 'react';
import Navbar from '../Component/Navbar';
import { PDFViewer, Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import CheckIcon from '@mui/icons-material/Check';
const styles = StyleSheet.create({
  page: {
    padding: '1cm',
    fontFamily: 'Helvetica',
    fontSize: 12,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 3,
  },
});

function ViewOrder() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [mark, setMark] = useState(false);

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const sortOrdersByVerified = (orders) => {
    // Sort the orders array based on the 'verified' field
    return orders.sort((a, b) => (a.verified === b.verified ? 0 : a.verified ? 1 : -1));
  };

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch('http://localhost:5000/admin/orderdetails'); // Replace 'http://localhost:5000/admin/orderdetails' with the correct backend route to fetch order details
      const data = await response.json();
      setOrderDetails(data);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  const handleClick = async (order) => {
    try {
      // Send the PATCH request to update the order status
      const res = await fetch('http://localhost:5000/admin/delivered', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...order, verified: true }),
      });

      if (res.status === 200) {
        // Update the order status in the state
        setOrderDetails((prevState) =>
          prevState.map((item) =>
            item._id === order._id ? { ...item, verified: true } : item
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generateInvoicePDF = () => {
    // Create a new PDF document
    const doc = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.title}>Invoice</Text>
            {/* Insert your restaurant name here */}
            <Text style={styles.subtitle}>Restaurant: Daddy's BBQ</Text>
          </View>
          {orderDetails.map((order, outerIndex) => (
            <View key={order._id} style={styles.section}>
              <Text style={styles.title}>Order {outerIndex + 1}</Text>
              {/* Insert user details here */}
              <Text style={styles.text}>Name: {order.name}</Text>
              <Text style={styles.text}>Phone: {order.phone}</Text>
              <Text style={styles.text}>Address: {order.address}</Text>
              <Text style={styles.text}>Pin: {order.pin}</Text>
              <Text style={styles.text}>Payment Method: {order.paymentMethod}</Text>
              <View style={styles.section}>
                <Text style={styles.subtitle}>Order Data</Text>
                <table style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <th>Order Date</th>
                      <th>Item Name</th>
                      <th>Quantity</th>
                      <th>Size</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.order_data.map((innerArray, innerIndex) => (
                      <React.Fragment key={innerIndex}>
                        {innerArray.map((item, itemIndex) => (
                          <tr key={`${outerIndex}-${innerIndex}-${itemIndex}`}>
                            <td>{item.Order_date}</td>
                            <td>{item.name}</td>
                            <td>{item.qty}</td>
                            <td>{item.size}</td>
                            <td>{item.price}</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </View>
            </View>
          ))}
        </Page>
      </Document>
    );

    // Open the PDF in a new tab for printing
    const pdfURL = URL.createObjectURL(new Blob([doc], { type: 'application/pdf' }));
    window.open(pdfURL);
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="container">

          <div className="row mt-3 px-3">
            <h3>Orders</h3>
            <div className="row">
              {/* Assuming you want to display order details in a table */}
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Pin</th>
                    <th>Address</th>
                    <th>Payment Method</th>
                    <th>Order Data</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {sortOrdersByVerified(orderDetails).map((order, outerIndex) => (
                    <tr key={order._id}>
                      <td>{outerIndex + 1}</td>
                      <td>{order.name}</td>
                      <td>{order.phone}</td>
                      <td>{order.pin}</td>
                      <td>{order.address}</td>
                      <td>{order.paymentMethod}</td>

                      <td>
                        <table>
                          <thead>
                            <tr>
                              <th className='mx-3'>Order Date</th>
                              <th className='px-3' style={{ width: '12rem' }}>Item Name</th>
                              <th className='px-3'>Quantity</th>
                              <th className='pe-3'>Size</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.order_data.map((innerArray, innerIndex) => (
                              <React.Fragment key={innerIndex}>
                                {innerArray.map((item, itemIndex) => (
                                  <>
                                    <tr key={`${outerIndex}-${innerIndex}-${itemIndex}`}>
                                      <td className='' >{item.Order_date}</td>
                                      <td className='px-3'>{item.name}</td>
                                      <td className='ps-5'>{item.qty}</td>
                                      <td className=''>{item.size}</td>
                                      <td>{item.price}</td>
                                    </tr>
                                  </>
                                ))}

                              </React.Fragment>
                            ))}
                          </tbody>
                        </table>
                      </td>
                      <td><button className={`btn ${order.verified ? '' : 'btn-primary'}`} onClick={() => handleClick(order)}>{order.verified ? (<CheckIcon className='bg-success' style={{ color: 'white', padding: '5px', fontSize: '30px', borderRadius: '20px' }} />) : "Deliver"}</button></td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default ViewOrder;

const express = require('express')
const router = express.Router()
const admin = require('../models/Admin/RegisterSchema')
const fooditem = require('../models/Admin/FoodItemSchema')
const foodcat = require('../models/Admin/FootCategorySchema')
const OrderDetails = require('../models/OrderForm')
const bcrypt = require("bcrypt")
const mongoose = require('mongoose')
const { ObjectId } = require("mongodb");
const PDFDocument = require('pdfkit');
const fs = require('fs');

router.post('/register', async (req, res) => {
  const { userid, password } = req.body;
  let secpassword = await bcrypt.hash(password, 12);
  try {
    const newadmin = new admin({ userid, password: secpassword })
    const usr = await newadmin.save();
    return res.status(200).json({ success: true })

  } catch (err) {
    console.log(err)
    res.status(400).json({ success: false })
  }

})

router.post('/login', async (req, res) => {
  let userid = req.body.userid;
  try {

    let adminData = await admin.findOne({ userid })

    if (!adminData) {
      return res.status(400).json("Invalid data")
    }

    else {
      const pwd = await bcrypt.compare(req.body.password, adminData.password)

      if (!pwd) {
        return res.status(400).json("Invalid Credential")
      }
      else {
        const authtoken = await adminData.generateAuthToken();
        return res.status(200).json({ success: true, authtoken })
      }

    }
  } catch (err) {
    console.log(err)
    res.status(404).json({ success: false })
  }
})

router.post('/addcategory', async (req, res) => {
  const { CategoryName } = req.body; // Update variable name to CategoryName

  try {
    const newcat = new foodcat({ CategoryName });
    const usr = await newcat.save();
    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
});

router.post('/additem', async (req, res) => {
  const { CategoryName, name, img, options, description } = req.body;
  try {
    const newitem = new fooditem({ CategoryName, name, img, options, description })
    const usr = await newitem.save();
    return res.status(200).json({ success: true })

  } catch (err) {
    console.log(err)
    res.status(400).json({ success: false })
  }
})

router.get('/fooddata', async (req, res) => {
  try {
    res.setHeader('Cache-Control', 'no-store');
    const fetch_data = mongoose.connection.db.collection("fooditems");
    const data = await fetch_data.find({}).toArray()
    const foodCategory = mongoose.connection.db.collection("foodcategories");
    const catData = await foodCategory.find({}).toArray()
    global.foodCategory = catData
    global.food_items = data;
    res.send([global.food_items, global.foodCategory])

  } catch (err) {
    console.log(err)

    res.status(400).json({ success: false })
  }

})

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id)
    if (!ObjectId.isValid(id)) {
      return res.status(400).send('Invalid ObjectId');
    }
    const query = { _id: new ObjectId(id) };
    const collection = await mongoose.connection.db.collection("fooditems");
    let result = await collection.deleteOne(query);
    console.log(result)
    res.status(200).send(result);
  } catch (err) {
    console.log(err)
  }

})

router.get('/orderdetails', async (req, res) => {
  try {
    res.setHeader('Cache-Control', 'no-store');
    const fetch_data = mongoose.connection.db.collection("orderdetails");
    const data = await fetch_data.find({}).toArray();

    // Parse the Order_date values into Date objects and sort the orderdetails based on the latest date
    data.forEach((order) => {
      order.order_data.forEach((item) => {
        item.Order_date = new Date(item.Order_date);
      });
    });

    data.sort((a, b) => {
      const dateA = a.order_data.reduce((maxDate, item) => (item.Order_date > maxDate ? item.Order_date : maxDate), new Date(0));
      const dateB = b.order_data.reduce((maxDate, item) => (item.Order_date > maxDate ? item.Order_date : maxDate), new Date(0));
      return dateB - dateA;
    });

    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
});


//   router.post('/generate-invoice', async (req, res) => {
//     try {
//       const orderDetails = req.body; // Assuming the request body contains the order details

//       // Create a new PDF document
//       const doc = new PDFDocument();

//       // Set the response headers for PDF download
//       res.setHeader('Content-Disposition', 'attachment; filename="invoice.pdf"');
//       res.setHeader('Content-Type', 'application/pdf');

//       // Pipe the PDF document to the response
//       doc.pipe(res);

//       // Add the content to the PDF document
//       doc.font('Helvetica').fontSize(12);
//       doc.text('Invoice', { fontSize: 18, align: 'center' });
//       // Insert your restaurant name here
//       doc.text("Restaurant: Daddy's BBQ", { fontSize: 14 });

//       orderDetails.forEach((order, index) => {
//         doc.moveDown(0.5);
//         doc.text(`Order ${index + 1}`, { fontSize: 16 });
//         // Insert user details here
//         doc.text(`Name: ${order.name}`);
//         doc.text(`Phone: ${order.phone}`);
//         doc.text(`Address: ${order.address}`);
//         doc.text(`Pin: ${order.pin}`);
//         doc.text(`Payment Method: ${order.paymentMethod}`);

//         doc.moveDown(0.5);
//         doc.text('Order Data', { fontSize: 14 });

//         // Insert order data table
//         doc.table({
//           headers: ['Order Date', 'Item Name', 'Quantity', 'Size', 'Price'],
//           rows: order.order_data.map((item) => [
//             item.Order_date ? new Date(item.Order_date).toLocaleString() : '', // Convert to Date object before calling .toLocaleString()
//             item.name,
//             item.qty,
//             item.size,
//             item.price,
//           ]),
//         });
//       });

//       // Finalize the PDF and send it to the response
//       doc.end();
//     } catch (err) {
//       console.error('Error generating PDF:', err);
//       res.status(500).json({ success: false });
//     }
//   });

router.patch('/delivered', async (req, res) => {
  try {
    const { _id, verified } = req.body;

    // Find the order by _id and update the verified field to true
    const updatedOrder = await OrderDetails.findOneAndUpdate({ _id: new ObjectId(_id) },
      { verified: true }, // Correctly specify the update object with the field you want to update
      { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router
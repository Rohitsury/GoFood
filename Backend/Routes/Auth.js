const express = require('express');
const User = require('../models/User');
const Order = require('../models/Orders');
const stripe = require('stripe')('sk_test_51NUOwUSIpccS6lYchm5nJL2w85e6uEmEnnnK04kXBMRXrqtZ0f508lK2Ts4l0LEkzQwTEiwpbh2eKOFhg0ptOZ5J00Sr4BzAkN');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const axios = require('axios');
const fetch = require('../middleware/fetchdetails');
const UserOTPVerification = require('../models/UserOtpVerificationSchema')
const nodemailer = require('nodemailer');
const jwtSecret = 'HaHa';
const OrderDetails = require('../models/OrderForm')
const Razorpay = require("razorpay");
const crypto = require("crypto");

let transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.AUTH_USER,
    pass: process.env.AUTH_PASSWORD
  }
});

// const razorpay = new Razorpay({
//   key_id: 'your_razorpay_key_id',
//   key_secret: 'your_razorpay_key_secret',
// });


router.post('/register', async (req, res) => {
  const { name, location, email, password } = req.body;
  let secpassword = await bcrypt.hash(password, 12);

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (existingUser.verified) {
        return res.status(200).json({ message: "User Already Exist" });
      } else {
        SendOTPVerificationEmail(existingUser);
        return res.status(202).json({ message: "Verification OTP email sent", userId: existingUser._id });

      }
    } else {
      const newUser = new User({ name, location, email, password: secpassword, verified: false });
      const savedUser = await newUser.save();
      SendOTPVerificationEmail(savedUser,);
      return res.status(202).json({ message: "Verification OTP email sent", userId: savedUser._id });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
});


router.post('/verifyotp', async (req, res) => {
  try {
    let { id: userId, otp, name, location, email } = req.body;
    console.log(userId, otp, name, location, email)
    if (!userId || !otp) {
      throw new Error('Empty OTP details are not allowed');
    } else {
      const userOTPVerificationRecord = await UserOTPVerification.findOne({
        userId
      });
      console.log("UserOTPVerificationRecord:", userOTPVerificationRecord);

      if (!userOTPVerificationRecord) {
        throw new Error("Account record does not exist");
      } else {
        const { expiresAt, otp: hashedOTP } = userOTPVerificationRecord;
        

        if (expiresAt < Date.now()) {
          await UserOTPVerification.deleteOne({ userId });
          return res.status(400).json({ message: "Code has expired. Please request again." });
        } else {
          const validOTP = await bcrypt.compare(otp, hashedOTP);
           

          if (!validOTP) {
            res.status(401).json({ message: "Invalid code passed. Check your inbox." });
          } else {
            await User.updateOne({ _id: userId }, { verified: true, name, location, email });
            await UserOTPVerification.deleteOne({ userId });
            res.status(200).json({
              status: "VERIFIED",
              message: "User email verified successfully."
            });
          }
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.json({
      status: "FAILED",
      message: err.message
    });
  }
});

router.post('/resendotp', async (req, res) => {
  try {
    let { id: userId, email } = req.body;
    if (!userId || !email) {
      throw Error("Empty user datails are not allowed")
    } else {
      await UserOTPVerification.deleteMany({ userId });
      SendOTPVerificationEmail({ _id: userId, email }, res);
      res.status(200).json({ message: 'Email sent successfully' })
    }
  } catch (Err) {
    console.log(Err)
    res.json({
      status: "FAILED",
      message: Err.message
    });
  }
})



router.post('/login', [
  body('email', "Enter a Valid Email").isEmail(),
  body('password', "Password cannot be blank").exists(),
], async (req, res) => {
  let success = false
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });  //{email:email} === {email}
    if (!user) {
      return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
    }

    const pwdCompare = await bcrypt.compare(password, user.password); // this return true false.
    if (!pwdCompare) {
      return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
    }
    const data = {
      user: {
        id: user.id
      }
    }
    success = true;
    const authToken = jwt.sign(data, jwtSecret);
    res.json({ success, authToken })


  } catch (error) {
    console.error(error.message)
    res.send("Server Error")
  }
})

// Get logged in User details, Login Required.
router.post('/getuser', fetch, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password") // -password will not pick password from db.
    res.send(user)
  } catch (error) {
    console.error(error.message)
    res.send("Server Error")

  }
})

// Get logged in User details, Login Required.
router.post('/getlocation', async (req, res) => {
  try {
    let lat = req.body.latlong.lat
    let long = req.body.latlong.long
    console.log(lat, long)
    let location = await axios
      .get("https://api.opencagedata.com/geocode/v1/json?q=" + lat + "+" + long + "&key=74c89b3be64946ac96d777d08b878d43")
      .then(async res => {
        // console.log(`statusCode: ${res.status}`)
        console.log(res.data.results)
        // let response = stringify(res)
        // response = await JSON.parse(response)
        let response = res.data.results[0].components;
        console.log(response)
        let { village, county, state_district, state, postcode } = response
        return String(village + "," + county + "," + state_district + "," + state + "\n" + postcode)
      })
      .catch(error => {
        console.error(error)
      })
    res.send({ location })

  } catch (error) {
    console.error(error.message)
    res.send("Server Error")

  }
})

router.post('/foodData', async (req, res) => {
  try {
    // console.log( JSON.stringify(global.foodData))
    // const userId = req.user.id;
    // await database.listCollections({name:"food_items"}).find({});
    res.send([global.foodData, global.foodCategory])
  } catch (error) {
    console.error(error.message)
    res.send("Server Error")

  }
})

router.post('/orderData', async (req, res) => {
  let data = req.body.order_data
  await data.splice(0, 0, { Order_date: req.body.order_date })
  console.log(data)
  //if email not exisitng in db then create: else: InsertMany()
  let eId = await Order.findOne({ 'email': req.body.email })
  if (eId === null) {
    try {
      await Order.create({
        email: req.body.email,
        order_data: [data]
      }).then(() => {
        res.json({ success: true })
      })
    } catch (error) {
      console.log(error.message)
      res.send("Server Error", error.message)
    }
  }
  else {
    try {
      await Order.findOneAndUpdate({ email: req.body.email },
        { $push: { order_data: data } }).then(() => {
          res.json({ success: true })
        })
    } catch (error) {
      console.log(error.message)
      res.send("Server Error", error.message)
    }
  }
})

router.post('/myOrderData', async (req, res) => {
  try {
    let eId = await Order.findOne({ 'email': req.body.email })
    //console.log(eId)
    res.json({ orderData: eId })
  } catch (error) {
    res.send("Error", error.message)
  }


});

router.post('/createPaymentIntent', async (req, res) => {
  try {
    const orderData = req.body.order_data;

    // Calculate the total amount for the order based on your logic
    const totalAmount = orderData.reduce((total, food) => total + food.price, 0);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100, // Amount in cents
      currency: 'inr',
    });

    res.json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.post('/createPaymentLink', async (req, res) => {
  try {
    const orderData = req.body.order_data;
    // Calculate the total amount for the order based on your logic
    const totalAmount = orderData.reduce((total, food) => total + food.price, 0);

    // Use the UPI payment gateway provider's API to generate the payment link
    const paymentLink = await createPaymentLink(totalAmount); // Implement this function based on your chosen UPI payment gateway provider's API

    res.json({ paymentLink });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});


router.post('/orderdetails', async (req, res) => {
  const { name, phone, pin, address, paymentMethod, } = req.body;
  let data = req.body.order_data
  await data.splice(0, 0, { Order_date: req.body.order_date })

  console.log(data)
  try {
    const newOrder = new OrderDetails({
      name,
      phone,
      pin,
      address,
      paymentMethod,
      order_data: [data],
    });

    await newOrder.save();
    return res.status(200).json({ message: "Data Submitted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
});

 
router.post("/orders", async (req, res) => {
	try {
		const instance = new Razorpay({
			key_id: process.env.KEY_ID,
			key_secret: process.env.KEY_SECRET,
		});

		const options = {
			amount: req.body.amount * 100,
			currency: "INR",
			receipt: crypto.randomBytes(10).toString("hex"),
		};

		instance.orders.create(options, (error, order) => {
			if (error) {
				console.log("Error creating Razorpay order:", error);
				return res.status(500).json({ message: "Failed to create Razorpay order." });
			}
			console.log("Razorpay order created successfully:", order);
			res.status(200).json({ data: order });
		});
	} catch (error) {
		console.log("Internal server error:", error);
		res.status(500).json({ message: "Internal Server Error!" });
	}
});

router.post("/verify", async (req, res) => {
	try {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac("sha256", "Gsoc6XdtdGV2oFsUo5KvCFA4") // Use the key_secret directly here
			.update(sign.toString())
			.digest("hex");

		if (razorpay_signature === expectedSign) {
			return res.status(200).json({ message: "Payment verified successfully" });
		} else {
			return res.status(400).json({ message: "Invalid signature sent!" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
});



const SendOTPVerificationEmail = ({ _id, email }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
      const hashedOTP = await bcrypt.hash(otp, 12);

      const newOTPVerification = await new UserOTPVerification({
        userId: _id,
        otp: hashedOTP,
        createdAt: Date.now(),
        expiresAt: Date.now() + 10 * 60 * 1000,
      });

      await newOTPVerification.save();

      const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Verify Your Email",
        html: `<p> Your OTP is ${otp} </p>`,
      };

      await transporter.sendMail(mailOptions);

      console.log("Verification OTP email sent");
      resolve();
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};


module.exports = router

global.foodData = require('./db')(function call(err, data, CatData) {
  // console.log(data)
  if(err) console.log(err);
  global.foodData = data;
  global.foodCategory = CatData;
})

const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const port = process.env.PORT

app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use(cors())
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
dotenv.config({path:'./config.env'})
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth', require('./Routes/Auth'));
app.use('/admin', require('./Routes/Admin'));
app.use( require('./Routes/ForgotPassword'));
app.use("/api/payment/", require('./Routes/Payment'));

app.listen(port, () => {
  console.log(`Server Is Running...`)
})


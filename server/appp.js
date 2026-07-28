const express = require('express');

const cors = require("cors");

const app = express();
const mongoose = require('mongoose');

 
const userRouter = require('./routes/user.routes.js')
const eventRouter = require('./routes/event.routes.js')
const dotenv= require('dotenv');

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

dotenv.config();
 
mongoose
  .connect(
    process.env.MONGODB_URL
  )
  .then(() => {
    console.log('MONGODB CONNECTED');
  })
  .catch((err) => {
    console.log(err);
  });
 
app.use('/api/v1/auth' , userRouter);
app.use('/api/v1' , eventRouter );
 
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
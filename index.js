const express = require('express');
const app = express();
const cors = require("cors")

app.use(cors());

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

//app.use(logger);

// app.use("/api/auth", require('./src/api/auth-routes'));
// app.use("/api/user", require('./src/api/user-routes'));
// app.use("/api/provider", require('./src/api/provider-routes'));
// app.use("/api/listing", require('./src/api/listing-routes'));
// app.use("/api/booking", require('./src/api/booking-routes'));


const usersRouter = require('./src/api/user-routes');
const listings = require('./src/api/listings-routes');
const authRouter = require('./src/api/auth-routes');
const bookingsRouter = require('./src/api/booking-routes');
const imgRouter = require('./src/api/img-routes');
const providerRouter = require('./src/api/provider-routes');



app.use((req, res, next)=> {
    console.log("This middleware function was executed");
    console.log(req.body);
    next();
})


app.use('/api/auth', authRouter);
app.use('/api/provider', providerRouter);
app.use('/api/user', usersRouter);
app.use("/api/listings", listings);
app.use("/api/auth", authRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/img', imgRouter);




 
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));

const mongoose = require("mongoose");
const url =
  process.env.NODE_ENV != "development"
    ? process.env.SERVER_DB_URI + process.env.DB_NAME
    : process.env.LOCAL_DB_URI + process.env.DB_NAME;
console.log(url, "url");
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    poolSize: 20,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("UV heal database is connected ! .");
  })
  .catch((error) => {
    console.log(error);
    console.log("UV heal database is not connected !.");
  });

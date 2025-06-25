require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./api/app");

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI; // bạn nhớ thêm biến này vào .env

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB successfully.");
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
})
.catch((error) => {
  console.error("Unable to connect to MongoDB:", error);
});

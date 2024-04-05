// const express = require("express");
// const dotenv = require("dotenv");
// const { default: mongoose } = require("mongoose");
// const app = express();
// const cors = require("cors");
// const { notFound, errorHandler } = require("./middleware/errorMiddleware");
// const path=require("path");

// app.use(
//   cors({
//     origin: "*",
//   })
// );
// dotenv.config();

// app.use(express.json());

// const userRoutes = require("./Routes/userRoutes");
// const chatRoutes = require("./Routes/chatRoutes");
// const messageRoutes = require("./Routes/messageRoutes");

// const connectDb = async () => {
//   try {
//     const connect = await mongoose.connect(process.env.MONGO_URI);
//     console.log("Server is Connected to Database");
//   } catch (err) {
//     console.log("Server is NOT connected to Database", err.message);
//   }
// };
// connectDb();

// app.get("/", (req, res) => {
//   res.send("API is running123");
// });

// app.use("/user", userRoutes);
// app.use("/chat", chatRoutes);
// app.use("/message", messageRoutes);

// // Error Handling middlewares
// app.use(notFound);
// app.use(errorHandler);

// app.get("/", (req, res) => {
//   app.use(express.static(path.resolve(__dirname, "live-chat-client", "build")));
//   res.sendFile(path.resolve(__dirname, "live-chat-client", "build", "index.js" ));
//   });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, console.log("Server is Running..."));
const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const app = express();
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");

dotenv.config();
app.use(cors({ origin: "*" }));
app.use(express.json());

const userRoutes = require("./Routes/userRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("Server is Connected to Database");
  } catch (err) {
    console.log("Server is NOT connected to Database", err.message);
  }
};
connectDb();

// Define API routes
app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

// Serve static files from frontend build directory
app.use(express.static(path.resolve(__dirname, "live-chat-client", "build")));

// Serve the index.js file for all routes except API routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "live-chat-client", "build", "index.js"));
});

// Route handler for the root URL
app.get("/", (req, res) => {
  res.send("API is running123");
});

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is Running...");
});

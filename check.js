const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://eugenewoolf220205:kooaC97J1UjrWTSk@cluster0.neq5rqb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch((err) => console.error("Connection error:", err));
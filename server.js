const app = require("./app");
const { connectDB } = require("./db");

const PORT = process.env.PORT || 5005;

function connectServer() {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

connectDB().then(connectServer);

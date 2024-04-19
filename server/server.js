const app = require("./app");
const mongoose = require("mongoose");

const DB = process.env.DATABASE_URL.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
  });
});

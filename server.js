const express = require("express");
const PORT = 5000;
const app = express();
const routes = require("./routes");
const mongoose = require("mongoose");
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://root1234:root1234@cluster0.ab9f3.mongodb.net/tdd?retryWrites=true&w=majority",
    {
      // 경고 문구 방지
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Mongo DB Connected"))
  .catch((err) => console.log(err));
// 해당 요청이 오면 routes/index.js로 보내준다.
app.use("/", routes);

// 에러 처리기
// 에러가 발생하면 next를 통해 해당 부분으로 넘어 온다.
app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});


app.listen(PORT, () => {
  console.log(`this server listening on ${PORT}`);
});

module.exports = app;

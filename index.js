const express = require("express");
const app = express();
const port = 3000;
const { v4: uuid } = require("uuid");
app.set('view engine', 'ejs');

// http://expressjs.com/en/resources/middleware/method-override.html

const axios = require("axios");

let comments = [
  {
    id: uuid(),
    username: "ceco",
    comment: "great!",
  },
  {
    id: uuid(),
    username: "ivan",
    comment: "12321323213213",
  },
];

app.get("/", (req, res) => { // async(req, res)
  //res.send(comments);

  axios.get('https://bochko.bg/wp-json/wp/v2/post_product/')
  .then(function (response) {
    // handle success
    res.render('index', {products: response.data})
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

//   try {
//     const newsApi = await axios.get(
//       "https://bochko.bg/wp-json/wp/v2/post_product"
//     );
//     console.log(newsApi);
//   } catch (error) {}

});

app.get("/comment/:id", (req, res) => {
  const { id } = req.params;
  const foundComment = comments.find((c) => c.id == id);
  res.send(foundComment.comment);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

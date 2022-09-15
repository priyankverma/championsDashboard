const express = require("express");
const path = require("path");
const fs = require("fs");
var axios = require('axios');




const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));
app.get("/", (req, res) => {
  const filePath = path.resolve(__dirname, "../public/", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    data = data
      .replace(/__TITLE__/g, "Home Page")
      .replace(/__DESCRIPTION__/g, "Home page description")
      .replace(/__IMAGE__/g, "https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png");
    res.send(data)
  });
});

app.get("/about", (req, res) => {
  const filePath = path.resolve(__dirname, "../public/", "index.html");
  // res.set('Access-Control-Allow-Origin', 'http://localhost:5000/');
  // res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    data = data
      .replace(/__TITLE__/g, "About Page")
      .replace(/__DESCRIPTION__/g, "About page description.")
      .replace(/__IMAGE__/g, "https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png");

    res.send(data)
  });
});


app.get("/articles/:id", async (req, res) => {
  try {
  let champID = req.params.id
  const filePath = path.resolve(__dirname, "../public/", "index.html");
  await fs.readFile(filePath, "utf8",  async (err, nodeData) => {
    if (err) {
      return console.log(err);
    }

    const options = {
      method: 'GET',
      url: 'https://api.pandascore.co/lol/champions/' + champID,
      headers: {
        authorization: 'Bearer MG5rGXMszfU8_6lW92ntbVTClkGkUXn9CIzP5TC_Amp-xNkrXxY'
      }
    };
    
    let tempVariable = await axios
      .request(options)
      .then(function (response) {

        return response
      })
      .catch(function (error) {
        console.log('error', error)
        console.error(error);
      });
     nodeData = await nodeData
      .replace(/__TITLE__/g, `THIS IS DYNAMIC TITLE FOR ${tempVariable.data.name}`)
      .replace(/__DESCRIPTION__/g, `THIS IS DYNAMIC DESCRIPTION FOR ${tempVariable.data.name}`)
      .replace(/__IMAGE__/g, tempVariable.data.big_image_url)
      res.writeHeader(200, {"Content-Type": "text/html"});
      res.write(nodeData);   
      //  res.send(nodeData)

  });
} catch (err) {
  res.status(500).json({ message: err });
}
});

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
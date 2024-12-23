var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const app = express();

const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + "/../client/dist"));

console.log(__dirname);

//API Credentials
// const textapi = new aylien({
//     application_id: "your-api-id",
//     application_key: "your-key"
//   });

// Variables for url and api key

app.get("/", function (req, res) {
  res.sendFile("dist/index.html", { root: __dirname + "/../client" });
});

// POST Route
app.post("/api", async (req, res) => {
  const url = req.body.input;
  // const articleText = fetchArticleText(url)
  console.log(url);
  const API_KEY = process.env.APPLICATION_KEY;

  try {
    const textRazorResponse = await axios.post(
      "https://api.textrazor.com/",
      {
        url,
        //text: article,
        extractors: "entities,topics,senses,relations",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-TextRazor-Key": API_KEY, // Sending API key in headers
        },
      }
    );
    console.log(textRazorResponse.data);
    res.json(textRazorResponse.data); // Send the response data back to the client
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send("Error processing the article");
  }
});

// Designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});

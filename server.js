const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});


app.use(express.static("public"));


app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render("index", { title: "Home Page" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Us" });
});


app.get("/user/:name", (req, res) => {
  res.render("user", { title: "User Profile", name: req.params.name });
});


app.post("/submit", (req, res) => {
  console.log("Form submitted:", req.body);
  res.send("Form submitted successfully!");
});


app.get("/download", (req, res) => {
    const file = path.join(__dirname, "public/files/sample.pdf");
    res.download(file, "downloaded-file.pdf", (err) => {
      if (err) {
        console.error("Error downloading file:", err);
        res.status(500).send("File download failed");
      }
    });
  });
  

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

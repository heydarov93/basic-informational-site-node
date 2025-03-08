const createServer = require("http").createServer;
const fs = require("fs/promises");
const express = require("express");

const PORT = 8000;

// Initialize the server
const app = express();

// HTML middleware
const htmlMiddleware = (req, res, next) => {
  res.setHeader("Content-Type", "text/html");
  next();
};

// Route handler for pages
const servePageHandler = async (filePath, req, res) => {
  try {
    const pageContent = await fs.readFile(filePath, "utf8");

    res.send(pageContent);
  } catch (error) {
    throw error;
  }
};

app.use(htmlMiddleware);

// Route for home page
app.get("/", async (req, res) => {
  try {
    await servePageHandler("./index.html", req, res);
  } catch (error) {
    console.log(error.message);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.send("Server Error");
  }
});

// Route for about page
app.get("/about", async (req, res) => {
  try {
    await servePageHandler("./about.html", req, res);
  } catch (error) {
    console.log(error.message);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.send("Server Error");
  }
});

// Route for contact page
app.get("/contact-me", async (req, res) => {
  try {
    await servePageHandler("./contact-me.html", req, res);
  } catch (error) {
    console.log(error.message);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.send("Server Error");
  }
});

// If no route matched send 404 not found page
app.use(async (req, res, next) => {
  try {
    res.status(404);
    await servePageHandler("./404.html", req, res);
  } catch (error) {
    console.log(error.message);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.send("Server Error");
  }
});

// const server = createServer(async (req, res) => {
//   htmlMiddleware(req, res, async () => {
//     try {
//       if (req.method === "GET") {
//         if (req.url === "/") {
//           await servePageHandler("./index.html", req, res);
//         } else if (req.url === "/about") {
//           await servePageHandler("./about.html", req, res);
//         } else if (req.url === "/contact-me") {
//           await servePageHandler("./contact-me.html", req, res);
//         } else {
//           res.statusCode = 404;
//           await servePageHandler("./404.html", req, res);
//         }
//       } else {
//         throw new Error("Method not allowed!");
//       }
//     } catch (error) {
//       console.log(error.message);
//       res.writeHead(500, { "Content-Type": "text/plain" });
//       res.end("Server Error");
//     }
//   });
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import { createServer } from "http";
import fs from "fs/promises";

const PORT = 8000;

// HTML middleware
const htmlMiddleware = (req, res, next) => {
  res.setHeader("Content-Type", "text/html");
  next();
};

// Route handler for pages
const servePageHandler = async (filePath, req, res) => {
  try {
    const pageContent = await fs.readFile(filePath, "utf8");
    res.write(pageContent);
    res.end();
  } catch (error) {
    throw error;
  }
};

const server = createServer(async (req, res) => {
  htmlMiddleware(req, res, async () => {
    try {
      if (req.method === "GET") {
        if (req.url === "/") {
          await servePageHandler("./index.html", req, res);
        } else if (req.url === "/about") {
          await servePageHandler("./about.html", req, res);
        } else if (req.url === "/contact-me") {
          await servePageHandler("./contact-me.html", req, res);
        } else {
          res.statusCode = 404;
          await servePageHandler("./404.html", req, res);
        }
      } else {
        throw new Error("Method not allowed!");
      }
    } catch (error) {
      console.log(error.message);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Server Error");
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

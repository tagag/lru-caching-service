import express from 'express'
import LRUCache from "./lru-cache";

const app = express();
const port = process.env.PORT || "8080";

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const cache = new LRUCache(5);

app.get('/cache/:key', (req, res) => {
  const value = cache.read(req.params.key);

  if (value) {
    res.status(200).json(value);
  } else {
    res.status(404).json(`Key ${req.params.key} does not exist in the cache`);
  }
});

// Request should be json in the form {'someKey': 'someValue'}
app.post('/cache', (req, res) => {
  Object.keys(req.body).forEach((key) => {
    cache.write(key, req.body[key]);
  });
  res.status(200).json('Successfully added entries');
});

app.delete('/cache/:key', (req, res) => {
  const key = req.params.key;

  if (cache.read(key)) {
    cache.remove(key);
    res.status(200).json(`succesfully removed key ${key}`);
  } else {
    res.status(404).json(`Key ${key} does not exist in the cache`);
  }
});

app.get("/", (req, res) => {
  res.status(200).json("Caching service");
});
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

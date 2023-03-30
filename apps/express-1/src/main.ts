import express from 'express';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

function requireContentType(type: string) {
  return (req, res, next) => {
    if (req.headers['content-type'] !== type) {
      res.status(400).send(`server requires ${type}`);
    } else {
      next();
    }
  };
}

app.get('/', requireContentType('application/json'), (req, res) => {
  res.send({ message: 'Hello API' });
});

app.get('/html', requireContentType('text/html'), (req, res) => {
  res.send('<p>html p</p>');
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

import express, { json } from 'express';
const PORT = 322;
const app = express();
import productsRouter from './routes/inventory';
import usersRouter from './routes/users';
app.use(json());
app.listen( 
    PORT, 
    ()=>console.log(`open at http://localhost:${PORT}`)
);


app.use("/products", productsRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});


app.use("/users", usersRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});


app.get('/ayaka', (req, res)=>{
    res.status(200).send({
        charName: 'Ayaka Kamisato',
        charElement: 'Cryo'
    })
});

app.get('/', (req, res)=>{
    res.status(200).send({
        message: "Nothing to see here knucklehead"
    })
});
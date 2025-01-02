import express from 'express';
// Routes
import employeesRoute from './routes/employees.route.js';
import ping from './routes/index.routes.js';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log('Request: ', req.method, req.url);
    next();
});

app.use(ping);
app.use('/api', employeesRoute);
app.use((req, res)=> {
    res.status(404).send('Not Found');
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

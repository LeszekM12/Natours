const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

app.use((req,res,next)=>{
  console.log('Hello form the middleware!');
  next();
});

app.use((req,res,next)=>{
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf8')
);

//Route handlers
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours
    }
  });
};

const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  const tour = tours.find(tour => tour.id === id);

  // if(id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};

const createTour = (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, res.body);

  tours.push(newTour);

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  });
};

const updateTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>'
    }
  });
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'No route user found.'
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'No route user found.'
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'No route user found.'
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'No route user found.'
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'No route user found.'
  });
};

//  app.get('/api/v1/tours', getAllTours);
//  app.post('/api/v1/tours', createTour);
//  app.get('/api/v1/tours/:id', getTour);
//  app.patch('/api/v1/tours/:id', updateTour);
//  app.delete('/api/v1/tours/:id', deleteTour);

// Routes

const tourRouter = express.Router();
const userRouter = express.Router();
tourRouter.route('/')
  .get(getAllTours)
  .post(createTour);

tourRouter.route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

userRouter.route('/')
  .get(getAllUsers)
  .post(createUser);

userRouter.route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
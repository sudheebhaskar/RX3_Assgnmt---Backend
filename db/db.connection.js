const mongoose = require('mongoose');

const initializeDatabase = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    console.error('MONGODB_URI environment variable is not set in Secrets');
    process.exit(1);
  }

  try {
    console.log('Attempting to connect to MongoDB...');

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✓ MongoDB Connected Successfully');
    console.log(`✓ Connected to database: ${mongoose.connection.name}`);

  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);

    if (error.name === 'MongoParseError') {
      console.error('Error: Invalid connection string format');
    } else if (error.name === 'MongoNetworkError') {
      console.error('Error: Network connection failed. Please check:');
      console.error('1. Your network connection');
      console.error('2. If your IP is whitelisted in MongoDB Atlas');
    }
    throw error;
  }
};

// Add event listeners for connection states
mongoose.connection.on('connected', () => {
  console.log('✓ Mongoose default connection established');
});

mongoose.connection.on('error', (err) => {
  console.error('× Mongoose connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('× Mongoose connection disconnected');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Mongoose connection closed through app termination');
  process.exit(0);
});

module.exports = { initializeDatabase };














// const mongoose = require('mongoose');

// const mongoURI = process.env.MONGODB_URI;

// if (!mongoURI) {
//   console.error('MONGODB_URI environment variable is not set. Please add it to your Secrets.');
//   process.exit(1);
// }

// const initializeDatabase = async () => {
//   try {
//     const connection = await mongoose.connect(mongoURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     if (connection) {
//       console.log('Connected Successfully');
//     }
//   } catch (error) {
//     console.log('Connection Failed', error);
//   }
// }

// module.exports = { initializeDatabase };



// const mongoose = require('mongoose');
// const mongoURI = process.env.MONGODB_URI;

// if (!mongoURI) {
//   console.error('MONGODB_URI environment variable is not set. Please add it to your Secrets.');
//   process.exit(1);
// }

// const initializeDatabase = async () => {
//   try {
//     // Add more detailed logging
//     console.log('Attempting to connect to MongoDB...');

//     const connection = await mongoose.connect(mongoURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     // Add connection status check
//     if (connection.connection.readyState === 1) {
//       console.log('Successfully connected to MongoDB');
//       console.log(`Connected to database: ${connection.connection.name}`);
//     }

//   } catch (error) {
//     console.error('MongoDB Connection Error:', error.message);

//     // More detailed error logging
//     if (error.name === 'MongoParseError') {
//       console.error('Invalid connection string. Please check your MONGODB_URI format.');
//     }
//     if (error.name === 'MongoNetworkError') {
//       console.error('Network error. Please check if your IP is whitelisted and network is stable.');
//     }

//     // Exit the process on connection failure if needed
//     // process.exit(1);
//   }
// }

// // Add connection event listeners
// mongoose.connection.on('connected', () => {
//   console.log('Mongoose connected to DB');
// });

// mongoose.connection.on('error', (err) => {
//   console.error('Mongoose connection error:', err.message);
// });

// mongoose.connection.on('disconnected', () => {
//   console.log('Mongoose disconnected');
// });

// module.exports = { initializeDatabase };
const allowedOrigins = [
  "http://localhost:3000",
  "https://harmony-of-words-ca3m.onrender.com",
];

exports.corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Use the cors middleware with the cors options for all routes

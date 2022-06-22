if (process.env.NODE_ENV == "development") {
  // module.exports.BASE_API_URL = 'https://uvheal-backend.herokuapp.com/'
  module.exports.BASE_API_URL = 'http://localhost:3005/'
  // module.exports.BASE_API_URL = "https://e9dbca4fa046.ngrok.io/";
  // module.exports.BASE_API_URL = "http://13.127.240.225/api/";
} else {
  module.exports.BASE_API_URL = "http://3.109.5.74/api/";
}

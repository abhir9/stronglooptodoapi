module.exports = function (app) {
  const multer = require('multer')
  const path = require('path')
  const Todo = app.models.Todo;
  const AppUser = app.models.Appuser;
  const User = app.models.User;
  const AccessToken = app.models.AccessToken;
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'server/public/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

  var authentication = function (req, res, next) {
    if (req.originalUrl === '/api/appusers/login' || (req.originalUrl === '/api/appusers' & req.method === 'POST'))
      return next();

    if (req.accessToken || req.headers['x-access-token'])
      return next();
    else
      res.status(401).json({message: "Access Token Required"})
  }

  var upload = multer({storage: storage});
  app.post('/api/todos', authentication, upload.single('file'), function (req, res, next) {
    next();
  });
  app.put('/api/todos/:id', authentication, upload.single('file'), function (req, res, next) {
    next();
  });
  app.use('*', authentication, function (req, res, next) {
    next();
  });
}

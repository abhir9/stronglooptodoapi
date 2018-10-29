'use strict';
module.exports = function (Todo) {
  Todo.download = function (req, res, cb) {
    var report;
    Todo.find({
      where: {id: req.params.id}
    }, function (err, todoDetails) {
      if (err) {
        res.status(500).json({message: err})
      }
      res.download('server/public/' + todoDetails[0].fileName, todoDetails[0].fileName);
    })
  };

  Todo.remoteMethod(
    'download',
    {
      accepts: [
        {arg: 'req', type: 'object', 'http': {source: 'req'}},
        {arg: 'res', type: 'object', 'http': {source: 'res'}}
      ],
      http: {path: '/:id/download', verb: 'get'}
    }
  );
};

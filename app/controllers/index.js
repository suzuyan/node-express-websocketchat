exports.index = function(req, res, io) {
  res.render('index', {
    title: 'Generator-Express MVC'
  });
};
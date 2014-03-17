module.exports = function(app){
	// index
	app.get('/', require('../app/controllers/index').index);
};

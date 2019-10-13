var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var path = require('path');
var cors = require('cors');

app.use(cors());
require('./app/router/userRouter.js')(app);
require('./app/router/contentRouter.js')(app);

const db = require('./app/config/db.config.js');

const Role = db.role;

// swagger
var swaggerJSDoc = require('swagger-jsdoc');
var swaggerDefinition = {
    info: {
        title: 'Can It API',
        version: '1.0.1',
        description: 'Node.js RESTful API with Swagger',
    },
    host: 'localhost:3000',
    basePath: '/api',
    securityDefinitions: {
        Bearer: {
            type: 'apiKey',
            name: 'Authorization',
            in: "header",
        }
    },
    security: [
        { Bearer: [] }
    ]



};
var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./app/router/*.js'],
};

var swaggerSpec = swaggerJSDoc(options);
app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.use(express.static(path.join(__dirname, 'app/public')));

// // force: true will drop the table if it already exists
/*
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
  initial();
});
*/


// update database structure
/*
db.sequelize.sync({alter: true}).then(()=>{
    console.log("Update database structure")
});
*/
//require('./app/route/project.route.js')(app);

// Create a Server
var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("App listening at http://%s:%s", host, port)
});

function initial(){
	Role.create({
		id: 1,
		name: "USER"
	});

	Role.create({
		id: 2,
		name: "ADMIN"
	});

	Role.create({
		id: 3,
		name: "PM"
	});
}

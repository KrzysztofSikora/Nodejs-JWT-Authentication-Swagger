const db = require('../config/db.config.js');
const config = require('../config/config.js');
const User = db.user;
const Role = db.role;
const authJwt = require('../helpers/verifyJwtToken');

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');


exports.signup = (req, res) => {
	// Save User to Database
    console.log("Processing func -> SignUp ");
	var savedUser = {};
	User.create({
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8)
	}).then(user => {
		savedUser = {
			'id': user.id,
			'name' : user.name,
			'username': user.username,
			'email': user.email,
			'updatedAt': user.updatedAt,
			'createdAt': user.createdAt
		};
		Role.findAll({
			where: {
				name: {
					[Op.or]: req.body.roles
				}
			}
		}).then(roles => {
			user.setRoles(roles).catch(err => {
				res.status(500).send("Error -> " + err);
			});
		}).catch(err => {
			res.status(500).send("Error -> " + err);
		});
	}).then(() => {
		res.status(200).json(savedUser)
	}).catch(err => {
		res.status(500).send("Fail! Error -> " + err);
	})
}

exports.signin = (req, res) => {
	console.log("Sign-In");

	User.findOne({
		where: {
			username: req.body.username
		}
	}).then(user => {
		if (!user) {
			return res.status(404).send(user);
		}
		var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if (!passwordIsValid) {
			return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
		}

		var token = jwt.sign({ id: user.id }, config.secret, {
		  expiresIn: 86400 // expires in 24 hours
		});
		var loggedUser = {
			'id': user.id,
			'name' : user.name,
			'username': user.username,
			'email': user.email,
			'token': token,
			'updatedAt': user.updatedAt,
			'createdAt': user.createdAt
		};

		user.getRoles().then(roles => {
			var userRoles = [];
			for(let i=0; i<roles.length; i++) {
				userRoles.push(roles[i].name.toUpperCase())
			}
			loggedUser.role = userRoles;
			res.status(200).send(loggedUser);
		})
		// res.status(200).send({ token: token });

	}).catch(err => {
		res.status(500).send('Error -> ' + err);
	});
}

exports.userGetAll = (req, res) => {
	console.log('get all users');

	User.findAll().then(users => {
		res.status(200).json(users)
	}).catch(err => {
		res.status(500).send('Error -> ' + err);

	})

};

exports.adminBoard = (req, res) => {
	User.findOne({
		where: {id: req.userId},
		attributes: ['name', 'username', 'email'],
		include: [{
			model: Role,
			attributes: ['id', 'name'],
			through: {
				attributes: ['userId', 'roleId'],
			}
		}]
	}).then(user => {
		res.status(200).json({
			"description": "Admin Board",
			"user": user
		});
	}).catch(err => {
		res.status(500).json({
			"description": "Can not access Admin Board",
			"error": err
		});
	})
}

exports.managementBoard = (req, res) => {
	User.findOne({
		where: {id: req.userId},
		attributes: ['name', 'username', 'email'],
		include: [{
			model: Role,
			attributes: ['id', 'name'],
			through: {
				attributes: ['userId', 'roleId'],
			}
		}]
	}).then(user => {
		res.status(200).json({
			"description": "Management Board",
			"user": user
		});
	}).catch(err => {
		res.status(500).json({
			"description": "Can not access Management Board",
			"error": err
		});
	})
}

const db = require('../config/db.config.js');
const config = require('../config/config.js');
const User = db.user;
const Role = db.role;
const Content = db.content;

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');


exports.userContent = (req, res) => {
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
			"description": "User Content Page",
			"user": user
		});
	}).catch(err => {
		res.status(500).json({
			"description": "Can not access User Page",
			"error": err
		});
	})
}

exports.addContent = (req, res) => {
	console.log("test",req.userId);
	Content.create({
        name: req.body.name,
        done: req.body.done,
        content: req.body.content,
        priority: req.body.priority,
		user_id: req.userId
    }).then(content => {
        res.status(200).json(content);
    }).catch(err => {
        res.status(500).send("Fail! Error -> " + err);
    })
}

exports.getAllContents = (req, res) => {
	Content.findAll({
        where: {
            user_id: req.userId
        }
	}).then(contents => {
        res.status(200).json(contents);
	}).catch(err => {
        res.status(500).send("Fail! Error -> " + err);
	})
}

exports.getOneContent = (req, res) => {
    Content.findAll({
        where: {
            user_id: req.userId,
            id: req.params.id
        }
    }).then(content => {
        res.status(200).json(content[0]);
    }).catch(err => {
        res.status(500).send("Fail! Error -> " + err);
    })
}

exports.updateContent = (req, res) => {
	console.log("update id",req.params.id);
    Content.find({
        where: {
            user_id: req.userId, id: req.params.id
        }
    }).then(content => {
    	if(content) {
            content.update({
                name: req.body.name,
                done: req.body.done,
                content: req.body.content,
                priority: req.body.priority,
            }).then(content => {
                res.status(200).json(content);
            }).catch(err => {
                res.status(500).send("Fail! Error -> " + err);
            })
		}
    }).catch(err => {
        res.status(500).send("Fail! Error -> " + err);
    })
};

exports.deleteContent = (req, res) => {
    console.log("update id",req.params.id);
    Content.destroy({
        where: {
            user_id: req.userId, id: req.params.id
        }
	}).then(content=>{
        res.status(200).json({
            "description": "Content has been removed",
            "content": content
        });
	}).catch(err => {
        res.status(500).send("Fail! Error -> " + err);
	})
};

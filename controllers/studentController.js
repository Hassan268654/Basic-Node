const db = require('../models');
const fs = require('fs');
const mime = require('mime');
const path = require('path');
const { body, validationResult } = require('express-validator');


const index = function(req, res) {
    db.Student.findAll().then(students => res.send(students));
};

const store = (req, res) => {

    var media = req.body.media;
	var fileName = Date.now() + '_image.png';
	let base64Image = media.split(';base64,').pop();
	fs.writeFile(path.dirname(require.main.filename ) + '/public/uploads/' + fileName, base64Image, {encoding: 'base64'}, function(err) {
		console.log('File created');
	});

	if(req.body.name == "" || req.body.dob == ""){
		return res.render('genericerror', {title: 'Student Error', message: "Could not create student, all fields apply."});
	}else{

        db.Student.create({
           name: req.body.name,
           dob: req.body.dob,
           media: fileName 
        }).then(student => res.send(student));
	}
};

const show = function(req, res) {
    db.Student.findAll({
		where: {
			id: req.params.id
		}
	}).then(student => res.send(student));
};

const update = (req, res) => {
	console.log('inside update')
	var student = db.Student.findOne({
		where: {
			id: req.body.id
		},
		raw: true 
	}).then(response => {
		console.log('Response :', response);
		if (fs.existsSync(path.dirname(require.main.filename ) + '/public/uploads/' + response.media)) {
			fs.unlinkSync(path.dirname(require.main.filename ) + '/public/uploads/' + response.media)
		}

		var media = req.body.media;
		var fileName = Date.now() + '_image.png';
		let base64Image = media.split(';base64,').pop();
		fs.writeFile(path.dirname(require.main.filename ) + '/public/uploads/' + fileName, base64Image, {encoding: 'base64'}, function(err) {
			console.log('File created');
		});

		if(req.body.name == "" || req.body.dob == ""){
			return res.render('genericerror', {title: 'Student Error', message: "Could not create student, all fields apply."});
		}else{

			db.Student.update(
			{
			name: req.body.name,
			dob: req.body.dob,
			media: fileName 
			},
			{
				where: {
					id : req.body.id
				}
			}
			
			).then(() => res.send("student updated successfuly"));
		}
	}).catch(err => console.log('This is err :', err));
	
    
};

const destroy = function(req, res) {
    db.Student.destroy({
		where: {
			id: req.params.id
		}
	}).then(() => res.send("student deleted successfully"));
};

module.exports = {
    index,
    store,
	show,
	update,
	destroy
}

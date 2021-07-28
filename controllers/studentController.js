const db = require('../models');
const fs = require('fs');
const mime = require('mime');
const path = require('path');

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

module.exports = {
    index,
    store
}

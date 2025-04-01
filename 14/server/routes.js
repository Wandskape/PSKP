const controller = require('./controllers');
const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const parts = req.url.split('/');
  const id = parts.length > 3 ? parts[3] : null;

  if (req.method === 'GET') {
	  if(req.url === "/"){
		const filePath = path.join(__dirname, './public/index.html');
		fs.readFile(filePath, (err, content) => {
			if (err) {
			  controller.sendResponse(res, 500, { error: 'Internal Server Error' });
			} else {
			  res.writeHead(200, { 'Content-Type': 'text/html' });
			  res.end(content);
			}
		  });
	  }
    else if (req.url === '/api/faculties') {
      controller.getFaculties(req, res);
    }
    else if (req.url === '/api/pulpits') {
      controller.getPulpits(req, res);
    }
    else if (req.url === '/api/subjects') {
      controller.getSubjects(req, res);
    }
    else if (req.url === '/api/auditoriumstypes') {
      controller.getAuditoriumTypes(req, res);
    }
    else if (req.url === '/api/auditoriums') {
      controller.getAuditoriums(req, res);
    }
    else {
      controller.sendResponse(res, 404, { message: 'API route not found' });
    }
  }
  else if (req.method === 'POST') {
    if (req.url === '/api/faculties') {
      controller.addFaculty(req, res);
    }
    else if (req.url === '/api/pulpits') {
      controller.addPulpit(req, res);
    }
    else if (req.url === '/api/subjects') {
      controller.addSubject(req, res);
    }
    else if (req.url === '/api/auditoriumstypes') {
      controller.addAuditoriumType(req, res);
    }
    else if (req.url === '/api/auditoriums') {
      controller.addAuditorium(req, res);
    }
    else {
      controller.sendResponse(res, 404, { message: 'API route not found' });
    }
  }
  else if (req.method === 'PUT') {
    if (req.url.startsWith('/api/faculties/') && id) {
      controller.updateFaculty(req, res);
    }
    else if (req.url.startsWith('/api/pulpits/') && id) {
      controller.updatePulpit(req, res);
    }
    else if (req.url.startsWith('/api/subjects/') && id) {
      controller.updateSubject(req, res);
    }
    else if (req.url.startsWith('/api/auditoriumstypes/') && id) {
      controller.updateAuditoriumType(req, res);
    }
    else if (req.url.startsWith('/api/auditoriums/') && id) {
      controller.updateAuditorium(req, res);
    }
    else {
      controller.sendResponse(res, 400, { error: 'Invalid request' });
    }
  }
  else if (req.method === 'DELETE') {
    if (req.url.startsWith('/api/faculties/') && id) {
      controller.deleteFaculty(req, res);
    }
    else if (req.url.startsWith('/api/pulpits/') && id) {
      controller.deletePulpit(req, res);
    }
    else if (req.url.startsWith('/api/subjects/') && id) {
      controller.deleteSubject(req, res);
    }
    else if (req.url.startsWith('/api/auditoriumstypes/') && id) {
      controller.deleteAuditoriumType(req, res);
    }
    else if (req.url.startsWith('/api/auditoriums/') && id) {
      controller.deleteAuditorium(req, res);
    }
    else {
      controller.sendResponse(res, 400, { error: 'Invalid request' });
    }
  }
  else {
    controller.sendResponse(res, 405, { message: 'Method not allowed' });
  }
};
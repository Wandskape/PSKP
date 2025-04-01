const controller = require('./controller');

module.exports = (req, res) =>{
    const parts = req.url.split('/');
    const xyz = parts.length > 3 ? parts[3] : null;

    if (req.method === 'GET'){
        if(req.url === "/api/faculties"){
            controller.getFaculties(req, res)
        }
        else if(req.url === "/api/pulpits"){
            controller.getPulpits(req, res)
        }
    }
    else if (req.method === 'POST'){
        if (req.url === '/api/faculties') {
            controller.addFaculty(req, res);
        }
        else if (req.url === '/api/pulpits') {
            controller.addPulpit(req, res);
        }
    }
    else if (req.method === 'PUT') {
        if (req.url === '/api/faculties') {
            controller.updateFaculty(req, res);
        }
        else if (req.url === '/api/pulpits') {
            controller.updatePulpit(req, res);
        }
    }
    else if (req.method === 'DELETE') {
        if (req.url.startsWith('/api/faculties/') && xyz) {
            controller.deleteFaculty(req, res);
        }
        else if (req.url.startsWith('/api/pulpits/') && xyz) {
            controller.deletePulpit(req, res);
        }
    }
    else {
        controller.sendResponse(res, 405, { message: 'Method not allowed' });
    }
}
const controller = require('./controller');
const { parseBody } = require('./utils');

module.exports = async (req, res) => {
    try {
        // if (['POST', 'PUT'].includes(req.method)) {
        //     req.body = await parseBody(req);
        // }

        const urlParts = req.url.split('/').filter(part => part !== '');

        if (req.method === 'GET' && req.url === '/') {
            return controller.sendStaticHtml(req, res);
        }

        switch(true) {
            case req.method === 'GET' && urlParts.join('/') === 'api/faculties':
                return controller.getFaculties(req, res);

            case req.method === 'GET' && urlParts.join('/') === 'api/pulpits':
                return controller.getPulpits(req, res);

            case req.method === 'GET' && urlParts.join('/') === 'api/subjects':
                return controller.getSubjects(req, res);

            case req.method === 'GET' && urlParts.join('/') === 'api/auditoriumstypes':
                return controller.getAuditoriumTypes(req, res);

            case req.method === 'GET' && urlParts.join('/') === 'api/auditoriums':
                return controller.getAuditoriums(req, res);

            case req.method === 'POST' && urlParts.join('/') === 'api/faculties':
                return controller.addFaculty(req, res);

            case req.method === 'POST' && urlParts.join('/') === 'api/pulpits':
                return controller.addPulpit(req, res);

            case req.method === 'POST' && urlParts.join('/') === 'api/subjects':
                return controller.addSubject(req, res);

            case req.method === 'POST' && urlParts.join('/') === 'api/auditoriumstypes':
                return controller.addAuditoriumType(req, res);

            case req.method === 'POST' && urlParts.join('/') === 'api/auditoriums':
                return controller.addAuditorium(req, res);

            case req.method === 'PUT' && urlParts[0] === 'api' && urlParts[1] === 'faculties' && urlParts[2]:
                return controller.updateFaculty(req, res);

            case req.method === 'PUT' && urlParts[0] === 'api' && urlParts[1] === 'pulpits' && urlParts[2]:
                return controller.updatePulpit(req, res);

            case req.method === 'PUT' && urlParts[0] === 'api' && urlParts[1] === 'subjects' && urlParts[2]:
                return controller.updateSubject(req, res);

            case req.method === 'PUT' && urlParts[0] === 'api' && urlParts[1] === 'auditoriumstypes' && urlParts[2]:
                return controller.updateAuditoriumType(req, res);

            case req.method === 'PUT' && urlParts[0] === 'api' && urlParts[1] === 'auditoriums' && urlParts[2]:
                return controller.updateAuditorium(req, res);

            case req.method === 'DELETE' && urlParts[0] === 'api' && urlParts[1] === 'faculties' && urlParts[2]:
                return controller.deleteFaculty(req, res);

            case req.method === 'DELETE' && urlParts[0] === 'api' && urlParts[1] === 'pulpits' && urlParts[2]:
                return controller.deletePulpit(req, res);

            case req.method === 'DELETE' && urlParts[0] === 'api' && urlParts[1] === 'subjects' && urlParts[2]:
                return controller.deleteSubject(req, res);

            case req.method === 'DELETE' && urlParts[0] === 'api' && urlParts[1] === 'auditoriumtypes' && urlParts[2]:
                return controller.deleteAuditoriumType(req, res);

            case req.method === 'DELETE' && urlParts[0] === 'api' && urlParts[1] === 'auditoriums' && urlParts[2]:
                return controller.deleteAuditorium(req, res);

            default:
                controller.sendResponse(res, 404, {
                    error: 'Endpoint not found',
                    method: req.method,
                    path: req.url
                });
        }
    } catch (err) {
        controller.handleError(res, err);
    }
};
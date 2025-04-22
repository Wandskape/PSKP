const dbQueries = require('./db/queries');
const { sendResponse, handleError } = require('./utils');

module.exports = {
    getFaculties: async (req, res) => {
        try {
            const faculties = await dbQueries.getAllFaculties();
            sendResponse(res, 200, faculties);
        } catch (err) {
            handleError(res, err);
        }
    },

    addFaculty: async (req, res) => {
        try {
            const {FACULTY, FACULTY_NAME} = req.body;
            if (!FACULTY || !FACULTY_NAME) {
                return sendResponse(res, 400, { error: 'Missing required fields' });
            }

            const newFaculty = await dbQueries.addFaculty(FACULTY, FACULTY_NAME);
            sendResponse(res, 201, newFaculty);
        } catch (err) {
            handleError(res, err);
        }
    },

    updateFaculty: async (req, res) => {
        try {
            const id = req.url.split('/')[3];
            if (!id) return sendResponse(res, 400, { error: 'Invalid faculty ID' });

            const { FACULTY_NAME } = req.body;
            if (!FACULTY_NAME) {
                return sendResponse(res, 400, { error: 'FACULTY_NAME is required' });
            }

            const updated = await dbQueries.updateFaculty(id, FACULTY_NAME);
            updated
                ? sendResponse(res, 200, updated)
                : sendResponse(res, 404, { error: 'Faculty not found' });
        } catch (err) {
            handleError(res, err);
        }
    },

    deleteFaculty: async (req, res) => {
        try {
            const id = req.url.split('/')[3];
            if (!id) return sendResponse(res, 400, { error: 'Invalid faculty ID' });

            const faculty = await dbQueries.deleteFaculty(id);
            faculty
                ? sendResponse(res, 200, faculty)
                : sendResponse(res, 404, { error: 'Faculty not found' });
        } catch (err) {
            handleError(res, err);
        }
    },

    getPulpits: async (req, res) => {
        try {
            const pulpits = await dbQueries.getAllPulpits();
            sendResponse(res, 200, pulpits);
        } catch (err) {
            handleError(res, err);
        }
    },

    addPulpit: async (req, res) => {
        try {
            const { PULPIT, PULPIT_NAME, FACULTY } = req.body;
            if (!PULPIT || !PULPIT_NAME || !FACULTY) {
                return sendResponse(res, 400, { error: 'Missing required fields' });
            }

            const newPulpit = await dbQueries.addPulpit(PULPIT, PULPIT_NAME, FACULTY);
            sendResponse(res, 201, newPulpit);
        } catch (err) {
            handleError(res, err);
        }
    },

    updatePulpit: async (req, res) => {
        try {
            const id = req.url.split('/')[3];
            if (!id) return sendResponse(res, 400, { error: 'Invalid pulpit ID' });

            const { PULPIT_NAME, FACULTY } = req.body;
            const updated = await dbQueries.updatePulpit(id, PULPIT_NAME, FACULTY);

            updated
                ? sendResponse(res, 200, updated)
                : sendResponse(res, 404, { error: 'Pulpit not found' });
        } catch (err) {
            handleError(res, err);
        }
    },

    deletePulpit: async (req, res) => {
        try {
            const id = req.url.split('/')[3];
            if (!id) return sendResponse(res, 400, { error: 'Invalid pulpit ID' });

            const pulpit = await dbQueries.deletePulpit(id);
            pulpit
                ? sendResponse(res, 200, pulpit)
                : sendResponse(res, 404, { error: 'Pulpit not found' });
        } catch (err) {
            handleError(res, err);
        }
    },

    getSubjects: async (req, res) => {
        try {
            const subjects = await dbQueries.getAllSubjects();
            sendResponse(res, 200, subjects);
        } catch (err) {
            handleError(res, err);
        }
    },

    addSubject: async (req, res) => {
        try {
            const { SUBJECT, SUBJECT_NAME, PULPIT } = req.body;
            if (!SUBJECT || !SUBJECT_NAME || !PULPIT) {
                return sendResponse(res, 400, { error: 'Missing required fields' });
            }

            const newSubject = await dbQueries.addSubject(SUBJECT, SUBJECT_NAME, PULPIT);
            sendResponse(res, 201, newSubject);
        } catch (err) {
            handleError(res, err);
        }
    },

    updateSubject: async (req, res) => {
        try {
            const id = req.url.split('/')[3];
            if (!id) return sendResponse(res, 400, { error: 'Invalid subject ID' });

            const { SUBJECT_NAME, PULPIT } = req.body;
            const updated = await dbQueries.updateSubject(id, SUBJECT_NAME, PULPIT);

            updated
                ? sendResponse(res, 200, updated)
                : sendResponse(res, 404, { error: 'Subject not found' });
        } catch (err) {
            handleError(res, err);
        }
    },

    deleteSubject: async (req, res) => {
        try {
            const id = req.url.split('/')[3];
            if (!id) return sendResponse(res, 400, { error: 'Invalid subject ID' });

            const subject = await dbQueries.deleteSubject(id);
            subject
                ? sendResponse(res, 200, subject)
                : sendResponse(res, 404, { error: 'Subject not found' });
        } catch (err) {
            handleError(res, err);
        }
    },

    getAuditoriumTypes: async (req, res) => {
        try {
            const types = await dbQueries.getAllAuditoriumTypes();
            sendResponse(res, 200, types);
        } catch (err) {
            handleError(res, err);
        }
    },

    addAuditoriumType: async (req, res) => {
        try {
            const { AUDITORIUM_TYPE, AUDITORIUM_TYPENAME } = req.body;
            if (!AUDITORIUM_TYPE || !AUDITORIUM_TYPENAME) {
                return sendResponse(res, 400, { error: 'Missing required fields' });
            }

            const newType = await dbQueries.addAuditoriumType(AUDITORIUM_TYPE, AUDITORIUM_TYPENAME);
            sendResponse(res, 201, newType);
        } catch (err) {
            handleError(res, err);
        }
    },

    updateAuditoriumType: async (req, res) => {
        try {
            const id = req.url.split('/')[3];
            if (!id) return sendResponse(res, 400, { error: 'Invalid type ID' });

            const { AUDITORIUM_TYPENAME } = req.body;
            const updated = await dbQueries.updateAuditoriumType(id, AUDITORIUM_TYPENAME);

            updated
                ? sendResponse(res, 200, updated)
                : sendResponse(res, 404, { error: 'Type not found' });
        } catch (err) {
            handleError(res, err);
        }
    },

    deleteAuditoriumType: async (req, res) => {
        try {
            const id = req.url.split('/')[3];
            if (!id) return sendResponse(res, 400, { error: 'Invalid type ID' });

            const type = await dbQueries.deleteAuditoriumType(id);
            type
                ? sendResponse(res, 200, type)
                : sendResponse(res, 404, { error: 'Type not found' });
        } catch (err) {
            handleError(res, err);
        }
    },

    getAuditoriums: async (req, res) => {
        try {
            const auditoriums = await dbQueries.getAllAuditoriums();
            sendResponse(res, 200, auditoriums);
        } catch (err) {
            handleError(res, err);
        }
    },

    addAuditorium: async (req, res) => {
        try {
            const { AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_CAPACITY, AUDITORIUM_TYPE } = req.body;
            if (!AUDITORIUM || !AUDITORIUM_NAME || !AUDITORIUM_CAPACITY || !AUDITORIUM_TYPE) {
                return sendResponse(res, 400, { error: 'Missing required fields' });
            }

            const newAuditorium = await dbQueries.addAuditorium(
                AUDITORIUM,
                AUDITORIUM_NAME,
                AUDITORIUM_CAPACITY,
                AUDITORIUM_TYPE
            );
            sendResponse(res, 201, newAuditorium);
        } catch (err) {
            handleError(res, err);
        }
    },

    updateAuditorium: async (req, res) => {
        try {
            const id = req.url.split('/')[3];
            if (!id) return sendResponse(res, 400, { error: 'Invalid auditorium ID' });

            const { AUDITORIUM_NAME, AUDITORIUM_CAPACITY, AUDITORIUM_TYPE } = req.body;
            const updated = await dbQueries.updateAuditorium(
                id,
                AUDITORIUM_NAME,
                AUDITORIUM_CAPACITY,
                AUDITORIUM_TYPE
            );

            updated
                ? sendResponse(res, 200, updated)
                : sendResponse(res, 404, { error: 'Auditorium not found' });
        } catch (err) {
            handleError(res, err);
        }
    },

    deleteAuditorium: async (req, res) => {
        try {
            const id = req.url.split('/')[3];
            if (!id) return sendResponse(res, 400, { error: 'Invalid auditorium ID' });

            const auditorium = await dbQueries.deleteAuditorium(id);
            auditorium
                ? sendResponse(res, 200, auditorium)
                : sendResponse(res, 404, { error: 'Auditorium not found' });
        } catch (err) {
            handleError(res, err);
        }
    },

    sendStaticHtml: (req, res) => {
        try {
            const fs = require('fs');
            const path = require('path');
            const html = fs.readFileSync(path.join(__dirname, './public/index.html'));
            sendResponse(res, 200, html.toString(), 'text/html');
        } catch (err) {
            handleError(res, err);
        }
    },

    sendResponse,
    handleError
};

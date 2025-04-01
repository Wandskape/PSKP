const dbQueries = require('./db/queries');

module.exports = {
  getFaculties: async (req, res) => {
    try {
      const faculties = await dbQueries.getAllFaculties();
      sendResponse(res, 200, faculties);
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

  getSubjects: async (req, res) => {
    try {
      const subjects = await dbQueries.getAllSubjects();
      sendResponse(res, 200, subjects);
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

  getAuditoriums: async (req, res) => {
    try {
      const auditoriums = await dbQueries.getAllAuditoriums();
      sendResponse(res, 200, auditoriums);
    } catch (err) {
      handleError(res, err);
    }
  },
	addFaculty: async (req, res) => {
    try {
      const { FACULTY_NAME } = req.body;
      if (!FACULTY_NAME) {
        return sendResponse(res, 400, { error: 'Faculty name is required' });
      }

      const newFaculty = await dbQueries.addFaculty(FACULTY_NAME);
      if (newFaculty) {
        sendResponse(res, 201, newFaculty);
      } else {
        sendResponse(res, 500, { error: 'Failed to add faculty' });
      }
    } catch (err) {
      handleError(res, err);
    }
  },

  addPulpit: async (req, res) => {
    try {
      const { PULPIT_NAME, FACULTY_ID } = req.body;
      if (!PULPIT_NAME || !FACULTY_ID) {
        return sendResponse(res, 400, { error: 'Pulpit name and faculty ID are required' });
      }

      const newPulpit = await dbQueries.addPulpit(PULPIT_NAME, FACULTY_ID);
      if (newPulpit) {
        sendResponse(res, 201, newPulpit);
      } else {
        sendResponse(res, 500, { error: 'Failed to add pulpit' });
      }
    } catch (err) {
      handleError(res, err);
    }
  },

  addSubject: async (req, res) => {
    try {
      const { SUBJECT_NAME, PULPIT_ID } = req.body;
      if (!SUBJECT_NAME || !PULPIT_ID) {
        return sendResponse(res, 400, { error: 'Subject name and pulpit ID are required' });
      }

      const newSubject = await dbQueries.addSubject(SUBJECT_NAME, PULPIT_ID);
      if (newSubject) {
        sendResponse(res, 201, newSubject);
      } else {
        sendResponse(res, 500, { error: 'Failed to add subject' });
      }
    } catch (err) {
      handleError(res, err);
    }
  },

  addAuditoriumType: async (req, res) => {
    try {
      const { AUDITORIUM_TYPENAME } = req.body;
      if (!AUDITORIUM_TYPENAME) {
        return sendResponse(res, 400, { error: 'Auditorium type name is required' });
      }

      const newType = await dbQueries.addAuditoriumType(AUDITORIUM_TYPENAME);
      if (newType) {
        sendResponse(res, 201, newType);
      } else {
        sendResponse(res, 500, { error: 'Failed to add auditorium type' });
      }
    } catch (err) {
      handleError(res, err);
    }
  },

  addAuditorium: async (req, res) => {
    try {
      const { AUDITORIUM_NAME, AUDITORIUM_CAPACITY, AUDITORIUM_TYPE_ID } = req.body;
      if (!AUDITORIUM_NAME || !AUDITORIUM_TYPE_ID) {
        return sendResponse(res, 400, { error: 'Auditorium name and type ID are required' });
      }

      const newAuditorium = await dbQueries.addAuditorium(
        AUDITORIUM_NAME,
        AUDITORIUM_CAPACITY || null,
        AUDITORIUM_TYPE_ID
      );

      if (newAuditorium) {
        sendResponse(res, 201, newAuditorium);
      } else {
        sendResponse(res, 500, { error: 'Failed to add auditorium' });
      }
    } catch (err) {
      handleError(res, err);
    }
  },

	updateFaculty: async (req, res) => {
    try {
      const id = parseInt(req.url.split('/')[3]);
      if (!id) return sendResponse(res, 400, { error: 'Invalid faculty ID' });

      const { FACULTY_NAME } = req.body;
      if (!FACULTY_NAME) {
        return sendResponse(res, 400, { error: 'Faculty name is required' });
      }

      const faculty = await dbQueries.getFacultyById(id);
      if (!faculty) return sendResponse(res, 404, { error: 'Faculty not found' });

      const success = await dbQueries.updateFaculty(id, FACULTY_NAME);
      if (success) {
        const updated = await dbQueries.getFacultyById(id);
        sendResponse(res, 200, updated);
      } else {
        sendResponse(res, 500, { error: 'Failed to update faculty' });
      }
    } catch (err) {
      handleError(res, err);
    }
  },

  updatePulpit: async (req, res) => {
    try {
      const id = parseInt(req.url.split('/')[3]);
      if (!id) return sendResponse(res, 400, { error: 'Invalid pulpit ID' });

      const { PULPIT_NAME, FACULTY_ID } = req.body;
      if (!PULPIT_NAME || !FACULTY_ID) {
        return sendResponse(res, 400, { error: 'Pulpit name and faculty ID are required' });
      }

      const pulpit = await dbQueries.getPulpitById(id);
      if (!pulpit) return sendResponse(res, 404, { error: 'Pulpit not found' });

      const success = await dbQueries.updatePulpit(id, PULPIT_NAME, FACULTY_ID);
      if (success) {
        const updated = await dbQueries.getPulpitById(id);
        sendResponse(res, 200, updated);
      } else {
        sendResponse(res, 500, { error: 'Failed to update pulpit' });
      }
    } catch (err) {
      handleError(res, err);
    }
  },

  updateSubject: async (req, res) => {
    try {
      const id = parseInt(req.url.split('/')[3]);
      if (!id) return sendResponse(res, 400, { error: 'Invalid subject ID' });

      const { SUBJECT_NAME, PULPIT_ID } = req.body;
      if (!SUBJECT_NAME || !PULPIT_ID) {
        return sendResponse(res, 400, { error: 'Subject name and pulpit ID are required' });
      }

      const subject = await dbQueries.getSubjectById(id);
      if (!subject) return sendResponse(res, 404, { error: 'Subject not found' });

      const success = await dbQueries.updateSubject(id, SUBJECT_NAME, PULPIT_ID);
      if (success) {
        const updated = await dbQueries.getSubjectById(id);
        sendResponse(res, 200, updated);
      } else {
        sendResponse(res, 500, { error: 'Failed to update subject' });
      }
    } catch (err) {
      handleError(res, err);
    }
  },

  updateAuditoriumType: async (req, res) => {
    try {
      const id = parseInt(req.url.split('/')[3]);
      if (!id) return sendResponse(res, 400, { error: 'Invalid auditorium type ID' });

      const { AUDITORIUM_TYPENAME } = req.body;
      if (!AUDITORIUM_TYPENAME) {
        return sendResponse(res, 400, { error: 'Auditorium type name is required' });
      }

      const type = await dbQueries.getAuditoriumTypeById(id);
      if (!type) return sendResponse(res, 404, { error: 'Auditorium type not found' });

      const success = await dbQueries.updateAuditoriumType(id, AUDITORIUM_TYPENAME);
      if (success) {
        const updated = await dbQueries.getAuditoriumTypeById(id);
        sendResponse(res, 200, updated);
      } else {
        sendResponse(res, 500, { error: 'Failed to update auditorium type' });
      }
    } catch (err) {
      handleError(res, err);
    }
  },

  updateAuditorium: async (req, res) => {
    try {
      const id = parseInt(req.url.split('/')[3]);
      if (!id) return sendResponse(res, 400, { error: 'Invalid auditorium ID' });

      const { AUDITORIUM_NAME, AUDITORIUM_CAPACITY, AUDITORIUM_TYPE_ID } = req.body;
      if (!AUDITORIUM_NAME || !AUDITORIUM_TYPE_ID) {
        return sendResponse(res, 400, { error: 'Auditorium name and type ID are required' });
      }

      const auditorium = await dbQueries.getAuditoriumById(id);
      if (!auditorium) return sendResponse(res, 404, { error: 'Auditorium not found' });

      const success = await dbQueries.updateAuditorium(
        id,
        AUDITORIUM_NAME,
        AUDITORIUM_CAPACITY || null,
        AUDITORIUM_TYPE_ID
      );

      if (success) {
        const updated = await dbQueries.getAuditoriumById(id);
        sendResponse(res, 200, updated);
      } else {
        sendResponse(res, 500, { error: 'Failed to update auditorium' });
      }
    } catch (err) {
      handleError(res, err);
    }
  },

  // DELETE методы (полная реализация)
  deleteFaculty: async (req, res) => {
    try {
      const id = parseInt(req.url.split('/')[3]);
      if (!id) return sendResponse(res, 400, { error: 'Invalid faculty ID' });

      const faculty = await dbQueries.getFacultyById(id);
      if (!faculty) return sendResponse(res, 404, { error: 'Faculty not found' });

      const success = await dbQueries.deleteFaculty(id);
      if (success) {
        sendResponse(res, 200, faculty);
      } else {
        sendResponse(res, 500, { error: 'Failed to delete faculty' });
      }
    } catch (err) {
      handleError(res, err);
    }
  },

  deletePulpit: async (req, res) => {
    try {
      const id = parseInt(req.url.split('/')[3]);
      if (!id) return sendResponse(res, 400, { error: 'Invalid pulpit ID' });

      const pulpit = await dbQueries.getPulpitById(id);
      if (!pulpit) return sendResponse(res, 404, { error: 'Pulpit not found' });

      const success = await dbQueries.deletePulpit(id);
      if (success) {
        sendResponse(res, 200, pulpit);
      } else {
        sendResponse(res, 500, { error: 'Failed to delete pulpit' });
      }
    } catch (err) {
      handleError(res, err);
    }
  },

  deleteSubject: async (req, res) => {
    try {
      const id = parseInt(req.url.split('/')[3]);
      if (!id) return sendResponse(res, 400, { error: 'Invalid subject ID' });

      const subject = await dbQueries.getSubjectById(id);
      if (!subject) return sendResponse(res, 404, { error: 'Subject not found' });

      const success = await dbQueries.deleteSubject(id);
      if (success) {
        sendResponse(res, 200, subject);
      } else {
        sendResponse(res, 500, { error: 'Failed to delete subject' });
      }
    } catch (err) {
      handleError(res, err);
    }
  },

  deleteAuditoriumType: async (req, res) => {
    try {
      const id = parseInt(req.url.split('/')[3]);
      if (!id) return sendResponse(res, 400, { error: 'Invalid auditorium type ID' });

      const type = await dbQueries.getAuditoriumTypeById(id);
      if (!type) return sendResponse(res, 404, { error: 'Auditorium type not found' });

      const success = await dbQueries.deleteAuditoriumType(id);
      if (success) {
        sendResponse(res, 200, type);
      } else {
        sendResponse(res, 500, { error: 'Failed to delete auditorium type' });
      }
    } catch (err) {
      handleError(res, err);
    }
  },

  deleteAuditorium: async (req, res) => {
    try {
      const id = parseInt(req.url.split('/')[3]);
      if (!id) return sendResponse(res, 400, { error: 'Invalid auditorium ID' });

      const auditorium = await dbQueries.getAuditoriumById(id);
      if (!auditorium) return sendResponse(res, 404, { error: 'Auditorium not found' });

      const success = await dbQueries.deleteAuditorium(id);
      if (success) {
        sendResponse(res, 200, auditorium);
      } else {
        sendResponse(res, 500, { error: 'Failed to delete auditorium' });
      }
    } catch (err) {
      handleError(res, err);
    }
  },

  sendResponse,
  handleError
};

function sendResponse(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function handleError(res, err) {
  console.error('Error:', err);
  sendResponse(res, 500, { error: 'Server error', details: err.message });
}
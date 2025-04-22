const Faculty = require('./models/Faculty');
const Pulpit = require('./models/Pulpit');
const Subject = require('./models/Subject');
const AuditoriumType = require('./models/AuditoriumType');
const Auditorium = require('./models/Auditorium');

module.exports = {
    getAllFaculties: async () => await Faculty.findAll(),
    addFaculty: async (FACULTY, FACULTY_NAME) => {
        return await Faculty.create({ FACULTY, FACULTY_NAME });
    },
    updateFaculty: async (id, FACULTY_NAME) => {
        const faculty = await Faculty.findByPk(id);
        return faculty ? await faculty.update({ FACULTY_NAME }) : null;
    },
    deleteFaculty: async (id) => {
        const faculty = await Faculty.findByPk(id);
        return faculty ? await faculty.destroy() : null;
    },

    getAllPulpits: async () => await Pulpit.findAll(),
    addPulpit: async (PULPIT, PULPIT_NAME, FACULTY) => {
        return await Pulpit.create({ PULPIT, PULPIT_NAME, FACULTY });
    },
    updatePulpit: async (id, PULPIT_NAME, FACULTY) => {
        const pulpit = await Pulpit.findByPk(id);
        return pulpit ? await pulpit.update({ PULPIT_NAME, FACULTY }) : null;
    },
    deletePulpit: async (id) => {
        const pulpit = await Pulpit.findByPk(id);
        return pulpit ? await pulpit.destroy() : null;
    },

    getAllSubjects: async () => await Subject.findAll(),
    addSubject: async (SUBJECT, SUBJECT_NAME, PULPIT) => {
        return await Subject.create({ SUBJECT, SUBJECT_NAME, PULPIT });
    },
    updateSubject: async (id, SUBJECT_NAME, PULPIT) => {
        const subject = await Subject.findByPk(id);
        return subject ? await subject.update({ SUBJECT_NAME, PULPIT }) : null;
    },
    deleteSubject: async (id) => {
        const subject = await Subject.findByPk(id);
        return subject ? await subject.destroy() : null;
    },

    getAllAuditoriumTypes: async () => await AuditoriumType.findAll(),
    addAuditoriumType: async (AUDITORIUM_TYPE, AUDITORIUM_TYPENAME) => {
        return await AuditoriumType.create({ AUDITORIUM_TYPE, AUDITORIUM_TYPENAME });
    },
    updateAuditoriumType: async (id, AUDITORIUM_TYPENAME) => {
        const type = await AuditoriumType.findByPk(id);
        return type ? await type.update({ AUDITORIUM_TYPENAME }) : null;
    },
    deleteAuditoriumType: async (id) => {
        const type = await AuditoriumType.findByPk(id);
        return type ? await type.destroy() : null;
    },

    getAllAuditoriums: async () => await Auditorium.findAll(),
    addAuditorium: async (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_CAPACITY, AUDITORIUM_TYPE) => {
        return await Auditorium.create({
            AUDITORIUM,
            AUDITORIUM_NAME,
            AUDITORIUM_CAPACITY,
            AUDITORIUM_TYPE
        });
    },
    updateAuditorium: async (id, AUDITORIUM_NAME, AUDITORIUM_CAPACITY, AUDITORIUM_TYPE) => {
        const auditorium = await Auditorium.findByPk(id);
        return auditorium ? await auditorium.update({
            AUDITORIUM_NAME,
            AUDITORIUM_CAPACITY,
            AUDITORIUM_TYPE
        }) : null;
    },
    deleteAuditorium: async (id) => {
        const auditorium = await Auditorium.findByPk(id);
        return auditorium ? await auditorium.destroy() : null;
    }
};
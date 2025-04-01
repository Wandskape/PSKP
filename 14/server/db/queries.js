const { pool } = require('./db.pool');
const sql = require("mssql");


module.exports = {
  getAllFaculties: async () => {
    const result = await pool.request().query('SELECT * FROM FACULTY');
    return result.recordset;
  },

  getAllPulpits: async () => {
    const result = await pool.request().query('SELECT * FROM PULPIT');
    return result.recordset;
  },

  getAllSubjects: async () => {
    const result = await pool.request().query('SELECT * FROM SUBJECT');
    return result.recordset;
  },

  getAllAuditoriumTypes: async () => {
    const result = await pool.request().query('SELECT * FROM AUDITORIUM_TYPE');
    return result.recordset;
  },

  getAllAuditoriums: async () => {
    const result = await pool.request().query('SELECT * FROM AUDITORIUM');
    return result.recordset;
  },

  addFaculty: async (name) => {
    const result = await pool.request()
      .input('name', sql.NVarChar(100), name)
      .query('INSERT INTO FACULTY (FACULTY_NAME) OUTPUT INSERTED.* VALUES (@name)');
    return result.recordset[0] || null;
  },

  addPulpit: async (name, facultyId) => {
    const result = await pool.request()
      .input('name', sql.NVarChar(100), name)
      .input('facultyId', sql.Int, facultyId)
      .query('INSERT INTO PULPIT (PULPIT_NAME, FACULTY_ID) OUTPUT INSERTED.* VALUES (@name, @facultyId)');
    return result.recordset[0] || null;
  },

  addSubject: async (name, pulpitId) => {
    const result = await pool.request()
      .input('name', sql.NVarChar(100), name)
      .input('pulpitId', sql.Int, pulpitId)
      .query('INSERT INTO SUBJECT (SUBJECT_NAME, PULPIT_ID) OUTPUT INSERTED.* VALUES (@name, @pulpitId)');
    return result.recordset[0] || null;
  },

  addAuditoriumType: async (name) => {
    const result = await pool.request()
      .input('name', sql.NVarChar(50), name)
      .query('INSERT INTO AUDITORIUM_TYPE (AUDITORIUM_TYPENAME) OUTPUT INSERTED.* VALUES (@name)');
    return result.recordset[0] || null;
  },

  addAuditorium: async (name, capacity, typeId) => {
    const result = await pool.request()
      .input('name', sql.NVarChar(50), name)
      .input('capacity', sql.Int, capacity)
      .input('typeId', sql.Int, typeId)
      .query('INSERT INTO AUDITORIUM (AUDITORIUM_NAME, AUDITORIUM_CAPACITY, AUDITORIUM_TYPE_ID) OUTPUT INSERTED.* VALUES (@name, @capacity, @typeId)');
    return result.recordset[0] || null;
  },

  updateFaculty: async (id, name) => {
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('name', sql.NVarChar(100), name)
      .query('UPDATE FACULTY SET FACULTY_NAME = @name WHERE FACULTY_ID = @id');
    return result.rowsAffected[0] > 0;
  },

  updatePulpit: async (id, name, facultyId) => {
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('name', sql.NVarChar(100), name)
      .input('facultyId', sql.Int, facultyId)
      .query('UPDATE PULPIT SET PULPIT_NAME = @name, FACULTY_ID = @facultyId WHERE PULPIT_ID = @id');
    return result.rowsAffected[0] > 0;
  },

  updateSubject: async (id, name, pulpitId) => {
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('name', sql.NVarChar(100), name)
      .input('pulpitId', sql.Int, pulpitId)
      .query('UPDATE SUBJECT SET SUBJECT_NAME = @name, PULPIT_ID = @pulpitId WHERE SUBJECT_ID = @id');
    return result.rowsAffected[0] > 0;
  },

  updateAuditoriumType: async (id, name) => {
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('name', sql.NVarChar(50), name)
      .query('UPDATE AUDITORIUM_TYPE SET AUDITORIUM_TYPENAME = @name WHERE AUDITORIUM_TYPE_ID = @id');
    return result.rowsAffected[0] > 0;
  },

  updateAuditorium: async (id, name, capacity, typeId) => {
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('name', sql.NVarChar(50), name)
      .input('capacity', sql.Int, capacity)
      .input('typeId', sql.Int, typeId)
      .query('UPDATE AUDITORIUM SET AUDITORIUM_NAME = @name, AUDITORIUM_CAPACITY = @capacity, AUDITORIUM_TYPE_ID = @typeId WHERE AUDITORIUM_ID = @id');
    return result.rowsAffected[0] > 0;
  },

  // DELETE методы
  deleteFaculty: async (id) => {
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM FACULTY WHERE FACULTY_ID = @id');
    return result.rowsAffected[0] > 0;
  },

  deletePulpit: async (id) => {
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM PULPIT WHERE PULPIT_ID = @id');
    return result.rowsAffected[0] > 0;
  },

  deleteSubject: async (id) => {
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM SUBJECT WHERE SUBJECT_ID = @id');
    return result.rowsAffected[0] > 0;
  },

  deleteAuditoriumType: async (id) => {
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM AUDITORIUM_TYPE WHERE AUDITORIUM_TYPE_ID = @id');
    return result.rowsAffected[0] > 0;
  },

  deleteAuditorium: async (id) => {
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM AUDITORIUM WHERE AUDITORIUM_ID = @id');
    return result.rowsAffected[0] > 0;
  },

  // Вспомогательные методы для получения данных по ID
  getFacultyById: async (id) => {
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM FACULTY WHERE FACULTY_ID = @id');
    return result.recordset[0];
  },

  getPulpitById: async (id) => {
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM PULPIT WHERE PULPIT_ID = @id');
    return result.recordset[0];
  },

  getSubjectById: async (id) => {
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM SUBJECT WHERE SUBJECT_ID = @id');
    return result.recordset[0];
  },

  getAuditoriumTypeById: async (id) => {
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM AUDITORIUM_TYPE WHERE AUDITORIUM_TYPE_ID = @id');
    return result.recordset[0];
  },

  getAuditoriumById: async (id) => {
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM AUDITORIUM WHERE AUDITORIUM_ID = @id');
    return result.recordset[0];
  }
};
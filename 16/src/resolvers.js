const {getDb, sql} = require("./db");

const resolvers = {
    getFaculties: async ({faculty}) => {
        const pool = await getDb();
        const request = pool.request()

        let query = 'SELECT * FROM FACULTY'
        if (faculty) {
            query += ' WHERE faculty = @faculty'
            request.input('faculty', sql.NVARCHAR, faculty)
        }

        const result = await request.query(query)
        return result.recordset
    },

    getTeachers: async ({teacher}) => {
        const pool = await getDb();
        const request = pool.request()

        let query = 'SELECT * FROM TEACHER'
        if (teacher) {
            query += ' WHERE teacher = @teacher'
            request.input('teacher', sql.NVARCHAR, teacher)
        }

        const result = await request.query(query)
        return result.recordset
    },

    getPulpits: async ({pulpit}) => {
        const pool = await getDb();
        const request = pool.request()

        let query = 'SELECT * FROM PULPIT'
        if (pulpit) {
            query += ' WHERE pulpit = @pulpit'
            request.input('pulpit', sql.NVARCHAR, pulpit)
        }

        const result = await request.query(query)
        return result.recordset
    },

    getSubjects: async ({subject}) => {
        const pool = await getDb();
        const request = pool.request()

        let query = 'SELECT * FROM SUBJECT'
        if (subject) {
            query += ' WHERE subject = @subject'
            request.input('subject', sql.NVARCHAR, subject)
        }

        const result = await request.query(query)
        return result.recordset
    },

    getTeachersByFaculty: async ({faculty}) => {
        const pool = await getDb();
        const result = await pool.request()
            .input('faculty', sql.NVARCHAR, faculty)
            .query(`
                SELECT t.*
                FROM TEACHER t
                         JOIN PULPIT p ON t.pulpit = p.pulpit
                WHERE p.faculty = @faculty
            `)
        return result.recordset
    },

    getSubjectsByFaculties: async ({faculty}) => {
        const pool = await getDb();
        const result = await pool.request()
            .input('faculty', sql.NVARCHAR, faculty)
            .query(`
                SELECT s.*
                FROM SUBJECT s
                         JOIN PULPIT p ON s.pulpit = p.pulpit
                WHERE p.faculty = @faculty
            `)
        return result.recordset
    },

    // Мутации
    setFaculty: async ({faculty, faculty_name}) => {
        const pool = await getDb();
        try {
            const result = await pool.request()
                .input('faculty', sql.NVARCHAR, faculty)
                .input('faculty_name', sql.NVARCHAR, faculty_name)
                .query(`
          IF EXISTS (SELECT 1 FROM FACULTY WHERE faculty = @faculty)
            UPDATE FACULTY SET faculty_name = @faculty_name WHERE faculty = @faculty
          ELSE
            INSERT INTO FACULTY (faculty, faculty_name) VALUES (@faculty, @faculty_name)
          
          SELECT * FROM FACULTY WHERE faculty = @faculty
        `)
            return result.recordset[0]
        } catch (error) {
            throw new Error(`Ошибка при обновлении/добавлении факультета: ${error.message}`)
        }
    },

    setTeacher: async ({teacher, teacher_name, pulpit}) => {
        const pool = await getDb();
        try {
            const result = await pool.request()
                .input('teacher', sql.NVARCHAR, teacher)
                .input('teacher_name', sql.NVARCHAR, teacher_name)
                .input('pulpit', sql.NVARCHAR, pulpit)
                .query(`
          IF EXISTS (SELECT 1 FROM TEACHER WHERE teacher = @teacher)
            UPDATE TEACHER SET teacher_name = @teacher_name, pulpit = @pulpit WHERE teacher = @teacher
          ELSE
            INSERT INTO TEACHER (teacher, teacher_name, pulpit) VALUES (@teacher, @teacher_name, @pulpit)
          
          SELECT * FROM TEACHER WHERE teacher = @teacher
        `)
            return result.recordset[0]
        } catch (error) {
            throw new Error(`Ошибка при обновлении/добавлении преподавателя: ${error.message}`)
        }
    },

    setPulpit: async ({pulpit, pulpit_name, faculty}) => {
        const pool = await getDb();
        try {
            const result = await pool.request()
                .input('pulpit', sql.NVARCHAR, pulpit)
                .input('pulpit_name', sql.NVARCHAR, pulpit_name)
                .input('faculty', sql.NVARCHAR, faculty)
                .query(`
          IF EXISTS (SELECT 1 FROM PULPIT WHERE pulpit = @pulpit)
            UPDATE PULPIT SET pulpit_name = @pulpit_name, faculty = @faculty WHERE pulpit = @pulpit
          ELSE
            INSERT INTO PULPIT (pulpit, pulpit_name, faculty) VALUES (@pulpit, @pulpit_name, @faculty)
          
          SELECT * FROM PULPIT WHERE pulpit = @pulpit
        `)
            return result.recordset[0]
        } catch (error) {
            throw new Error(`Ошибка при обновлении/добавлении кафедры: ${error.message}`)
        }
    },

    setSubject: async ({subject, subject_name, pulpit}) => {
        const pool = await getDb();
        try {
            const result = await pool.request()
                .input('subject', sql.NVARCHAR, subject)
                .input('subject_name', sql.NVARCHAR, subject_name)
                .input('pulpit', sql.NVARCHAR, pulpit)
                .query(`
          IF EXISTS (SELECT 1 FROM SUBJECT WHERE subject = @subject)
            UPDATE SUBJECT SET subject_name = @subject_name, pulpit = @pulpit WHERE subject = @subject
          ELSE
            INSERT INTO SUBJECT (subject, subject_name, pulpit) VALUES (@subject, @subject_name, @pulpit)
          
          SELECT * FROM SUBJECT WHERE subject = @subject
        `)
            return result.recordset[0]
        } catch (error) {
            throw new Error(`Ошибка при обновлении/добавлении дисциплины: ${error.message}`)
        }
    },

    delFaculty: async ({faculty}) => {
        const pool = await getDb();
        try {
            const result = await pool.request()
                .input('faculty', sql.NVARCHAR, faculty)
                .query(`
          IF EXISTS (SELECT 1 FROM FACULTY WHERE faculty = @faculty)
          BEGIN
            DELETE FROM FACULTY WHERE faculty = @faculty
            SELECT 1 as success
          END
          ELSE
            SELECT 0 as success
        `)
            return {
                success: result.recordset[0].success === 1,
                message: result.recordset[0].success === 1 ? 'Факультет удален' : 'Факультет не найден'
            }
        } catch (error) {
            throw new Error(`Ошибка при удалении факультета: ${error.message}`)
        }
    },

    delTeacher: async ({teacher}) => {
        const pool = await getDb();
        try {
            const result = await pool.request()
                .input('teacher', sql.NVARCHAR, teacher)
                .query(`
          IF EXISTS (SELECT 1 FROM TEACHER WHERE teacher = @teacher)
          BEGIN
            DELETE FROM TEACHER WHERE teacher = @teacher
            SELECT 1 as success
          END
          ELSE
            SELECT 0 as success
        `)
            return {
                success: result.recordset[0].success === 1,
                message: result.recordset[0].success === 1 ? 'Преподаватель удален' : 'Преподаватель не найден'
            }
        } catch (error) {
            throw new Error(`Ошибка при удалении преподавателя: ${error.message}`)
        }
    },

    delPulpit: async ({pulpit}) => {
        const pool = await getDb();
        try {
            const result = await pool.request()
                .input('pulpit', sql.NVARCHAR, pulpit)
                .query(`
          IF EXISTS (SELECT 1 FROM PULPIT WHERE pulpit = @pulpit)
          BEGIN
            DELETE FROM PULPIT WHERE pulpit = @pulpit
            SELECT 1 as success
          END
          ELSE
            SELECT 0 as success
        `)
            return {
                success: result.recordset[0].success === 1,
                message: result.recordset[0].success === 1 ? 'Кафедра удалена' : 'Кафедра не найдена'
            }
        } catch (error) {
            throw new Error(`Ошибка при удалении кафедры: ${error.message}`)
        }
    },

    delSubject: async ({subject}) => {
        const pool = await getDb();
        try {
            const result = await pool.request()
                .input('subject', sql.NVARCHAR, subject)
                .query(`
          IF EXISTS (SELECT 1 FROM SUBJECT WHERE subject = @subject)
          BEGIN
            DELETE FROM SUBJECT WHERE subject = @subject
            SELECT 1 as success
          END
          ELSE
            SELECT 0 as success
        `)
            return {
                success: result.recordset[0].success === 1,
                message: result.recordset[0].success === 1 ? 'Дисциплина удалена' : 'Дисциплина не найдена'
            }
        } catch (error) {
            throw new Error(`Ошибка при удалении дисциплины: ${error.message}`)
        }
    }
}

module.exports = resolvers
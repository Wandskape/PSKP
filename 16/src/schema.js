const {buildSchema} = require('graphql')

const schema = buildSchema(`
  type Faculty {
    faculty: String!
    faculty_name: String!
  }

  type Teacher {
    teacher: String!
    teacher_name: String!
    pulpit: String!
  }

  type Pulpit {
    pulpit: String!
    pulpit_name: String!
    faculty: String!
  }

  type Subject {
    subject: String!
    subject_name: String!
    pulpit: String!
  }

  type MutationResult {
    success: Boolean!
    message: String!
  }

  type Query {
    getFaculties(faculty: String): [Faculty]
    getTeachers(teacher: String): [Teacher]
    getPulpits(pulpit: String): [Pulpit]
    getSubjects(subject: String): [Subject]
    getTeachersByFaculty(faculty: String!): [Teacher]
    getSubjectsByFaculties(faculty: String!): [Subject]
  }

  type Mutation {
    setFaculty(faculty: String!, faculty_name: String!): Faculty
    setTeacher(teacher: String!, teacher_name: String!, pulpit: String!): Teacher
    setPulpit(pulpit: String!, pulpit_name: String!, faculty: String!): Pulpit
    setSubject(subject: String!, subject_name: String!, pulpit: String!): Subject
    delFaculty(faculty: String!): MutationResult
    delTeacher(teacher: String!): MutationResult
    delPulpit(pulpit: String!): MutationResult
    delSubject(subject: String!): MutationResult
  }
`)

module.exports = schema
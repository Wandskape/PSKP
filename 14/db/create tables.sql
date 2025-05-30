CREATE DATABASE UniversityDB;
GO
USE UniversityDB;
GO

CREATE TABLE FACULTY (
    FACULTY_ID INT IDENTITY(1,1) PRIMARY KEY,
    FACULTY_NAME NVARCHAR(100) NOT NULL
);

CREATE TABLE PULPIT (
    PULPIT_ID INT IDENTITY(1,1) PRIMARY KEY,
    PULPIT_NAME NVARCHAR(100) NOT NULL,
    FACULTY_ID INT NOT NULL,
    CONSTRAINT FK_PULPIT_FACULTY FOREIGN KEY (FACULTY_ID) REFERENCES FACULTY(FACULTY_ID)
);

CREATE TABLE TEACHER (
    TEACHER_ID INT IDENTITY(1,1) PRIMARY KEY,
    TEACHER_NAME NVARCHAR(100) NOT NULL,
    PULPIT_ID INT NOT NULL,
    CONSTRAINT FK_TEACHER_PULPIT FOREIGN KEY (PULPIT_ID) REFERENCES PULPIT(PULPIT_ID)
);

CREATE TABLE AUDITORIUM_TYPE (
    AUDITORIUM_TYPE_ID INT IDENTITY(1,1) PRIMARY KEY,
    AUDITORIUM_TYPENAME NVARCHAR(50) NOT NULL
);

CREATE TABLE AUDITORIUM (
    AUDITORIUM_ID INT IDENTITY(1,1) PRIMARY KEY,
    AUDITORIUM_NAME NVARCHAR(50) NOT NULL,
    AUDITORIUM_CAPACITY INT,
    AUDITORIUM_TYPE_ID INT NOT NULL,
    CONSTRAINT FK_AUDITORIUM_TYPE FOREIGN KEY (AUDITORIUM_TYPE_ID) REFERENCES AUDITORIUM_TYPE(AUDITORIUM_TYPE_ID)
);

CREATE TABLE SUBJECT (
    SUBJECT_ID INT IDENTITY(1,1) PRIMARY KEY,
    SUBJECT_NAME NVARCHAR(100) NOT NULL,
    PULPIT_ID INT NOT NULL,
    CONSTRAINT FK_SUBJECT_PULPIT FOREIGN KEY (PULPIT_ID) REFERENCES PULPIT(PULPIT_ID)
);
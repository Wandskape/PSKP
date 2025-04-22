-- 1. FACULTY (Факультеты)
INSERT INTO FACULTY (FACULTY, FACULTY_NAME) VALUES
('IT', 'Information Technologies'),
('CS', 'Computer Science'),
('ENG', 'Engineering'),
('MED', 'Medical'),
('LAW', 'Law');

-- 2. PULPIT (Кафедры)
INSERT INTO PULPIT (PULPIT, PULPIT_NAME, FACULTY) VALUES
('SE', 'Software Engineering', 'IT'),
('DS', 'Data Science', 'CS'),
('ME', 'Mechanical Engineering', 'ENG'),
('PHARM', 'Pharmacy', 'MED'),
('CRIM', 'Criminology', 'LAW');

-- 3. SUBJECT (Дисциплины)
INSERT INTO SUBJECT (SUBJECT, SUBJECT_NAME, PULPIT) VALUES
('PROG101', 'Programming Basics', 'SE'),
('ML201', 'Machine Learning', 'DS'),
('THERMO', 'Thermodynamics', 'ME'),
('ANAT', 'Human Anatomy', 'PHARM'),
('JURIS', 'Jurisprudence', 'CRIM');

-- 4. AUDITORIUM_TYPE (Типы аудиторий)
INSERT INTO AUDITORIUM_TYPE (AUDITORIUM_TYPE, AUDITORIUM_TYPENAME) VALUES
('LEC', 'Lecture Hall'),
('LAB', 'Laboratory'),
('SEM', 'Seminar Room'),
('EXAM', 'Examination Hall'),
('CONF', 'Conference Room');

-- 5. AUDITORIUM (Аудитории)
INSERT INTO AUDITORIUM (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_CAPACITY, AUDITORIUM_TYPE) VALUES
('A101', 'Main Lecture Hall', 150, 'LEC'),
('B205', 'Chemistry Lab', 30, 'LAB'),
('C304', 'Seminar Room A', 25, 'SEM'),
('D412', 'Exam Hall 1', 200, 'EXAM'),
('E500', 'Conference Center', 100, 'CONF');
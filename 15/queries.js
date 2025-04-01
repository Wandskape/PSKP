require('dotenv').config();
const { getDatabase } = require('./db');

async function createCollections() {
    try {
        const db = getDatabase();
        const faculty = db.createCollection('faculty')
        const pulpit = db.createCollection('pulpit')
        console.log('Faculty collection:', faculty.namespace)
        console.log('Pulpit collection:', pulpit.namespace)
    } catch (err) {
        console.error("Error:", err)
    }
}

async function getFaculties(){
    try{
        const db = getDatabase()
        return db.collection('faculty').find().toArray()
    } catch (err) {
        console.error("Error:", err)
    }
}

async function getFaculty(faculty){
    try{
        const db = getDatabase()
        const facultyExist = await db.collection('faculty').findOne({
            faculty: faculty
        });

        if (!facultyExist) {
            console.log(`Факультет с кодом "${faculty}" не найден`)
            return null
        }

        return facultyExist
    } catch (err) {
        console.error("Error:", err)
    }
}

async function getPulpits(){
    try{
        const db = getDatabase();
        return db.collection('pulpit').find().toArray()
    } catch (err) {
        console.error("Error:", err)
    }
}

async function getPulpit(pulpit){
    try{
        const db = getDatabase();
        const pulpitExist = await db.collection('pulpit').findOne({
            pulpit: pulpit
        });

        if (!pulpitExist) {
            console.log(`Факультет с кодом "${pulpit}" не найден`);
            return null;
        }

        return pulpitExist
    } catch (err) {
        console.error("Error:", err)
    }
}

async function addFaculty(faculty, faculty_name){
    try{
        const db = getDatabase()
        const facultiesCollections = db.collection('faculty')
        const result = await facultiesCollections.insertOne({
            faculty: faculty,
            faculty_name: faculty_name
        })

        const insertedFaculty = await facultiesCollections.findOne({
            _id: result.insertedId
        })

        return insertedFaculty
    } catch (err){
        console.error("Error:", err)
    }
}

async function addPulpit(pulpit, pulpit_name, faculty){
    try{
        const db = getDatabase()
        const pulpitCollections = db.collection('pulpit')
        const result = await pulpitCollections.insertOne({
            pulpit:pulpit,
            pulpit_name:pulpit_name,
            faculty: faculty,
        })

        const insertedPulpit = await pulpitCollections.findOne({
            _id: result.insertedId
        })

        return insertedPulpit
    } catch (err){
        console.error("Error:", err)
    }
}

async function updateFaculty(faculty, faculty_name){
    try{
        const db = getDatabase()
        const facultiesCollections = db.collection('faculty')
        const result = await facultiesCollections.updateOne(
            {faculty: faculty},
            {$set: {faculty: faculty, faculty_name: faculty_name}
        })

        const updatedFaculty = await getFaculty(faculty)

        return updatedFaculty
    } catch (err){
        console.error("Error:", err)
    }
}

async function updatePulpit(pulpit, pulpit_name, faculty){
    try{
        const db = getDatabase()
        const pulpitCollections = db.collection('pulpit')
        const result = await pulpitCollections.updateOne(
            {pulpit:pulpit},
            {$set:{pulpit:pulpit, pulpit_name:pulpit_name, faculty: faculty}
        })

        const updatedPulpit = await getPulpit(pulpit)

        return updatedPulpit
    } catch (err){
        console.error("Error:", err)
    }
}

async function deleteFaculty(faculty){
    try{
        const db = getDatabase()
        const facultiesCollections = db.collection('faculty')
        const facultyToDelete = await facultiesCollections.findOne({ faculty: faculty })
        if (!facultyToDelete) {
            return null
        }

        const result = await facultiesCollections.deleteOne({ faculty: faculty })

        return result.deletedCount > 0 ? facultyToDelete : null
    } catch (err){
        console.error("Error:", err)
    }
}

async function deletePulpit(pulpit){
    try{
        const db = getDatabase()
        const pulpitCollections = db.collection('pulpit')
        const pulpitToDelete = await pulpitCollections.findOne({pulpit:pulpit})
        if (!pulpitToDelete) {
            return null
        }

        const result = await pulpitCollections.deleteOne({pulpit:pulpit})

        return result.deletedCount > 0 ? pulpitToDelete : null
    } catch (err){
        console.error("Error:", err)
    }
}

module.exports = {
    createCollections,
    getFaculties,
    getFaculty,
    getPulpits,
    getPulpit,
    addFaculty,
    addPulpit,
    updateFaculty,
    updatePulpit,
    deleteFaculty,
    deletePulpit
}

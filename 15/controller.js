const dbQueries = require('./queries');

async function getFaculties(req, res){
    try{
        const faculties = await dbQueries.getFaculties()
        sendResponse(res,200, faculties)
    } catch (err) {
        handleError(res, err);
    }
}

async function getPulpits(req, res){
    try{
        const pulpits = await dbQueries.getPulpits()
        sendResponse(res,200, pulpits)
    } catch (err) {
        handleError(res, err);
    }
}

async function addFaculty(req, res){
    try{
        const {faculty, faculty_name} = req.body
        if(!faculty){
            return sendResponse(res, 400, { error: 'Faculty is required' });
        }
        if(!faculty_name){
            return sendResponse(res, 400, { error: 'Faculty name is required' });
        }

        const newFaculty = await dbQueries.addFaculty(faculty, faculty_name)
        if(newFaculty){
            sendResponse(res,200, newFaculty)
        } else {
            sendResponse(res, 500, { error: 'Failed to add faculty' });
        }
    } catch (err) {
        handleError(res, err);
    }
}

async function addPulpit(req, res){
    try{
        const {pulpit, pulpit_name, faculty} = req.body

        if(!pulpit){
            return sendResponse(res, 400, { error: 'Pulpit is required' });
        }
        if(!pulpit_name){
            return sendResponse(res, 400, { error: 'Pulpit name is required' });
        }
        if(!faculty){
            return sendResponse(res, 400, { error: 'Faculty is required' });
        }

        const newPulpit = await dbQueries.addPulpit(pulpit, pulpit_name, faculty)
        if(newPulpit){
            sendResponse(res,200, newPulpit)
        } else {
            sendResponse(res, 500, { error: 'Failed to add pulpit' });
        }
    } catch (err) {
        handleError(res, err);
    }
}

async function updateFaculty(req, res){
    const {faculty, faculty_name} = req.body
    if(!faculty){
        return sendResponse(res, 400, { error: 'Faculty is required' });
    }
    if(!faculty_name){
        return sendResponse(res, 400, { error: 'Faculty name is required' });
    }

    const existingFaculty = await dbQueries.getFaculty(faculty)
    if(!existingFaculty){
        return sendResponse(res, 404, { error: 'Faculty not found' });
    }
    const updatedFaculty = await dbQueries.updateFaculty(faculty, faculty_name)
    if(updatedFaculty){
        sendResponse(res, 200, updatedFaculty);
    }
    else{
        sendResponse(res, 500, { error: 'Failed to update faculty' });
    }
}

async function updatePulpit(req, res){
    try{
        const {pulpit, pulpit_name, faculty} = req.body

        if(!pulpit){
            return sendResponse(res, 400, { error: 'Pulpit is required' });
        }
        if(!pulpit_name){
            return sendResponse(res, 400, { error: 'Pulpit name is required' });
        }
        if(!faculty){
            return sendResponse(res, 400, { error: 'Pulpit is required' });
        }

        const existingPulpit = await dbQueries.getPulpit(pulpit)
        if(!existingPulpit){
            return sendResponse(res, 404, { error: 'Pulpit not found' });
        }

        const updatedPulpit = await dbQueries.updatePulpit(pulpit, pulpit_name, faculty)
        if(updatedPulpit){
            sendResponse(res, 200, updatedPulpit);
        }
        else{
            sendResponse(res, 500, { error: 'Pulpit to update faculty' });
        }
    } catch (err) {
        handleError(res, err);
    }
}

async function deleteFaculty(req, res){
    const encodedFaculty = req.url.split('/')[3];
    const xyz = decodeURIComponent(encodedFaculty);
    if (!xyz){
        return sendResponse(res, 400, { error: 'Invalid faculty ' });
    }

    const deletedFaculty = await dbQueries.deleteFaculty(xyz)
    if(deletedFaculty){
        sendResponse(res, 200, deletedFaculty);
    }
    else{
        sendResponse(res, 500, { error: 'Failed to delete faculty' });
    }
}

async function deletePulpit(req, res){
    const encodedPulpit = req.url.split('/')[3];
    const xyz = decodeURIComponent(encodedPulpit);
    if (!xyz){
        return sendResponse(res, 400, { error: 'Invalid pulpit ' });
    }

    const deletedPulpit = await dbQueries.deletePulpit(xyz)
    if(deletedPulpit){
        sendResponse(res, 200, deletedPulpit);
    }
    else{
        sendResponse(res, 500, { error: 'Failed to delete faculty' });
    }
}

function sendResponse(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}

function handleError(res, err) {
    console.error('Error:', err);
    sendResponse(res, 500, { error: 'Server error', details: err.message });
}

module.exports = {
    getFaculties,
    getPulpits,
    addFaculty,
    addPulpit,
    updateFaculty,
    updatePulpit,
    deleteFaculty,
    deletePulpit
}
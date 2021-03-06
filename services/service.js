//TODO: investors model

const db = require('./dbservice');
   
const getAllInvestors = (request, response) => {
    db.getAllInvestors()
        .then( 
            (investors) => response.status(200).json(investors),
            (err) => console.error(err)
        )
};

const getInvestorById = (request, response) => {
     const id = parseInt(request.params.id);

    db.getInvestorById(id)
    .then( 
        (investors) => response.status(200).json(investors), 
        (err) => console.error(err)
    )
}

const createInverstor = (request, response) => {
    const {first_name, last_name, dob, phone, address, city, state, zipcode } = request.body;
    db.createInverstor(first_name, last_name, dob, phone, address, city, state, zipcode)
    .then(
        (result) => response.status(200).json(result.rows[0].id), 
        (err) => console.error(err)
    )
}

const deleteInversor = (request, response) => {
    const id = parseInt(request.params.id);
    db.deleteInversor(id)
    .then(
        (result) => response.status(200).json(`Investor deleted with ID: ${id}`), 
        (err) => console.error(err)
    )
}

const upload = require('./uploadService');

const uploadDocs = (request, response) => {
    upload.uploadFiles({files: request, callback: 4})
    .then(
        (result) => response.status(200).send(result),
        (err) => response.status(500).json(err)
    )
};

module.exports = {
    getAllInvestors,
    getInvestorById,
    createInverstor,
    deleteInversor,
    uploadDocs
}
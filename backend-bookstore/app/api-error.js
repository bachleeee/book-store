class ApiError extends Error {
    constructor(messsage,statusCode ){
        super();
        this.statusCode = statusCode;
        this.message = messsage;
    }
}

module.exports = ApiError;
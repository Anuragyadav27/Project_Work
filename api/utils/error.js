export const errorHandler = (statusCode , message) => {
    // initialize error handler
    const error = new Error();
    error.status = statusCode;
    error.message = message;
    return error;
};
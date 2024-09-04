export const errorHandler = (statusCode, message) => (req, res, next) => {
    res.status(statusCode).json({
        success: false,
        message,
        statusCode
    });
};

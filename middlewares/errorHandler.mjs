import { logError } from '../utils/logHandler.mjs';

export const errorHandler = (err, req, res, next) => {
    logError(err);
    console.error(err.stack);
    res.status(500).json({ success: false, statusCode: 500, message: err.message });
};

import { Request, Response, NextFunction } from 'express';
import { isCelebrateError } from 'celebrate';

export interface ErrorItem {
    path: string;
    type: string;
}

export default function errors() {
    return (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (!isCelebrateError(err)) {
            return next(err);
        }

        let errorFields: ErrorItem[] = [];
        for (const [segment, joiError] of err.details.entries()) {
            if (joiError.details.length > 0) {
                joiError.details.forEach((detail) => {
                    errorFields.push({
                        path: detail.path.join('.'),
                        type: detail.type,
                    });
                });
            }
        }
        return response.status(400).json({
            error: 'validation-error',
            fields: errorFields,
        });
    };
};

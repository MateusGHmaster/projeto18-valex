import { Response, Request, NextFunction } from 'express';

export default function schemaValidate (schema: any) {
    
    return (req: Request, res: Response, next: NextFunction) => {
        
        const validate = schema.validate(req.body);

        if(validate.error) {
            throw {
                type: 'bad_request',
                message: `Data validation: ${validate.error.details}`
            }
        }

        next();

    };

}
export class InternalServerErrorException extends Error {
    /**
     *
     */
    statusCode: number = 500
    
    constructor(msg) {
        super(msg);
    }
}
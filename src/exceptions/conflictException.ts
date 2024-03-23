export class ConflictException extends Error {
    /**
     *
     */
    statusCode: number = 400
    
    constructor(msg) {
        super(msg);
    }
}
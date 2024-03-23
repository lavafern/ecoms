export class WrongPasswordException extends Error {
    /**
     *
     */
    statusCode: number = 401
    
    constructor(msg?) {
        super(msg);
    }
}
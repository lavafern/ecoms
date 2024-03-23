export class UserNotFoundException extends Error {
    /**
     *
     */
    statusCode: number = 404
    
    constructor(msg?) {
        super(msg);
    }
}
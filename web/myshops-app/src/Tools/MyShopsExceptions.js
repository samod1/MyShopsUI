
export class MyShopsException extends Error {

    constructor(messasge) {
        super();
        this.message = messasge;
    }
}

export class JWTTokenInvalid extends Error {
    constructor(message) {
        super();
        this.message = message;
    }
}

export class JWTTokenDoesNotExists extends Error {
    constructor(message) {
        super();
        this.message = message;
    }
}



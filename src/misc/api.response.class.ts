<<<<<<< HEAD
export class ApiResponse{
    
    status:string;
    statusCode:number;
    message: string | null;

    constructor(status:string,statusCode:number, message: string | null=null){

        this.status = status;
        this.statusCode = statusCode;
        this.status = status;
    }

=======
export class ApiResponse {
    status: string;
    statusCode: number;
    message: string | null;

    constructor(status: string, statusCode: number, message: string | null = null) {
        this.status = status;
        this.statusCode = statusCode;
        this.message = message
    }
>>>>>>> 5883df7e8acd8e1c0c8c26ed298a7179872f4002
}
import { HttpStatus } from "@nestjs/common";

export interface IStatusMessage {
    _status: number
    _message: string
}

const Status= {
    409: {
        _status: HttpStatus.CONFLICT, 
        _message: 'Conflict Request'
    },
    400: {
        _status : HttpStatus.BAD_REQUEST,
        _message : 'Bad Request'
    },
    404: {
        _status : HttpStatus.NOT_FOUND,
        _message : 'Not Found Request'
    },
    401: {
        _status : HttpStatus.UNAUTHORIZED,
        _message : 'Unauthorized Request'
    },
    403:{
        _status : HttpStatus.FORBIDDEN,
       _message : 'Forbiden Request'
    },
    501: {
        _status : HttpStatus.NOT_IMPLEMENTED,
       _message : 'not implement Request'
    }
}

export const getStatus = (status: number): IStatusMessage => {
    if(status){
      return  Status[status]
    }else{
        return {
            _status : HttpStatus.BAD_REQUEST,
            _message : 'Bad Request'
        }
    }
}
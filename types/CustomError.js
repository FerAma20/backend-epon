/** Clase para indicar errores particulares */
exports.CustomError =  class CustomError {
    constructor(
        code=0,
        message='',
        data={}
    ){
        this.code = code
        this.message = message
        this.data = data
    }
}

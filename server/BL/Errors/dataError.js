class dataError extends Error{
    constructor(message){
        super(message)
        this.name = dataError;
    }
}
module.exports = dataError;
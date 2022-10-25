/**
 * This file will contain the configuration of DB
 */

module.exports = {
    HOST : "localhost",
    USER : "root",
    PASSWORD : "Amit@54321",
    DB : "ecommerce",
    dialect : "mysql",
    pool : {
        max : 5, //maximum connection possible at any point of time = 5
        min : 0,
        acquire : 30000, // im ms , wait max time  till thos time before aborting
        idle : 1000 // db will wait till this time to connect with DB and after that it will be aborted
    }
}
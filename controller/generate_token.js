// require("dotenv").config();
// const jwt = require('jsonwebtoken');
// const SECRET_KEY = process.env.JWT_SECRET; // Ensure this key is set in your .env file

// // User data
// const userData = {
//     orgslno: "RB",
//     depot: null,
//     level: "BOARD",
//     user_name: "railwayboard",
//     hrEmployeeId: null,
//     appCode: "",
//     authorities: [
//         "COACHMITRA_USER",
//         "9",
//         "CMM_USER",
//         "50000",
//         "FMM_USER",
//         "64"
//     ],
//     client_id: "cmm",
//     token: "",
//     division: null,
//     firstName: "RB USER",
//     zone: null,
//     scope: [
//         "cmm",
//         "read",
//         "write"
//     ],
//     sesId: "",
//     SSOUid: "",
//     location: "RB",
//     hrmsId: "XTLEII",
//     department: "MECH",
//     workcenterid: null,
//     user: "railwayboard",
//     jti: "4cf51598-174e-4cb4-ae27-4266681e39d1",
//     homepage: null,
// };


// function generateToken() {
//     const expirationDate = new Date('2024-10-26T23:59:59Z');
//     const expirationTime = Math.floor(expirationDate.getTime() / 1000); 
//     userData.exp = expirationTime;
//     const token = jwt.sign(userData, SECRET_KEY, { algorithm: 'HS256' });


//     console.log(`jwt-token: ${token}`);
//     return { token, expirationTime };
// }

// // Export the generateToken function
// module.exports = { generateToken };

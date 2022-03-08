let user = {name:"venkat",
            email:"venkateshsekaran18",
            password:"hi123678",
            credit_no:"123463636736"
           }
const bcrypt = require ("bcryptjs");
let salt = bcrypt.genSaltSync(10);
let new_email = bcrypt.hashSync(user.email, salt);
let new_password = bcrypt.hashSync(user.password, salt);
let new_credit_no = bcrypt.hashSync(user.credit_no, salt);
console.log(new_email);
console.log(new_password);
console.log(new_credit_no);

// to check whether correct or not
let flag = bcrypt.compareSync("venkateshsekaran17", new_email);
console.log(flag);
flag ? console.log("Success") : console.log("Failed");

//enter user object
console.log(user);
let new_user = {...user,email: new_email,password: new_password,credit_no: new_credit_no}
console.log(new_user);



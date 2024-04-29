const { json } = require('body-parser');
const db = require('../../db/db')


async function usercreation(
    name, password, email, phone, id, role
) {

    try {
        const result = await new Promise((resolve, reject) => {
            db.query("INSERT INTO user (name,password,email,phone,id,role) VALUES (?,?,?,?,?,?)",
                [name, password, email, phone, id, role],
                (error, result, field) => {
                    error ? reject(error) : resolve(result)
                })
        });
        return result
    }
    catch (error) {
        console.log(error)
    }

}
async function userlogin(
    name, password
) {
    try {
        const result = await new Promise((resolve, raject) => {
            db.query("SELECT * FROM user WHERE name=?",
                [name],
                (error, result, field) => {
                    error ? reject(error) : resolve(result)
                })
        });
        console.log('result', result);
        if (!result.length) {

            return json({ "success": false, "message": "Error while login." });

        }
        if (result[0].password !== password){
            return json({ "success": false, "message": "incorrect password" });
        }
        else{

            return json({ "success": true,"message": "Login success." });
        }
    } catch (error) {
        console.log(error)
    }
}
function useredit(
    name, password, email, phone, id, role
) {
    var user = {
        name: name,
        password: password,
        email: email,
        phone: phone,
        id: id,
        role: role
    }
    return user
}

module.exports = { usercreation, userlogin, useredit }
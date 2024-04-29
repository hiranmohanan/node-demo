function login(name , password){
    console.log('name:',name);
    console.log('password',password);
    if(name === 'admin' && password === 'admin'){
        return true
    }
    else{

        return false
    }
}

module.exports = { login }
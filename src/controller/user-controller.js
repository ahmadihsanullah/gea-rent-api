const userService = require('../service/user-service')

const register = (req, res)=>{
        return  userService.register(req.body, res)
}

const login = (req, res)=> {
        return userService.login(req.body, res)
}

const get = (req, res, next)=>{
    try {
        return userService.get(req.user.username, res)
    } catch (e) {
        next(e)
    }
}

const logout = (req, res, next)=>{
    try{
        return userService.logout(req.user.username, res)
    }catch(e){
        next(e)
    }
}

const loginTokos = (req, res)=> {
    return userService.loginTokos(req.body, res)
}

const update = (req, res, next)=>{
    try {
        const username = req.user.username;
        const request = req.body;
        request.username = username;
    
        // Check if there is a profile image in the request
        if (req.file) {
          request.profile = req.file.filename;
        }
        console.log('Request Body:', request);
        console.log('Request File:', req.file);

        return userService.update(request, res);
      } catch (e) {
        next(e);
      }
}

const users = (req, res)=> {
    return userService.users(res)
}

const searchUser = (req, res) => {
    const name = req.query.name;
  
    if (!name) {
      return res.status(400).json({ errors: "Username parameter is required" });
    }
  
    return userService.searchUser(name, res);
};
  
module.exports = {
    register,
    login,
    get,
    logout,
    update,
    loginTokos,
    users,
    searchUser
}
const adminService = require('../service/admin-service')

// login
const login = (req, res)=> {
    return adminService.login(req.body, res)
}

// logout
const logout = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    await adminService.logout(username, password, res);
  } catch (e) {
    next(e);
  }
}

// list users
const usersAdmin = async (req, res)=> {
   return adminService.usersAdmin(res)
}

// update user
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

        return adminService.update(request, res);
      } catch (e) {
        next(e);
      }
}


module.exports = {
    login,
    logout,
    usersAdmin,
    update
}
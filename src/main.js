const {web}  = require("./application/web");

var port = 9987
web.listen(port,'192.168.0.198', () => {
    console.log(`server running in https://localhost:${port}`)
});
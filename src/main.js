const {web}  = require("./application/web");

var port = 8885
web.listen(port, () => {
    console.log(`server running in https://localhost:${port}`)
});
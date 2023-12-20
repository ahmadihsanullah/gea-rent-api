const {web}  = require("./application/web");
// web.use(cors({
//     credentials: true,
//     origin: 'http://localhost:5173'
// }));

var port = 9987

web.listen(port, () => {
    console.log(`server running in https://localhost:${port}`)
});
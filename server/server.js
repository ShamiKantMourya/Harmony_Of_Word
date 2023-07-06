const app = require("./app");
const {dataBase} = require("./config/database");

dataBase();


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
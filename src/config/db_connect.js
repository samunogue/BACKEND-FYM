import mongoose from "mongoose";

mongoose.connect(`mongodb+srv://admin:admin1234@bd-fym.pc9nksu.mongodb.net/`);

let db = mongoose.connection;
export default db;   
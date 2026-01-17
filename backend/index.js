import { config } from "dotenv";
import app from "./app.js";
import connectToDb from "./config/db.config.js";

config();

const PORT = process.env.PORT || 3500;

app.listen(PORT,async() => {
    await connectToDb();
    console.log(`server successfully running on ${PORT}`);
    
})


import "dotenv/config.js"

import connectDB from "./db/index.js"
import { app } from "./app.js"



connectDB().then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log("SERVER IS RUNNING AT PORT :",process.env.PORT);
    })
}).catch((error)=>{
    console.log("MONGO DB CONNECTION FAILED!!",error);
})

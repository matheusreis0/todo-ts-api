import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import todoRoutes from "./routes"

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use(todoRoutes)

const uri: string = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@localhost:27017/${process.env.MONGO_DB}?authSource=admin`
const options = { useNewUrlParser: true, useUnifiedTopology: true}
mongoose.set("useFindAndModify", false)

mongoose
    .connect(uri, options)
    .then(() => {
        app.listen(PORT, () => 
            console.log(`Server running on http://localhost:${PORT}`)
        )
    })
    .catch(error => {
        throw error
    })

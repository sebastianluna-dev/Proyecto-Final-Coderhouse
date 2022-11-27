import mongoose from "mongoose";
import {DB_USERNAME, DB_PASSWORD } from "../config.js";

const databaseUrl = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.m7cmfu5.mongodb.net/?retryWrites=true&w=majority`

export const connectDB = () => {
    mongoose.connect(databaseUrl,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    mongoose.connection.once("open", () => {
        console.log("databe open")
    })
    mongoose.connection.on("error", error => {
        console.log(error)
    })
}


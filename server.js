const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
connectDB();
const hotspotUserRoutes = require('./routes/hotspot/hotspot');
const workspaceRoutes = require('./routes/workspace/workspace');
const userRoutes = require('./routes/user/userRoute');

const port = process.env.PORT || 3000;

const app =express()

 app. use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/hotspot', hotspotUserRoutes)
app.use('/api/workspace', workspaceRoutes)
app.use('/api/user', userRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



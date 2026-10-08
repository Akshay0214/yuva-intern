require('dotenv').config(); const express=require('express'); const connectDB=require('./config/db'); const routes=require('./routes/posts');
const app=express(); app.use(express.json()); app.get('/health',(q,r)=>r.json({status:'ok'})); app.use('/api/posts',routes); app.use((q,r)=>r.status(404).json({error:'Route not found'})); module.exports={app,connectDB};

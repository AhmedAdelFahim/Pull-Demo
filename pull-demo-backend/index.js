const express = require('express');
const cors = require('cors')
const app = express();
const PORT  = process.env.PORT || 3331;
const messages = [];

app.use(cors())
app.use(express.json());

const responses = {}

app.post('/messages',(req,res)=>{
    const {body} = req;
    body.id = Date.now()
    messages.push(body);
    res.status(200).end();
})

app.get('/messages',(req,res)=>{
    res.json(messages)
})

app.post('/subscribe',(req,res)=>{
    const {body:{id}} = req
    console.log("subscriber",id)
    req.on('close',()=>{
        delete responses[id]
    })
    responses[id] = res

})

app.post('/messagesSubscribe',(req,res)=>{
    const {body} = req;
    body.id = Date.now()
    messages.push(body);
    Object.keys(responses).forEach((subId) => {
        responses[subId].json(messages)
        delete responses[subId]
    })
    res.status(200).end();
})

app.listen(PORT,() => {
    console.log(`listen on port ${PORT}`);
})

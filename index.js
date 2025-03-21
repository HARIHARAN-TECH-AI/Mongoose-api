const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()
app.use(express.json())


const StudSchema  =  mongoose.Schema(
    {
        prodName:String,
        quantity:Number,
        location:String
    }
)

const Studmodels =  mongoose.model("Cart",StudSchema)

app.get('/find',async(req,res)=> {
    try {
        const prodName = req.query.prodName
        await mongoose.connect('mongodb://localhost:27017/2003',{
        useNewUrlParser:true,
        useUnifiedTopology:true
        })
        const result = await Studmodels.find({"prodName":prodName})
        res.send({message:result})
    }
    catch(error) {
        res.status(404).send("Provide a Valid Data")
    }
    finally {
        await mongoose.disconnect()
    }
})

app.post('/insert',async(req,res)=> {
    try {
        const prodName = req.body.prodName
        const quantity = req.body.quantity
        const location = req.body.location
        await mongoose.connect('mongodb://localhost:27017/2003',{
            useNewUrlParser:true,
            useUnifiedTopology:true
            })
        await Studmodels.insertOne({
            'prodName':prodName,
            'quantity':quantity,
            'location':location
        })
        res.send("Inserted Doc successfully")
    }
    catch(error) {
        res.status(404).send("Provide a Valid Data")

    }
    finally {
        await mongoose.disconnect()

    }
})

app.put('/update',async(req,res)=> {
    try {
        const prodName = req.body.prodName;
        const quantity = req.body.quantity;
        await mongoose.connect('mongodb://localhost:27017/2003',{
            useNewUrlParser:true,
            useUnifiedTopology:true
            })
            await Studmodels.updateOne({"prodName":prodName,$set:{"quantity":quantity}})
            res.send("Data Updated")
    }
    catch(error) {
        res.status(404).send("Provide a Valid Data")
    }
    finally {
        await mongoose.disconnect()

    }
})

app.delete('/delete',async(req,res)=> {
    try {
        const prodName = req.body.prodName;
        await mongoose.connect('mongodb://localhost:27017/2003',{
            useNewUrlParser:true,
            useUnifiedTopology:true
            })
            await Studmodels.deleteOne({"prodName":prodName})
            res.send("Data Deleted")
    }
    catch(error) {
        res.status(404).send("Provide a Valid Data")
    }
    finally {
        await mongoose.disconnect()

    }
})

const PORT = 3030;
app.listen(PORT,()=>console.log(`API running on http://localhost:${PORT}`))
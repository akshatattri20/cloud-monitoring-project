const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())

function generateVMData(){
  return [
    {name:"VM1", cpu: Math.floor(Math.random()*100), cost: Math.floor(Math.random()*20)+5},
    {name:"VM2", cpu: Math.floor(Math.random()*100), cost: Math.floor(Math.random()*20)+5},
    {name:"VM3", cpu: Math.floor(Math.random()*100), cost: Math.floor(Math.random()*20)+5},
    {name:"VM4", cpu: Math.floor(Math.random()*100), cost: Math.floor(Math.random()*20)+5}
  ]
}

app.get("/api/vm-data", (req,res)=>{
  const vmData = generateVMData()
  res.json(vmData)
})

app.get("/api/provider-cost",(req,res)=>{
  res.json([
    {name:"AWS", cost:Math.floor(Math.random()*150)+50},
    {name:"Azure", cost:Math.floor(Math.random()*150)+50},
    {name:"GCP", cost:Math.floor(Math.random()*150)+50}
  ])
})

const PORT = 5000
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))
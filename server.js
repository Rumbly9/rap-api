const express = require("express")
const app = express()
const https = require("https")
const fs = require("fs")
// const cors = require("cors")


const credentials = {
  key: fs.readFileSync(__dirname + "/key.pem"),
  cert: fs.readFileSync(__dirname + "/cert.pem")
}

const httpsServer = https.createServer(credentials, app)

const PORT = 8000

// app.use(cors())

let rappers = {
  "21 savage": {
    "age": 28,
    "birthName": "Shéyaa Bin Abraham-Joseph",
    "birthLocation": "London, England"
  },
  "chance the rapper": {
    "age": 28,
    "birthName": "Chancelor Johnathan Bennett",
    "birthLocation": "Chicago, Illinois"
  },
  "unknown": {
    "age": "unknown",
    "birthName": "unknown",
    "birthLocation": "unknown"
  }
}

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html")
})

app.get("/api/rappers/:rapperName", (request, response) => {
  const rapName = request.params.rapperName.toLowerCase()
  console.log(rapName)
  if(rappers[rapName]){
    response.json(rappers[rapName])
  }else{
    response.json(rappers["unknown"])
  }
})

app.listen(process.env.PORT || PORT, () => {
  console.log(`server running on port: ${PORT}`)
})

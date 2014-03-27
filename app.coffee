express = require("express")
fs = require("fs")
config = require("./config/config")
modelsPath = __dirname + "/app/models"
fs.readdirSync(modelsPath).forEach (file) ->
  require modelsPath + "/" + file  if file.indexOf(".js") >= 0
  return

app = express()
server = app.listen(config.port)

# express
require("./config/express") app, config

# routes
require("./config/routes") app

# socket.io
require("./config/websocket") server, config

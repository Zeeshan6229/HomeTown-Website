import express from "express"; //Express is used as a javascript framework which is used with node
//Node is a Javascript runtime used in  backend  for interacting with the server and databases.
//import bodyParser from "body-parser";
import bodyParser from "body-parser";

import morgan from "morgan";//This is used to capture the log

//Below three line of codes are used for dynamically using the directory name where the required file is stored
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 3000;
var passwordAuthentication=false;
const passwordValid="12345";
app.use(bodyParser.urlencoded({ extended: true }));

/*This line of code is used to show the passed value from the body in post call /form....else it will 
show undefined*/
function checkPassword(req,res,next) {
  console.log("The URL request is : "+req.url);
  console.log("The Method routed is : " +req.method);
  const password= req.body["Password"];
  if(password===passwordValid)
  {
    passwordAuthentication=true;
  }
  next(); //If we miss to add this next line , the request routing or any call won't happen it will just hang there
};
app.use(checkPassword); 

app.use(morgan("combined"));
app.use(express.static("public"));// Used so that express can locate the external files



app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
  
});

app.post("/submit", (req, res) => {
 // console.log( "The body of the request is : ");
  

  if(passwordAuthentication)
  res.sendFile(__dirname + "/public/secret.html");
  else
  res.sendFile(__dirname + "/public/index.html");
  
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

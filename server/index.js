import express from "express"
const app = express();
const PORT =  3000 ||  process.env.PORT
import { config } from "dotenv";
import cors from "cors"
import generatePrompt from "./utils/promptGenartor.js";
import getCodeHelp from "./codeHelperAi/codeHelper.js";
config()

app.use(
  cors({
    origin: ["http://localhost:5173" , "https://drawix-nine.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.post("/debug",async (req,res)=>{
      try {
         let{ _userCode} = req.body;
         if(!_userCode && _userCode == ""){
            return res.status(300).json({
              message:"please send the code",
              data:[],
              success:true
            })
         }

         let proccessedPrompt = generatePrompt(_userCode);
         let response = await getCodeHelp(proccessedPrompt);
         if(response.success){
            return res.status(200).json({
                  message : "result ganrated successfully",
                  data:[response],
                  success:true
            })
         }else{
            return res.status(404).json({
                  message:response?.message || "something went wrong",
                  data:null,
                  success:false
            })
         }
      } catch (error) {
          return res.status(404).json({
            message : error.message || error ,
            data:[],
            success : false
          })
      }
})

app.get("/health",(req,res)=>{
      return res.status(200).json({
         message:"server running heathy..."
      })
})


app.listen(PORT,()=>{
     console.log(`drawix running on port ${PORT}`)
})
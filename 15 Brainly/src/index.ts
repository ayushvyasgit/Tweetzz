import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";
import { UserModel,ContentModel } from "./db";
import { userMiddleware } from "./middleware";
import { LinkModel } from "./db";
import {random} from "./utils"
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/v1/signup",async (req,res)=>{
  const username = req.body.username ;
  const password = req.body.password ; 
  try{
    await UserModel.create({
      username : username,
      password : password 
    })
  res.json({
    message : "user signed up"
  })
  }
  catch(e){
    res.status(411).json({
      message:"user already Exists "
    })
  }
})
app.post("/api/v1/signin",async (req,res)=>{
  const username = req.body.username;
  const password = req.body.password;
  const existingUser =await UserModel.findOne({
    username,
    password 
  })
  if(existingUser){
    const token = jwt.sign({
      id: existingUser._id
    },JWT_PASSWORD)

    res.json({
      token 
    })
  }
  else{
    res.status(403).json({
      message:"Incorrect credit "
    })
  }
})

app.post("/api/v1/content",userMiddleware,async (req,res)=>{
  const type = req.body.type;
  const link = req.body.link;
  const title = req.body.title;
  await ContentModel.create({
    title,
    type,
    link,
    //@ts-ignore
    userId :req.userId,
    tags:[],
    
  })
  res.json({
    message : "content added"
  })
})

app.get("/api/v1/content", userMiddleware, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const searchValue = req.query.searchValue?.toString().trim();

    // Prepare MongoDB query
    const query: any = { userId };

    if (searchValue) {
      // Case-insensitive partial match on link
      query.link = { $regex: searchValue, $options: "i" };
    }

    const content = await ContentModel.find(query).populate("userId", "username");

    // ✅ Use "content" key (expected by frontend)
    res.status(200).json({
      content,
    });

  } catch (err) {
    console.error("Error fetching content:", err);
    res.status(500).json({
      error: "Failed to fetch content",
    });
  }
});


app.delete("/api/v1/content",userMiddleware,async (req,res)=>{
  const contentId = req.body.contentId; 
  await ContentModel.deleteOne({
    _id: contentId, // Fixed: changed from contentId to _id
    //@ts-ignore
    userId : req.userId
  })
  res.json({
    message:"deleted"
  })
}) 
app.post("/api/v1/brain/share", userMiddleware, async (req, res): Promise<void> => {
  const share = req.body.share;

  if (share) {
    const existingLink = await LinkModel.findOne({
      // @ts-ignore
      userId: req.userId
    });

    if (existingLink) {
      res.json({ hash: existingLink.hash });
      return;
    }

    const hash = random(10);
    await LinkModel.create({
      // @ts-ignore
      userId: req.userId,
      hash
    });

    res.json({ hash });
  } else {
    await LinkModel.deleteOne({
      // @ts-ignore
      userId: req.userId
    });

    res.json({ message: "removed link" });
  }
});


app.get("/api/v1/brain/:shareLink",async (req,res)=>{
  const hash = req.params.shareLink;
  const link = await LinkModel.findOne({
    hash
  })
  if(!link){
    res.status(411).json({
      message:"sorry incorrect input"
    })
    return;
  }
  const content = await ContentModel.find({userId : link.userId})

  const user = await UserModel.findById(link.userId);
  res.json({
    username: user?.username,
    content: content
  });
})
app.listen(3000); 
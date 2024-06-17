import User from "../models/user.js";
import OpenAI from "openai";

async function newChat(req, res) {
  let user = await User.findById(req.user._id);
  let chatsCopy = user.chats.map( ({role, content}) => {return {role, content}} );
  req.body.role = "user";
  chatsCopy.push(req.body);
  user.chats.push(req.body);
  
  const openai = new OpenAI({apiKey: process.env.OPEN_AI_API_KEY});
  try {
    let openAIResponse = await openai.chat.completions.create(
      {
        model: "gpt-3.5-turbo-0125",
        messages: chatsCopy
      }
    );

    user.chats.push((openAIResponse.choices)[0].message);
    await user.save();
    res.status(200).send(user.chats);
  }
  catch(err) {
    res.status(202).send(`OpenAI-server Error`);
  }
}

async function allChats(req, res) {
  let {chats} = await User.findById(req.user._id);
  res.status(200).send(chats);
}

async function deleteChats(req, res) {
  await User.findByIdAndUpdate(req.user._id, {chats: []});
  res.status(200).send("done");
}

export {newChat, allChats, deleteChats};
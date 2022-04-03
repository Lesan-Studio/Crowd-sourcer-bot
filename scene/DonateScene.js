const { Telegraf ,Markup } = require('telegraf')
const {keyboard, recording_keybored,next_cancle,keyboard_continue_cancle} = require('../utils/utils')
const fs = require('fs');
var https = require('https');

const remove_keyboard = Markup.removeKeyboard()

exports.voiceHandler = Telegraf.on("voice",async ctx =>{
  ctx.session.message =ctx.message.voice.file_id;
  await ctx.reply("Do you want to send this audio",recording_keybored)
  
  return ctx.wizard.selectStep(6)
})
 
exports.Decition =Telegraf.on('text',async ctx=>{
     if(ctx.message.text == "send"){
      ctx.wizard.next()
         return ctx.wizard.steps[3](ctx)  

     }else if( ctx.message.text =="re-recored" || ctx.message.text =="continue" || ctx.message.text =="next"){  
      
      return ctx.wizard.steps[1](ctx)
      // return ctx.wizard.selectStep(1)  

     }else if(ctx.message.text =="cancle"){
      
      return ctx.wizard.steps[5](ctx)  
          
     }
     else{
       return
     }
})
exports.sendVoice = Telegraf.hears('send', async ctx =>{
      ctx.session.counter--;
      ctx.telegram.getFileLink(ctx.session.message).then((url) => {
        var file = fs.createWriteStream(`lib/voices/${ctx.session.message}.wav`);
        https.get(url.href, function(response) {
          response.pipe(file);
            });
        }).then(()=>{
            console.log("Done")
          })
      ctx.reply(`${5-ctx.session.counter} down ${ctx.session.counter} to go.`,next_cancle)
        
      return ctx.wizard.selectStep(6)
}) 

exports.re_recordVoice = Telegraf.hears('re-recored', async ctx =>{
  console.log("from re-recoredVoice")
  return ctx.wizard.selectStep(1)
})

exports.startDonateHandler =  ctx =>{  
  console.log(`start donating, counter${ctx.session.counter}`)

  if(ctx.session.counter>0){
        ctx.reply(`This is the ${ctx.session.counter} sentence`,remove_keyboard)
        return ctx.wizard.selectStep(2)
  }else{
    ctx.reply("Thanks For Your Time",remove_keyboard)
    return ctx.wizard.selectStep(5)
    }  
 }

 exports.counter = ctx =>{
  ctx.session.counter=5;
  console.log(`start Donate counter counter${ctx.session.counter}`)
  ctx.reply('There will be Five simple sentences,\n Please read them in a quite place with clear and loud voice',keyboard_continue_cancle)
  return ctx.wizard.selectStep(6)
}

// exports._Continues = Telegraf.action("continue", async ctx=>{
//   console.log("from continue")
//   return ctx.wizard.selectStep(1)
// }) 

// exports.Next = Telegraf.hears("next", async ctx=>{
//   return ctx.wizard.selectStep(1)
// }) 

// exports.Cancle = Telegraf.hears("cancle", async ctx=>{
//   return ctx.scene.leave()
// }) 

exports.finished = ctx =>{
  console.log("From Finished")
  ctx.reply("Thanks fory Time",keyboard)
  return ctx.scene.leave()
}

 
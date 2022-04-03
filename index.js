require('dotenv').config()
console.log(process.env)
console.log(process.env.BOT_TOKKEN0,process.env.BOT_TOKKEN1)
const { Telegraf , session, Scenes:{Stage, WizardScene} } = require('telegraf')
const {keyboard} = require('./utils/utils')
// console.log(process.env.BOTAPI+":"+process.env.BOTAPI_CHARARTER)
const bot = new Telegraf(process.env.BOT_TOKKEN0+":"+process.env.BOT_TOKKEN1)

const {finished,voiceHandler,re_recordVoice,sendVoice,counter,startDonateHandler,Decition }= require('./scene/DonateScene')
const DonateScene = new WizardScene('DonateVoice',counter,startDonateHandler,voiceHandler,sendVoice,re_recordVoice,finished,Decition)
const stage =  new Stage([DonateScene])
stage.hears('exit',ctx=>ctx.scene.leave())

bot.use(session(), stage.middleware())
bot.command('/start', ctx => 
ctx.reply("Wellcome To Amharic Data corps collecter",keyboard)
)

bot.hears('Donate',ctx=>ctx.scene.enter('DonateVoice'))
bot.hears('Verify',ctx=>
ctx.reply("This Feature is will be fuctional when enough amount of data is collected Please keep Donating your voice.",keyboard))
bot.hears('About Us',ctx=>{
  ctx.reply("My Name is Dawud Abdulkerim , Am From Ethiopia , There is almost no amharic data(audio) corpes, this project is to contribute to solve this issue.",keyboard)
})
bot.hears('Statistics',ctx=>{ctx.reply("None for now, In Futer it will be filled with Data",keyboard)})
bot.command('/info',ctx => ctx.scene.enter('infoScene'))
bot.launch()
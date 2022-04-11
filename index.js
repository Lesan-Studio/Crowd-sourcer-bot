require('dotenv').config();

const {
  Telegraf,
  session,
  Scenes: { Stage, WizardScene },
} = require('telegraf');

const { keyboard } = require('./utils/utils');

const bot = new Telegraf(process.env.BOT_TOKEN);

const {
  finished,
  voiceHandler,
  re_recordVoice,
  sendVoice,
  counter,
  startDonateHandler,
  Diction,
} = require('./scene/DonateScene');

const DonateScene = new WizardScene(
  'DonateVoice',
  counter,
  startDonateHandler,
  voiceHandler,
  sendVoice,
  re_recordVoice,
  finished,
  Diction
);

const stage = new Stage([DonateScene]);
stage.hears('exit', (ctx) => ctx.scene.leave());

bot.use(session(), stage.middleware());
bot.command('/start', (ctx) =>
  ctx.reply('Welcome To Lesan Amharic Data Corpus Sourcer', keyboard)
);

bot.hears('Donate', (ctx) => ctx.scene.enter('DonateVoice'));
bot.hears('Verify', (ctx) =>
  ctx.reply(
    'This feature will be functional when enough amount of data is collected. Please keep Donating your voice, Thank You!',
    keyboard
  )
);
bot.hears('About Us', (ctx) => {
  ctx.reply(
    "This is a project built on top of Dawud's data collection bot, to ease the process of data collection for Lesan.Studio project",
    keyboard
  );
});
bot.hears('Statistics', (ctx) => {
  ctx.reply(
    'As the project progresses, current stats will start to show up here. Hang tight :)',
    keyboard
  );
});
bot.command('/info', (ctx) => ctx.scene.enter('infoScene'));
bot.launch();

bot.catch((err) => {
  console.log('Ooops', err);
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

const { Telegraf, Markup } = require('telegraf');
const cloudinary = require('cloudinary').v2;

const {
  keyboard,
  recording_keyboard,
  next_cancel,
  keyboard_continue_cancel,
} = require('../utils/utils');

const fs = require('fs');
var https = require('https');

// TODO:  Fill out with Cloudinary config
cloudinary.config({
  cloud_name: 'sample',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

const remove_keyboard = Markup.removeKeyboard();

exports.voiceHandler = Telegraf.on('voice', async (ctx) => {
  ctx.session.message = ctx.message.voice.file_id;
  await ctx.reply('Do you confirm want to send this audio', recording_keyboard);

  return ctx.wizard.selectStep(6);
});

exports.Diction = Telegraf.on('text', async (ctx) => {
  if (ctx.message.text == 'send') {
    ctx.wizard.next();
    return ctx.wizard.steps[3](ctx);
  } else if (
    ctx.message.text == 're-record' ||
    ctx.message.text == 'continue' ||
    ctx.message.text == 'next'
  ) {
    return ctx.wizard.steps[1](ctx);
    // return ctx.wizard.selectStep(1)
  } else if (ctx.message.text == 'cancel') {
    return ctx.wizard.steps[5](ctx);
  } else {
    return;
  }
});

exports.sendVoice = Telegraf.hears('send', async (ctx) => {
  ctx.session.counter--;
  ctx.telegram
    .getFileLink(ctx.session.message)
    .then((url) => {
      var file = fs.createWriteStream(`lib/voices/${ctx.session.message}.wav`);
      https.get(url.href, function (response) {
        response.pipe(file);
      });

      cloudinary.uploader.upload(file, function (error, result) {
        if (error) {
          console.log(error);
        }
        console.log(result);
        ctx.telegram.sendVoice(ctx.chat.id, result.url);
      });
    })
    .then(() => {
      console.log('Done');
    });
  ctx.reply(
    `${5 - ctx.session.counter} down ${ctx.session.counter} to go.`,
    next_cancel
  );

  return ctx.wizard.selectStep(6);
});

exports.re_recordVoice = Telegraf.hears('re-record', async (ctx) => {
  console.log('from re-recordVoice');
  return ctx.wizard.selectStep(1);
});

exports.startDonateHandler = (ctx) => {
  console.log(`start donating, counter${ctx.session.counter}`);

  if (ctx.session.counter > 0) {
    // TODO: FIX UP MESSAGES FROM A TEXT STORAGE
    ctx.reply(`This is the ${ctx.session.counter} sentence`, remove_keyboard);
    return ctx.wizard.selectStep(2);
  } else {
    ctx.reply('Thanks For Your Time', remove_keyboard);
    return ctx.wizard.selectStep(5);
  }
};

exports.counter = (ctx) => {
  ctx.session.counter = 5;
  console.log(`start Donate counter counter${ctx.session.counter}`);
  ctx.reply(
    'There will be Five simple sentences,\n Please read them in a quite place with clear and loud voice',
    keyboard_continue_cancel
  );
  return ctx.wizard.selectStep(6);
};

exports.finished = (ctx) => {
  console.log('From Finished');
  ctx.reply('Thanks fory Time', keyboard);
  return ctx.scene.leave();
};

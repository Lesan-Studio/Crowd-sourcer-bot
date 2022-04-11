const { Markup } = require('telegraf');

exports.keyboard = Markup.keyboard([
  ['Donate', 'Verify'],
  ['Statistics', 'About Us'],
])
  .oneTime()
  .resize();

exports.keyboard_continue_cancel = Markup.keyboard([['continue', 'cancel']])
  .oneTime()
  .resize();

exports.recording_keyboard = Markup.keyboard([['send', 're-record']])
  .oneTime()
  .resize();

exports.next_cancel = Markup.keyboard([['next', 'cancel']])
  .oneTime()
  .resize();

const { Markup } = require('telegraf')

exports.keyboard = Markup.keyboard([
    ['Donate', 'Verify'], 
    ['Statistics', 'About Us'],
  ])
  .oneTime()
  .resize()

exports.keyboard_continue_cancle = Markup.keyboard([
  ['continue', 'cancle'],
])
.oneTime()
.resize() 
    
exports.recording_keybored = Markup.keyboard([
      ['send', 're-recored'],
    ])
    .oneTime()
    .resize()

exports.next_cancle= Markup.keyboard([
      ['next', 'cancle'],
    ])
    .oneTime()
    .resize()     
  
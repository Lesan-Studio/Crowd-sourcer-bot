# Lesan crowd sourcer bot

[@LesanEarBot](https://t.me/LesanEarBot)

A Telegram Bot that allows for crowd sourced Amharic Speech and Text Data Collection and validation.

```
- Head over to the deployed bot to become a contributor
- Decide if you want to contribute as a reader or validate read speech by other donors
- Read out or Verify 5 audio data's if it the read speech is in line with the text displayed
- We track the number of contribution, so you might be the lucky winner to get the weekly raffle winner of a prize
```


### Disclaimer and reasons 

- The audio files for current state are sampled at 16 kHz sampling rate; 16 kHz sampling is high enough for ASR purposes but too low to achieve high quality TTS.
- Modern production quality TTS systems often use 24, 32, 44.1, or 48 kHz sampling rate. (ref. from librittis paper)

- lesan-bot allows to crowd source information via Telegram as its default sampling rate is 48 kHz on Telegram for iPhone (as well as Telegram Desktop) for voice messages. The same is true to most android device implementations.

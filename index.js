import TelegramApi from 'node-telegram-bot-api';
import fs from 'fs';
import {getVideo, fileName, pathToDownload} from './server.js';


const token = '5504865607:AAFPjynVIjjjJzcqS1_vrKmynpsd4sgj818';

const bot = new TelegramApi(token, {polling: true});

bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;
    const expression = /www.yapfiles.ru/;
    var regex = new RegExp(expression);
    if (text === '/start') {
      bot.sendMessage(chatId, 'Give me Yaplakal link' );
    } else if (text.match(regex)){
        await getVideo(text);
        bot.sendMessage(chatId, 'Loading...');
        await bot.sendVideo(chatId, fileName);
        fs.unlink(pathToDownload, err => {
          if (err) console.log(err);
        })
    } else bot.sendMessage(chatId, 'Nope!' );
});
 

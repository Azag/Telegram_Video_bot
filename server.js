import fetch from 'node-fetch'
import cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'
let fileName = '';
let pathToDownload ='';

const __dirname = path.resolve()

let getVideo = async (rawUrl) => {
    const response = await fetch(rawUrl)
    const data = await response.text()
    const $ = cheerio.load(data)
    const urlToDownload = $('#direct-link-field > div > input').attr('value') 
    const fileNameToDownload = urlToDownload.slice(urlToDownload.length-20 ,urlToDownload.length - 1) + '.mp4'
    pathToDownload = __dirname + '/' + fileNameToDownload
    fileName = './' + fileNameToDownload;
    await downloadFile(urlToDownload, pathToDownload)

}

const downloadFile = async (url, path) => {
    try {
        const res = await fetch(url);
        const fileStream = fs.createWriteStream(path);
        await new Promise((resolve, reject) => {
            res.body.pipe(fileStream);
            res.body.on("error", reject);
            fileStream.on("finish", resolve);
          });
    } catch(e) {
        console.log('Download error!')
        console.error(e)
    }
};


export {getVideo, fileName, pathToDownload}
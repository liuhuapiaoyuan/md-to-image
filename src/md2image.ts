import path from 'path';
import fs from 'fs';

// const downloadPath = path.resolve(__dirname, 'downloads');
// if (!fs.existsSync(downloadPath)) {
//     fs.mkdirSync(downloadPath);
// }

function randomString(length: number): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
function getRandomName(){
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const random = randomString(5);
    return `${year}-${month}-${day}-${hour}-${minute}-${second}-${random}.png`;
}

export async function md2image(md: string,targetDir:string) {
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir);
    }
    const url = `https://readpo.com/p/${encodeURIComponent(md)}`
    // 下载到本地
    const filename = getRandomName();
    const filepath = path.join(targetDir, filename);
    const resp = await fetch(url);
    if (!resp.ok) {
        throw new Error(`Failed to fetch ${url}`);
    }
    const buffer = await resp.arrayBuffer();
    fs.writeFileSync(filepath, new Uint8Array(buffer));
    return filepath
} 
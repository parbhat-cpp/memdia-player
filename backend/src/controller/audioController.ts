import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import path, { extname } from 'path';
import fs from 'node:fs';
import env from 'dotenv';

env.config();

export const getAudiosFromDefaultDirectory = (request: Request, response: Response) => {
    const os: string = request.params.os.toLowerCase() as string;
    let res: Array<object> = [];
    let audio_dir: string = '';

    if (os.includes('win')) {
        audio_dir = `C:/Users/${process.env.USERNAME}/Music`;
    } else if (os.includes('mac')) {
        audio_dir = `/Users/${process.env.USERNAME}/Music`;
    } else if (os.includes('linux')) {
        audio_dir = `/home/${process.env.USERNAME}/Music`;
    }

    try {
        fs.readdirSync(audio_dir).forEach((file: any) => {

            if (fs.lstatSync(path.join(audio_dir, file)).isFile() && (extname(file) === '.mp3' || extname(file) === '.wav' || extname(file) === '.aac')) {
                res.push(
                    {
                        type: extname(file),
                        name: file,
                        path: path.join(audio_dir, file)
                    }
                );
            }
            else {
                if (fs.lstatSync(path.join(audio_dir, file)).isDirectory()) {
                    res.push(
                        {
                            type: 'DIRECTORY',
                            name: file,
                            path: path.join(audio_dir, file)
                        }
                    );
                }
            }
        })
        response.status(StatusCodes.OK).json(res);
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`${error}`);
    }
};

export const getAudioFromDirectory = (request: Request, response: Response) => { };

export const playAudio = (request: Request, response: Response) => {
    try {
        const audio_dir: string = request.query.audio_dir as string;
        const range = request.headers.range;

        const videoSize = fs.statSync(audio_dir).size;
        const chunkSize = 1 * 1e6;
        const start = Number(range?.replace(/\D/g, ""))
        const end = Math.min(start + chunkSize, videoSize - 1)
        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "audio/mpeg"
        };
        response.writeHead(206, headers)
        const stream = fs.createReadStream(audio_dir, {
            start,
            end
        })
        stream.pipe(response);
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`${error}`);
    }
};
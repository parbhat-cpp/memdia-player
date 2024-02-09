import { Request, Response } from 'express';
import {
    StatusCodes,
} from 'http-status-codes';
import fs from 'node:fs';
import env from 'dotenv';
import path, { extname } from 'node:path';

env.config();

export const getVideosFromDefaultDirectory = async (request: Request, response: Response) => {
    const os: string = request.params.os.toLowerCase() as string;
    let res: Array<object> = [];
    let video_dir: string = '';

    if (os.includes('win')) {
        video_dir = `C:/Users/${process.env.USERNAME}/Videos`;
    } else if (os.includes('mac')) {
        video_dir = `/Users/${process.env.USERNAME}/Movies`;
    } else if (os.includes('linux')) {
        video_dir = `/home/${process.env.USERNAME}/Videos`;
    }

    try {
        fs.readdirSync(video_dir).forEach((file: any) => {
            
            if (fs.lstatSync(path.join(video_dir, file)).isFile() && (extname(file) === '.mp4' || extname(file) === '.webm' || extname(file) === '.mkv' || extname(file) === '.gif')) {
                res.push(
                    {
                        type: extname(file),
                        name: file,
                        path: path.join(video_dir, file)
                    }
                );
            }
            else {
                if (fs.lstatSync(path.join(video_dir, file)).isDirectory()) {
                    res.push(
                        {
                            type: 'DIRECTORY',
                            name: file,
                            path: path.join(video_dir, file)
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

export const getVideoFromDirectory = (request: Request, response: Response) => {
    const video_dir: string = request.body.video_dir;
    
    let res: Array<object> = [];

    try {
        fs.readdirSync(video_dir).forEach((file: any) => {
            if (fs.lstatSync(path.join(video_dir, file)).isFile() && (extname(file) === '.mp4' || extname(file) === '.webm' || extname(file) === '.mkv' || extname(file) === '.gif')) {
                res.push(
                    {
                        type: extname(file),
                        name: file,
                        path: path.join(video_dir, file)
                    }
                );
            }
            else {
                if (fs.lstatSync(path.join(video_dir, file)).isDirectory()) {
                    res.push(
                        {
                            type: 'DIRECTORY',
                            name: file,
                            path: path.join(video_dir, file)
                        }
                    );
                }
            }
        })
        response.status(StatusCodes.OK).json(res);
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`${error}`);
    }
}

export const playVideo = async (request: Request, response: Response) => {
    try {
        const video_dir: string = request.query.video_dir as string;
        const range = request.headers.range;

        const videoSize = fs.statSync(video_dir).size;
        const chunkSize = 1 * 1e6;
        const start = Number(range?.replace(/\D/g, ""))
        const end = Math.min(start + chunkSize, videoSize - 1)
        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4"
        };
        response.writeHead(206, headers)
        const stream = fs.createReadStream(video_dir, {
            start,
            end
        })
        stream.pipe(response);
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`${error}`);
    }
}
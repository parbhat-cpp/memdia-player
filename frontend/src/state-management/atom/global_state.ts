import { atom } from "jotai";
import { Media } from "../../classes/Media";

export const osAtom = atom('');
export const currentOptionAtom = atom('videos');
export const currentMediaFileAtom = atom(-1);
export const floatingAudioAtom = atom(false);
export const audiosAtom = atom(new Array<Media>);
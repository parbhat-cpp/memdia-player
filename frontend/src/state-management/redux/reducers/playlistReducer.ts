import { createSlice } from "@reduxjs/toolkit";
import { Media } from "../../../classes/Media";

type Playlist = {
    id: string;
    name: string;
    items: Array<Media>;
    itemCount: number;
}

export const playlistSlice = createSlice({
    name: 'playlist',
    initialState: Array<Playlist>,
    reducers: {
        createEmptyPlaylist: (state, action) => {
            state = [
                {
                    id: action.payload.id,
                    name: action.payload.name,
                    items: [],
                    itemCount: 0
                }
            ];
            return state;
        },
        addNewItemToPlaylist: (state, action) => {
            let temp = state;
            temp.forEach((element) => {
                if(element.id === action.payload.id) {
                    element.items.push(action.payload.newItem);
                    element.itemCount = element.itemCount + 1;
                    return;
                }
            })
            state = temp;
            return state;
        },
        createPlaylist: (state, action) => {
            state = [
                ...state,
                {
                    id: action.payload.id,
                    name: action.payload.name,
                    items: action.payload.items,
                    itemCount: action.payload.items.length
                }
            ];
            return state;
        },
    }
});

export const { addNewItemToPlaylist, createEmptyPlaylist, createPlaylist } = playlistSlice.actions;
export default playlistSlice.reducer;
import { Add, Close } from "@mui/icons-material"
import { NewPlaylist, PlaylistWrapper, TopBar, DialogStyle, DialogContainer, CreateButton, MusicList, MusicItem } from "./playlist.style"
import { useAppSelector, useAppDispatch } from "../../state-management/redux/hooks"
import { createEmptyPlaylist, createPlaylist, addNewItemToPlaylist } from "../../state-management/redux/reducers/playlistReducer";
import { Dialog, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { Media } from "../../classes/Media";
import { useAtom } from "jotai";
import { audiosAtom } from "../../state-management/atom/global_state";

const Playlist = () => {

  const playlist = useAppSelector(state => state.playlist);
  const dispatch = useAppDispatch();
  const [musicListItems] = useAtom(audiosAtom);

  const [openPlaylistDialog, setOpenPlaylistDialog] = useState(false);
  const [newPlaylistData, setNewPlaylistData] = useState({
    id: '',
    name: '',
    items: new Array<Media>,
  });

  const onPlaylistNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPlaylistData((st) => ({
      ...st,
      name: e.target.value
    }));
  }

  const onMediaAdded = (media: Media) => {
    let tempItems = newPlaylistData.items;
    tempItems.push(media);
    setNewPlaylistData((st) => ({
      ...st,
      items: tempItems
    }));
    console.log(newPlaylistData);
  }

  const createNewPlaylist = () => {

  }

  return (
    <PlaylistWrapper>
      {
        playlist && playlist.map((elm, i) => (
          <>

          </>
        ))
      }
      <NewPlaylist onClick={() => setOpenPlaylistDialog(true)}>
        <Add 
          style={{ height: 50, width: 50, margin: "auto", color: "#202020" }}
        />
      </NewPlaylist>
      <Dialog open={openPlaylistDialog} onClose={() => setOpenPlaylistDialog(!openPlaylistDialog)} PaperProps={{sx: DialogStyle}}>
        <TopBar>
          <IconButton onClick={() => setOpenPlaylistDialog(!openPlaylistDialog)}>
            <Close />
          </IconButton>
        </TopBar>
        <DialogContainer>
          <TextField id="standard-basic" label="Playlist Name" variant="standard" value={newPlaylistData.name} onChange={onPlaylistNameChange}/>
          <MusicList>
            {
              musicListItems?.map((music) => (
                <MusicItem onClick={() => onMediaAdded(music)}>
                  {music.name}
                </MusicItem>
              ))
            }
          </MusicList>
          <CreateButton>
            Create Playlist
          </CreateButton>
        </DialogContainer>
      </Dialog>
    </PlaylistWrapper>
  )
}

export default Playlist

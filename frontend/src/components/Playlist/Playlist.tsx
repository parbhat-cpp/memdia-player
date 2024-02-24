import { Add } from "@mui/icons-material"
import { NewPlaylist, PlaylistWrapper } from "./playlist.style"
import { useAppSelector, useAppDispatch } from "../../state-management/redux/hooks"
import { createEmptyPlaylist, createPlaylist, addNewItemToPlaylist } from "../../state-management/redux/reducers/playlistReducer";

const Playlist = () => {

  const playlist = useAppSelector(state => state.playlist);
  const dispatch = useAppDispatch();

  return (
    <PlaylistWrapper>
      {

      }
      <NewPlaylist>
        <Add 
          style={{ height: 50, width: 50, margin: "auto", color: "#202020" }}
        />
      </NewPlaylist>
    </PlaylistWrapper>
  )
}

export default Playlist

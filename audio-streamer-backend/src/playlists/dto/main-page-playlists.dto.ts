import { Album } from 'src/albums/schemas/albums.schema';
import { Playlist } from '../schemas/playlists.schema';

export class MainPagePlaylists {
    readonly playlistSetName: string;
    readonly playlists: (Playlist | (Album & { isAlbum: boolean }))[];
}

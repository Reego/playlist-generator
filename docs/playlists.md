Associated playlists are those that have an association to this program.


The playlists defined in playlistConfig.json will be matched against the
playlists retrieved from the API. Only those playlists fetched with
a matching name identifier to the ones contained in playlistConfig.json
will be used and modified by the program.


Songs will be filtered against a set of constraints defined in Playlist
objects. If a song is valid for the constraints, it will be added to the
playlist. Repeats are not detected by the program.
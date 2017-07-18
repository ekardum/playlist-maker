# playlist-maker
Generate youtube playlist from list of songs in text file

This app uses Node module 'Nightmare' to scrape youtube based on song names input in text file and get song url's from which it creates a youtube playlist that you can play or download with some playlist downloader.
Before starting you have to install Node with this modules : Nightmare, get-youtube-id, opn and fs
1. Put song names in songlist.txt (each song new row)

![Songlist](https://github.com/ekardum/playlist-maker/blob/master/screenshots/1.png?raw=true)

2. Open cmd (or node.js) navigate to app folder and type start.js

3. Wait for app to complete running through all songs(it will open the playlist in your browser at the end) - and also it will create a text file with links of all songs separately (links.txt)

# bingeplus_backend

> Node.js server for making semi decentralized peer to peer streamer

#### Build Setup

``` bash
# install dependencies
npm install

# serve app with hot reload
npm start

```

---

In this Backend part of BingepLus, routes are build to serve requests from our BingePlus(electron-nuxtjs app):

A)Videos route:
- To get a list of videos and their data.
 
B)One video route:
- A route to fetch only one video from our list of videos.
C)Streaming route:
- To stream the videos.
D)Captions route 
- To add captions to the videos we are streaming.

Apart from video list it will serve the regularly updated JSON containing 

a)IP and socket id map

b)Video Json data
-having list of active ip-address viewing the current show/movie.

---------------------------

Process flow:

Once the user connects to backend (makes a request) from bingeplus App(frontend electron-nuxtjs app):
-A Socket connection is made ,also updating the map with ip and socket id

If a user selects a movie/show:
-It will get a list of active ip-addresses viewing same show.

If no active users are there server will serve by making data chunks and sending it,viewd in desktop app

If active users is there,Desktop app will fetch data from other active users viewing same show/movie.
-combinning data from multiple active users and viewing

When the user shuts the app or closes the show,
-the map gets updated with ip and socket id
-the active user list of particular movie changes.

# Binge+_backend

> Binge+ is a semi-decentralized torrent like streaming network which uses Pravega streams as it's streaming engine. It distributes server load by using peer2peer streaming and provides better latencies by using peers that exist closeby and act as source for stream data.
It makes use of Pravega segments and in order guarantee to make sure the data received is correct and in an event of disconnection from peer streaming can resume from other peer or server from the point where streaming stopped.

## Solution Overview
The solution in this repo allows testing the Pravega multi-client streaming where each client has their own standalone Pravega instance hosted. In this project,we demonstrate stream daisy-chaining so that P2P streaming connections can be forged and demonstrated.

## Build Setup

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

##Process flow:

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


## Other Links

Binge Plus Electron UI: 
https://github.com/underthehooditsme/Bingeplus

BingePlus-Streaming-Backend-Wrapper:
https://github.com/coolpulkit99/BingePlus-Streaming-Backend-Wrapper

# free-jam

possible names:
- Riffelation
- Jukebox Jam
- Rifforia


# Data models

```json
// Album
{
  "title": "string",
  "artist": "string",
  "imageUrl": "string",
  "releaseDate": "2023-10-12T12:42:33.478Z",
  "songs": [
    {
      "title": "string",
      "videoId": "string"
    }
  ]
}
```


https://chordify.net/pages/technology-algorithm-explained/
Data set

[
    {
        "title": "Adore",
        "artist": "The Smashing Pumpkins",
        "date": "",
        "coverImage": "adore.jpg",
        "songs": [
            "To Sheila",
            "Ava Adore",
            "Daphne Descends",
            "Tear",
            "Crestfallen"
        ]
    },
    {
        "title": "Bleach",
        "artist": "Nirvana",
        "date": "",
        "coverImage": "bleach.jpg",
        "songs": [
            "Blew",
            "Floyd the Barber",
            "About a Girl",
            "School",
            "Love Buzz"
        ]
    },
    {
        "title": "OK Computer",
        "artist": "Radiohead",
        "date": "",
        "coverImage": "ok-computer.jpg",
        "songs": [
            "Airbag",
            "Paranoid Android",
            "Subterranean Homesick Alien",
            "Exit Music (For a Film)",
            "Let Down"
        ]
    },
    {
        "title": "Doolittle",
        "artist": "Pixies",
        "date": "",
        "coverImage": "doolittle.jpg",
        "songs": [
            "Debaser",
            "Tame",
            "Wave of Mutilation",
            "Here Comes Your Man",
            "Dead"
        ]
    },
    {
        "title": "Together Through Time",
        "artist": "TWRP",
        "date": "",
        "coverImage": "together-through-time.jpg",
        "songs": [
            "Synthesize Her",
            "Phantom Racer",
            "Atomic Karate",
            "Believe in Your Dreams",
            "Life Party"
        ]
    },
    {
        "title": "In Rainbows",
        "artist": "Radiohead",
        "date": "",
        "coverImage": "in-rainbows.png",
        "songs": [
            "15 Step",
            "Bodysnatchers",
            "Nude",
            "Weird Fishes/Arpeggi",
            "All I Need"
        ]
    },
    {
        "title": "Mellon Collie and the Infinite Sadness",
        "artist": "The Smashing Pumpkins",
        "date": "",
        "coverImage": "mellon-collie.jpg",
        "songs": [
            "Mellon Collie and the Infinite Sadness",
            "Tonight, Tonight",
            "Jellybelly",
            "Zero",
            "Bullet with Butterfly Wings"
        ]
    },
    {
        "title": "The Colour and the Shape",
        "artist": "Foo Fighters",
        "date": "",
        "coverImage": "colour-and-shape.jpg",
        "songs": [
            "Doll",
            "Monkey Wrench",
            "Hey, Johnny Park!",
            "My Poor Brain",
            "Wind Up"
        ]
    }
]



{
  "id": 0,
  "song": {
    "title": "string",
    "artist": "string",
    "videoId": "string"
  },
  "changes": [
    {
      "chordIndex": 0,
      "atMilliseconds": 0,
      "duration": 0
    }
  ],
  "chords": [
    
  ],
}
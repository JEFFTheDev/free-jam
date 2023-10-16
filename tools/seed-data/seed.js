console.log('Start data seed');

const fs = require('fs');
const Minio = require('minio');

const backendBaseUrl = "http://localhost:5074";
const bucket = "bucket";
const bucketUsername = "root";
const bucketPassword = "password";

const minioClient = new Minio.Client({
  endPoint: bucket,
  port: 9000, // Default MinIO port
  useSSL: false,
  accessKey: bucketUsername,
  secretKey: bucketPassword,
});

// TODO: First check if there is any data in the database. If so, it is likely not necesary to add the test set
// let albums = getAlbums();
// if (albums.length > 0) {
//   console.log("Albums found, not adding test set");
//   return;
// }

// Add all the chords
fs.readFile('./chords/chords.json', (err, data) => {
  if (err) {
    console.error('Error reading the JSON file:', err);
    return;
  }

  try {
    const jsonObject = JSON.parse(data);
    jsonObject.chords.forEach((item) => {
      console.log(`Adding Chord: ${item}`);

      postChord(item);
    });
  } catch (parseError) {
    console.error('Error parsing JSON:', parseError);
  }
})


fs.readFile('data.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the JSON file:', err);
    return;
  }

  try {
    const jsonObject = JSON.parse(data);

    // Upload all albums that were included in the data set
    jsonObject.albums.forEach((item) => {
      console.log(`Adding Album: ${item.title}`);

      // Upload the file to S3 bucket
      uploadFile(item.imageUrl);

      // Post the album to the API
      postAlbum({
        title: item.title,
        artist: item.artist,
        songs: item.songs,
        releaseDate: item.releaseDate,
        imageUrl: item.imageUrl.replace(/\.\w+$/, '')
      })

    });

    // Upload all song profiles that were included in the data set
    jsonObject.songProfiles.forEach((item) => {
      postSongProfile(item);
    });
  } catch (parseError) {
    console.error('Error parsing JSON:', parseError);
  }
});

function postSongProfile(songProfile) {
  const url = `${backendBaseUrl}/songprofile`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(songProfile),
  };

  console.log('Posting SongProfile: ' + JSON.stringify(songProfile));
  fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((responseData) => {
      console.log('POST request successful. Response data:', responseData);
    })
    .catch((error) => {
      console.error('Error:', error.message);
    });
}

function getAlbums() {
  const url = `${backendBaseUrl}/album`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }
  console.log('Retrieving Albums');
  fetch(url, requestOptions).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  }).then((responseData) => {
    console.log('GET request succesful. Response data:', responseData);
    return responseData;
  }).catch((error) => {
    console.log('Error:', error.message);
  });
}

function postChord(chord) {
  const url = `${backendBaseUrl}/chord`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(chord),
  };
  console.log('Posting Chord: ' + JSON.stringify(chord));
  fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((responseData) => {
      console.log('POST request successful. Response data:', responseData);
    })
    .catch((error) => {
      console.error('Error:', error.message);
    });
}

function postAlbum(album) {
  const url = `${backendBaseUrl}/album`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(album),
  };

  console.log('Posting Album: ' + JSON.stringify(album));
  fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((responseData) => {
      console.log('POST request successful. Response data:', responseData);
    })
    .catch((error) => {
      console.error('Error:', error.message);
    });
}

function uploadFile(fileName) {
  const bucketName = 'album-covers';
  const baseFilePath = './album-covers/';
  console.log('Uploading Album Cover: ' + fileName)
  minioClient.fPutObject(bucketName, fileName.replace(/\.\w+$/, ''), baseFilePath + fileName, (err, etag) => {
    if (err) {
      console.error('Error uploading file:', err);
    } else {
      console.log('File uploaded successfully. ETag:', etag);
    }
  });
}
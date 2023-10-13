console.log('Start data seed');

const fs = require('fs');
const Minio = require('minio');

const minioClient = new Minio.Client({
  endPoint: 'bucket',
  port: 9000, // Default MinIO port
  useSSL: false, // Set to true if using HTTPS
  accessKey: 'root',
  secretKey: 'password',
});

fs.readFile('data.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the JSON file:', err);
    return;
  }

  try {
    const jsonObject = JSON.parse(data);

    // Upload all albums that were included in the data set
    console.log(jsonObject.albums);
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
  const url = 'http://backend:5074/songprofile';
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

function postAlbum(album) {
  const url = 'http://localhost:5074/album';
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
console.log('start data seed');

const fs = require('fs');
// const fetch = require('node-fetch');
const Minio = require('minio');

const minioClient = new Minio.Client({
  endPoint: 'localhost',
  port: 9000, // Default MinIO port
  useSSL: false, // Set to true if using HTTPS
  accessKey: 'RQxhKTStRaXrnAK3ofHh',
  secretKey: 'rBNJ3aG7dhBefcwSEE6mSt76AxQu1P6rUHaSAyq5',
});

fs.readFile('data.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the JSON file:', err);
    return;
  }

  try {
    const jsonObject = JSON.parse(data);
    jsonObject.forEach((item) => {
      console.log(`Adding Album: ${item.title}`);

      // Upload the file to S3 bucket
      uploadFile(item.coverImage);


      // Post the album to the API
      postAlbum({
        title: item.title,
        artist: item.artist,
        imageUrl: item.coverImage.replace(/\.\w+$/, '')
      })

    });
  } catch (parseError) {
    console.error('Error parsing JSON:', parseError);
  }
});

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
const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.REGION });
const s3 = new AWS.S3();

const uploadBucket = 'pdfstorageproject';

exports.handler = async (event) => {
  const result = await getUploadURL();
  console.log('Result: ', result);
  return result;
};

const getUploadURL = async function () {
  console.log('getUploadURL started');
  let actionId = Date.now();

  var s3Params = {
    Bucket: uploadBucket,
    Key: `${actionId}.pdf`,
    ContentType: 'application/pdf',
  };

  return new Promise((resolve, reject) => {
    // Get signed URL
    let uploadURL = s3.getSignedUrl('putObject', s3Params);
    resolve({
      "statusCode": 200,
      "isBase64Encoded": false,
      "headers": {
        "Access-Control-Allow-Origin": "*"
      },
      "body": JSON.stringify({
        "uploadURL": uploadURL,
        "pdfFilename": `${actionId}.pdf` 
      })
    });
  });
};

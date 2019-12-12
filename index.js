const AWS = require('aws-sdk');

const meta = new AWS.MetadataService();

const metadata = (endpoint) => {
  return new Promise((resolve, reject) => {
    meta.request(endpoint, {method: 'get'}, function(err, data) {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  })
}

(async () => {
  const region = JSON.parse(await metadata('/latest/dynamic/instance-identity/document')).region;
  const instanceId = await metadata('/latest/meta-data/instance-id');

  console.log(`Updating ${instanceId} in ${region}`)
  const ec2 = new AWS.EC2({apiVersion: '2016-11-15', region: region});
  await ec2.modifyInstanceMetadataOptions({
    InstanceId: instanceId,
    HttpEndpoint: 'enabled',
    HttpPutResponseHopLimit: 2
  }).promise();
})()

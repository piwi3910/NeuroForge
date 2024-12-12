const { exec } = require('child_process');
const path = require('path');

const inputSpec = path.join(__dirname, 'src/openapi/openapi.yaml');
const outputDir = path.join(__dirname, 'src/generated');

const command = `openapi-generator-cli generate \
  -i ${inputSpec} \
  -g typescript-node \
  -o ${outputDir} \
  --additional-properties=supportsES6=true,npmName=@neuroforge/api-types`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});

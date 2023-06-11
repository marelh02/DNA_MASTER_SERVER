const fs = require('fs');
const http = require('http');
const os = require('os');

function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    const interfacesList = interfaces[interfaceName];
    for (const interfaceInfo of interfacesList) {
      if (interfaceInfo.family === 'IPv4' && !interfaceInfo.internal) {
        return interfaceInfo.address;
      }
    }
  }
  return null;
}

function pingServer(server, position, runningServers, failingServers) {
  const options = {
    hostname: server.ip,
    port: server.port,
    timeout: 2000, // 2 seconds
  };

  const req = http.request(options, (res) => {
    if (res.statusCode === 200) {
      server.position = position;
      server.runnig=true
      runningServers.push(server);
    }
  });

  req.on('error', (err) => {
    console.error(`Error pinging server ${server.name}`, err);        
  });

  req.on('timeout', () => {
    req.abort();
    server.runnig=false
        failingServers.push(server)        
  });

  req.end();
}

function readServersFromFile(filePath) {
  const content = fs.readFileSync(filePath);
  const servers = JSON.parse(content);

  const runningServers = [];
  const failingServers = [];

  servers.forEach((server, index) => {
    pingServer(server, index + 1, runningServers, failingServers);
  });

  return { runningServers, failingServers };
}

module.exports = {
    getLocalIpAddress,
    readServersFromFile
  };
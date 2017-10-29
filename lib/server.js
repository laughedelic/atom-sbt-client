const path = require('path');
const url = require('url');
const fs = require('fs');
const net = require('net');

let stdin = process.stdin;
let stdout = process.stdout;

let socket = new net.Socket()
  .on('data', chunk => {
    stdout.write(chunk);
  })
  .on('end', () => {
    stdin.pause();
  });

socket.connect(discoverUrl().port, '127.0.0.1');
stdin.resume();
stdin.on('data', chunk => {
  socket.write(chunk);
});
stdin.on('end', () => {
  socket.end();
});

function discoverUrl () {
  let portfile = JSON.parse(
    fs.readFileSync('/Users/laughedelic/dev/laughedelic/scala-adder/project/target/active.json')
  );
  return url.parse(portfile.uri);
}

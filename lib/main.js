const {AutoLanguageClient} = require('atom-languageclient');
const path = require('path');
const url = require('url');
const cp = require('child_process');
const fs = require('fs');
const net = require('net');

class ScalaLanguageClient extends AutoLanguageClient {
  getGrammarScopes () { return [ 'source.scala' ] }
  getLanguageName () { return 'Scala' }
  getServerName () { return 'sbt' }

  startServerProcess(projectPath) {
    let uri = url.parse(this.getTokenJson(projectPath).uri);
    this.socket = new net.Socket().connect(uri.port, uri.hostname);

    // FIXME: what should it return if it doesn't need any child process? (we launch server manually at the moment)
    return Promise.resolve(this.spawnChildNode([]));
  }

  // Overriding default method to add token to the init params
  getInitializeParams(projectPath, process) {
    return {
      initializationOptions: {
        token: this.getTokenJson(projectPath).token
      }
    };
  }

  // Reads the portfile, then token file, returns JSON content of the token file
  getTokenJson(projectPath) {
    let portFile = path.join(projectPath, 'project', 'target', 'active.json');
    let portJson = JSON.parse(fs.readFileSync(portFile));
    let tokenFile = portJson.tokenfilePath;
    let tokenJson = JSON.parse(fs.readFileSync(tokenFile));
    return tokenJson;
  }

  postInitialization(server) {
    // This is a workaround, which changes initialization response so that Atom will start sending didSave/didOpen/didClose notifications
    server.capabilities.textDocumentSync = 1;

    // TODO: query `sources` setting and then watch setup change watcher filter for them
  }

  // TODO: this should restrict change notifications to the scala sources only
  // Currently we just turn off these notifications, because sbt doesn't
  // recognize them anyway
  filterChangeWatchedFiles(filePath) { return false; }
}

module.exports = new ScalaLanguageClient()

const {AutoLanguageClient} = require('atom-languageclient');
const packageDeps = require('atom-package-deps');
const path = require('path');
const fs = require('fs');

class ScalaLanguageClient extends AutoLanguageClient {
  getGrammarScopes () { return [ 'source.scala' ] }
  getLanguageName () { return 'Scala' }
  getServerName () { return 'sbt' }

  activate() {
    packageDeps.install("atom-sbt-client", false);
    super.activate();
  }

  startServerProcess(projectPath) {
    const serverPath = path.join(__dirname, 'server.js');
    const serverProcess = this.spawnChildNode([serverPath], {
      cwd: projectPath
    });
    this.captureServerErrors(serverProcess);
    return serverProcess;
  }

  // Overriding default method to add token to the init params
  getInitializeParams(projectPath, process) {
    let portFile = path.join(projectPath, 'project', 'target', 'active.json');
    let portJson = JSON.parse(fs.readFileSync(portFile));
    if (portJson.hasOwnProperty('tokenfilePath')) {
      let tokenFile = portJson.tokenfilePath;
      let tokenJson = JSON.parse(fs.readFileSync(tokenFile));
      return {
        initializationOptions: {
          token: tokenJson.token
        }
      };
    } else {
      return {};
    }
  }

  postInitialization(server) {
    // This changes initialization response so that Atom will start sending `didSave` notifications
    server.capabilities.textDocumentSync.change = 2; // TextDocumentSyncKind.Incremental
  }

  filterChangeWatchedFiles(filePath) { return false; }

  preInitialization(connection) {
    connection.onLogMessage(params => {
      if (params.type === 4 && params.message === 'Done') {
        this.updateBusyMessage();
      } else {
        const init = (params.type === 4 && params.message === 'Processing');
        this.updateBusyMessage(params.message, init);
      }
    });
  }

  consumeBusySignal(busySignal) {
    this.busySignal = busySignal;
  }

  busyMessageFormat(text) {
    return `${this.getServerName()}: ${text}`;
  }

  updateBusyMessage(text = '', init = false, reveal = false) {
    if (this.busyMessage != null) {
      if (text === '') {
        this.busyMessage.dispose();
        this.busyMessage = null;
      } else {
        this.busyMessage.setTitle(
          this.busyMessageFormat(text),
          { revealTooltip: reveal }
        );
      }
    } else if (init) {
      this.busyMessage = this.busySignal.reportBusy(
        this.busyMessageFormat(text),
        { revealTooltip: reveal }
      );
    }
  }
}

module.exports = new ScalaLanguageClient()

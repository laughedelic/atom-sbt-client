const {AutoLanguageClient} = require('atom-languageclient');
const path = require('path');
const url = require('url');
const cp = require('child_process');
const fs = require('fs');

class ScalaLanguageClient extends AutoLanguageClient {
  getGrammarScopes () { return [ 'source.scala' ] }
  getLanguageName () { return 'Scala' }
  getServerName () { return 'sbt' }

  startServerProcess (projectPath) {
    const childProcess = cp.spawn('node', [require.resolve('./server')]);
    // const childProcess = cp.fork(require.resolve('./server'));

    // Debug:
    childProcess.on('error', err => {
      console.log('ERROR: ' + err)
    });
    childProcess.stdout.on('data', data => {
      console.log('DATA: ' + data)
    });

    return Promise.resolve(childProcess);
  }

  // Overriding default method to add token to the init params
  getInitializeParams(projectPath, process) {
    return {
      initializationOptions: {
        token: this.discoverToken()
      }
    };
  }

  discoverToken () {
    // let pf = path.join(process.cwd(), 'project', 'target', 'active.json');
    // let portfile = JSON.parse(fs.readFileSync(pf));
    let portfile = JSON.parse(fs.readFileSync('/Users/laughedelic/dev/laughedelic/scala-adder/project/target/active.json'));
    let tf = portfile.tokenfilePath;
    let tokenfile = JSON.parse(fs.readFileSync(tf));
    return tokenfile.token;
  }
}

module.exports = new ScalaLanguageClient()

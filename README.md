# atom-sbt-client

This is an Atom plugin integrating [sbt server](http://www.scala-sbt.org/1.x-beta/docs/sbt-server.html) with the [Atom IDE](https://ide.atom.io) interface.

It connects to a running sbt instance and communicates with it using [Language Server Protocol](https://github.com/Microsoft/language-server-protocol). Atom sends event notifications to sbt (like `didSave`), in response sbt recompiles the project and sends back information about warnings and errors which are displayed in Atom:

<img width="350" src="https://user-images.githubusercontent.com/766656/32253926-f3c76a6c-be9d-11e7-98c6-97c3af985520.png">

## Notes

* **This project is in a very early stage.** So you shouldn't try to install it yet unless you want to work on it. Just look at picture above for now.
* sbt server for every project has to be started manually
* You have to use beta version of sbt, because the latest stable doesn't provide server features, so run sbt like this:
    ```
    sbt -sbt-version 1.1.0-M1
    ```

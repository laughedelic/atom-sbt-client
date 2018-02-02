# Atom sbt client

[![](https://img.shields.io/github/release/laughedelic/atom-sbt-client/all.svg)](https://github.com/laughedelic/atom-sbt-client/releases/latest)
[![](https://img.shields.io/badge/license-MPL--2.0-blue.svg)](https://www.tldrlegal.com/l/mpl-2.0)
[![](https://img.shields.io/badge/contact-gitter_chat-dd1054.svg)](https://gitter.im/laughedelic/atom-sbt-client)

This is an Atom plugin integrating [sbt server](http://www.scala-sbt.org/1.x-beta/docs/sbt-server.html) with the [Atom IDE](https://ide.atom.io) interface.

It connects to a running sbt instance and communicates with it using [Language Server Protocol](https://github.com/Microsoft/language-server-protocol). Atom sends event notifications to sbt (like `didSave`), in response sbt recompiles the project and sends back information about warnings and errors which are displayed in Atom:

<img src="https://user-images.githubusercontent.com/766656/32409435-015c59b0-c1ac-11e7-9de7-c3c45ae5e44e.png">

## Notes

* **This project is in a very early stage.** You can install it just out of curiosity or if you want to work on it, but it's not ready for daily usage yet.
* You have to use _beta version_ of sbt, because the latest stable doesn't provide server features and you have to start it _for every project manually_.

## Installation

You will also need the Atom IDE UI plugin. You can install both with
```
apm install atom-ide-ui atom-sbt-client
```

## Usage

1. Go to a project and launch sbt:
    ```
    sbt -sbt-version 1.1.0-M1
    ```
2. Open this project in Atom, open any Scala file and save it.

It should trigger compilation and if there are any errors, you should see them in the gutter and in the diagnostics panel.

Note that despite the debug logging in the sbt shell, you can still use it directly. It's just a normal sbt shell which additionally communicates with Atom.

# Atom sbt client

[![](https://img.shields.io/github/release/laughedelic/atom-sbt-client/all.svg)](https://github.com/laughedelic/atom-sbt-client/releases/latest)
[![](https://img.shields.io/badge/license-MPL--2.0-blue.svg)](https://www.tldrlegal.com/l/mpl-2.0)
[![](https://img.shields.io/badge/contact-gitter_chat-dd1054.svg)](https://gitter.im/laughedelic/atom-sbt-client)

This is an Atom plugin integrating [sbt server](https://developer.lightbend.com/blog/2017-11-30-sbt-1-1-0-RC1-sbt-server/#sbt-server) with the [Atom IDE](https://ide.atom.io) interface.

It connects to a running sbt instance and communicates with it using [Language Server Protocol](https://github.com/Microsoft/language-server-protocol). Atom sends event notifications to sbt (like `didSave`), in response sbt recompiles the project and sends back information about warnings and errors which are displayed in Atom:

<img src="https://user-images.githubusercontent.com/766656/32409435-015c59b0-c1ac-11e7-9de7-c3c45ae5e44e.png">

## Installation

You can install it using Atom interface or by running this command:

```
apm install atom-sbt-client
```

On the first launch it will automatically install its dependencies if needed:
+ [language-scala](https://github.com/atom-community/language-scala) for basic Scala syntax highlighting
+ [atom-ide-ui](https://github.com/facebook-atom/atom-ide-ui) for the Atom IDE interface


## Usage

1. Go to a Scala project and launch sbt (`project/build.properties` should set sbt version to 1.1.0 or higher)
2. Open this project in Atom, open any Scala file and save it.

It should trigger compilation and if there are any errors, you should see them in the gutter and in the diagnostics panel.

Another feature is jump-to-definition, which works for _some_ types in the project.

Note that despite the debug logging in the sbt shell, you can still use it directly. It's just a normal sbt shell which additionally communicates with Atom.

## Related links

* sbt server support in other editors:
    + [VS Code](https://developer.lightbend.com/blog/2017-11-30-sbt-1-1-0-RC1-sbt-server/#vs-code-extension)
    + [Sublime Text 3](http://eed3si9n.com/sbt-server-with-sublime-text3)
    + [Neovim](http://eed3si9n.com/sbt-server-with-neovim)
* [atom-ide-scala](https://github.com/laughedelic/atom-ide-scala) is a similar plugin integrating Atom IDE UI with the [metals](https://github.com/scalameta/metals) language server

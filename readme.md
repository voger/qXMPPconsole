# qXMPPconsole

qXMPPconsole is a browser based XMPP console. It is writen with the purpose to aid 
in learning the XMPP protocol. So far it is tested only over websockets and connecting
to localhost. Comments, issues, pull requests are welcome.

The application is a single static web page and looks like this

![looks_like_this](https://github.com/voger/qXMPPconsole/blob/master/screens/screenshot.png)

You can go to https://voger.github.io/qXMPPconsole/ and use it right away or you can clone this repo and use it
in your own computer.

## How to use the source

1. Clone this repo and cd into it.

2. Run
   ```console
    $ npm install 
   ```
    1. Optionally and not necessary at all, you may also run
        ```console
          $ npm run-script build
        ```

3. Run the source version
   ```console
    $ npx qx serve
   ```
   and navigate your browser to http://localhost:8080

4. You can also make a build version to deploy it somewhere
   ```
   $ npx deploy --out=dist --clean
   ```

   and move the generated `dist/` folder in your prefered location and serve it with your favorite web server.

##  packages used for this project

* [qooxdoo framework](https://qooxdoo.org/) 
* [xmpp.js](https://github.com/xmppjs/xmpp.js)
* [ace editor](https://ace.c9.io/)
* [xml-formatter](https://github.com/chrisbottin/xml-formatter)

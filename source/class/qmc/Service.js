/**
 * @ignore(Strophe.Connection)
 *
 */
qx.Class.define("qmc.Service", {
  type: "singleton",
  extend: qx.core.Object,

  events: {
    /**
     * Emmited whenever there is created a
     * new connection. Payload is a strophe
     * connection.
     */
    "newConnection": "qx.event.type.Data",

    /**
     * Emmited when new data is coming to the
     * connection. Payload is the received data.
     *
     */
    "rawInput": "qx.event.type.Data",

    /**
     * Emmited when new data is sent to the
     * connection. Payload is the sent data.
     *
     */
    "rawOutput": "qx.event.type.Data",

    /**
     * Emmited when new stanza is comming in.
     * Payload is the stanza.
     *
     */
    "xmlInput": "qx.event.type.Data",

    /**
     * Emmited when new stanza is sent out.
     * Payload is the stanza.
     *
     */
    "xmlOutput": "qx.event.type.Data",

    /**
     * Emmited when new a new log entry is available.
     * Payload is an object containing the log level both
     * in Strophe.LogLevel enum value and String, the message,
     * and a local timestamp.
     *
     */
    "log": "qx.event.type.Data"
  },

  members: {
    __connection: null,

    /**
     * Sends a built Srophe Stantza
     *
     */
    send(built_stanza, callback) {
      const conn = this.getConnection();
      conn.send(built_stanza, callback);
    },

    connect(jid, password, callback, context) {
      if (context) {
        callback.bind(context);
      }
      const conn = this.getConnection();
      conn.send(jid, password);
    },

    /**
     * Creates a new connection. Disconnects previous connection
     *
     * @param server {String} The address of the server
     */
    newConnection(server) {
      const oldConnection = this.__connection;
      const newConnection = (this.__connection = new Strophe.Connection(server));

      newConnection.xmlInput = this._xmlInput.bind(this);
      newConnection.xmlOutput = this._xmlOutput.bind(this);
      newConnection.rawInput = this._rawInput.bind(this);
      newConnection.rawOutput = this._rawOutput.bind(this);
      newConnection.log = this._log.bind(this);

      this.fireDataEvent("newConnection", newConnection, oldConnection);
      return newConnection;
    },

    _rawInput(data) {
      this.fireDataEvent("rawInput", data);
    },

    _rawOutput(data) {
      this.fireDataEvent("rawOutput", data);
    },

    _xmlInput(data) {
      this.fireDataEvent("xmlInput", data);
    },

    _xmlOutput(data) {
      this.fireDataEvent("xmlOutput", data);
    },

    _log(level, data) {
      const dataObj = {
        data: data,
        timestamp: qx.lang.normalize.Date.now(),
        level: level,
        levelString: Object.getKeyFromValue(Strophe.LogLevel, level)
      };

      this.fireDataEvent("log", dataObj);
    },

    /**
     * Returns the current connection
     *
     */
    getConnection() {
      return this.__connection;
    }
  }
});

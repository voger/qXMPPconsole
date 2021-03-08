/**
 * Service class.
 *
 */
qx.Class.define("qmc.service.Service", {
  type: "singleton",
  extend: qx.core.Object,

  events: {
    /**
     * Emmited when the client status changes.
     * Data is a string containing the status.
     */
    "status": "qx.event.type.Data",

    /**
     * Emmited when an error occurs.
     * Data is a string containing the error.
     */
    "error": "qx.event.type.Data",

    /**
     * Emmited when the connection is online.
     * Data is a string informing the server is
     * online.
     */
    "online": "qx.event.type.Data",

    /**
     * Emmited when the connection is offline.
     * Data is a string informing the server is
     * offline.
     */
    "offline": "qx.event.type.Data",

    /**
     * Emmited when the connection is reconnecting
     * after a diconnect.
     */
    "reconnecting": "qx.event.type.Event",

    /**
     * Emmited when the connection is reconnected
     * after a diconnect.
     */
    "reconnected": "qx.event.type.Event",

    /**
     * Emmited then a stanza is received.
     * Data is a string containing the stanza XML.
     */
    "received": "qx.event.type.Data",

    /**
     * Emmited then a stanza is beeing sent.
     * Data is a string containing the stanza XML.
     */
    "send": "qx.event.type.Data",

    /**
     * Emmited when there is a stanza sending error.
     * This event can be emmited after the connection
     * becomes online.
     */
    "sendingError": "qx.event.type.Data"
  },

  properties: {
    /**
     * @internal
     * The state class
     *
     */
    state: {
      nullable: false,
      deferredInit: true,
      apply: "_applyState",
      event: "changeState"
    }
  },

  construct() {
    this.base(arguments);
    this.initState(new qmc.service.DisconnectedState(this));
  },

  members: {
    __connection: null,

    connect(connectionParams) {
      this.getState().connect(connectionParams);
    },

    disconnect() {
      this.getState().disconnect();
    },

    send(stanza) {
      this.getState().send(stanza);
    },

    setConnection(connection) {
      this.__connection = connection;
    },

    getConnection() {
      return this.__connection;
    },

    xml(...args) {
      return window.XMPP.xml.apply(window.XMPP, args);
    },

    getDomain() {
      return this.getConnection().entity.options.domain ?? "";
    },

    async request(element) {
      return await this.getConnection().iqCaller.request(element);
    },

    _applyState(_val, old) {
      old && old.dispose();
    }
  }
});

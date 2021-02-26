/**
 *
 */
qx.Class.define("qmc.Service", {
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

  construct() {
    this.base(arguments);
    ({client: this.__client, xml: this.__xml, jid: this.__jid} = window.XMPP);
  },

  members: {
    __xmpp: null,
    __client: null,
    __jid: null,
    __xml: null,

    /**
     * Sends a built Srophe Stantza
     *
     */
    send(stanza) {
      this.__xmpp.send(stanza).catch((error) => this.fireDataEvent("sendingError", error));
    },

    connect(username, password, service, domain, resource) {
      this.__xmpp = this.__client({
        service: service,
        domain: domain,
        resource: resource,
        username: username,
        password: password
      });

      this.__addListeners(this.__xmpp);

      this.__xmpp.start().catch(console.error);
    },

    setConnection(connection) {
      this.__xmpp = connection;
    },

    /**
     * Returns the current connection
     *
     */
    getConnection() {
      return this.__xmpp;
    },

    __addListeners(client) {
      client.on("status", (status) => this.fireDataEvent("status", status));
      client.on("error", (error) => this.fireDataEvent("error", error));
      client.on("online", (address) => this.fireDataEvent("online", `online as ${address}.`));
      client.on("offline", () => this.fireDataEvent("offline", `Server is offline.`));
      client.on("reconnecting", () => this.fireEvent("reconnecting"));
      client.on("reconnected", () => this.fireEvent("reconnected"));

      client.on("element", (stanza) => this.fireDataEvent("received", stanza.toString()));
      client.on("send", (stanza) => this.fireDataEvent("send", stanza.toString()));
    }
  }
});

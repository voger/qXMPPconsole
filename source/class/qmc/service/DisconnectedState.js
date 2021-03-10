qx.Class.define("qmc.service.DisconnectedState", {
  extend: qmc.service.BaseState,

  members: {
    async connect(connectionParams) {
      const connection = window.XMPP.client(connectionParams);
      const client = this._client;
      try {
        this.__addListeners(connection, client);
        client.setConnection(connection);
        await connection.start();
        client.setState(new qmc.service.ConnectedState(client));
      } catch (err) {
        client.fireDataEvent("error", err);
        connection.stop();
      }
    },

    // `connection` is the xmppjs client.
    // `client` is the service object. The context.
    __addListeners(connection, client) {
      connection.on("status", (status) => client.fireDataEvent("status", status));
      connection.on("error", (error) => client.fireDataEvent("error", error));
      connection.on("online", (address) => client.fireDataEvent("online", `online as ${address}.`));
      connection.on("offline", () => client.fireDataEvent("offline", `Server is offline.`));
      connection.on("reconnecting", () => client.fireEvent("reconnecting"));
      connection.on("reconnected", () => client.fireEvent("reconnected"));
      connection.on("element", (stanza) => client.fireDataEvent("received", stanza.toString()));
      connection.on("send", (stanza) => client.fireDataEvent("send", stanza.toString()));
    }
  }
});

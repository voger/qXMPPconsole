qx.Class.define("qmc.service.DisconnectedState", {
  extend: qmc.service.BaseState,

  members: {
    connect(username, password, service, domain, resource) {
      const connection = window.XMPP.client({
        service: service,
        domain: domain,
        resource: resource,
        username: username,
        password: password
      });

      const client = this._client;

      this.__addListeners(connection, client);
      client.setConnection(connection);

      connection.start().catch(console.error);

      // We set the new state before the connections
      // becomes actualy `online` because xmppjs will
      // try to reconnect if something is wrong with
      // the connection. If we expect to become `online`
      // in order to set state connected it will never happen
      client.setState(new qmc.service.ConnectedState(client));
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

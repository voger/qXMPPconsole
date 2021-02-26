qx.Class.define("qmc.service.DisconnectedState", {
  extend: qmc.service.BaseState,

  construct(client) {
    this.base(arguments, client);
  },

  members: {
    connect(username, password, service, domain, resource) {
      debugger;
      const connection = window.XMPP.client({
        service: service,
        domain: domain,
        resource: resource,
        username: username,
        password: password
      });

      const client = this._client;

      connection.on("status", (status) => {
        client.setStatus(status);
        console.log("status: ", client.getStatus());
      });

      client.setConnection(connection);

      connection.start().catch(console.error);
    }
  }
});

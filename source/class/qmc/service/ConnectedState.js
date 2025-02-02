qx.Class.define("qmc.service.ConnectedState", {
  extend: qmc.service.BaseState,

  members: {
    disconnect() {
      const client = this._client;

      const connection = client.getConnection();

      // prettier-ignore
      connection.stop().then(() => {
          client.setState(new qmc.service.DisconnectedState(client));
        })
        .catch(this.error);
    },

    send(stanza) {
      const client = this._client;
      const connection = client.getConnection();

      connection.send(stanza).catch((error) => {
        client.fireDataEvent("sendingError", error);
      });
    }
  }
});

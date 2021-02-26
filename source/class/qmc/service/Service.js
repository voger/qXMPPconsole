/**
 * Service class.
 *
 */
qx.Class.define("qmc.service.Service", {
  type: "singleton",
  extend: qx.core.Object,

  properties: {
    status: {
      check: "String",
      nullable: false,
      init: "offline",
      event: "changeStatus"
    },

    /**
     * @internal
     * The state class
     *
     */
    state: {
      nullable: false,
      deferredInit: true
    }
  },

  construct() {
    this.base(arguments);
    this.initState(new qmc.service.DisconnectedState(this));
  },

  members: {
    __xmpp: null,
    __client: null,

    connect(username, password, service, domain, resource) {
      this.getState().connect(username, password, service, domain, resource);
    },

    getClient() {
      return this.__client;
    },

    setConnection(connection) {
      this.__xmpp = connection;
    },

    getConnection() {
      return this.__xmpp;
    }
  }
});

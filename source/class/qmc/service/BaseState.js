/**
 * Base state class to document and implement
 * default methods for derrived classes. Default
 * implementation methods do not do anything.
 * Subclasses must override the methods they need to use.
 * without calling the methd on the parent.
 */
qx.Class.define("qmc.service.BaseState", {
  extend: qx.core.Object,

  /**
   * Constructs a state. 
   * @param client {qmc.service.Service} is
   * the client class that serves as
   * interface to the other classes. Required.
   */
  construct(client) {
    this.base(arguments);

    this._client = client;
  },

  members: {
    _client: null,

    connect() {},
    disconnect() {},
    send() {}
  }
});

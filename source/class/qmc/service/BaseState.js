/**
 * Base state class to document and implement
 * default methods for derrived classes. Default
 * implementation just emmits a data event `notApplicable`.
 * Child classes must override the functions aplicable
 * without calling the methond on the parent.
 */
qx.Class.define("qmc.service.BaseState", {
  extend: qx.core.Object,
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

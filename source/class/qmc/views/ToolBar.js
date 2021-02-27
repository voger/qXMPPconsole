/**
 * A toolbar for connecting and disconnecting to the service
 *
 */
qx.Class.define("qmc.views.ToolBar", {
  extend: qx.ui.toolbar.ToolBar,

  construct() {
    this.base(arguments);

    const service = qmc.service.Service.getInstance();

    const part1 = new qx.ui.toolbar.Part();
    part1.setSpacing(5);
    const jid = (this.__jid = new qx.ui.form.TextField());
    jid.setAppearance("connection-text-field");
    jid.setPlaceholder(this.tr("JID"));
    // FIXME: remove next line
    jid.setValue("qqq@localhost");
    part1.add(jid);

    const password = (this.__password = new qx.ui.form.PasswordField());
    password.setPlaceholder(this.tr("Password"));
    password.setAppearance("connection-text-field");
    // FIXME: remove next line
    password.setValue("qqq");
    part1.add(password);

    this.add(part1);

    const part2 = new qx.ui.toolbar.Part();
    part2.setSpacing(5);
    const address = (this.__address = new qx.ui.form.TextField());
    address.setAppearance("connection-text-field");
    address.setPlaceholder(this.tr("Service address"));
    address.setAllowGrowX(true);

    // FIXME: remove next line
    address.setValue("ws://localhost:5443/ws");
    part2.add(address, {flex: 3});

    const connect = (this.__connectBtn = new qx.ui.form.Button(this.tr("Connect")));
    connect.setAppearance("main-toolbar-button");
    service.bind("state", connect, "enabled", {
      converter(val) {
        return val instanceof qmc.service.DisconnectedState;
      }
    });

    connect.addListener("execute", this._onConnect, this);
    part2.add(connect);

    const disconnect = (this.__disconnectBtn = new qx.ui.form.Button(this.tr("Disconnect")));
    disconnect.setAppearance("main-toolbar-button");
    service.bind("state", disconnect, "enabled", {
      converter(val) {
        return val instanceof qmc.service.ConnectedState;
      }
    });
    disconnect.addListener("execute", this._onDisconnect, this);
    part2.add(disconnect);
    this.add(part2, {flex: 3});
  },

  members: {
    __jid: null,
    __password: null,
    __address: null,
    __connectBtn: null,
    __disconnectBtn: null,

    _onConnect() {
      const jid = this.__jid.getValue();
      const password = this.__password.getValue();
      const address = this.__address.getValue();

      const service = qmc.service.Service.getInstance();
      service.connect(jid, password, address, undefined, undefined);
    },

    _onDisconnect() {
      const service = qmc.service.Service.getInstance();
      service.disconnect();
    }
  }
});

/**
 * A toolbar for connecting and disconnecting to the service
 *
 */
qx.Class.define("qmc.views.ToolBar", {
  extend: qx.ui.toolbar.ToolBar,

  construct() {
    this.base(arguments);

    const part1 = new qx.ui.toolbar.Part();
    part1.setSpacing(5);
    const jid = (this.__jid = new qx.ui.form.TextField());
    jid.setPlaceholder(this.tr("JID"));
    part1.add(jid);

    const password = (this.__password = new qx.ui.form.PasswordField());
    password.setPlaceholder(this.tr("Password"));
    part1.add(password);

    this.add(part1);

    const part2 = new qx.ui.toolbar.Part();
    part2.setSpacing(5);
    const address = (this.__address = new qx.ui.form.TextField());
    address.setPlaceholder(this.tr("Service address"));
    address.setAllowGrowX(true);
    part2.add(address, {flex: 3});

    const connect = (this.__connectBtn = new qx.ui.form.Button(this.tr("Connect")));
    connect.setAppearance("main-toolbar-button");
    connect.addListener("execute", this._onConnect, this);
    part2.add(connect);

    const disconnect = (this.__disconnectBtn = new qx.ui.form.Button(this.tr("Disconnect")));
    disconnect.setAppearance("main-toolbar-button");
    disconnect.setEnabled(false);
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

      const service = qmc.Service.getInstance();
      const conn = service.newConnection(address);

      //prettier-ignore
      conn.connect(jid, password, () => {
        console.log("connected...")
      }, this);
    }
  }
});

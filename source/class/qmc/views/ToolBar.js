/**
 * A toolbar for connecting and disconnecting to the service
 *
 */
qx.Class.define("qmc.views.ToolBar", {
  extend: qx.ui.toolbar.ToolBar,
  include: [qmc.command.MCommand],

  construct() {
    this.base(arguments);

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
    address.set({
      appearance: "connection-text-field",
      placeholder: qx.locale.Manager.tr("Service address"),
      allowGrowX: true
    });

    // FIXME: remove next line
    address.setValue("ws://localhost:5443/ws");
    part2.add(address, {flex: 3});

    const domain = (this.__domain = new qx.ui.form.TextField());
    domain.set({
      appearance: "connection-text-field",
      placeholder: qx.locale.Manager.tr("Domain"),
      allowGrowX: true
    });
    part2.add(domain, {flex: 1});

    const resource = (this.__resource = new qx.ui.form.TextField());
    resource.set({
      appearance: "connection-text-field",
      placeholder: qx.locale.Manager.tr("Resource"),
      allowGrowX: true
    });
    part2.add(resource, {flex: 1});

    // create the buttons
    const service = qmc.service.Service.getInstance();

    const connectBtn = (this.__connectBtn = new qx.ui.form.Button(this.tr("Connect")));
    connectBtn.setAppearance("main-toolbar-button");
    service.bind("state", connectBtn, "enabled", {
      converter(val) {
        return val instanceof qmc.service.DisconnectedState;
      }
    });

    const connectCmd = new qx.ui.command.Command("Enter");
    connectCmd.addListener("execute", this._onConnect, this);
    connectCmd.setToolTipText(connectCmd.getShortcut());
    connectBtn.setCommand(connectCmd);

    part2.add(connectBtn);

    const disconnectBtn = (this.__disconnectBtn = new qx.ui.form.Button(this.tr("Disconnect")));
    disconnectBtn.setAppearance("main-toolbar-button");
    service.bind("state", disconnectBtn, "enabled", {
      converter(val) {
        return val instanceof qmc.service.ConnectedState;
      }
    });

    const disconnectCmd = new qx.ui.command.Command("Esc");
    disconnectCmd.setToolTipText(disconnectCmd.getShortcut());

    disconnectCmd.addListener("execute", this._onDisconnect, this);
    disconnectBtn.setCommand(disconnectCmd);

    part2.add(disconnectBtn);
    this.add(part2, {flex: 3});

    // the mixin constructor is called after the class constructor.
    // Let it initialize first.
    // prettier-ignore
    qx.event.Timer.once(function() {
    this.addCommand("connect", connectCmd);
    this.addCommand("disconnect", disconnectCmd);
    }, this, 0);
  },

  members: {
    __jid: null,
    __password: null,
    __address: null,
    __domain: null,
    __resource: null,
    __connectBtn: null,
    __disconnectBtn: null,

    _onConnect() {
      const jid = this.__jid.getValue();
      const password = this.__password.getValue();
      const address = this.__address.getValue();
      const domain = this.__domain.getValue();
      const resource = this.__resource.getValue();

      const service = qmc.service.Service.getInstance();
      service.connect(jid, password, address, domain, resource);
    },

    _onDisconnect() {
      const service = qmc.service.Service.getInstance();
      service.disconnect();
    }
  }
});

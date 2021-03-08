/**
 * A toolbar for connecting and disconnecting to the service
 *
 */
qx.Class.define("qmc.views.ToolBar", {
  extend: qx.ui.toolbar.ToolBar,
  include: [qmc.command.MCommand],

  construct() {
    this.base(arguments);

    const form = new qx.ui.form.Form();

    const part1 = new qx.ui.toolbar.Part();
    part1.setSpacing(5);

    const jid = new qx.ui.form.TextField().set({
      appearance: "connection-text-field",
      placeholder: this.tr("JID"),
      required: true
    });
    form.add(jid, "jid", null, "username");
    part1.add(jid);

    const password = new qx.ui.form.PasswordField().set({
      appearance: "connection-text-field",
      placeholder: this.tr("Password"),
      required: true
    });
    form.add(password, "password", null, "password");
    part1.add(password);
    this.add(part1);

    const part2 = new qx.ui.toolbar.Part();
    part2.setSpacing(5);

    const address = new qx.ui.form.TextField().set({
      appearance: "connection-text-field",
      placeholder: this.tr("Service address"),
      required: true,
      requiredInvalidMessage: this.tr("Address is required")
    });
    form.add(address, "address", null, "service");
    part2.add(address, {flex: 4});

    const domain = new qx.ui.form.TextField().set({
      appearance: "connection-text-field",
      placeholder: this.tr("Domain")
    });
    form.add(domain, "domain", null, "domain");
    part2.add(domain, {flex: 1});

    const resource = new qx.ui.form.TextField().set({
      appearance: "connection-text-field",
      placeholder: this.tr("Resource")
    });
    form.add(resource, "resource", null, "resource");
    part2.add(resource, {flex: 1});

    // create the controller and the model
    this.__formController = new qx.data.controller.Form(null, form);
    this.__formController.createModel();

    // create the buttons
    const service = qmc.service.Service.getInstance();

    const connectBtn = new qx.ui.form.Button(this.tr("Connect"));
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
    __formController: null,

    _onConnect() {
      const formController = this.__formController;
      if (formController.getTarget().validate()) {
        const service = qmc.service.Service.getInstance();
        const model = formController.getModel();
        const connectionParams = qx.util.Serializer.toNativeObject(model);
        service.connect(connectionParams);
      }
    },

    _onDisconnect() {
      const service = qmc.service.Service.getInstance();
      service.disconnect();
    }
  }
});

qx.Mixin.define("qmc.command.MCommand", {
  construct() {
    this.__commandGroup = new qx.ui.command.Group();
    this.deactivateCommands();
    this.addListener("activate", this.activateCommands, this);
    this.addListener("deactivate", this.deactivateCommands, this);
  },

  members: {
    __commandGroup: null,

    /**
     * Adds a command with a key to the group.
     *
     * @param key {String} Key to be able to addresses the command
     * @param command {qx.ui.command.Command} Command
     *
     * @return {Boolean} <code>false</code> if key already added before
     */
    addCommand(key, command) {
      const group = this.__commandGroup;
      // the command's activenes is the same as group's
      command.setActive(group.getActive());
      return group.add(key, command);
    },

    /**
     * Activate current command group.
     *
     */
    activateCommands() {
      this.__commandGroup.setActive(true);
    },

    /**
     * Deactivate current command group.
     *
     */
    deactivateCommands() {
      this.__commandGroup.setActive(false);
    }
  }
});

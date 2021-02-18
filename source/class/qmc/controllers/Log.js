qx.Class.define("qmc.controllers.Log", {
  extend: qx.core.Object,

  construct(view, service) {
    this.base(arguments);
    this.__view = view;

    service.addListener("rawInput", this.updateView, this);
    service.addListener("rawOutput", this.updateView, this);
  },

  members: {
    __view: null,

    updateView(evt) {
      const data = evt.getData();
      const meta = {
        timestamp: evt.getTimeStamp(),
        type: evt.getType()
      };

      this.__view.append(data, meta);
    }
  }
});

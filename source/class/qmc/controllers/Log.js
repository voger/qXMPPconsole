qx.Class.define("qmc.controllers.Log", {
  extend: qx.core.Object,

  construct(view, service) {
    this.base(arguments);
    this.__view = view;

    // prettier-ignore
    const supportedEvents= [
        "status",
        "error",
        "online",
        "offline",
        "reconnecting",
        "reconnected",
        "received",
        "send",
        "sendingError"
    ];

    for (const event of supportedEvents) {
      service.addListener(event, this.updateView, this);
    }
  },

  members: {
    __view: null,

    updateView(evt) {
      const data = evt.getData() || evt.getType();
      const meta = {
        timestamp: evt.getTimeStamp(),
        type: evt.getType()
      };

      this.__view.append(data, meta);
    }
  }
});

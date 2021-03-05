/**
 * @asset(qx/icon/${qx.icontheme}/32/places/network-workgroup.png)
 * @asset(qx/icon/${qx.icontheme}/32/places/network-server.png)
 * @asset(qmc/styles/info-view.css)
 *
 */
qx.Class.define("qmc.views.Services", {
  extend: qx.ui.core.Widget,

  construct() {
    this.base(arguments);
    this._setLayout(new qx.ui.layout.VBox());

    // this._initToolBar();
    this._initMainContainer();
    this._initTreeWidget();
    this._initServicesDescr();

    // add liteners for status
    const service = qmc.service.Service.getInstance();
    service.addListener("changeState", this._initTree, this);

    const self = this;
    this.__servicesTree.bind("selection[0].info", this.__servicesDescr, "html", {
      converter(data, model, source, target) {
        const identities = (data && data.getChildren("identity")) ?? [];
        const hasIdentities = identities.length > 0;

        const features = (data && data.getChildren("feature")) ?? [];
        const hasFeatures = features.length > 0;

        const view = {
          identities: identities,
          hasIdentities: hasIdentities,
          features: features,
          hasFeatures: hasFeatures
        };

        return q.template.render(self.__template, view);
      }
    });
  },

  statics: {
    discoNS: {
      ITEMS: "http://jabber.org/protocol/disco#items",
      INFO: "http://jabber.org/protocol/disco#info"
    }
  },

  members: {
    __mainContainer: null,
    __servicesTree: null,
    __servicesDescr: null,

    __template: `
          {{#hasIdentities}}
            <h3>Identities</h3>
            <ul id="identity-list">
          {{/hasIdentities}}

          {{#identities}}
            <li>
              <dl>
                <dt>Name</dt>
                  <dd>{{name}}</dd>
              </dl>

              <dl>
                <dt>
                  {{#attrs.name}}
                  <dt>Name</dt>
                    <dd>{{attrs.name}}
                  {{/attrs.name}}

                  {{#attrs.type}}
                  <dt>Type</dt>
                    <dd>{{attrs.type}}
                  {{/attrs.type}}

                  {{#attrs.category}}
                  <dt>Category</dt>
                    <dd>{{attrs.category}}
                  {{/attrs.category}}
              </dl>
            </li>
          {{/identities}}
          {{#hasIdentities}}
            </ul>
          {{/hasIdentities}}

          {{#hasFeatures}}
            <h3>Features</h3>
            <ul id="feature-list">
          {{/hasFeatures}}

          {{#features}}
            <li>{{attrs.var}}</li>
          {{/features}}
          {{#hasFeatures}}
            </ul>
          {{/hasFeatures}}
          `,

    _initMainContainer() {
      this.__mainContainer = new qx.ui.splitpane.Pane("horizontal");
      this._add(this.__mainContainer, {flex: 1});
    },

    _initTree(event) {
      const state = event.getData();
      const {
        entity: {
          options: {domain}
        }
      } = event.getTarget().getConnection();

      if (state instanceof qmc.service.ConnectedState) {
        const root = {
          label: domain,
          children: [],
          icon: "default",
          loaded: false,
          info: null
        };

        this.__servicesTree.setModel(qx.data.marshal.Json.createModel(root, true));
      } else if (state instanceof qmc.service.DisconnectedState) {
        this.__servicesTree.getModel().dispose();
        this.__servicesTree.resetModel();
      }
    },

    // creates a tree widget and adds it to the container
    _initTreeWidget() {
      const tree = (this.__servicesTree = new qx.ui.tree.VirtualTree(null, "label", "children", false));
      tree.setIconPath("icon");
      tree.setIconOptions({
        converter: function (value, model) {
          if (value == "default") {
            if (model.getChildren != null) {
              return "icon/32/places/network-workgroup.png";
            }
            return "icon/32/places/network-server.png";
          }
          return "qxl/demobrowser/demo/icons/loading22.gif";
        }
      });
      tree.setShowTopLevelOpenCloseIcons(true);

      var delegate = {
        bindItem: (controller, item, index) => {
          controller.bindDefaultProperties(item, index);

          // prettier-ignore
          controller.bindProperty( "", "open", {
              converter: (value, model, source, target) => {
                var isOpen = target.isOpen();
                if (isOpen && !value.getLoaded()) {
                  value.setLoaded(true);

      //             // prettier-ignore
      //             qx.event.Timer.once(
      //               function () {
      //                 tree.setAutoScrollIntoView(false);
      //                 // value.getChildren().removeAll();
      //                 // this.createRandomData(value);
      //                 tree.setAutoScrollIntoView(true);
      //               }, this, 5000);
                }

                return isOpen;
              }
            }, item, index);
        }
      };
      tree.setDelegate(delegate);

      // prettier-ignore
      tree.getSelection().addListener( "change", function (e) {
          const selected = e.getData().added[0];
          if (selected) {
            this.sendItemsQuery(selected);
            this.sendInfoQuery(selected);
          }
        }, this);

      this.__mainContainer.add(tree);
    },

    _initServicesDescr() {
      const descr = (this.__servicesDescr = new qx.ui.embed.Html());
      descr.setOverflow("auto", "auto");
      descr.setCssClass("info-view");
      this.__mainContainer.add(descr);
    },

    async sendItemsQuery(item) {
      // item is a leaf. Nothing to query
      if (item.getChildren == null) {
        return;
      }

      // children are loaded. Nothing to query
      if (item.getLoaded()) {
        return;
      }

      try {
        const service = qmc.service.Service.getInstance();
        const from = service.getConnection().jid.toString();
        const to = service.getDomain();
        const namespace = this.constructor.discoNS.ITEMS;
        const element = service.xml("iq", {from: from, type: "get", to: to}, service.xml("query", {xmlns: namespace}));
        const response = await service.request(element);
        const nodes = response.getChild("query").children;
        this.__addNodeChildren(item, nodes);
      } catch (err) {
        console.error(err);
      }
    },

    async sendInfoQuery(item) {
      try {
        const service = qmc.service.Service.getInstance();
        const from = service.getConnection().jid.toString();
        const to = item.getLabel();
        const namespace = this.constructor.discoNS.INFO;
        const element = service.xml("iq", {from: from, type: "get", to: to}, service.xml("query", {xmlns: namespace}));
        const response = await service.request(element);
        const info = response.getChild("query");
        item.setInfo(info);
      } catch (err) {
        console.error(err);
      }
    },

    __addNodeChildren(parent, result) {
      for (const item of result) {
        let node = {
          label: item.attrs.jid,
          icon: "default",
          loaded: false,
          info: null
        };

        if (item.attrs.node !== undefined) {
          node["children"] = [];
        }

        parent.getChildren().push(qx.data.marshal.Json.createModel(node, true));
      }
    }
  }
});

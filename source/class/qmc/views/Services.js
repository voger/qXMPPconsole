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
        // data can be undefined, an xmppjs query element or an error string
        // make sure we can call get children
        const canGetChildren = data && qx.lang.Type.isFunctionOrAsyncFunction(data.getChildren);
        const identities = (canGetChildren && data.getChildren("identity")) ?? [];
        const hasIdentities = identities.length > 0;

        const features = (canGetChildren && data.getChildren("feature")) ?? [];
        const hasFeatures = features.length > 0;

        // if it is a string assign it to the object
        const errorString = qx.lang.Type.isString(data) ? data : null;

        const view = {
          identities: identities,
          hasIdentities: hasIdentities,
          features: features,
          hasFeatures: hasFeatures,
          errorString: errorString
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
          {{#errorString}}
            <h3>{{errorString}}</h3>
          {{/errorString}}
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
          info: null,
          node: null
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

      tree.setLabelOptions({
        converter(data, model, source, target) {
          const node = model.getNode();
          const nodeString = node ? `[${node}]` : "";

          return data + nodeString;
        }
      });

      tree.setIconPath("icon");
      tree.setIconOptions({
        converter: function (value, model) {
          if (value == "default") {
            if (model.getChildren().length > 0) {
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
      tree.getSelection().addListener("change", async function (e) {
          const selected = e.getData().added[0];
          if (selected) {
            await this.sendItemsQuery(selected);
            await this.sendInfoQuery(selected);
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
      // // item is a leaf. Nothing to query
      // if (item.getChildren == null) {
      //   return;
      // }

      // // children are loaded. Nothing to query
      // if (item.getLoaded()) {
      //   return;
      // }

      try {
        const service = qmc.service.Service.getInstance();
        const from = service.getConnection().jid.toString();
        const to = item.getLabel();
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

        const queryObj = {
          xmlns: this.constructor.discoNS.INFO
        };

        const node = item.getNode();
        if (node !== null) {
          queryObj.node = node;
        }

        const element = service.xml("iq", {from: from, type: "get", to: to}, service.xml("query", queryObj));
        const response = await service.request(element);
        const info = response.getChild("query");
        item.setInfo(info);
      } catch (err) {
        item.setInfo(err.toString());
      }
    },

    __addNodeChildren(parent, result) {
      for (const item of result) {
        const jid = item.attrs.jid;
        const node = item.attrs.node ?? null;

        // ensure we are pushing unique children
        const children = parent.getChildren();

        // prettier-ignore
        const inChildren = children.toArray().find((child) => {
              return child.getLabel() === jid && 
              child.getNode() === node;});

        if (!inChildren) {
          let treeNode = {
            label: jid,
            icon: "default",
            loaded: false,
            info: null,
            node: node ?? null,
            children: []
          };

          parent.getChildren().push(qx.data.marshal.Json.createModel(treeNode, true));
        }
      }
    }
  }
});

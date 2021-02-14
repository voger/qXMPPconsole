qx.Mixin.define("qmc.patch.MFixPartFlex", {
  construct() {
    this.getChildControl("container").setLayoutProperties({flex: 1});
  }
});

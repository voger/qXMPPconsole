/* ************************************************************************

   Copyright: 2021 

   License: MIT license

   Authors: voger

************************************************************************ */

qx.Theme.define("qmc.theme.Appearance", {
  extend: qx.theme.indigo.Appearance,

  appearances: {
    "main-view": {
      include: "widget",

      style() {
        return {
          spacing: 60
        };
      }
    },

    "connection-text-field": {
      alias: "texfield",
      include: "textfield",

      style() {
        return {
          minHeight: 40,
          font: "textfield",
          alignY: "middle",
          minWidth: 250
        };
      }
    },

    "toolbar": {
      base: true,

      style() {
        return {
          spacing: 5,
          paddingTop: 5,
          paddingBottom: 5
        };
      }
    },

    "main-toolbar-button": {
      alias: "button",
      include: "button",

      style() {
        return {
          allowGrowY: true,
          minWidth: 90,
          minHeight: 40,
          alignY: "middle",
          font: "main-toolbar-button"
        };
      }
    },

    "editor-widget": {
      include: "widget",

      style() {
        return {
          font: "editor-font"
        };
      }
    }
  }
});

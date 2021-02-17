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

    "textfield": {
      base: true,

      style(states, styles) {
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

    "font-size-button-increase": {
      alias: "toolbar-button",
      include: "toolbar-button",

      style() {
        return {
          center: true,
          font: "font-size-button"
        };
      }
    },

    "font-size-button-decrease": {
      alias: "font-size-button-increase",
      include: "font-size-button-increase",

      style(_states, {font}) {
        const webfont = qx.theme.manager.Font.getInstance().resolve(font);

        const changedFont = new qx.bom.webfonts.WebFont().set({
          size: webfont.getSize() - 1,
          family: webfont.getFamily(),
          bold: webfont.getBold(),
          sources: webfont.getSources()
        });

        return {
          font: changedFont
        };
      }
    }
  }
});

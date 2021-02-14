/* ************************************************************************

   Copyright: 2021 

   License: MIT license

   Authors: voger

************************************************************************ */
qx.Theme.define("qmc.theme.Font", {
  extend: qx.theme.indigo.Font,

  fonts: {
    "textfield": {
      size: 20,
      family: ["sans-serif"],
      // color: "text-primary-on-surface",
      weight: "300",
      sources: [
        {
          family: "NotoSans",
          // fontWeight: "300",
          source: [
            "qmc/fonts/Noto_Sans/noto-sans-v11-latin-700.woff2",
            "qmc/fonts/Noto_Sans/noto-sans-v11-latin-700.woff",
            "qmc/fonts/Noto_Sans/noto-sans-v11-latin-700.ttf"
          ]
        }
      ]
    },

    "main-toolbar-button": {
      size: 18,
      family: ["sans-serif"],
      // color: "text-primary-on-surface",
      weight: "200",
      sources: [
        {
          family: "NotoSans",
          // fontWeight: "300",
          source: [
            "qmc/fonts/Noto_Sans/noto-sans-v11-latin-700.woff2",
            "qmc/fonts/Noto_Sans/noto-sans-v11-latin-700.woff",
            "qmc/fonts/Noto_Sans/noto-sans-v11-latin-700.ttf"
          ]
        }
      ]
    }
  }
});

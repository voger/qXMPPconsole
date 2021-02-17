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
      weight: "300",
      sources: [
        {
          family: "NotoSans",
          source: [
            "qmc/fonts/Noto_Sans/noto-sans-v11-latin-700.woff2",
            "qmc/fonts/Noto_Sans/noto-sans-v11-latin-700.woff",
            "qmc/fonts/Noto_Sans/noto-sans-v11-latin-700.ttf"
          ]
        }
      ]
    },

    "font-size-button": {
      size: 24,
      family: ["sans-serif"],
      bold: true,
      sources: [
        {
          family: "NotoSans",
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
      weight: "200",
      sources: [
        {
          family: "NotoSans",
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

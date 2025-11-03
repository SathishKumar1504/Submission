// script.js
const gallery = document.getElementById("gallery");
const search = document.getElementById("search");
const count = document.getElementById("count");

// List of all 140 named CSS colors
const colors = [
  "AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque",
  "Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue",
  "Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan",
  "DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGreen","DarkKhaki",
  "DarkMagenta","DarkOliveGreen","DarkOrange","DarkOrchid","DarkRed","DarkSalmon",
  "DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkTurquoise","DarkViolet",
  "DeepPink","DeepSkyBlue","DimGray","DodgerBlue","FireBrick","FloralWhite",
  "ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray",
  "Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki",
  "Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral",
  "LightCyan","LightGoldenRodYellow","LightGray","LightGreen","LightPink",
  "LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSteelBlue",
  "LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine",
  "MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue",
  "MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream",
  "MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange",
  "OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed",
  "PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","RebeccaPurple",
  "Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen",
  "SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","Snow","SpringGreen",
  "SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White",
  "WhiteSmoke","Yellow","YellowGreen"
];

// Function to convert color to hex
function rgbToHex(color) {
  const ctx = document.createElement("canvas").getContext("2d");
  ctx.fillStyle = color;
  return ctx.fillStyle.toUpperCase();
}

// Render color boxes
function renderColors(filter = "") {
  gallery.innerHTML = "";
  const filtered = colors.filter(c => c.toLowerCase().includes(filter.toLowerCase()));

  filtered.forEach(color => {
    const div = document.createElement("div");
    div.className = "swatch";
    div.style.background = color;

    const label = document.createElement("div");
    label.className = "label";

    const name = document.createElement("div");
    name.className = "name";
    name.textContent = color;

    const hex = document.createElement("div");
    hex.className = "hex";
    hex.textContent = rgbToHex(color);

    label.appendChild(name);
    label.appendChild(hex);
    div.appendChild(label);
    gallery.appendChild(div);
  });

  count.textContent = `${filtered.length} colors`;
}

// Initial render
renderColors();

// Filter on search
search.addEventListener("input", e => renderColors(e.target.value));

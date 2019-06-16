const presets = [
  ["@babel/preset-env", {
   "modules": false,
   "targets": [">0.25% in JP", "not ie <= 11", "not op_mini all"],
   "useBuiltIns": "usage",
    "corejs": 3,
  }],
 ];
 
 module.exports = { presets };
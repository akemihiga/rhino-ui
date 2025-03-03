module.exports = {
  "platforms": {
    "scss": {
      "transforms": ["attribute/cti", "name/cti/custom-kebab", "time/seconds", "content/icon", "size/use-unit", "color/css"],
      "buildPath": "build/scss/",
      "files": [
        {
          "destination": "variables-color.scss",
          "format": "scss/variables",
          "filter": "isBrandColor"
        },
        {
          "destination": "variables-size.scss",
          "format": "scss/variables",
          "filter": "isCategorySize"
        },
        {
          "destination": "variables-asset.scss",
          "format": "scss/variables/font",
          "filter": "isCategoryAsset"
        }
      ]
    },
    "css": {
      "transforms": ["attribute/cti", "name/cti/custom-kebab", "time/seconds", "content/icon", "size/use-unit", "color/css"],
      "buildPath": "build/css/",
      "files": [
        {
          "destination": "variables-color.css",
          "format": "css/variables",
          "filter": "isBrandColor"
        },
        {
          "destination": "variables-size.css",
          "format": "css/variables",
          "filter": "isCategorySize"
        },
        {
          "destination": "variables-asset.css",
          "format": "css/variables/font",
          "filter": "isCategoryAsset"
        }
      ]
    },
    "cssUtilities": {
      "buildPath": "build/utilities/",
      "transforms": ["attribute/cti", "name/cti/custom-kebab", "time/seconds", "content/icon", "size/use-unit", "color/css"],
      "files": [{
        "destination": "utilities.css",
        "format": "css/utility-classes"
      }]
    },
    "sassUtilities": {
      "buildPath": "build/utilities/",
      "transforms": ["attribute/cti", "name/cti/custom-kebab", "time/seconds", "content/icon", "size/use-unit", "color/css"],
      "files": [{
        "destination": "utilities.scss",
        "format": "css/utility-classes"
      }]
    },
    "js": {
      "transforms": ["attribute/cti", "name/cti/pascal", "size/use-unit", "color/css"],
      "buildPath": "build/js/",
      "files": [
        {
          "destination": "variables-color.js",
          "format": "javascript/esm",
          "filter": "isCategoryColor"
        },
        {
          "destination": "variables-size.js",
          "format": "javascript/esm",
          "filter": "isCategorySize"
        },
        {
          "destination": "variables-asset.js",
          "format": "javascript/esm",
          "filter": "isCategoryAsset"
        }
      ]
    },
    "json": {
      "transforms": ["attribute/cti", "name/cti/pascal", "size/use-unit", "color/css"],
      "buildPath": "build/json/",
      "files": [
        {
          "destination": "variables-color.json",
          "format": "json",
          "filter": "isCategoryColor"
        },
        {
          "destination": "variables-size.json",
          "format": "json",
          "filter": "isCategorySize"
        },
        {
          "destination": "variables-asset.json",
          "format": "json",
          "filter": "isCategoryAsset"
        }
      ]
    },
    "jsonNested": {
      "transforms": ["attribute/cti", "color/css", "name/cti/custom-kebab"],
      "buildPath": "build/json/values/",
      "files": [
        {
          "destination": "variables-color.json",
          "format": "json/nested",
          "filter": "isCategoryColor"
        },
        {
          "destination": "variables-size.json",
          "format": "json/nested",
          "filter": "isCategorySize"
        },
        {
          "destination": "variables-asset.json",
          "format": "json/nested",
          "filter": "isCategoryAsset"
        }
      ]
    }
  }
}

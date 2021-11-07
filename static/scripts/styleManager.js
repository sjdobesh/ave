/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*
*   File:   TextStyling.js
*
*   Desc:   Styling functions for changing the style of an item
*/

var StyleManager = function (element) {
    this.node = document.getElementsByTagName(element)[0];
};

StyleManager.prototype.setFontFamily = function (value) {
    this.node.classList.remove("serif");
    this.node.classList.remove("monospace");
    this.node.classList.remove("opendyslexic");
    switch (value.trim()) {
        case 'serif':
            this.node.classList.add("serif");
            break;
        
        case 'monospace':
            this.node.classList.add("monospace");
            break;
    
        case 'opendyslexic':
            this.node.classList.add("opendyslexic");
            break;
        
        default: // sans-serif
            break;
    }
};

StyleManager.prototype.setColorScheme = function (value) {
    this.node.classList.remove("light-gentle");
    this.node.classList.remove("dark");
    this.node.classList.remove("dark-gentle");
    switch (value.trim()) {
        case 'light mode (gentle)':
            this.node.classList.add("light-gentle");
            break;
        
        case 'dark mode':
            this.node.classList.add("dark");
            break;
    
        case 'dark mode (gentle)':
            this.node.classList.add("dark-gentle");
            break;
        
        default: // Light mode
            break;
    }
};

StyleManager.prototype.setBold = function (flag) {
    this.node.classList.toggle("bold");
};

StyleManager.prototype.setItalic = function (flag) {
    this.node.classList.toggle("italic");
};

StyleManager.prototype.setShortcuts = function (flag) {
    console.log("shortcuts flag: " + flag);
};

StyleManager.prototype.setSounds = function (flag) {
    console.log("sounds flag: " + flag);
};


StyleManager.prototype.setOption = function (option, value) {

    option = option.toLowerCase();
    if (typeof value === 'string') {
        value = value.toLowerCase();
    }

    switch (option) {

        case 'shortcuts':
            this.setShortcuts(value);
            break;

        case 'sounds':
            this.setSounds(value);
            break;

        case 'font-bold':
            this.setBold(value);
            break;

        case 'font-color':
            this.setColor(value);
            break;

        case 'color-scheme':
            this.setColorScheme(value);
            break;

        case 'font-family':
            this.setFontFamily(value);
            break;

        case 'font-size':
            this.setFontSize(value);
            break;

        case 'font-italic':
            this.setItalic(value);
            break;

        default:
            break;

    } // end switch

};
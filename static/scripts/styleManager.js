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
    this.node.style.fontFamily = value;
};

StyleManager.prototype.setTextDecoration = function (value) {
    this.node.style.textDecoration = value;
};

StyleManager.prototype.setTextAlign = function (value) {
    this.node.style.textAlign = value;
};

StyleManager.prototype.setColor = function (value) {
    this.node.style.color = value;
};

StyleManager.prototype.setColorScheme = function (value) {
    switch (value.trim()) {
        case 'light mode':
            document.getElementsByTagName("body")[0].setAttribute("class", "light");
            break;

        case 'light mode (gentle)':
            document.getElementsByTagName("body")[0].setAttribute("class", "light-gentle");
            break;
        
        case 'dark mode':
            document.getElementsByTagName("body")[0].setAttribute("class", "dark");
            break;
    
        case 'dark mode (gentle)':
            document.getElementsByTagName("body")[0].setAttribute("class", "dark-gentle");
            break;
        
        default:
            break;
    }
};

StyleManager.prototype.setBold = function (flag) {
    this.node.classList.toggle("bold");
};

StyleManager.prototype.setItalic = function (flag) {
    this.node.classList.toggle("italic");
};

StyleManager.prototype.setOption = function (option, value) {

    option = option.toLowerCase();
    if (typeof value === 'string') {
        value = value.toLowerCase();
    }

    switch (option) {

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

        case 'text-align':
            this.setTextAlign(value);
            break;

        default:
            break;

    } // end switch

};
/// <reference path="../../typings/tsd.d.ts"/>
//Control Object
// Jake Parnell
// Comp392 - MidTerm
// Last Modified by: Jake Parnell
// Date Last Modified Mar 1nd 2016
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(rotation1, rotation2, rotation3, rotation4, rotation5) {
            this.rotation1 = rotation1;
            this.rotation2 = rotation2;
            this.rotation3 = rotation3;
            this.rotation4 = rotation4;
            this.rotation5 = rotation5;
        }
        return Control;
    }());
    objects.Control = Control;
})(objects || (objects = {}));

//# sourceMappingURL=control.js.map

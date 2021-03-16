

odoo.define('oepetstore.custom_view_registry', function (require) {
    "use strict";
    
    /**
     * The purpose of this module is to add the web views in the view_registry.
     * This can't be done directly in the module defining the view_registry as it
     * would produce cyclic dependencies.
     */
    console.log("in view_registry")
    var CustomFormView = require('oepetstore.CustomFormView');
    var CustomListView = require('oepetstore.CustomListView');
    
    var view_registry = require('web.view_registry');
    
    view_registry
        .add('customform', CustomFormView)
        .add('customlist', CustomListView);
    // console.log("at the end of view_registry")    
    
    });
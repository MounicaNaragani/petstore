odoo.define('web.customview_registry', function (require) {
    "use strict";
    
    /**
     * This module defines the view_registry. Web views are added to the registry
     * in the 'web._view_registry' module to avoid cyclic dependencies.
     * Views defined in other addons should be added in this registry as well,
     * ideally in another module than the one defining the view, in order to
     * separate the declarative part of a module (the view definition) from its
     * 'side-effects' part.
     */
    console.log("in customview Registry")
    var Registry = require('web.Registry');
    
    return new Registry();
    
});

odoo.define('viewRegistry', function (require) {
    "use strict";
    
    /**
     * The purpose of this module is to add the web views in the view_registry.
     * This can't be done directly in the module defining the view_registry as it
     * would produce cyclic dependencies.
     */
    console.log("in view_registry")
    var CustomFormView = require('web.CustomFormView');
    
    var view_registry = require('web.customview_registry');
    
    view_registry
        .add('customform', CustomFormView);
    // console.log("at the end of view_registry")    
    
    });
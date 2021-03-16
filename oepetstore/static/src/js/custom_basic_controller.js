odoo.define('oepetstore.CustomBasicController', function (require) {
    "use strict";
    
    /**
     * The BasicController is mostly here to share code between views that will use
     * a BasicModel (or a subclass).  Currently, the BasicViews are the form, list
     * and kanban views.
     */
    
    var AbstractController = require('oepetstore.CustomAbstractController');
    var core = require('web.core');
    var Dialog = require('web.Dialog');
    var FieldManagerMixin = require('web.FieldManagerMixin');
    var TranslationDialog = require('web.TranslationDialog');
    
    var _t = core._t;
    
    var CustomBasicController = AbstractController.extend({
        
       
       
    });
    
    return CustomBasicController;
    });
    
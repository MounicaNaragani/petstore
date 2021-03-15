// odoo.oepetstore = function(instance, local) {
//     var _t = instance.web._t,
//         _lt = instance.web._lt;
//     var QWeb = instance.web.qweb;
    
//     console.log("js function")
//     local.HomePage = instance.Widget.extend({
//         start: function() {
//             console.log("pet store home page loaded");
//         },
//     });

//     instance.web.client_actions.add('home_page', 'instance.oepetstore.HomePage');
// }

odoo.define('oepetstore', function (require) {
    'use strict';
    console.log("js function1");
    var Widget = require('web.Widget');
    var widget_registry = require('web.widget_registry');
    var AbstractAction = require('web.AbstractAction');
    var core = require('web.core');
    
   
    var  MyCustomAction = AbstractAction.extend({
            template: "homepage",
            start: function () {
                    // Actions to do
                    console.log("Action function")
            },    
    // Functions according to the working of the widget.        
    })
    // console.log(instance);
    
    var HomePage = Widget.extend({
        
        start: function() {
           
            console.log("pet store home page loaded");
            this.setAttribute(
                'title', _.str.sprintf("HomePage Title", String(true) || _t("no requirements")));
        },
    });
   

    widget_registry.add('homepage', HomePage);
    core.action_registry.add("oepetstore", MyCustomAction);
    // instance.web.client_actions.add('home_page', 'instance.oepetstore.HomePage');

})


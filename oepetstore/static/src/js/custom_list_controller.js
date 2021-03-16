odoo.define('oepetstore.CustomListController', function (require) {
    "use strict";
    
    /**
     * The List Controller controls the list renderer and the list model.  Its role
     * is to allow these two components to communicate properly, and also, to render
     * and bind all extra buttons/pager in the control panel.
     */
    
    var core = require('web.core');
    var BasicController = require('oepetstore.CustomBasicController');
    var DataExport = require('web.DataExport');
    var Dialog = require('web.Dialog');
    var ListConfirmDialog = require('web.ListConfirmDialog');
    var session = require('web.session');
    const viewUtils = require('web.viewUtils');
    
    var _t = core._t;
    var qweb = core.qweb;
    
    var CustomListController = BasicController.extend({
        /**
         * This key contains the name of the buttons template to render on top of
         * the list view. It can be overridden to add buttons in specific child views.
         */
        buttons_template: 'ListView.buttons',
        events: _.extend({}, BasicController.prototype.events, {
            'click .o_list_export_xlsx': '_onDirectExportData',
            'click .o_list_select_domain': '_onSelectDomain',
        }),
        custom_events: _.extend({}, BasicController.prototype.custom_events, {
           
            group_edit_button_clicked: '_onEditGroupClicked',
            
        }),
        
        /**
         * @constructor
         * @override
         * @param {Object} params
         * @param {boolean} params.editable
         * @param {boolean} params.hasActionMenus
         * @param {Object[]} [params.headerButtons=[]]: a list of node descriptors
         *    for controlPanel's action buttons
         * @param {Object} params.toolbarActions
         * @param {boolean} params.noLeaf
         */
        init: function () {
            this._super.apply(this, arguments);
            
        },      

        _onCreateRecord: function (ev) {
            // we prevent the event propagation because we don't want this event to
            // trigger a click on the main bus, which would be then caught by the
            // list editable renderer and would unselect the newly created row
            if (ev) {
                ev.stopPropagation();
            }
            var state = this.model.get(this.handle, {raw: true});
            if (this.editable && !state.groupedBy.length) {
                this._addRecord(this.handle);
            } else {
                this.trigger_up('switch_view', {view_type: 'customform', res_id: undefined});
            }
        },
   
        _onEditGroupClicked: function (ev) {
            ev.stopPropagation();
            this.do_action({
                context: {create: false},
                type: 'ir.actions.act_window',
                views: [[false, 'customform']],
                res_model: ev.data.record.model,
                res_id: ev.data.record.res_id,
                flags: {mode: 'edit'},
            });
        },
        
    });
    
    return CustomListController;
    
    });
    
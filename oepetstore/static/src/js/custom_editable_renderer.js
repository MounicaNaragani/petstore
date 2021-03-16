odoo.define('oepetstore.CustomEditableListRenderer', function (require) {
    "use strict";
    
    /**
     * Editable List renderer
     *
     * The list renderer is reasonably complex, so we split it in two files. This
     * file simply 'includes' the basic ListRenderer to add all the necessary
     * behaviors to enable editing records.
     *
     * Unlike Odoo v10 and before, this list renderer is independant from the form
     * view. It uses the same widgets, but the code is totally stand alone.
     */
    var core = require('web.core');
    var dom = require('web.dom');
    var CustomListRenderer = require('oepetstore.CustomListRenderer');
    var utils = require('web.utils');
    const { WidgetAdapterMixin } = require('web.OwlCompatibility');
    
    var _t = core._t;
    console.log("In custom editable renderer");
    CustomListRenderer.include({

        RESIZE_DELAY: 200,
        custom_events: _.extend({}, CustomListRenderer.prototype.custom_events, {
            navigation_move: '_onNavigationMove',
        }),
        events: _.extend({}, CustomListRenderer.prototype.events, {
            'click .o_field_x2many_list_row_add a': '_onAddRecord',
            'click .o_group_field_row_add a': '_onAddRecordToGroup',
            'keydown .o_field_x2many_list_row_add a': '_onKeyDownAddRecord',
            'click tbody td.o_data_cell': '_onCellClick',
            'click tbody tr:not(.o_data_row)': '_onEmptyRowClick',
            'click tfoot': '_onFooterClick',
            'click tr .o_list_record_remove': '_onRemoveIconClick',
        }),
        _getColumnWidth: function (column) {
            if (column.attrs.width) {
                return column.attrs.width;
            }
            const fieldsInfo = this.state.fieldsInfo.customlist;
            const name = column.attrs.name;
            if (!fieldsInfo[name]) {
                // Unnamed columns get default value
                return '1';
            }
            const widget = fieldsInfo[name].Widget.prototype;
            if ('widthInList' in widget) {
                return widget.widthInList;
            }
            const field = this.state.fields[name];
            if (!field) {
                // this is not a field. Probably a button or something of unknown
                // width.
                return '1';
            }
            const fixedWidths = {
                boolean: '70px',
                date: '92px',
                datetime: '146px',
                float: '92px',
                integer: '74px',
                monetary: '104px',
            };
            let type = field.type;
            if (fieldsInfo[name].widget in fixedWidths) {
                type = fieldsInfo[name].widget;
            }
            return fixedWidths[type] || '1';
        },
    });

});

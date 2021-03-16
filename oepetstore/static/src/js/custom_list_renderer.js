odoo.define('oepetstore.CustomListRenderer', function (require) {
    "use strict";
    
    var ListRenderer = require('web.ListRenderer');
    const { ComponentWrapper } = require('web.OwlCompatibility');
    var config = require('web.config');
    var core = require('web.core');
    var dom = require('web.dom');
    var field_utils = require('web.field_utils');
    var Pager = require('web.Pager');
    var utils = require('web.utils');
    var viewUtils = require('web.viewUtils');
    
    var _t = core._t;
    
   
    var CustomListRenderer = ListRenderer.extend({
        className: 'o_list_view',
       
        
        /**
         * Render a single <th> with the informations for a column. If it is not a
         * field or nolabel attribute is set to "1", the th will be empty.
         * Otherwise, it will contains all relevant information for the field.
         *
         * @private
         * @param {Object} node
         * @returns {jQueryElement} a <th> element
         */
         _onRowClicked: function (ev) {
            // The special_click property explicitely allow events to bubble all
            // the way up to bootstrap's level rather than being stopped earlier.
            if (!ev.target.closest('.o_list_record_selector') && !$(ev.target).prop('special_click')) {
                var id = $(ev.currentTarget).data('id');
                if (id) {
                    this.trigger_up('open_custom_record', { id: id, target: ev.target });
                }
            }
        },
         _renderGroupButtons: function (customlist, group) {
            var self = this;
            var $buttons = $();
            if (list.value) {
                // buttons make no sense for 'Undefined' group
                group.arch.children.forEach(function (child) {
                    if (child.tag === 'button') {
                        $buttons = $buttons.add(self._renderGroupButton(customlist, child));
                    }
                });
            }
            return $buttons;
        },
        _renderHeaderCell: function (node) {
            const { icon, name, string } = node.attrs;
            var order = this.state.orderedBy;
            var isNodeSorted = order[0] && order[0].name === name;
            var field = this.state.fields[name];
            var $th = $('<th>');
            console.log("Custom renderHeaderCell",this.state.fieldsInfo)
            if (name) {
                $th.attr('data-name', name);
            } else if (string) {
                $th.attr('data-string', string);
            } else if (icon) {
                $th.attr('data-icon', icon);
            }
            if (node.attrs.editOnly) {
                $th.addClass('oe_edit_only');
            }
            if (node.attrs.readOnly) {
                $th.addClass('oe_read_only');
            }
            if (node.tag === 'button_group') {
                $th.addClass('o_list_button');
            }
            if (!field || node.attrs.nolabel === '1') {
                return $th;
            }
            var description = string || field.string;
            if (node.attrs.widget) {
                $th.addClass(' o_' + node.attrs.widget + '_cell');
                const FieldWidget = this.state.fieldsInfo.customlist[name].Widget;
                if (FieldWidget.prototype.noLabel) {
                    description = '';
                } else if (FieldWidget.prototype.label) {
                    description = FieldWidget.prototype.label;
                }
            }
            $th.text(description)
                .attr('tabindex', -1)
                .toggleClass('o-sort-down', isNodeSorted ? !order[0].asc : false)
                .toggleClass('o-sort-up', isNodeSorted ? order[0].asc : false)
                .addClass((field.sortable || this.state.fieldsInfo.customlist[name].options.allow_order || false) && 'o_column_sortable');
    
            if (isNodeSorted) {
                $th.attr('aria-sort', order[0].asc ? 'ascending' : 'descending');
            }
    
            if (field.type === 'float' || field.type === 'integer' || field.type === 'monetary') {
                $th.addClass('o_list_number_th');
            }
    
            if (config.isDebug()) {
                var fieldDescr = {
                    field: field,
                    name: name,
                    string: description || name,
                    record: this.state,
                    attrs: _.extend({}, node.attrs, this.state.fieldsInfo.customlist[name]),
                };
                this._addFieldTooltip(fieldDescr, $th);
            } else {
                $th.attr('title', description);
            }
            return $th;
        },
        
    });
    
    return CustomListRenderer;
    });
    
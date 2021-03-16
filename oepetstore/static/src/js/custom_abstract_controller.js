odoo.define('oepetstore.CustomAbstractController', function (require) {
    "use strict";
    
    /**
     * The Controller class is the class coordinating the model and the renderer.
     * It is the C in MVC, and is what was formerly known in Odoo as a View.
     *
     * Its role is to listen to events bubbling up from the model/renderer, and call
     * the appropriate methods if necessary.  It also render control panel buttons,
     * and react to changes in the search view.  Basically, all interactions from
     * the renderer/model with the outside world (meaning server/reading in session/
     * reading localstorage, ...) has to go through the controller.
     */
    
    var ActionMixin = require('web.ActionMixin');
    var ajax = require('web.ajax');
    var AbstractController = require('web.AbstractController')
    var concurrency = require('web.concurrency');
    const { ComponentWrapper } = require('web.OwlCompatibility');
    var mvc = require('web.mvc');
    var session = require('web.session');
    
    
    var CustomAbstractController = AbstractController.extend( {
        custom_events: _.extend({}, AbstractController.custom_events, {
            
            open_custom_record: '_onOpenCustomRecord',
            switch_view: '_onSwitchView',
            
        }),
        events: {
            'click a[type="action"]': '_onActionClicked',
        },
       
        /**
         * @param {Object} param
         * @param {Object[]} params.actionViews
         * @param {string} params.activeActions
         * @param {string} params.bannerRoute
         * @param {Object} [params.controlPanel]
         * @param {string} params.controllerID an id to ease the communication with
         *      upstream components
         * @param {string} params.displayName
         * @param {Object} params.initialState
         * @param {string} params.modelName
         * @param {ActionModel} [params.searchModel]
         * @param {string} [params.searchPanel]
         * @param {string} params.viewType
         * @param {boolean} [params.withControlPanel]
         * @param {boolean} [params.withSearchPanel]
         */
        init: function () {
            console.log("in Abstract controller function");
            this._super.apply(this, arguments);
            
        },
    
        
         /**
         * When a user clicks on an <a> link with type="action", we need to actually
         * do the action. This kind of links is used a lot in no-content helpers.
         *
         * * if the link has both data-model and data-method attributes, the
         *   corresponding method is called, chained to any action it would
         *   return. An optional data-reload-on-close (set to a non-falsy value)
         *   also causes th underlying view to be reloaded after the dialog is
         *   closed.
         * * if the link has a name attribute, invoke the action with that
         *   identifier (see :class:`ActionManager.doAction` to not get the
         *   details)
         * * otherwise an *action descriptor* is built from the link's data-
         *   attributes (model, res-id, views, domain and context)
         *
         * @private
         * @param ev
         */
        
        _onActionClicked: function (ev) { // FIXME: maybe this should also work on <button> tags?
            console.log("in action clicked custom");
            ev.preventDefault();
            var $target = $(ev.currentTarget);
            var self = this;
            var data = $target.data();
    
            if (data.method !== undefined && data.model !== undefined) {
                var options = {};
                if (data.reloadOnClose) {
                    options.on_close = function () {
                        self.trigger_up('reload');
                    };
                }
                this.dp.add(this._rpc({
                    model: data.model,
                    method: data.method,
                    context: session.user_context,
                })).then(function (action) {
                    if (action !== undefined) {
                        self.do_action(action, options);
                    }
                });
            } else if ($target.attr('name')) {
                this.do_action(
                    $target.attr('name'),
                    data.context && {additional_context: data.context}
                );
            } else {
                this.do_action({
                    name: $target.attr('title') || _.str.strip($target.text()),
                    type: 'ir.actions.act_window',
                    res_model: data.model || this.modelName,
                    res_id: data.resId,
                    target: 'current', // TODO: make customisable?
                    views: data.views || (data.resId ? [[false, 'customform']] : [[false, 'list'], [false, 'customform']]),
                    domain: data.domain || [],
                }, {
                    additional_context: _.extend({}, data.context)
                });
            }
        },
        _onOpenCustomRecord: function (ev) {
            console.log("in onOpen Record Function");
            ev.stopPropagation();
            var record = this.model.get(ev.data.id, {raw: true});
            alert("Open custom record func.");
            this.trigger_up('switch_view', {
                view_type: 'customform',
                res_id: record.res_id,
                mode: ev.data.mode || 'readonly',
                model: this.modelName,
            });
        },
        _onSwitchView: function (ev) {
            ev.data.controllerID = this.controllerID;
        },
       
    });
    
    return CustomAbstractController;
    
    });
    
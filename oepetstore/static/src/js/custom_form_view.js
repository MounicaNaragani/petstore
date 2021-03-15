odoo.define('web.CustomFormView', function (require) {
    'use strict';
    // console.log("js function2");
    var FormView = require('web.FormView');
    var core = require('web.core');
    var FormController = require('web.FormController');
    var FormRenderer = require('web.FormRenderer');
    var Context = require('web.Context');
    const { generateID } = require('web.utils');  
    const viewRegistry = require('web.view_registry'); 
    var _lt = core._lt;
    console.log("in Form view function");

    var CustomFormControler = FormController.extend({
        custom_events: _.extend({}, FormController.prototype.custom_events, {
            button_clicked: '_onButtonClicked',
            
        }),
        _onButtonClicked: function (ev) {
            // stop the event's propagation as a form controller might have other
            // form controllers in its descendants (e.g. in a FormViewDialog)
            alert("in butoon clicked function");
            ev.stopPropagation();
            var self = this;
            var def;
    
            this._disableButtons();
    
            function saveAndExecuteAction () {
                alert("in button clicked function");
                return self.saveRecord(self.handle, {
                    stayInEdit: true,
                }).then(function () {
                    // we need to reget the record to make sure we have changes made
                    // by the basic model, such as the new res_id, if the record is
                    // new.
                    var record = self.model.get(ev.data.record.id);
                    return self._callButtonAction(attrs, record);
                });
            }
            var attrs = ev.data.attrs;
            if (attrs.confirm) {
                def = new Promise(function (resolve, reject) {
                    Dialog.confirm(this, attrs.confirm, {
                        confirm_callback: saveAndExecuteAction,
                    }).on("closed", null, resolve);
                });
            } else if (attrs.special === 'cancel') {
                def = this._callButtonAction(attrs, ev.data.record);
            } else if (!attrs.special || attrs.special === 'save') {
                // save the record but don't switch to readonly mode
                def = saveAndExecuteAction();
            } else {
                console.warn('Unhandled button event', ev);
                return;
            }
    
            // Kind of hack for FormViewDialog: button on footer should trigger the dialog closing
            // if the `close` attribute is set
            def.then(function () {
                self._enableButtons();
                if (attrs.close) {
                    self.trigger_up('close_dialog');
                }
            }).guardedCatch(this._enableButtons.bind(this));
        },
       
    });
    
    
    
    var CustomFormView = FormView.extend({
        
        
        config: _.extend({}, FormView.prototype.config, {
            Renderer: FormRenderer,
            Controller: CustomFormControler,
        }),
        display_name: _lt('CustomForm'),
        
         /**
     * @override
     */
       
        init: function () {
            console.log("In init function");
           
        },

       
});
viewRegistry.add('customform', CustomFormView);
return CustomFormView;



    
});
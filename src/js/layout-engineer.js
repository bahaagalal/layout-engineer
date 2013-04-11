// plugin maker
jQuery.pluginMaker = function(plugin) {
    // registers the plugin into jQuery namespace by its name property
    jQuery.fn[plugin.prototype.name] = function(options){
        // get the args and slice it removing the first argument
        var args = jQuery.makeArray(arguments),after = args.slice(1);
        // apply the plugin on every and each element
        return this.each(function(){
            // check if the plugin has already run on such an element
            // by looking for jQuery data element with the name of the plugin
            // which should contain the plugin object on this element
            var instance = jQuery.data(this, plugin.prototype.name);
            if (instance) 
            {
                // if options is string ... this means u want to invoke 
                // a function of this plugin
                // so just invoke it and pass the remaining parameters as 
                // options
                if (typeof options == "string") 
                {
                    instance[options].apply(instance, after);
                } 
                // if options is object this means you want to extend the plugin
                // options after initializing it
                else if (typeof options === 'object') 
                {
                    jQuery.extend(instance.options,options);
                } 
                // else update the plugin instance on the element if there is already
                // an update function
                else if (instance.update) 
                {
                    instance.update.apply(instance, args);
                }
            }
            else 
            {
                // if the plugin didn't run on this element apply it
                // passing the options array to it
                new plugin(this, options);
            }
        });
    };
};

// defining our plugin namespace
LayoutEngineer = {};

// the prototype for LayoutEngineer Base Plugin
LayoutEngineer.Base = function(element, options){
    if(element)
    {
        this.init(element,options);
    }
}

// extend the LayoutEngineer.Base class
jQuery.extend(LayoutEngineer.Base.prototype, {

    // jQuery namespace plugin name
    name: "layoutEngineer",
    // default options array that could be extended by 
    // passing optional options array when initing the plugin
    options: {
        pageName: 'New Page',
        lastSaveTime: true,
        addBlockButtonLabel: '+ Add Block',
        closeButtonLabel: 'Close',
        addTextBlockButtonLabel: 'Text',
        addImageBlockButtonLabel: 'Image',
        addCodeBlockButtonLabel: 'Code',
        removeBlockModalTitle: '? Remove Block',
        removeBlockModalMessage: 'Are you sure you wish to remove this block?',
        okButtonLabel: 'OK',
        cancelButtonLabel: 'Cancel',
    },

    // init function
    init: function(element, options){
        // save a reference to our element
        this.element = jQuery(element);
        // extend the options with the optional options array
        jQuery.extend(this.options, options);
        // register our plugin data object on the element
        jQuery.data(element, this.name, this);
        // add the wrapper class
        this.element.addClass('wrapper');
        // create the layout engineer header
        this.layoutEngineerHeader = jQuery('<div></div>').prependTo(this.element).addClass('layout-engineer-header position-fixed z-index-4 background-color-white');
        // add the page name
        if(this.options.pageName != null && this.options.pageName != false)
        {
            this.layoutEngineerPageName = jQuery('<h1></h1>').appendTo(this.layoutEngineerHeader).addClass('layout-engineer-pagetitle font-weight-regular font-size-large color-black').html(this.options.pageName);
        }
        // add last save time 
        if(this.options.lastSaveTime == true)
        {
            this.layoutEngineerLastSaveTime = jQuery('<h3></h3>').appendTo(this.layoutEngineerHeader).addClass('layout-engineer-lastsavetime font-weight-regular font-size-xsmall color-gray').html('last saved few moments ago');
        }
        // add add block button
        if(this.options.addBlockButtonLabel == false || this.options.addBlockButtonLabel == null)
        {
            this.options.addBlockButtonLabel = '+ Add Block';
        }
        this.layoutEngineerAddBlockButton = jQuery('<a></a>').prependTo(this.layoutEngineerHeader).wrap('<ul class="layout-engineer-buttons float-right" />').wrap('<li class="display-inline-block" />').addClass('layout-engineer-addblockbutton display-inline-block background-color-black color-white border-radius-large font-weight-bold font-size-large layout-engineer-button').attr('href','javascript:void(0);').html(this.options.addBlockButtonLabel);
        // creates the layout engineer add block modal window
        this.layoutEngineerAddBlockModalWindow = jQuery('<div></div>').prependTo(this.element).addClass('layout-engineer-addblockmodal layout-engineer-modal background-color-black position-absolute z-index-3').hide();
        // add the close button
        if(this.options.closeButtonLabel == false || this.options.closeButtonLabel == null)
        {
            this.options.closeButtonLabel = 'Close';
        }
        this.layoutEngineerAddBlockModalWindowCloseButton = jQuery('<a></a>').prependTo(this.layoutEngineerAddBlockModalWindow).addClass('layout-engineer-modal-close-button float-right font-weight-bold font-size-large color-white background-no-repeat').attr('href','javascript:void(0);').html(this.options.closeButtonLabel);
        // add the modal window label
        this.layoutEngineerAddBlockModalWindow.append('<h1 class="font-weight-bold font-size-large color-white">' + this.options.addBlockButtonLabel + '</h1>');
        // bind to the click function of add block button
        this.layoutEngineerAddBlockButton.bind('click', jQuery.proxy(this.showAddBlockModalWindow, this));
        // bind to the click function of close modal button
        this.layoutEngineerAddBlockModalWindowCloseButton.bind('click', jQuery.proxy(this.hideAddBlockModalWindow, this));
        // add the modal window block type buttons
        this.layoutEngineerAddBlockModalWindowButtonsContainer = jQuery('<ul></ul>').appendTo(this.layoutEngineerAddBlockModalWindow).addClass('display-block layout-engineer-block-types');
        // add "add text block button"
        if(this.options.addTextBlockButtonLabel != null && this.options.addTextBlockButtonLabel != false)
        {
            this.layoutEngineerAddTextBlockButton = jQuery('<a></a>').appendTo(this.layoutEngineerAddBlockModalWindowButtonsContainer).wrap('<li class="display-inline-block layout-engineer-block-type-item" />').addClass('layout-engineer-addtextblock display-inline-block background-color-gray color-white font-size-large font-weight-bold layout-engineer-block-type').attr('href','javascript:void(0);').html('<span class="display-block background-no-repeat layout-engineer-block-type-icon layout-engineer-block-type-text-icon"></span>' + this.options.addTextBlockButtonLabel);
            // bind to the click function of add text block button
            this.layoutEngineerAddTextBlockButton.bind('click', jQuery.proxy(this.addTextBlock, this));
        }
        // add "add image block button"
        if(this.options.addImageBlockButtonLabel != null && this.options.addImageBlockButtonLabel != false)
        {
            this.layoutEngineerAddImageBlockButton = jQuery('<a></a>').appendTo(this.layoutEngineerAddBlockModalWindowButtonsContainer).wrap('<li class="display-inline-block layout-engineer-block-type-item" />').addClass('layout-engineer-addimageblock display-inline-block background-color-gray color-white font-size-large font-weight-bold layout-engineer-block-type').attr('href','javascript:void(0);').html('<span class="display-block background-no-repeat layout-engineer-block-type-icon layout-engineer-block-type-image-icon"></span>' + this.options.addImageBlockButtonLabel);
            // bind to the click function of add image block button
            this.layoutEngineerAddImageBlockButton.bind('click', jQuery.proxy(this.addImageBlock, this));
        }
        // add "add code block button"
        if(this.options.addCodeBlockButtonLabel != null && this.options.addCodeBlockButtonLabel != false)
        {
            this.layoutEngineerAddCodeBlockButton = jQuery('<a></a>').appendTo(this.layoutEngineerAddBlockModalWindowButtonsContainer).wrap('<li class="display-inline-block layout-engineer-block-type-item" />').addClass('layout-engineer-addcodeblock display-inline-block background-color-gray color-white font-size-large font-weight-bold layout-engineer-block-type').attr('href','javascript:void(0);').html('<span class="display-block background-no-repeat layout-engineer-block-type-icon layout-engineer-block-type-code-icon"></span>' + this.options.addCodeBlockButtonLabel);
            // bind to the click function of add code block button
            this.layoutEngineerAddCodeBlockButton.bind('click', jQuery.proxy(this.addCodeBlock, this));
        }
        // creates the layout engineer remove block modal window
        if(this.options.removeBlockModalTitle == false || this.options.removeBlockModalTitle == null)
        {
            this.options.removeBlockModalTitle = '? Remove Block';
        }
        if(this.options.removeBlockModalMessage == false || this.options.removeBlockModalMessage == null)
        {
            this.options.removeBlockModalMessage = 'Are you sure you wish to remove this block?';
        }
        this.layoutEngineerRemoveBlockModalWindow = jQuery('<div></div>').prependTo(this.element).addClass('layout-engineer-removeblockmodal layout-engineer-modal background-color-black position-absolute z-index-3').html('<h1 class="font-weight-regular font-size-xlarge color-white">' + this.options.removeBlockModalTitle + '</h1><p class="font-weight-regular font-size-medium color-white layout-engineer-remove-block-message">' + this.options.removeBlockModalMessage + '</p>').hide();
        this.layoutEngineerRemoveBlockModalWindowButtonsContainer = jQuery('<ul></ul>').appendTo(this.layoutEngineerRemoveBlockModalWindow).addClass('display-block text-align-right');
        // adding the cancel and ok buttons to remove block modal window
        if(this.options.okButtonLabel == false || this.options.okButtonLabel == null)
        {
            this.options.okButtonLabel = 'OK';
        }
        if(this.options.cancelButtonLabel == false || this.options.cancelButtonLabel == null)
        {
            this.options.cancelButtonLabel = 'Cancel';
        }
        this.layoutEngineerRemoveBlockModalWindowCancelButton = jQuery('<a></a>').appendTo(this.layoutEngineerRemoveBlockModalWindowButtonsContainer).wrap('<li class="display-inline-block" />').addClass('display-inline-block color-white font-weight-normal font-size-medium layout-engineer-cancel-button').attr('href', 'javascript:void(0);').html(this.options.cancelButtonLabel);
        this.layoutEngineerRemoveBlockModalWindowOKButton = jQuery('<a></a>').appendTo(this.layoutEngineerRemoveBlockModalWindowButtonsContainer).wrap('<li class="display-inline-block" />').addClass('display-inline-block background-color-white color-black border-radius-large font-weight-normal font-size-medium layout-engineer-ok-button').attr('href', 'javascript:void(0);').html(this.options.okButtonLabel);
        // bind to click functions on ok and cancel button
        this.layoutEngineerRemoveBlockModalWindowOKButton.bind('click', jQuery.proxy(this.removeBlock, this));
        this.layoutEngineerRemoveBlockModalWindowCancelButton.bind('click', jQuery.proxy(this.hideRemoveBlockModalWindow, this));
        // add layout engineer page container
        this.layoutEngineerPage = jQuery('<div></div>').appendTo(this.element).addClass('layout-engineer-page');
    },

    // show add block modal window
    showAddBlockModalWindow: function(){
        jQuery('body').animate({
            scrollTop: 0
        }, 200);
        this.layoutEngineerAddBlockModalWindow.css('top', ((jQuery(window).height() - this.layoutEngineerAddBlockModalWindow.height()) / 3) + 'px');
        this.layoutEngineerAddBlockModalWindow.css('left', ((jQuery(window).width() - this.layoutEngineerAddBlockModalWindow.width()) / 2) + 'px');
        this.layoutEngineerAddBlockModalWindow.show();
    },

    // hide add block modal window
    hideAddBlockModalWindow: function(){
        this.layoutEngineerAddBlockModalWindow.hide();
    },

    // show remove block modal window
    showRemoveBlockModalWindow: function(event){
        this.activeLayoutEngineerBlock = jQuery(event.target).closest('.layout-engineer-block');
        this.layoutEngineerRemoveBlockModalWindow.css('top', ((jQuery(document).height() - this.layoutEngineerRemoveBlockModalWindow.height()) / 2) + 'px');
        this.layoutEngineerRemoveBlockModalWindow.css('left', ((jQuery(window).width() - this.layoutEngineerRemoveBlockModalWindow.width()) / 2) + 'px');
        this.layoutEngineerRemoveBlockModalWindow.show();
    },

    // hide remove block modal window
    hideRemoveBlockModalWindow: function(){
        this.activeLayoutEngineerBlock = null;
        this.layoutEngineerRemoveBlockModalWindow.hide();
    },

    // add text block
    addTextBlock: function(){
        var block = this.addBlock();
        //block.css('background-color','black');
    },

    // add image block
    addImageBlock: function(){
        var block = this.addBlock();
        //block.css('background-color','yellow');
    },

    // add code block
    addCodeBlock: function(){
        var block = this.addBlock();
        //block.css('background-color','red');
    },

    // basic add block
    addBlock: function(){
        var block = jQuery('<div></div>').appendTo(this.layoutEngineerPage).addClass('layout-engineer-block font-size-medium font-weight-regular color-black position-relative display-inline-block background-color-white').html('<span class="layout-engineer-drag-icon display-inline-block position-absolute background-no-repeat"></span>');
        var blockToolPane = jQuery('<div></div>').appendTo(block).addClass('layout-engineer-toolpane position-absolute display-block');
        var blockRightToolPane = jQuery('<ul></ul>').appendTo(blockToolPane).addClass('layout-engineer-right-pane display-inline-block background-color-black float-right');
        var blockLeftHalfWidthButton = jQuery('<a></a>').appendTo(blockRightToolPane).wrap('<li class="display-inline-block" />').addClass('display-inline-block layout-engineer-toolpane-icon layout-engineer-toolpane-icon-50left').attr('href', 'javascript:void(0);');
        var blockFullWidthButton = jQuery('<a></a>').appendTo(blockRightToolPane).wrap('<li class="display-inline-block" />').addClass('display-inline-block layout-engineer-toolpane-icon layout-engineer-toolpane-icon-100full').attr('href', 'javascript:void(0);');
        var blockRightHalfWidthButton = jQuery('<a></a>').appendTo(blockRightToolPane).wrap('<li class="display-inline-block" />').addClass('display-inline-block layout-engineer-toolpane-icon layout-engineer-toolpane-icon-50right').attr('href', 'javascript:void(0);');
        var blockLeftToolPane = jQuery('<ul></ul>').appendTo(blockToolPane).addClass('layout-engineer-left-pane display-inline-block background-color-black');
        var blockTrashButton = jQuery('<a></a>').appendTo(blockLeftToolPane).wrap('<li class="display-inline-block layout-engineer-toolpane-icon-element" />').addClass('display-inline-block layout-engineer-toolpane-icon layout-engineer-toolpane-icon-trash').attr('href', 'javascript:void(0)');
        // bind click events
        blockTrashButton.bind('click', jQuery.proxy(this.showRemoveBlockModalWindow, this));
        blockLeftHalfWidthButton.bind('click', jQuery.proxy(this.makeTheBlockHalfwidthToLeft, this));
        blockRightHalfWidthButton.bind('click', jQuery.proxy(this.makeTheBlockHalfwidthToRight, this));
        blockFullWidthButton.bind('click', jQuery.proxy(this.makeTheBlockFullwidth, this));
        // make all blocks movable
        this.layoutEngineerPage.find('.layout-engineer-block').resizable({
            maxWidth: this.layoutEngineerPage.width(),
            autoHide: false,
            grid: [ 10, 10 ],
            handles: "e, s, w, se, sw",
            resize: function(event, ui){
                block.find('.ui-resizable-e, .ui-resizable-w').css('top', ((block.height() - 25) / 2) + 'px');
                block.find('.ui-resizable-s, .ui-resizable-n').css('left', ((block.width() - 25) / 2) + 'px');
            },
        });
        block.find('.ui-resizable-e, .ui-resizable-w').css('top', ((block.height() - 25) / 2) + 'px');
        block.find('.ui-resizable-s, .ui-resizable-n').css('left', ((block.width() - 25) / 2) + 'px');
        this.layoutEngineerPage.sortable({
            items: '.layout-engineer-block',
            cursor: 'move'
        });
        
        this.hideAddBlockModalWindow();
        return block;
    },

    // remove block
    removeBlock: function(){
        this.activeLayoutEngineerBlock.remove();
        this.hideRemoveBlockModalWindow();
    },

    // make the block half width to left
    makeTheBlockHalfwidthToLeft: function(event){
        var block = jQuery(event.target).closest('.layout-engineer-block');
        block.css('width', '50%');
    },

    // make the block half width to right
    makeTheBlockHalfwidthToRight: function(event){
        var block = jQuery(event.target).closest('.layout-engineer-block');
        block.css('width', '50%');
    },

    // make the block full width
    makeTheBlockFullwidth: function(event){
        var block = jQuery(event.target).closest('.layout-engineer-block');
        block.css('width', '100%');
    },

    // destroy function
    destroy: function(){
        // removing our registered data object from the element
        jQuery.removeData(this.element, this.name);
        // destroy the constructed html
        this.element.html('');
    }
});

// registering our plugin into the jQuery namespace
jQuery.pluginMaker(LayoutEngineer.Base);
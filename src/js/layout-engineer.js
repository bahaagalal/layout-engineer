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

// the prototype for LayoutEngineer Code Block Plugin
LayoutEngineer.CodeBlock = function(element, options){
    if(element)
    {
        this.init(element,options);
    }
}

jQuery.extend(LayoutEngineer.CodeBlock.prototype,{

    name: "layoutEngineerCodeBlock",
    options: {
    },

    init: function(element, options){

        // checking if it is a valid textarea input 
        if(jQuery(element).is('textarea'))
        {
            // save a reference to our element
            this.element = jQuery(element);
            // extend the options
            jQuery.extend(this.options, options);
            // put this object in the data element
            jQuery.data(element, this.name, this);
            // reference the block element
            this.block = this.element.closest('.layout-engineer-block');
            // reference the toolpane
            this.toolPane = this.block.find('.layout-engineer-left-pane');
            // default height
            this.defaultHeight = this.element.outerHeight();
            // create the toolbar pane
            // preview button
            this.previewButton = jQuery('<a></a>').prependTo(this.toolPane).wrap('<li class="display-inline-block" />').addClass('display-inline-block layout-engineer-toolpane-icon layout-engineer-toolpane-icon-preview layout-engineer-toolpane-icon-highlighted').attr('href', 'javascript:void(0);');
            // code button
            this.codeButton = jQuery('<a></a>').prependTo(this.toolPane).wrap('<li class="display-inline-block" />').addClass('display-inline-block layout-engineer-toolpane-icon layout-engineer-toolpane-icon-code').attr('href', 'javascript:void(0);');
            // binding actions on code and preview buttons
            this.codeButton.bind('click', jQuery.proxy(this.commandCode, this));
            this.previewButton.bind('click', jQuery.proxy(this.commandPreview, this));
            // binding an action for auto resizing when writing content in the text bar
            this.element.bind('keyup', jQuery.proxy(this.textBoxAutoResize, this));
            // bind for block resizing element
            this.block.bind('resize', jQuery.proxy(this.blockResize, this));
            // create the iframe for the preview
            this.previewIframe = jQuery('<iframe></iframe>').appendTo(this.block).addClass('layout-engineer-iframe');
            // updating the iframe contents with what we already have
            this.previewIframe.contents().find('body').html(this.element.val());
            // hide the element
            this.element.hide();
        }
    },

    commandCode: function(){
        this.element.show().focus();
        this.previewIframe.hide();
        this.codeButton.addClass('layout-engineer-toolpane-icon-highlighted');
        this.previewButton.removeClass('layout-engineer-toolpane-icon-highlighted');
        this.textBoxAutoResize();
    },

    commandPreview: function(){
        this.element.hide();
        this.previewIframe.show().contents().find('body').html(this.element.val());
        this.codeButton.removeClass('layout-engineer-toolpane-icon-highlighted');
        this.previewButton.addClass('layout-engineer-toolpane-icon-highlighted');
        this.iframeAutoResize();
    },

    textBoxAutoResize: function(){
        this.block.css('height', this.defaultHeight + 'px');
        this.block.css('height', parseInt(this.element.prop('scrollHeight')) + 'px').trigger('autoresize');
    },

    iframeAutoResize: function(){
        this.block.css('height', this.defaultHeight + 'px');
        this.block.css('height', parseInt(this.previewIframe.contents().find('body').outerHeight() + (2 * this.defaultHeight)) + 'px').trigger('autoresize');
    },

    blockResize: function(){
        if(this.element.is(':visible'))
        {
            this.textBoxAutoResize();
        }
        else
        {
            this.iframeAutoResize();
        }
    },

    destroy: function(){
        // removing buttons from the toolPane
        this.codeButton.remove();
        this.previewButton.remove();
        // removing the iframe
        this.previewIframe.remove();
        // making sure the element is shown
        this.element.show();   
        // removing the data object from the element
        jQuery.removeData(this.element, this.name);  
    }
});

// the prototype for LayoutEngineer Text Block Plugin
LayoutEngineer.TextBlock = function(element, options){
    if(element)
    {
        this.init(element,options);
    }
}

jQuery.extend(LayoutEngineer.TextBlock.prototype,{

    name: "layoutEngineerTextBlock",
    options: {
    },

    init: function(element, options){

        // checking if it is a valid textarea input 
        if(jQuery(element).is('textarea'))
        {
            // save a reference to our element
            this.element = jQuery(element);
            // extend the options
            jQuery.extend(this.options, options);
            // put this object in the data element
            jQuery.data(element, this.name, this);
            // hide the element
            this.element.hide();
            // reference the block element
            this.block = this.element.closest('.layout-engineer-block');
            // reference the toolpane
            this.toolPane = this.block.find('.layout-engineer-left-pane');
            // default height
            this.defaultHeight = this.element.outerHeight();
            // create the toolbar pane   
            this.codeButton = jQuery('<a></a>').prependTo(this.toolPane).wrap('<li class="display-inline-block" />').addClass('display-inline-block layout-engineer-toolpane-icon layout-engineer-toolpane-icon-code').attr('href', 'javascript:void(0);');
            this.colorButton = jQuery('<a></a>').prependTo(this.toolPane).wrap('<li class="display-inline-block" />').addClass('display-inline-block layout-engineer-toolpane-icon layout-engineer-toolpane-icon-color').attr('href', 'javascript:void(0);');
            this.linkButton = jQuery('<a></a>').prependTo(this.toolPane).wrap('<li class="display-inline-block" />').addClass('display-inline-block layout-engineer-toolpane-icon layout-engineer-toolpane-icon-link').attr('href', 'javascript:void(0);');
            this.orderedlistButton = jQuery('<a></a>').prependTo(this.toolPane).wrap('<li class="display-inline-block" />').addClass('display-inline-block layout-engineer-toolpane-icon layout-engineer-toolpane-icon-ordered-list').attr('href', 'javascript:void(0);');
            this.unorderedlistButton = jQuery('<a></a>').prependTo(this.toolPane).wrap('<li class="display-inline-block" />').addClass('display-inline-block layout-engineer-toolpane-icon layout-engineer-toolpane-icon-unordered-list').attr('href', 'javascript:void(0);');
            this.justifyButton = jQuery('<a></a>').prependTo(this.toolPane).wrap('<li class="display-inline-block" />').addClass('display-inline-block layout-engineer-toolpane-icon layout-engineer-toolpane-icon-align-justify').attr('href', 'javascript:void(0);'); 
            this.rightButton = jQuery('<a></a>').prependTo(this.toolPane).wrap('<li class="display-inline-block" />').addClass('display-inline-block layout-engineer-toolpane-icon layout-engineer-toolpane-icon-align-right').attr('href', 'javascript:void(0);');
            this.centerButton = jQuery('<a></a>').prependTo(this.toolPane).wrap('<li class="display-inline-block" />').addClass('display-inline-block layout-engineer-toolpane-icon layout-engineer-toolpane-icon-align-center').attr('href', 'javascript:void(0);');
            this.leftButton = jQuery('<a></a>').prependTo(this.toolPane).wrap('<li class="display-inline-block" />').addClass('display-inline-block layout-engineer-toolpane-icon layout-engineer-toolpane-icon-align-left').attr('href', 'javascript:void(0);');
            this.h3Button = jQuery('<a></a>').prependTo(this.toolPane).wrap('<li class="display-inline-block" />').addClass('display-inline-block layout-engineer-toolpane-icon layout-engineer-toolpane-icon-h3').attr('href', 'javascript:void(0);');
            this.h2Button = jQuery('<a></a>').prependTo(this.toolPane).wrap('<li class="display-inline-block" />').addClass('display-inline-block layout-engineer-toolpane-icon layout-engineer-toolpane-icon-h2').attr('href', 'javascript:void(0);');
            this.h1Button = jQuery('<a></a>').prependTo(this.toolPane).wrap('<li class="display-inline-block" />').addClass('display-inline-block layout-engineer-toolpane-icon layout-engineer-toolpane-icon-h1').attr('href', 'javascript:void(0);');
            this.italicButton = jQuery('<a></a>').prependTo(this.toolPane).wrap('<li class="display-inline-block" />').addClass('display-inline-block layout-engineer-toolpane-icon layout-engineer-toolpane-icon-italic').attr('href', 'javascript:void(0);');
            this.underlineButton = jQuery('<a></a>').prependTo(this.toolPane).wrap('<li class="display-inline-block" />').addClass('display-inline-block layout-engineer-toolpane-icon layout-engineer-toolpane-icon-underline').attr('href', 'javascript:void(0);');
            this.boldButton = jQuery('<a></a>').prependTo(this.toolPane).wrap('<li class="display-inline-block" />').addClass('display-inline-block layout-engineer-toolpane-icon layout-engineer-toolpane-icon-bold').attr('href', 'javascript:void(0);');
            // binding actions on toolPane buttons
            this.boldButton.bind('click' , jQuery.proxy(this.commandBold, this));
            this.underlineButton.bind('click', jQuery.proxy(this.commandUnderline, this));
            this.italicButton.bind('click' , jQuery.proxy(this.commandItalic, this));
            this.h1Button.bind('click' , jQuery.proxy(this.commandH1, this));
            this.h2Button.bind('click' , jQuery.proxy(this.commandH2, this));
            this.h3Button.bind('click' , jQuery.proxy(this.commandH3, this));
            this.leftButton.bind('click' , jQuery.proxy(this.commandLeft, this));
            this.centerButton.bind('click' , jQuery.proxy(this.commandCenter, this));
            this.rightButton.bind('click' , jQuery.proxy(this.commandRight, this));
            this.justifyButton.bind('click' , jQuery.proxy(this.commandJustify, this));
            this.unorderedlistButton.bind('click' , jQuery.proxy(this.commandUnorderedlist, this));
            this.orderedlistButton.bind('click' , jQuery.proxy(this.commandOrderedlist, this));
            this.codeButton.bind('click' , jQuery.proxy(this.commandCode, this));
            // bind for block resizing element
            this.block.bind('resize', jQuery.proxy(this.blockResize, this));
            // create the iframe for the code editing
            this.editorIframe = jQuery('<iframe></iframe>').appendTo(this.block).addClass('layout-engineer-iframe');
            // reference the object of the iframe
            this.editorWidget = this.editorIframe.get(0);
            // referening the iframe content document which is our editor
            if (this.editorWidget.contentDocument)
            {
                this.editor = this.editorWidget.contentDocument;
            }
            else
            {
                this.editor = this.editorWidget.contentWindow.document;
            }
            if ('contentEditable' in this.editor.body) 
            {
                this.editor.body.contentEditable = true;
            }
            else if ('designMode' in this.editor) 
            {
                this.editor.designMode = "on";                
            }
            // updating the iframe contents with what we already have
            this.editorIframe.contents().find('body').html(this.element.val());
            // bind event to detect if text is selected
            this.editorIframe.contents().find('body').bind('mouseup', jQuery.proxy(this.getSelectionState, this));
            // bind event to update the corrosponding textarea on change
            this.editorIframe.contents().find('body').bind('keyup', jQuery.proxy(this.updateTextArea, this));
            // bind event to textarea auto resize
            this.element.bind('keyup', jQuery.proxy(this.textBoxAutoResize, this));
            // initializing 
            this.iframeAutoResize();
            this.editor.body.focus();
        }
    },

    updateTextArea: function(){
        this.element.val(this.editorIframe.contents().find('body').html());
        this.iframeAutoResize();
    },

    highlightButton: function(button, state){
        // remove or add class highlight to the button according to the state!
        if(state == true)
        {
            button.addClass('layout-engineer-toolpane-icon-highlighted');
        }
        else if(state == false)
        {
            button.removeClass('layout-engineer-toolpane-icon-highlighted');
        }
        return state;
    },

    execCommand: function(commandName, parameter){
        if(! parameter) 
        {
            parameter = null;
        }
        // execute the command and update the corrosponding textarea
        this.editor.execCommand(commandName, false, parameter);
        this.updateTextArea();
        this.getSelectionState();
    },

    queryCommandState: function(commandName){
        return this.editor.queryCommandState(commandName);
    },

    queryCommandValue: function(commandName){
        return this.editor.queryCommandValue(commandName);
    },

    getSelectionState: function(){
        this.isBold();
        this.isUnderline();
        this.isItalic();
        this.isH1();
        this.isH2();
        this.isH3();
        this.isLeft();
        this.isCenter();
        this.isRight();
        this.isJustify();
        this.isUnorderedList();
        this.isOrderedList();
        this.iframeAutoResize();
    },

    commandBold: function(){
        this.execCommand('bold');
    },
    commandUnderline: function(){
        this.execCommand('underline');
    },
    commandItalic: function(){
        this.execCommand('italic');
    },
    commandH1: function(){
        if(this.isH1())
        {
            this.execCommand('formatBlock', 'p');
        }
        else
        {
            this.execCommand('formatBlock', 'h1');
        }
    },
    commandH2: function(){
        if(this.isH2())
        {
            this.execCommand('formatBlock', 'p');
        }
        else
        {
            this.execCommand('formatBlock', 'h2');
        }
    },
    commandH3: function(){
        if(this.isH3())
        {
            this.execCommand('formatBlock', 'p');
        }
        else
        {
            this.execCommand('formatBlock', 'h3');
        }
    },
    commandLeft: function(){
        this.execCommand('justifyLeft');
    },
    commandCenter: function(){
        this.execCommand('justifyCenter');
    },
    commandRight: function(){
        this.execCommand('justifyRight');
    },
    commandJustify: function(){
        this.execCommand('justifyFull');
    },
    commandUnorderedlist: function(){
        this.execCommand('insertUnorderedList');
    },
    commandOrderedlist: function(){
        this.execCommand('insertOrderedList');
    },
    commandCode: function(){
        /*
        if(this.element.is(':visible'))
        {
            this.editorIframe.contents().find('body').html(this.element.val());
            this.iframeAutoResize();
            this.editor.body.focus();
        }
        else
        {
            this.toolPane.find('a').removeClass('layout-engineer-toolpane-icon-highlighted');
            this.element.focus();
        }
        this.element.toggle();
        this.editorIframe.toggle();
        this.codeButton.toggleClass('layout-engineer-toolpane-icon-highlighted');*/
    },

    textBoxAutoResize: function(){
        this.block.css('height', this.defaultHeight + 'px');
        this.block.css('height', parseInt(this.element.outerHeight()) + 'px').trigger('autoresize');
    },

    iframeAutoResize: function(){
        var scrollTop = jQuery(document).scrollTop();
        var currentHeight = this.block.height();
        this.block.css('height', this.defaultHeight + 'px');
        var newHeight = parseInt(this.editorIframe.contents().find('body').outerHeight() + (2 * this.defaultHeight));
        this.block.css('height', newHeight + 'px').trigger('autoresize');
        if((newHeight - currentHeight) > this.defaultHeight)
        {
            scrollTop = scrollTop + (newHeight - currentHeight);
        }
        jQuery(document).scrollTop(scrollTop);
    },

    blockResize: function(){
        if(this.element.is(':visible'))
        {
            this.textBoxAutoResize();
        }
        else
        {
            this.iframeAutoResize();
        }
    },

    isBold: function(){
        this.highlightButton(this.boldButton, this.queryCommandState('bold'));
    },
    isUnderline: function(){
        this.highlightButton(this.underlineButton, this.queryCommandState('underline'));
    },
    isH1: function(){
        return this.highlightButton(this.h1Button, (this.queryCommandValue('formatBlock') == 'h1'));
    },
    isH2: function(){
        return this.highlightButton(this.h2Button, (this.queryCommandValue('formatBlock') == 'h2'));
    },
    isH3: function(){
        return this.highlightButton(this.h3Button, (this.queryCommandValue('formatBlock') == 'h3'));
    },
    isItalic: function(){
        this.highlightButton(this.italicButton, this.queryCommandState('italic'));
    },
    isLeft: function(){
        this.highlightButton(this.leftButton, this.queryCommandState('justifyLeft'));
    },
    isCenter: function(){
        this.highlightButton(this.centerButton, this.queryCommandState('justifyCenter'));
    },
    isRight: function(){
        this.highlightButton(this.rightButton, this.queryCommandState('justifyRight'));
    },
    isJustify: function(){
        this.highlightButton(this.justifyButton, this.queryCommandState('justifyFull'));
    },
    isUnorderedList: function(){
        this.highlightButton(this.unorderedlistButton, this.queryCommandState('insertUnorderedList'));
    },
    isOrderedList: function(){
        this.highlightButton(this.orderedlistButton, this.queryCommandState('insertOrderedList'));
    },

    destroy: function(){
        // removing buttons from the toolPane
        // removing the iframe
        this.editorIframe.remove();
        // making sure the element is shown
        this.element.show();   
        // removing the data object from the element
        jQuery.removeData(this.element, this.name);  
    }
});

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
        // control the resizing behaviour of the block
        block.resizable({
            maxWidth: this.layoutEngineerPage.width(),
            autoHide: false,
            grid: [ 10, 10 ],
            handles: "e, w",
            resize: function(event, ui){
                ui.element.find('.ui-resizable-e, .ui-resizable-w').css('top', ((ui.element.height() - 25) / 2) + 'px');
                ui.element.find('.ui-resizable-s, .ui-resizable-n').css('left', ((ui.element.width() - 25) / 2) + 'px');
            },
        });
        this.adjustResizeHandlersPosition(block);
        // extending the functionality of the basic block and turn it into code block
        var element = jQuery('<textarea></textarea>').appendTo(block).addClass('layout-engineer-textarea display-block font-weight-regular font-size-medium').layoutEngineerTextBlock();
    },

    // add image block
    addImageBlock: function(){
        var block = this.addBlock();
        //block.css('background-color','yellow');
    },

    // add code block
    addCodeBlock: function(){
        // add basic block
        var block = this.addBlock();
        // control the resizing behaviour of the block
        block.resizable({
            maxWidth: this.layoutEngineerPage.width(),
            autoHide: false,
            grid: [ 10, 10 ],
            handles: "e, w",
            resize: function(event, ui){
                ui.element.find('.ui-resizable-e, .ui-resizable-w').css('top', ((ui.element.height() - 25) / 2) + 'px');
                ui.element.find('.ui-resizable-s, .ui-resizable-n').css('left', ((ui.element.width() - 25) / 2) + 'px');
            },
        });
        this.adjustResizeHandlersPosition(block);
        // extending the functionality of the basic block and turn it into code block
        var element = jQuery('<textarea></textarea>').appendTo(block).addClass('layout-engineer-textarea display-block font-weight-regular font-size-medium').layoutEngineerCodeBlock();
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
        this.layoutEngineerPage.sortable({
            items: '.layout-engineer-block',
            cursor: 'move'
        });
        block.bind('autoresize', jQuery.proxy(this.blockAutoResize, this));
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
        this.adjustResizeHandlersPosition(block);
    },

    // make the block half width to right
    makeTheBlockHalfwidthToRight: function(event){
        var block = jQuery(event.target).closest('.layout-engineer-block');
        block.css('width', '50%');
        this.adjustResizeHandlersPosition(block);
    },

    // make the block full width
    makeTheBlockFullwidth: function(event){
        var block = jQuery(event.target).closest('.layout-engineer-block');
        block.css('width', '100%');
        this.adjustResizeHandlersPosition(block);
    },

    adjustResizeHandlersPosition: function(block){
        block.find('.ui-resizable-e, .ui-resizable-w').css('top', ((block.height() - 25) / 2) + 'px');
        block.find('.ui-resizable-s, .ui-resizable-n').css('left', ((block.width() - 25) / 2) + 'px');
    },

    blockAutoResize: function(event){
        var block = jQuery(event.target);
        this.adjustResizeHandlersPosition(block);
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
jQuery.pluginMaker(LayoutEngineer.CodeBlock);
jQuery.pluginMaker(LayoutEngineer.TextBlock);
describe("Layout Engineer", function() {

	beforeEach(function() {
		jasmine.getFixtures().set('<div id="page-creator"></div>');
	});

	describe("Base", function(){

		afterEach(function(){
			jQuery('#page-creator').layoutEngineer('destroy');
		});

		describe("Init", function(){

			it("should registers the plugin object on the element", function() {
				jQuery('#page-creator').layoutEngineer();
				expect(jQuery('#page-creator').data('layoutEngineer')).not.toBe(null);
			});

			it("should extend the options array with the passed options object", function(){
				jQuery("#page-creator").layoutEngineer({
					'addBlockButtonName': 'Add New Block'
				});
				expect(jQuery("#page-creator").data('layoutEngineer').options.addBlockButtonName).toEqual('Add New Block');
			});

			it("should create the base control div", function(){
				jQuery('#page-creator').layoutEngineer();
				expect(jQuery("#page-creator").find('.layout-engineer-header').length).not.toEqual(0);
			});

			it("should create the base control div that should include page name", function(){
				jQuery('#page-creator').layoutEngineer();
				expect(jQuery("#page-creator").find('.layout-engineer-header').find('.layout-engineer-pagetitle').length).not.toEqual(0);
			});

			it("should create the base control div that should include last save time", function(){
				jQuery('#page-creator').layoutEngineer();
				expect(jQuery("#page-creator").find('.layout-engineer-header').find('.layout-engineer-lastsavetime').length).not.toEqual(0);
			});

			it("should create the base control div that should include add block button", function(){
				jQuery('#page-creator').layoutEngineer();
				expect(jQuery("#page-creator").find('.layout-engineer-header').find('.layout-engineer-addblockbutton').length).not.toEqual(0);
			});

			it("should change the page name if page name option is supplied", function(){
				jQuery("#page-creator").layoutEngineer({
					'pageName': 'Terms &amp; Privacy'
				});
				expect(jQuery("#page-creator").find('.layout-engineer-header').find('.layout-engineer-pagetitle').html()).toEqual('Terms &amp; Privacy');
			});

			it("should not include page name if page name option is false", function(){
				jQuery("#page-creator").layoutEngineer({
					'pageName': false
				});
				expect(jQuery("#page-creator").find('.layout-engineer-header').find('.layout-engineer-pagetitle').length).toEqual(0);
			});

			it("should not include page name if page name option is null", function(){
				jQuery("#page-creator").layoutEngineer({
					'pageName': null
				});
				expect(jQuery("#page-creator").find('.layout-engineer-header').find('.layout-engineer-pagetitle').length).toEqual(0);
			});

			it("should not include page name if page name option is empty string", function(){
				jQuery("#page-creator").layoutEngineer({
					'pageName': ''
				});
				expect(jQuery("#page-creator").find('.layout-engineer-header').find('.layout-engineer-pagetitle').length).toEqual(0);
			});

			it("should not include last save time if last save time option is false", function(){
				jQuery("#page-creator").layoutEngineer({
					'lastSaveTime': false
				});
				expect(jQuery("#page-creator").find('.layout-engineer-header').find('.layout-engineer-lastsavetime').length).toEqual(0);
			});

			it("should not include last save time if last save time option is null", function(){
				jQuery("#page-creator").layoutEngineer({
					'lastSaveTime': null
				});
				expect(jQuery("#page-creator").find('.layout-engineer-header').find('.layout-engineer-lastsavetime').length).toEqual(0);
			});

			it("should change the add block button label if one has been supplied", function(){
				jQuery("#page-creator").layoutEngineer({
					'addBlockButtonLabel': '+ Add New Block'
				});
				expect(jQuery("#page-creator").find('.layout-engineer-header').find('.layout-engineer-addblockbutton').html()).toEqual('+ Add New Block');
			});

			it("should use the add block button default label if null has been supplied as label", function(){
				jQuery("#page-creator").layoutEngineer({
					'addBlockButtonLabel': null
				});
				expect(jQuery("#page-creator").find('.layout-engineer-header').find('.layout-engineer-addblockbutton').html()).toEqual('+ Add Block');
			});

			it("should use the add block button default label if false has been supplied as label", function(){
				jQuery("#page-creator").layoutEngineer({
					'addBlockButtonLabel': false
				});
				expect(jQuery("#page-creator").find('.layout-engineer-header').find('.layout-engineer-addblockbutton').html()).toEqual('+ Add Block');
			});

			it("should use the add block button default label if empty string has been supplied as label", function(){
				jQuery("#page-creator").layoutEngineer({
					'addBlockButtonLabel': ''
				});
				expect(jQuery("#page-creator").find('.layout-engineer-header').find('.layout-engineer-addblockbutton').html()).toEqual('+ Add Block');
			});

			it("should add the add block modal window html", function(){
				jQuery("#page-creator").layoutEngineer();
				expect(jQuery("#page-creator").find('.layout-engineer-addblockmodal').length).not.toEqual(0);
			});

			it("should add the add block modal window html and hide it by default", function(){
				jQuery("#page-creator").layoutEngineer();
				expect(jQuery("#page-creator").find('.layout-engineer-addblockmodal').is(':visible')).not.toEqual(true);
			});

			it("should add the add block modal window html which should close button", function(){
				jQuery("#page-creator").layoutEngineer();
				expect(jQuery("#page-creator").find('.layout-engineer-addblockmodal').find('.layout-engineer-modal-close-button').length).not.toEqual(0);
			});

			it("should change the add block modal window close button label when one is supplied", function(){
				jQuery("#page-creator").layoutEngineer({
					closeButtonLabel: 'Close Modal'
				});
				expect(jQuery("#page-creator").find('.layout-engineer-addblockmodal').find('.layout-engineer-modal-close-button').html()).toEqual('Close Modal');
			});

			it("should not change the default add block modal window close button label when null is supplied as option", function(){
				jQuery("#page-creator").layoutEngineer({
					closeButtonLabel: null
				});
				expect(jQuery("#page-creator").find('.layout-engineer-addblockmodal').find('.layout-engineer-modal-close-button').html()).toEqual('Close');
			});

			it("should not change the default add block modal window close button label when false is supplied as option", function(){
				jQuery("#page-creator").layoutEngineer({
					closeButtonLabel: false
				});
				expect(jQuery("#page-creator").find('.layout-engineer-addblockmodal').find('.layout-engineer-modal-close-button').html()).toEqual('Close');
			});

			it("should not change the default add block modal window close button label when empty string is supplied as option", function(){
				jQuery("#page-creator").layoutEngineer({
					closeButtonLabel: ''
				});
				expect(jQuery("#page-creator").find('.layout-engineer-addblockmodal').find('.layout-engineer-modal-close-button').html()).toEqual('Close');
			});

			it("should change the add block modal window label when one is supplied", function(){
				jQuery("#page-creator").layoutEngineer({
					addBlockButtonLabel: '+ Add New Block'
				});
				expect(jQuery("#page-creator").find('.layout-engineer-addblockmodal').find('h1').html()).toEqual('+ Add New Block');
			});

			it("should not change the add block modal window label when null is supplied as option", function(){
				jQuery("#page-creator").layoutEngineer({
					addBlockButtonLabel: null
				});
				expect(jQuery("#page-creator").find('.layout-engineer-addblockmodal').find('h1').html()).toEqual('+ Add Block');
			});

			it("should not change the add block modal window label when false is supplied as option", function(){
				jQuery("#page-creator").layoutEngineer({
					addBlockButtonLabel: false
				});
				expect(jQuery("#page-creator").find('.layout-engineer-addblockmodal').find('h1').html()).toEqual('+ Add Block');
			});

			it("should not change the add block modal window label when empty string is supplied as option", function(){
				jQuery("#page-creator").layoutEngineer({
					addBlockButtonLabel: ''
				});
				expect(jQuery("#page-creator").find('.layout-engineer-addblockmodal').find('h1').html()).toEqual('+ Add Block');
			});

			it("should add the add block modal window html which should contain link to add new text block", function(){
				jQuery("#page-creator").layoutEngineer();
				expect(jQuery("#page-creator").find('.layout-engineer-addblockmodal').find('.layout-engineer-addtextblock').length).not.toEqual(0);
			});

			it("should change the add text block button label in the add block modal window if one is supplied", function(){
				jQuery("#page-creator").layoutEngineer({
					addTextBlockButtonLabel: 'Text Block'
				});
				expect(jQuery("#page-creator").find('.layout-engineer-addblockmodal').find('.layout-engineer-addtextblock').html()).toMatch('Text Block');
			});

			it("should not add the add text block button into the add block modal window if null is supplied as option", function(){
				jQuery("#page-creator").layoutEngineer({
					addTextBlockButtonLabel: null
				});
				expect(jQuery("#page-creator").find('.layout-engineer-addblockmodal').find('.layout-engineer-addtextblock').length).toEqual(0);
			});

			it("should not add the add text block button into the add block modal window if false is supplied as option", function(){
				jQuery("#page-creator").layoutEngineer({
					addTextBlockButtonLabel: false
				});
				expect(jQuery("#page-creator").find('.layout-engineer-addblockmodal').find('.layout-engineer-addtextblock').length).toEqual(0);
			});

			it("should not add the add text block button into the add block modal window if empty string is supplied as option", function(){
				jQuery("#page-creator").layoutEngineer({
					addTextBlockButtonLabel: ''
				});
				expect(jQuery("#page-creator").find('.layout-engineer-addblockmodal').find('.layout-engineer-addtextblock').length).toEqual(0);
			});

			it("should add the add block modal window html which should contain link to add new image block", function(){
				jQuery("#page-creator").layoutEngineer();
				expect(jQuery("#page-creator").find('.layout-engineer-addblockmodal').find('.layout-engineer-addimageblock').length).not.toEqual(0);
			});

			it("should change the add image block button label in the add block modal window if one is supplied", function(){
				jQuery("#page-creator").layoutEngineer({
					addImageBlockButtonLabel: 'Image Block'
				});
				expect(jQuery("#page-creator").find('.layout-engineer-addblockmodal').find('.layout-engineer-addimageblock').html()).toMatch('Image Block');
			});

			it("should not add the add image block button into the add block modal window if null is supplied as option", function(){
				jQuery("#page-creator").layoutEngineer({
					addImageBlockButtonLabel: null
				});
				expect(jQuery("#page-creator").find('.layout-engineer-addblockmodal').find('.layout-engineer-addimageblock').length).toEqual(0);
			});

			it("should not add the add image block button into the add block modal window if false is supplied as option", function(){
				jQuery("#page-creator").layoutEngineer({
					addImageBlockButtonLabel: false
				});
				expect(jQuery("#page-creator").find('.layout-engineer-addblockmodal').find('.layout-engineer-addimageblock').length).toEqual(0);
			});

			it("should not add the add image block button into the add block modal window if empty string is supplied as option", function(){
				jQuery("#page-creator").layoutEngineer({
					addImageBlockButtonLabel: ''
				});
				expect(jQuery("#page-creator").find('.layout-engineer-addblockmodal').find('.layout-engineer-addimageblock').length).toEqual(0);
			});

			it("should add the add block modal window html which should contain link to add new code block", function(){
				jQuery("#page-creator").layoutEngineer();
				expect(jQuery("#page-creator").find('.layout-engineer-addblockmodal').find('.layout-engineer-addcodeblock').length).not.toEqual(0);
			});

			it("should change the add code block button label in the add block modal window if one is supplied", function(){
				jQuery("#page-creator").layoutEngineer({
					addCodeBlockButtonLabel: 'Code Block'
				});
				expect(jQuery("#page-creator").find('.layout-engineer-addblockmodal').find('.layout-engineer-addcodeblock').html()).toMatch('Code Block');
			});

			it("should not add the add code block button into the add block modal window if null is supplied as option", function(){
				jQuery("#page-creator").layoutEngineer({
					addCodeBlockButtonLabel: null
				});
				expect(jQuery("#page-creator").find('.layout-engineer-addblockmodal').find('.layout-engineer-addcodeblock').length).toEqual(0);
			});

			it("should not add the add code block button into the add block modal window if false is supplied as option", function(){
				jQuery("#page-creator").layoutEngineer({
					addCodeBlockButtonLabel: false
				});
				expect(jQuery("#page-creator").find('.layout-engineer-addblockmodal').find('.layout-engineer-addcodeblock').length).toEqual(0);
			});

			it("should not add the add code block button into the add block modal window if empty string is supplied as option", function(){
				jQuery("#page-creator").layoutEngineer({
					addCodeBlockButtonLabel: ''
				});
				expect(jQuery("#page-creator").find('.layout-engineer-addblockmodal').find('.layout-engineer-addcodeblock').length).toEqual(0);
			});

			it("should show the add block modal window when add block button is clicked", function(){
				jQuery("#page-creator").layoutEngineer();
				jQuery("#page-creator").find('.layout-engineer-addblockbutton').trigger('click');
				expect(jQuery("#page-creator").find('.layout-engineer-addblockmodal').is(':visible')).toEqual(true);
			});

			it("should hide the add block modal window when modal close button is clicked", function(){
				jQuery("#page-creator").layoutEngineer();
				jQuery("#page-creator").find('.layout-engineer-addblockbutton').trigger('click');
				jQuery("#page-creator").find('.layout-engineer-modal-close-button').trigger('click');
				expect(jQuery("#page-creator").find('.layout-engineer-addblockmodal').is(':visible')).not.toEqual(true);
			});

			it("should add the remove block modal window html", function(){
				jQuery("#page-creator").layoutEngineer();
				expect(jQuery("#page-creator").find('.layout-engineer-removeblockmodal').length).not.toEqual(0);
			});

			it("should add the remove block modal window html and hide it by default", function(){
				jQuery("#page-creator").layoutEngineer();
				expect(jQuery("#page-creator").find('.layout-engineer-removeblockmodal').is(':visible')).not.toEqual(true);
			});

			it("should add ok button to the remove block modal window", function(){
				jQuery("#page-creator").layoutEngineer();
				expect(jQuery("#page-creator").find('.layout-engineer-removeblockmodal').find('.layout-engineer-ok-button').length).not.toEqual(0);
			});

			it("should change the ok button label in the remove block modal window when one is supplied", function(){
				jQuery("#page-creator").layoutEngineer({
					okButtonLabel: 'Yes'
				});
				expect(jQuery("#page-creator").find('.layout-engineer-removeblockmodal').find('.layout-engineer-ok-button').html()).toEqual('Yes');
			});

			it("should not change the ok button label in the remove block modal window when null is supplied", function(){
				jQuery("#page-creator").layoutEngineer({
					okButtonLabel: null
				});
				expect(jQuery("#page-creator").find('.layout-engineer-removeblockmodal').find('.layout-engineer-ok-button').html()).toEqual('OK');
			});

			it("should not change the ok button label in the remove block modal window when false is supplied", function(){
				jQuery("#page-creator").layoutEngineer({
					okButtonLabel: false
				});
				expect(jQuery("#page-creator").find('.layout-engineer-removeblockmodal').find('.layout-engineer-ok-button').html()).toEqual('OK');
			});

			it("should not change the ok button label in the remove block modal window when empty string is supplied", function(){
				jQuery("#page-creator").layoutEngineer({
					okButtonLabel: ''
				});
				expect(jQuery("#page-creator").find('.layout-engineer-removeblockmodal').find('.layout-engineer-ok-button').html()).toEqual('OK');
			});

			it("should add cancel button to the remove block modal window", function(){
				jQuery("#page-creator").layoutEngineer();
				expect(jQuery("#page-creator").find('.layout-engineer-removeblockmodal').find('.layout-engineer-cancel-button').length).not.toEqual(0);
			});

			it("should change the cancel button label in the remove block modal window when one is supplied", function(){
				jQuery("#page-creator").layoutEngineer({
					cancelButtonLabel: 'No'
				});
				expect(jQuery("#page-creator").find('.layout-engineer-removeblockmodal').find('.layout-engineer-cancel-button').html()).toEqual('No');
			});

			it("should not change the cancel button label in the remove block modal window when null is supplied", function(){
				jQuery("#page-creator").layoutEngineer({
					cancelButtonLabel: null
				});
				expect(jQuery("#page-creator").find('.layout-engineer-removeblockmodal').find('.layout-engineer-cancel-button').html()).toEqual('Cancel');
			});

			it("should not change the cancel button label in the remove block modal window when false is supplied", function(){
				jQuery("#page-creator").layoutEngineer({
					cancelButtonLabel: false
				});
				expect(jQuery("#page-creator").find('.layout-engineer-removeblockmodal').find('.layout-engineer-cancel-button').html()).toEqual('Cancel');
			});

			it("should not change the cancel button label in the remove block modal window when empty string is supplied", function(){
				jQuery("#page-creator").layoutEngineer({
					cancelButtonLabel: ''
				});
				expect(jQuery("#page-creator").find('.layout-engineer-removeblockmodal').find('.layout-engineer-cancel-button').html()).toEqual('Cancel');
			});

			it("should add remove block modal window title", function(){
				jQuery("#page-creator").layoutEngineer();
				expect(jQuery("#page-creator").find('.layout-engineer-removeblockmodal').find('h1').length).not.toEqual(0);
			});

			it("should change the remove block modal window title when one is supplied", function(){
				jQuery("#page-creator").layoutEngineer({
					removeBlockModalTitle: 'Remove Block'
				});
				expect(jQuery("#page-creator").find('.layout-engineer-removeblockmodal').find('h1').html()).toEqual('Remove Block');
			});

			it("should not change the remove block modal window title when null is supplied", function(){
				jQuery("#page-creator").layoutEngineer({
					removeBlockModalTitle: null
				});
				expect(jQuery("#page-creator").find('.layout-engineer-removeblockmodal').find('h1').html()).toEqual('? Remove Block');
			});

			it("should not change the remove block modal window title when false is supplied", function(){
				jQuery("#page-creator").layoutEngineer({
					removeBlockModalTitle: false
				});
				expect(jQuery("#page-creator").find('.layout-engineer-removeblockmodal').find('h1').html()).toEqual('? Remove Block');
			});

			it("should not change the remove block modal window title when empty string is supplied", function(){
				jQuery("#page-creator").layoutEngineer({
					removeBlockModalTitle: ''
				});
				expect(jQuery("#page-creator").find('.layout-engineer-removeblockmodal').find('h1').html()).toEqual('? Remove Block');
			});

			it("should add remove block modal window message", function(){
				jQuery("#page-creator").layoutEngineer();
				expect(jQuery("#page-creator").find('.layout-engineer-removeblockmodal').find('p').length).not.toEqual(0);
			});

			it("should change the remove block modal window message when one is supplied", function(){
				jQuery("#page-creator").layoutEngineer({
					removeBlockModalMessage: 'Are u sure?'
				});
				expect(jQuery("#page-creator").find('.layout-engineer-removeblockmodal').find('p').html()).toEqual('Are u sure?');
			});

			it("should not change the remove block modal window message when null is supplied", function(){
				jQuery("#page-creator").layoutEngineer({
					removeBlockModalMessage: null
				});
				expect(jQuery("#page-creator").find('.layout-engineer-removeblockmodal').find('p').html()).toEqual('Are you sure you wish to remove this block?');
			});

			it("should not change the remove block modal window message when false is supplied", function(){
				jQuery("#page-creator").layoutEngineer({
					removeBlockModalMessage: false
				});
				expect(jQuery("#page-creator").find('.layout-engineer-removeblockmodal').find('p').html()).toEqual('Are you sure you wish to remove this block?');
			});

			it("should not change the remove block modal window message when empty string is supplied", function(){
				jQuery("#page-creator").layoutEngineer({
					removeBlockModalMessage: ''
				});
				expect(jQuery("#page-creator").find('.layout-engineer-removeblockmodal').find('p').html()).toEqual('Are you sure you wish to remove this block?');
			});
		});

		describe("adding new block", function(){

			beforeEach(function(){
				jQuery("#page-creator").layoutEngineer({
					addTextBlockButtonLabel: 'Text Block'
				});
				jQuery("#page-creator").find('.layout-engineer-addblockbutton').trigger('click');
				jQuery("#page-creator").find('.layout-engineer-addtextblock').trigger('click');
			}),

			it("should add new block element", function(){
				expect(jQuery("#page-creator").find('.layout-engineer-page').find('.layout-engineer-block').length).toEqual(1);
			});

			it("should hide the modal window", function(){
				expect(jQuery("#page-creator").find('.layout-engineer-addblockmodal').is(':visible')).not.toEqual(true);
			});

			it("should add right pane navigation", function(){
				expect(jQuery("#page-creator").find('.layout-engineer-block').find('.layout-engineer-right-pane').length).not.toEqual(0);
			});

			it("should add right pane navigation that includes half width left button", function(){
				expect(jQuery("#page-creator").find('.layout-engineer-block').find('.layout-engineer-right-pane').find('.layout-engineer-toolpane-icon-50left').length).not.toEqual(0);
			});

			it("should add right pane navigation that includes half width right button", function(){
				expect(jQuery("#page-creator").find('.layout-engineer-block').find('.layout-engineer-right-pane').find('.layout-engineer-toolpane-icon-50right').length).not.toEqual(0);
			});

			it("should add right pane navigation that includes full width button", function(){
				expect(jQuery("#page-creator").find('.layout-engineer-block').find('.layout-engineer-right-pane').find('.layout-engineer-toolpane-icon-100full').length).not.toEqual(0);
			});

			it("should add left pane navigation", function(){
				expect(jQuery("#page-creator").find('.layout-engineer-block').find('.layout-engineer-left-pane').length).not.toEqual(0);
			});

			it("should add left pane navigation that includes trash button", function(){
				expect(jQuery("#page-creator").find('.layout-engineer-block').find('.layout-engineer-left-pane').find('.layout-engineer-toolpane-icon-trash').length).not.toEqual(0);
			});

			it("should show remove block modal window when clicking on the trash icon", function(){
				jQuery('.layout-engineer-toolpane-icon-trash').trigger('click');
				expect(jQuery("#page-creator").find('.layout-engineer-removeblockmodal').is(':visible')).toEqual(true);
			});

			it("should hide remove block modal window when clicking on the cancel button", function(){
				jQuery('.layout-engineer-toolpane-icon-trash').trigger('click');
				jQuery('.layout-engineer-cancel-button').trigger('click');
				expect(jQuery("#page-creator").find('.layout-engineer-removeblockmodal').is(':visible')).toEqual(false);
			});

			it("should not remove the block when clicking on the cancel button in the remove modal window", function(){
				jQuery('.layout-engineer-toolpane-icon-trash').trigger('click');
				jQuery('.layout-engineer-cancel-button').trigger('click');
				expect(jQuery("#page-creator").find('.layout-engineer-block').length).toEqual(1);
			});

			it("should hide remove block modal window when clicking on the ok button", function(){
				jQuery('.layout-engineer-toolpane-icon-trash').trigger('click');
				jQuery('.layout-engineer-ok-button').trigger('click');
				expect(jQuery("#page-creator").find('.layout-engineer-removeblockmodal').is(':visible')).toEqual(false);
			});

			it("should remove the block when clicking on the ok button in the remove modal window", function(){
				jQuery('.layout-engineer-toolpane-icon-trash').trigger('click');
				jQuery('.layout-engineer-ok-button').trigger('click');
				expect(jQuery("#page-creator").find('.layout-engineer-block').length).toEqual(0);
			});

			it("should make the width 100% when clicking on the full width icon", function(){
				jQuery('.layout-engineer-toolpane-icon-100full').trigger('click');
				expect(jQuery("#page-creator").find('.layout-engineer-block').width()).toEqual(jQuery("#page-creator").width());
			});

			it("should make the width 50% when clicking on the left width icon", function(){
				jQuery('.layout-engineer-toolpane-icon-50left').trigger('click');
				expect(jQuery("#page-creator").find('.layout-engineer-block').width()).toEqual(jQuery("#page-creator").width() / 2);
			});

			it("should make the width 50% when clicking on the right width icon", function(){
				jQuery('.layout-engineer-toolpane-icon-50right').trigger('click');
				expect(jQuery("#page-creator").find('.layout-engineer-block').width()).toEqual(jQuery("#page-creator").width() / 2);
			});

		});

		describe("destroy", function(){

		});

	});

});
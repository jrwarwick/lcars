// Simple UI mode module and wire-up for a futuristic compturized GUI.
// Authored by justin.warwick@gmail.com
// Released under MIT license; see LICENSE file.
//


var lcarsMode = {
	//Would it be more trouble, more moving pieces to break if we explicitly track mode/state ?
	//  if it is determined a good thing: do we use a module variable? or just apply css classes to BODY tag?
	//  are they cumulative/stackable? or do we insist on a mono-modal design?
	state: "Nominal",
	snapshotCSSfilter: "", //TODO: hmmm what if snapshot is not body level but id level? do we need a more sophisticated structure to determine what level/selector the snapshot correponds to? or maybe just a rigid 2-level: body tag itself (global/overall), and one special ID, set at "initialization" of the module
	redalertCSSfilter: "grayscale(100%) brightness(35%) sepia(100%) hue-rotate(-48deg) saturate(1000%)",
	disabledCSSfilter: "grayscale(100%)  brightness(40%) contrast(150%)",
	//TODO: maybe go ahead and create an initialization module that will accept an element ID that represents the "main content" element ID that could be affected by disables and stuff. Defaults to "container"
	RedAlert: function() {
		this.snapshotCSSfilter = document.body.style.filter;
		document.body.style.filter = this.redalertCSSfilter;
		if (lcarsAudio) {
			lcarsAudio.RedAlert();
		}
		this.state = "RedAlert";
	},
	Disable: function(targetElementID = "container") {
		//"container" is a somewhat special main content container within the frame. This would need revisiting if multiple regions becomes implemented.
		this.snapshotCSSfilter = document.body.style.filter;
		document.getElementById(targetElementID).style.filter = this.disabledCSSfilter;
		//TODO: and/or: run through all buttons/inputs and add the disabled classes to them  (and/or spawn a transparent div that covers everything and has click event listener that only plays NegAck sound).
		if (lcarsAudio) {
			lcarsAudio.TactileInputNegativeAcknowledge();
		}
		this.state = "Disabled";
	},
	Nominal: function(targetElementID = "container") {
		//TODO: clear all modes function / reset
		// for a more sophisticated version of this, make sure to SAVE the contents of filter css rule to an object var "snapshot" 
		// so as to be able to restore it afterward, don't just brutishly blow everything away.
		if (document.body.style.filter.trim() == this.redalertCSSfilter) {
			//Here we check the content of the snapshot for actually just being redalert also/already, 
			// inwhich case maybe there was some double clicking going on or something. 
			// In that case, wouldn't it be more helpful/useful/graceful to just empty filter out entirely?
			document.body.style.filter = "";
		} else {
			//Try to honor whatever other thing designers might have going on as "nominal" state, or at least state prior to redalert state. 
			//TODO: later, if we snapshot body separate from other elements, make sure this RHS is the correct one.
			document.body.style.filter = this.snapshotCSSfilter;
		}
		//TODO: maybe check for and stop playing sounds if they are red alert sounds?
		
	
		document.getElementById(targetElementID).style.filter = this.snapshotCSSfilter;
		this.state = "Nominal";
	}

	//TODO: "glitching" mode, security/scrambled/locked mode, klingon mode.
}

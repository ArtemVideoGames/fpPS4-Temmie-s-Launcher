/*
	**************************************************************************************

		TMS.js - By TemmieHeartz (@temmieheartz)

		This file is an original replacement - Because I don't want to deal with jQuery
		anymore!

		Original source / motivation: http://youmightnotneedjquery.com/

	**************************************************************************************
*/

const TMS = Object.freeze(Object.seal({

	// Log warning
	logWarnings: !1,

	// Warn if something go wrong
	warn: function(warnText){
		if (this.logWarnings === !0){
			console.warn('[TMS] ' + warnText);
		}
	},

	/*
		TMS Functions
	*/

	/*
		Get element
	*/
	getElement: function(elementId){
		var res = document.getElementById(elementId);
		if (res === null){
			res = document.getElementsByTagName(elementId)[0];
		}
		if (res === void 0){
			res = null;
		}
		return res;
	},

	/*
		CSS
	*/
	css: function(elementId, cssChanges){

		var eReason = '',
			canStart = !0,
			elId = this.getElement(elementId);

		if (elId === null){
			canStart = !1;
			eReason = eReason + '\nDOM or Tag does not exist! (' + elementId + ')';
		}
		if (typeof cssChanges !== 'object'){
			canStart = !1;
			eReason = eReason + '\nYou must insert an object for CSS data (Current type: ' + typeof cssChanges + ')';
		}

		// End
		if (canStart === !0){
			Object.keys(cssChanges).forEach(function(cItem){
				elId.style[cItem] = cssChanges[cItem];
			});
		} else {
			this.warn('Unable to apply CSS data!' + eReason);
		}

	},

	/*
		Animate
	
		elementId     = HTML DOM id
		cssChanges    = Object {width: x, height, y}
		animationTime = Number (Min: 0)
		animationEase = CSS for transition option, like cubic-bezier
	*/
	animate: function(elementId, cssChanges, animationTime, animationEase){

		var eReason = '',
			canStart = !0,
			transitionString = '';
			elId = this.getElement(elementId);
		
		if (elId === null){
			canStart = !1;
			eReason = eReason + '\nDOM does not exist! (' + elementId + ')';
		}
		if (typeof cssChanges !== 'object'){
			canStart = !1;
			eReason = eReason + '\nYou must insert an object for CSS data (Current type: ' + typeof cssChanges + ')';
		}
		if (typeof animationTime !== 'number'){
			canStart = !1;
			eReason = eReason + '\nYou must insert a number on animation time (Current type: ' + typeof animationTime + ')';
		}
		
		// End
		if (canStart === !0){

			if (animationEase === void 0){
				animationEase = '';
			}
			if (animationTime < 0){
				animationTime = 0;
			}

			Object.keys(cssChanges).forEach(function(cItem){
				elId.style[cItem] = cssChanges[cItem];
				transitionString = transitionString + cItem + ' ' + (animationTime / 1000) + 's ';
				elId.style['transition'] = transitionString + animationEase;
			});

			setTimeout(function(){
				elId.style['transition'] = 'none 0s';
			}, (animationTime + 1));

		} else {
			this.warn('Unable to animate!' + eReason);
		}
	},

	/*
		Focus Element
		sTimeout = time [ms]
	*/
	focus: function(elementId, sTimeout){

		const elId = this.getElement(elementId);

		if (elId !== null){

			if (sTimeout !== void 0 && parseInt(sTimeout) !== NaN){

				setTimeout(function(){
					elId.focus();
				}, sTimeout);

			} else {
				elId.focus();
			}

		} else {
			this.warn('Unable to focus element because it does not exist! (' + elementId + ')');
		}
	},

	/*
		Disable Element
	*/
	disableElement: function(idList){
	
		var disableList = [];
	
		if (typeof idList === 'object'){
			disableList = idList;
		} else {
			disableList.push(idList);
		}
	
		// End
		disableList.forEach(function(cItem){

			const elId = this.getElement(elementId);

			if (elId !== null){
				elId.disabled = 'disabled';
				// If is <input>
				if (elId.type === 'button'){
					TMS.css(cItem, {'filter': 'grayscale(1) blur(0.8px)', 'cursor': 'not-allowed', 'opacity': '0.6'});
				}
			} else {
				this.warn('Unable to disable element because it does not exist! (' + cItem + ')');
			}

		});

	},

	/*
		Enable Element
	*/
	enableElement: function(elementId){

		const elId = this.getElement(elementId);

		if (elId !== null){
			elId.disabled = '';
			if (elId.type === 'button'){
				TMS.css(elementId, {'filter': 'grayscale(0) blur(0px)', 'cursor': 'pointer', 'opacity': '1'});
			}
		} else {
			this.warn('TMS - Unable to enable element because it does not exist! (' + elementId + ')');
		}
	},

	/*
		Get CSS data
		Returns the attr value from CSS propriety
	*/
	getCssData: function(elementId, cssAttrName){

		var result = '',
			elId = this.getElement(elementId);

		if (elId !== null){

			result = elId.style[cssAttrName];

			// Get computed style
			if (result === ''){
				result = window.getComputedStyle(elId)[cssAttrName];
			}

			// Get from DOM
			if (result === void 0){
				result = elId[cssAttrName];
			}

		} else {
			this.warn('Unable to get element because it does not exist! (' + elementId + ')');
		}

		return result;
	},

	/*
		Scroll top
		Usage: elementObjects = {HTML_DOM_ID_0: scrollInt, HTML_DOM_ID_1: scrollInt2} and goes on
	*/
	scrollTop: function(elementObjects){
		Object.keys(elementObjects).forEach(function(cItem){

			const elId = TMS.getElement(elementId);

			if (elId !== null){
				elId.scrollTop = elementObjects[cItem];
			} else {
				TMS.warn('Unable to scroll element because it does not exist! (' + elementId + ')');
			}

		});
	},

	/*
		Append data
	*/
	append: function(elementId, newData){

		var elId = this.getElement(elementId);

		if (elId !== null){
			elId.insertAdjacentHTML('beforeend', newData);
		} else {
			this.warn('Unable to append element data because parent DOM does not exist! (' + elementId + ')');
		}

	},

	/*
		Add Class
	*/
	addClass: function(elementId, className){

		const elId = this.getElement(elementId);

		if (elId !== null){
			elId.classList.add(className);
		} else {
			this.warn('Unable to add class because DOM does not exist! (' + elementId + ')');
		}
	},

	/*
		Remove Class
	*/
	removeClass: function(elementId, className){

		const elId = this.getElement(elementId);

		if (elId !== null){
			elId.classList.remove(className);
		} else {
			this.warn('Unable to remove class because DOM does not exist! (' + elementId + ')');
		}

	},

	/*
		Clear
		Removes all HTML inside
	*/
	clear: function(elementId){
		const elId = this.getElement(elementId);
		if (elId !== null){
			elId.innerHTML = '';
		} else {
			this.warn('Unable to clear inner data because DOM does not exist! (' + elementId + ')');
		}
	},

	/*
		triggerClick
	*/
	triggerClick: function(elementId){
		const elId = this.getElement(elementId);
		if (elId !== null){
			elId.click();
		} else {
			this.warn('Unable to clear inner data because DOM does not exist! (' + elementId + ')');
		}
	},

	/*
		fadeIn
	*/
	fadeIn: function(elementId, animationTime){

		const elId = this.getElement(elementId), 
			tagType = {
				'DIV': 'block',
				'IMG': 'inline'
			}

		if (elId !== null){

			var dTime = 1000,
				dMode = 'block',
				finalOpacity = 1,
				eStyles = getComputedStyle(elId);

			if (animationTime !== void 0 && animationTime !== NaN){
				dTime = parseInt(animationTime);
				if (dTime < 0){
					dTime = 1;
				}
			}
			if (tagType[elId.tagType] !== void 0){
				dMode = tagType[elId.tagType];
			}
			if (eStyles.opacity !== ''){
				finalOpacity = eStyles.opacity;
			}

			TMS.css(elementId, {'display': dMode, 'opacity': finalOpacity, 'transition': 'opacity ' + dTime + 'ms'});

			setTimeout(function(){
				TMS.css(elementId, {'transition': 'none'});
			}, (dTime + 1));

		} else {
			TMS.warn('Unable to fade in because DOM does not exist! (' + elementId + ')');
		}
	},

	/*
		fadeOut
	*/
	fadeOut: function(elementId, animationTime){

		const elId = this.getElement(elementId);

		if (elId !== null){

			var dTime = 1000;

			if (animationTime !== void 0 && animationTime !== NaN){
				dTime = parseInt(animationTime);
				if (dTime < 0){
					dTime = 1;
				}
			}

			TMS.css(elementId, {'opacity': '0', 'transition': 'opacity ' + dTime + 'ms'});

			setTimeout(function(){
				TMS.css(elementId, {'transition': 'none', 'display': 'none'});
			}, (dTime + 1));

		} else {
			this.warn('Unable to fade out because DOM does not exist! (' + elementId + ')');
		}

	},

	/*
		scrollCenter
	*/
	scrollCenter: function(elementId, delay){

		const elId = this.getElement(elementId);

		if (elId !== null){

			var parentDom = elId.parentElement,
				parentHeight = parentDom.offsetHeight,
				elHeight = parseFloat(window.getComputedStyle(elId).height.replace('px', ''));

			if (delay === void 0 || parseInt(delay) === NaN){
				delay = 0;
			}

			setTimeout(function(){
				parentDom.scrollTo(0, (elId.offsetTop - ((parentHeight / 2) - (elHeight / 2))));
			}, delay);

		} else {
			this.warn('Unable to scroll because DOM does not exist! (' + elementId + ')');
		}

	},

	/*
		setInnerHtml
	*/
	setInnerHtml: function(elementId, htmlData){
		const elId = this.getElement(elementId);
		if (elId !== null){
			document.getElementById(elementId).innerHTML = htmlData;
		} else {
			this.warn('Unable to set innerHTML because DOM does not exist! (' + elementId + ')');
		}
	},

	/*
		Remove HTML DOM
	*/
	removeDOM: function(elementId){

		const elId = this.getElement(elementId);

		if (elId !== null){
			document.getElementById(elementId).remove();
		} else {
			this.warn('Unable to remove DOM because DOM does not exist! (' + elementId + ')');
		}

	},

	/*
		Blur element
	*/
	blur: function(elementId){
		const elId = this.getElement(elementId);
		if (elId !== null){
			document.getElementById(elementId).blur();
		} else {
			this.warn('Unable to blur DOM because DOM does not exist! (' + elementId + ')');
		}
	},

	/*
		Get HTML child count
	*/
	getChildCount: function(elementId){

		var res = 0,
			elId = this.getElement(elementId);

		if (elId !== null){

			res = document.getElementById(elementId).childElementCount;
			if (res < 0){
				res = 0;
			}

			return res;

		} else {
			this.warn('Unable to get html collection because DOM does not exist! (' + elementId + ')');
		}

	},

	/*
		Get HTML element rect
	*/
	getRect: function(elementId){

		var elId = this.getElement(elementId);

		if (elId !== null){
			return document.getElementById(elementId).getBoundingClientRect();
		} else {
			this.warn('Unable to get rect because DOM does not exist! (' + elementId + ')');
		}

	}
	
}));
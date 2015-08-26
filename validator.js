/**
* validator.js
*
* javascript validator script that takes a form and validates it. The validator is designed to work along side the bootstrap library but
* it is compatable with pretty much any type of form. Bug fixes for rigorous testing have not been applied quite yet but are a process that
* will be implemented in the future. Documentation for this can be found in the developers section on the lmtl apps server.
*
* @Author: Mark Hill <mhill@lonemountaintruck.com>
* @Contributor : Dana Schuett <dschuett@lonemountaintruck.com>
* @Contributor : Andrew Schmidt <abschmidt@lonemountaintruck.com>
* @Copyright 2015 (c) Lone Mountain Truck Leasing
* @version 1.0.1
*
*/
!function($){

	var Validator = function(form, mode, options){
		this.$form = form;
		this.mode = mode;
		this.options = options;
		this.valid = true;
		this.ccImagePath = null;
		this.controlsArray = [];
	};

	Validator.prototype = {	
		constructor : Validator,
		init : function(){
			var that = this,
			mode = this.mode,
			form = this.$form;
			switch(mode){
				case "set" :
					that.setControls();
					for(var x in that.controlsArray){
						
						that.onKeyInput(that.controlsArray[x]);
					}
					break;
				case "check" :
					that.getControlsArray();
					if(!that.finalValidation()){
						that.valid = false;
					}else{
						that.valid = true;
					}
					break;	
				case "cc" :
					that.ccImagePath = that.options.path;
					that.generateCreditCardHolder(that.options.target);
					that.setCreditCardImage();
					break;
				default :
					console.log("Invalid mode set, use 'set' or 'check'");
			}
		},
		'setControls' : function(){
			var options = this.options;
			var form = this.$form;
			var that = this;
			for(var key in options){
				switch(key){
					case 'notEmpty' :
					case 'isString' :
					case 'isEmail' :
					case 'isPhoneNumber':
					case 'isNumber':
					case 'isURL' :
					case 'isSSN' :
					case 'isRoutingNumber' :
					case 'isMacAddress' :
					case 'isIPAddress' :
					case 'isCreditCard' :
					case 'isZipCode' :
					case 'isCreditCard':
					case 'validPassword':
						for(var selector in options[key]){
							this.setData(options[key][selector], ''+key+'');
							this.setDataTarget(options[key][selector]);
							this.setControlsArray(options[key][selector]);
						}
						break;
					case 'isDateTime' :
						for(var selector in options[key]){
							if(Array.isArray(options[key])){
								var defaultDateFormat = 'm/d/Y';
								var selectors = options[key];
								for(var i = 0; i < selectors.length; i++){
									if(typeof selectors[i] === 'string'){
										this.setData(selectors[i], ''+key+''+defaultDateFormat);
										this.setDataTarget(selectors[i]);
										that.setControlsArray(selectors[i]);		
									}else if(Array.isArray(selectors[i])){
										if(selectors[i].length < 2 || selectors[i].length > 2){
											console.log("isDateTime Error: when passing an array within an array the first argument is the selector as a string, and the second arguments is the pattern as a string");
										}else{
											var tag = selectors[i][0];
											var format = selectors[i][1];
											that.setData(tag, ''+key+''+format);
											that.setDataTarget(tag);
											that.setControlsArray(tag);
										}
									}else{
										console.log("isDateTime Error: incorrect type of input for validation. Please see documentation.");
									}
								}
							}else if(typeof options[key] === 'object'){
								this.setData(selector, ''+key+''+options[key][selector]+'');
								this.setDataTarget(selector);
								that.setControlsArray(selector);
							}else{
								console.log("isDateTime Error: incorrect input options. Please pass either an object in a '#selector' : 'pattern' format, or a mixed array of selectors as strings or array of selector with patterns");
							}
						}
						break;
					case 'isDependent' : 
					case 'equalTo' :
					case 'testRegex' : 
						for(var selector in options[key]){
							this.setData(selector, ''+key+''+options[key][selector]+'');
							this.setDataTarget(selector);
							that.setControlsArray(selector);
						}
						break;
					case 'groupNotEmpty' : 
						for(var selector in options[key]){
							
							$(form).find(options[key][selector]+':first').data('validator', ''+key);
							$(form).find(options[key][selector]+':first').data('validator-target', options[key][selector]);
							that.setControlsArray(options[key][selector]);
						}
				}
			}
		},
		'getControlsArray' : function(){
			var that = this;
			var form = that.$form;
			$(form).find('input, select, textarea').each(function(){
				var data = $(this).data('validator-target');
				if(data){
					if($.inArray(data, that.controlsArray) === -1){
						that.controlsArray.push(data);
					}
				}
			});
		},
		'setControlsArray' : function(selector){
			var that = this;
			if($.inArray(selector, that.controlsArray) === -1){
				that.controlsArray.push(selector);
			}
		},
		'setData' : function(selector, key){
			var form = this.$form;
			var data = $(form).find(selector).data('validator');
			if(!data){
				$(form).find(selector).data('validator', key);
			}else{
				data += '|'+key;
				$(form).find(selector).data('validator', data);
			}
		},
		'setDataTarget' : function(selector){
			var form = this.$form;
			var data = $(form).find(selector).data('validator-target');
			var type = $(form).find(selector).attr('type');
			if(!data){
				if(type != 'radio' && type != 'checkbox'){
					$(form).find(selector).data('validator-target', selector);
				}else{
					data = $(form).find(selector+':first').data('validator-target', selector);
					if(!data){
						$(form).find(selector+':first').data('validator-target', selector);
					}
					data = $(form).find(selector+':first').data('validator-target');
				}
			}
		},
		'generateCreditCardHolder' : function(selector){
			var form = this.$form,
			that = this;
			$(form).find(selector).closest('.form-group').each(function(){
				$(this).closest('.form-group').append("<div id='cardImageHolder'></div>");
			});
		},
		'setCreditCardImage' : function(cardname){
			var form = this.$form;
			that = this;
			var cardname = cardname;
			if(!cardname){
				cardname = 'cc';
			}
			file = that.ccImagePath+"img/"+cardname+".jpg";
			// search out the credit 
			$('#cardImageHolder').html('<img src="'+file+'" width="100%" />' );
		},
		'onKeyInput' : function(selector){
			var form = this.$form;
			var that = this;
			var data = $(form).find(selector).data('validator');
			var type = $(form).find(selector).attr('type');
			$(form).find(selector).bind('change keyup click select focus', function(){
				if(data){
					that.validator(selector);
				}
				console.log(selector);
			});		
		},
		'finalValidation' : function(){
			var that = this;
			var rVal = true;
			var arr = that.controlsArray;
			
			for(var x in arr){
			
				if(!that.validator(that.controlsArray[x])){
					
					rVal = false;
				}
			}
			return rVal;
		},
		// work on making validator a shorter function and even further change how the function is used with the plugin
		'validator' : function(selector){
			var form = this.$form;
			var that = this;
			var rVal = true;
			var element = selector;
			// find all the input elements in the form to begin the validation process
			$(form).find(element).each(function(){
				
				var errors = 0;
				//check if there is a validator option for the specific input and that it has a value to it
				if($(this).data('validator')){
					
					// get the element type and split the pipe separated values into an array
					var value = null;
					var type = $(this).attr('type');
					if(type != "radio" && type != "checkbox"){
						value = $(this).val();
					}else{
						var name = $(this).attr('name');
						value = [];
						$(element+":checked").each(function(){
							value.push($(this).val());
						});
					}

					// check the .data('validator') string to accoutn for interior pipes that may be used with regexes or selectors
					var validations = $(this).data('validator');
					validations = validations.replace(/\|\=/g, '%=');
					var holding = [];
					if(validations.indexOf('testRegex') > -1){
						var hold = validations.substring(validations.indexOf('testRegex'), validations.lastIndexOf('/')+1);
						holding.push(hold);
						validations = validations.replace(hold, '');
					}
					validations = validations.replace("||", "|");
					validations = validations.split('|');
					validations = validations.concat(holding);
					for(var x in validations){
						validations[x] = validations[x].replace('%=', '|=');
					}
					validations = validations.filter(function(n){return n != undefined && n != ""});
					for(var i = 0; i < validations.length; i++){
						if(validations[i].indexOf('isDateTime') !== -1){
							var regex = validations[i].replace('isDateTime', '');
							!that.isDateTime(value, regex) ? errors++ : null;
						}else if(validations[i].indexOf('equalTo') !== -1){
		                	var selector = validations[i].replace('equalTo', '');
		                	!that.equalTo(value, selector) ? errors++ : null;
		                }else if(validations[i].indexOf('isDependent') !== -1){
		                	var selector = validations[i].replace('isDependent', '');
		                	!that.isDependent(value, selector) ? errors++ : null;
		                }else if(validations[i].indexOf('testRegex') !== -1){
		                	var regex = validations[i].replace('testRegex', '');
		                	var regex = regex.substring(regex.indexOf('/')+1, regex.lastIndexOf('/'));
		                	!that.testRegex(value, regex) ? errors++ : null;
		                }else{
							!that[validations[i]](value) ? errors++ : null;
						}
					}
					if(errors > 0){
						if(type != "radio" && type != "checkbox"){
							$(this).closest('.form-group').addClass('has-error');
						}else{
							$(this).closest('.radio, .checkbox, .radio-inline, .checkbox-inline').closest('.form-group').addClass('has-error');
						}
					}else{
						if(type != "radio" && type != "checkbox"){
							$(this).closest('.form-group').removeClass('has-error');
						}else{
							$(this).closest('.radio, .checkbox, .radio-inline, .checkbox-inline').closest('.form-group').removeClass('has-error');
						}
					}
				}
				if(errors > 0) rVal = false;
			});
			return rVal;
		},
		notEmpty : function(value){
			return value && $.trim(value).length > 0;
		},
		required : function(value){
			return value && $.trim(value).length > 0;
		},
		isEmail : function(value){
			var check = true;
			if(value.length)
			 	check = /^([^@\s\t\n]+\@[\w\d]+\.[\w]{2,3}(\.[\w]{2})?)$/.test(value);
			return check;
		},
		isPhoneNumber : function(value){
			var check = true;
			if(value.length)
				check = /^(\d\-)?\(?\d{3}\)?[\-|\s]?\d{3}[\-|\s]?\d{4}$/.test(value);
			return check;
		}, 
		isNumber : function(value){
			var check = true;
			if(value.length)
				check = /^[+-]?\d+(\.\d+)?$/.test(value);
			return check;
		},
		isSSN : function(value){
			var check = true;
			if(value.length)
				check = /^\d{3}\-?\d{2}\-?\d{4}$/.test(value);
			return check;
		},
		isString : function(value){
			var check = true;
			if(value.length)
				check = /^\D+$/.test(value);
			return check;
		},
		isURL : function(value){
			var check = true;
			if(value.length)
				check = /^([http\:\/\/]+)?([a-zA-Z]+)?\.?[a-zA-Z0-9\-]+\.[a-zA-Z]+$/.test(value);
			return check;
		},
		isDateTime : function(value, regex){
			var check = true;
			if(regex == null){
				return true;
			}
			var regexChars = regex.split("");
			var pattern = "^";
			for(var i = 0; i < regexChars.length; i++){
				switch(regexChars[i]){
					case "d" : 
					case "j" :
						pattern = pattern + "(0?[1-9]|[12][0-9]|3[01])";
						break;
					case "D":
						pattern = pattern + "(Sun|Mon|Tue|Wed|Thu|Fri|Sat)";
					case "l" :
						pattern = pattern + "(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)";
						break;
					case "F" :
						pattern = pattern + "(January|February|March|April|May|June|July|August|September|October|November|December)";
						break;
					case "M" :
						pattern = pattern + "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)";
						break;
					case "m" :
					case "n" :
						pattern = pattern + "(0?[1-9]|1[012])";
						break;
					case "Y" :
					case "y" :
						pattern = pattern + "(19|20)?[\\d]+";
						break;
					case "a" :
					case "A" :
						pattern = pattern + "([AaPp][Mm])";
						break;
					case "g" :
					case "G" :
					case "h" :
					case "H" :
						pattern = pattern + "(0?[1-9]|1[012]|2[0123])";
						break;
					case "i" :
					case "s" :
						pattern = pattern + "([012345][0-9])";
						break;
					case "/" :
						pattern = pattern + "[/]";
						break;
					case ":" :
						pattern = pattern + "[:]";
						break;
					case "." : 
						pattern = pattern + "[.]";
						break;
					case " " :
						pattern = pattern + "[ ]";
						break;
					case "," :
						pattern = pattern + "[,]";
						break;
					case "-" :
						pattern = pattern + "[-]";
						break;
				}
			}
			pattern = pattern+"$";
	        
	        pattern = new RegExp(pattern, 'i');
	       
			if(value.length)
				check = pattern.test(value);
			return check;
		},
		groupNotEmpty : function(value){
			return value.length > 0;
		},
		isRoutingNumber : function(value){
			//run through each digit and calculate the total
			var n = 0;
			for(var i = 0; i < value.length; i += 3){
				n += parseInt(value.charAt(i), 10)*3 + parseInt(value.charAt(i+1), 10)*7 + parseInt(value.charAt(i+2), 10);
			}
			//if the resulting sum is an even multiple of ten (but not zero), the aba routing number is good
			if(n != 0 && n % 10 == 0){
				return true;
			}else{
				return false;
			}
		},
		isMacAddress : function(value){
	        var check = true;
	        if(value.length){
	            check = /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/.test(value);
	        }
	        return check;
	    },
	     isIPAddress : function(value){
			var check = true;
			if(value.length){
			    check = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value);
			}
			return check;
		},
	    validPassword : function(value){
	        var check = false;
	        var strength = 0;
	        
	        if(value.length > 7){
	             strength += 4;   
	        }
	        // password mixins
	        var variations = {
	            digits: /[0-9]/.test(value),
	            lower: /[a-z]/.test(value),
	            upper: /[A-Z]/.test(value),
	            nonWords: /[!$@#]/.test(value)
	        };
	        for (var item in variations) {
	            strength += (variations[item] == true) ? 1 : 0;
	        }
	        if(strength >= 6){
	            check = true;
	        }
	        return check;
	    },
	    equalTo : function(value, selector){
	    	var form = this.$form;
	    	var check = false;
	    	var checkValue = $(form).find(selector).val();
	    	if(value.length){
	    		if(value === checkValue){
	    			check = true;
	    		}
	    	}
	    	return check;
	    },
	    isCreditCard : function(value){
	    	var that = this;
		    var check = false;
		    var value = value.replace(/[ -]/g, '');
		    var card_types = [
		        {
		            name : 'amex',
		            pattern: /^3[47]/,
		            valid_length: [15]
		        }, {
		            //diners_club_carte_blanche
		            name: 'dccb',
		            pattern: /^30[0-5]/,
		            valid_length: [14]
		        }, {
		            //diners_club_international
		            name: 'dci',
		            pattern: /^36/,
		            valid_length: [14]
		        }, {
		            name: 'jcb',
		            pattern: /^35(2[89]|[3-8][0-9])/,
		            valid_length: [16]
		        }, {
		            name: 'laser',
		            pattern: /^(6304|670[69]|6771)/,
		            valid_length: [16, 17, 18, 19]
		        }, {
		            //visa_electron
		            name: 'electron',
		            pattern: /^(4026|417500|4508|4844|491(3|7))/,
		            valid_length: [16]
		        }, {
		            name: 'visa',
		            pattern: /^4/,
		            valid_length: [16]
		        }, {
		            //mastercard
		            name: 'mc',
		            pattern: /^5[1-5]/,
		            valid_length: [16]
		        }, {
		            name: 'maestro',
		            pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
		            valid_length: [12, 13, 14, 15, 16, 17, 18, 19]
		        }, {
		            name: 'discover',
		            pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
		            valid_length: [16]
		        }
		    ];

		    if(value.length){
		        var exists = false;
		        var matches = false;
		        var validlength = false;
		        var validLuhn = false;
		        var cardname = "";
		        that.setCreditCardImage(cardname);
		        for(var name in card_types){
		            if(value.match(card_types[name].pattern)){
		                matches = true;
		            }
		            if(card_types[name].valid_length.indexOf(value.length) > -1){
		                validlength = true;
		            }
					if(matches && validlength){
						cardname = card_types[name].name.toLowerCase();
						break;
					}
		        }
		        if(matches && validlength){
		            var digit, n, sum, j, len, ref1;
		            sum = 0;
		            ref1 = value.split('').reverse();
		            for(n = j = 0, len = ref1.length; j < len; n = ++j){
		                digit = ref1[n];
		                digit = +digit;
		                if(n % 2){
		                    digit *= 2;
		                    if(digit < 10){
		                        sum += digit;
		                    }else{
		                        sum += digit - 9;
		                    }
		                }else{
		                    sum += digit;
		                }
		            }
		            if(sum % 10 === 0){
		                validLuhn = true;
		            }           
		        }else{
		            return check;
		        }
		        if(matches && validlength && validLuhn){
		            check = true;
		            that.setCreditCardImage(cardname);
		            return check;
		        }else{
		        	that.setCreditCardImage();
		            return check;
		        }
		    }else{
		    	check = true;
		    	return check;
		    	that.setCreditCardImage();
		    }
		    
	    },
	    isZipCode : function(value){
	    	var check = true;
	    	if(value.length){
	    		check = /^\d{5}(?:[-\s]\d{4})?$/.test(value);
	    	}
	    	return check; 
	    },
	    isDependent : function(value, selector){
	    	var check = true;
	    	if(selector.length){
	    		if(selector.substring(0,1) === '_'){
	    			selector = "[data-validator*=isDependent"+selector+"]";
	    		}
	    		if(!this.notEmpty(value)){
	    			form.find(selector).each(function(){
	    				if($(this).val() !== ''){
	    					check = false;
	    				}
	    			});
	    		}
	    	}
	    	return check;
	    },
	    testRegex : function(value, regex){
	    	var check = true;
	    	var caret = regex.substring(0);
	    	var dollar = regex.substring(regex.length-1);
	    	if(caret != "^")
	    		regex = "^"+regex;
	    	if(dollar != "$")
	    		regex = regex+'$';
	    	if(value.length && regex.length){
	    		var pattern = new RegExp(regex, 'i');
	    		check = pattern.test(value);
	    	}
	    	return check;
	    }
	};
	$.fn.validator = function(){
		var _data = null;
		var _mode = null;
		if(arguments.length){
			_mode = "set";
			_data = arguments[0];
		}else{
			console.log("dataval failed! Please supply an options object for the fields to properly be set");
		}
		var _Validator = new Validator(this, _mode, _data);
		_Validator.init();
		return this;
	};
	$.fn.validator.setCCImage = function(selector){
		var _data = selector;
		var _mode = "cc";
		var _Validator = new Validator(this, _mode, _data);
		_Validator.init();
		return this;
	};
	$.fn.validator.check = function(){
		var _data = null;
		var _mode = "check";
		var _Validator = new Validator(this, _mode, _data);
		_Validator.init();
		return _Validator.valid;
	};
	$.fn.validator.Constructor = Validator;
	
}( window.jQuery );

/*
#
#  Created by Team Kony.
#  Copyright (c) 2017 Kony Inc. All rights reserved.
#
*/
define(function() {
    var konymp = konymp || {};
    var KonyLoggerModule = require("com/konymp/placelocator/KonyLogger");
    konymp.logger = (new KonyLoggerModule("searchheader")) || function() {};
    return {
        constructor: function(baseConfig, layoutConfig, pspConfig) {

        },
        //Logic for getters/setters of custom properties
        initGettersSetters: function() {
            defineSetter(this, "headerSkin", function(val) {
                konymp.logger.debug("#####Start setter headerSkin #####", konymp.logger.FUNCTION_ENTRY);
                this.view.flxHeaderSearch.skin = val;
                this.view.flxHeader.skin = val;
                konymp.logger.debug("#####End setter headerSkin #####", konymp.logger.FUNCTION_EXIT);
            });
            defineGetter(this, "headerSkin", function() {
                konymp.logger.debug("#####Getter headerSkin #####", konymp.logger.FUNCTION_ENTRY);
                return this.view.flxHeaderSearch.skin;
            });
            defineSetter(this, "textBoxSkin", function(val) {
                konymp.logger.debug("#####Start setter textBoxSkin #####", konymp.logger.FUNCTION_ENTRY);
                this.view.txtLocation.skin = val;
                this.view.txtPlaceOrCategory.skin = val;
                konymp.logger.debug("#####End setter textBoxSkin #####", konymp.logger.FUNCTION_EXIT);
            });
            defineGetter(this, "textBoxSkin", function() {
                konymp.logger.debug("#####Getter textBoxSkin #####", konymp.logger.FUNCTION_ENTRY);
                return this.view.txtLocation.skin;
            });
            defineSetter(this, "cancelSearchButtonSkin", function(val) {
                konymp.logger.debug("#####Start setter cancelSearchButtonSkin #####", konymp.logger.FUNCTION_ENTRY);
                this.view.lblSearch.skin = val;
                this.view.lblCancel.skin = val;
                konymp.logger.debug("#####End setter cancelSearchButtonSkin #####", konymp.logger.FUNCTION_EXIT);
            });
            defineGetter(this, "cancelSearchButtonSkin", function() {
                konymp.logger.debug("#####Getter cancelSearchButtonSkin #####", konymp.logger.FUNCTION_ENTRY);
                return this.view.lblCancel.skin;
            });
            defineSetter(this, "clearBtnSkin", function(val) {
                konymp.logger.debug("#####Start setter clearBtnSkin #####", konymp.logger.FUNCTION_ENTRY);
                this.view.btnClearSearch.skin = val;
                konymp.logger.debug("#####End setter clearBtnSkin #####", konymp.logger.FUNCTION_EXIT);
            });
            defineGetter(this, "clearBtnSkin", function() {
                konymp.logger.debug("#####Getter clearBtnSkin #####", konymp.logger.FUNCTION_ENTRY);
                return this.view.btnClearSearch.skin;
            });
            defineSetter(this, "textBoxOnFocusSkin", function(val) {
                konymp.logger.debug("#####Start setter textBoxOnFocusSkin #####", konymp.logger.FUNCTION_ENTRY);
                this.view.txtLocation.focusSkin = val;
                this.view.txtPlaceOrCategory.focusSkin = val;
                konymp.logger.debug("#####End setter textBoxOnFocusSkin #####", konymp.logger.FUNCTION_EXIT);
            });
            defineGetter(this, "textBoxOnFocusSkin", function() {
                konymp.logger.debug("#####Getter textBoxOnFocusSkin #####", konymp.logger.FUNCTION_ENTRY);
                return this.view.txtPlaceOrCategory.focusSkin;
            });
            defineSetter(this, "textBoxPlaceHolderSkin", function(val) {
                konymp.logger.debug("#####Start setter textBoxPlaceHolderSkin #####", konymp.logger.FUNCTION_ENTRY);
                this.view.txtLocation.placeholderSkin = val;
                this.view.txtPlaceOrCategory.placeholderSkin = val;
                konymp.logger.debug("#####End setter textBoxPlaceHolderSkin #####", konymp.logger.FUNCTION_EXIT);
            });
            defineGetter(this, "textBoxPlaceHolderSkin", function() {
                konymp.logger.debug("#####Getter textBoxPlaceHolderSkin #####", konymp.logger.FUNCTION_ENTRY);
                return this.view.txtPlaceOrCategory.placeholderSkin;
            });
            defineSetter(this, "clearBtnOnFocus", function(val) {
                konymp.logger.debug("#####Start setter clearBtnOnFocus #####", konymp.logger.FUNCTION_ENTRY);
                this.view.btnClearLocation.focusSkin = val;
                konymp.logger.debug("#####End setter clearBtnOnFocus #####", konymp.logger.FUNCTION_EXIT);
            });
            defineGetter(this, "clearBtnOnFocus", function() {
                konymp.logger.debug("#####Getter clearBtnOnFocus #####", konymp.logger.FUNCTION_ENTRY);
                return this.view.btnClearLocation.focusSkin;
            });
        },
        /**
        * @function enableClearButton
        * @description Shows provided clear button to view
        * @private
        * @param {Object} textViewInstance
        * @param {Object} btnViewInstance
        */
        enableClearButton: function enableClearButton(textViewInstance, btnViewInstance) {
            try {
                konymp.logger.debug("#####Start enableClearButton#####", konymp.logger.FUNCTION_ENTRY);
                if (textViewInstance.text !== null && isNaN(textViewInstance.text)) {
                    var textSize = textViewInstance.text.length;
                    if (textSize >= 1) {
                        btnViewInstance.setVisibility(true);
                    } else {
                        btnViewInstance.setVisibility(false);
                    }
                } else {
                    btnViewInstance.setVisibility(false);
                }
                textViewInstance.parent.forceLayout();
                konymp.logger.debug("#####End enableClearButton#####", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error("#####Exception in enableClearbutton : " + exception.message, konymp.logger.EXCEPTION);
            }
        },
        /**
        * @function isCurrentLocation
        * @description Checks whether header text value is current location value
        * @private
        * @return {boolean} true/false
        */
        isCurrentLocation: function isCurrentLocation() {
            try {
                konymp.logger.debug("#####Start headerComponent.ui.searchHeader/isCurrentLocation#####", konymp.logger.FUNCTION_ENTRY);
                konymp.logger.info("##### CURRENT_LOCATION_VALUE : " + CURRENT_LOCATION_VALUE, konymp.logger.DEFAULT);
                var currentLocationText = CURRENT_LOCATION_VALUE;
                var textLocation = this.view.flxHeader.txtLocation.text;
                if (textLocation === currentLocationText) {
                    konymp.logger.debug("#####End isCurrentLocation#####", konymp.logger.FUNCTION_ENTRY);
                    return true;
                }
                konymp.logger.debug("#####End isCurrentLocation#####", konymp.logger.FUNCTION_EXIT);
                return false;
            } catch (exception) {
                konymp.logger.error("#####Exception in isCurrentLocation : " + exception.message, konymp.logger.EXCEPTION);
            }
        },
        /**
        * @function changeLocationStart
        * @description Triggered on click of location start (textbox)
        * @private
        * @event onTouchStartOfLocationTextBox
        */
        changeLocationStart: function changeLocationStart() {
            try {
                konymp.logger.debug("#####Start changeLocationStart#####", konymp.logger.FUNCTION_ENTRY);
                var currentLocation = this.isCurrentLocation();
                if (currentLocation) {
                    this.view.flxHeader.txtLocation.text = "";
                    this.enableClearButton(this.view.flxHeader.txtLocation, this.view.flxHeader.btnClearLocation);
                } else {
                    this.enableClearButton(this.view.flxHeader.txtLocation, this.view.flxHeader.btnClearLocation);
                }
                if (this.onTouchStartOfLocationTextBox) {
                    this.onTouchStartOfLocationTextBox(currentLocation);
                }
                konymp.logger.debug("#####End changeLocationStart#####", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error("#####Exception in changeLocationStart : " + exception.message, konymp.logger.EXCEPTION);
            }
        },
        /**
        * @function changeCategoryStart
        * @description Triggers onTouchStartOfCategoryTextBox event
        * @private
        * @event onTouchStartOfLocationTextBox
        */
        changeCategoryStart: function changeCategoryStart() {
            try {
                konymp.logger.debug("#####Start changeCategoryStart#####", konymp.logger.FUNCTION_ENTRY);
                this.enableClearButton(this.view.flxHeader.txtPlaceOrCategory, this.view.flxHeader.btnClearSearch);
                if (this.onTouchStartOfLocationTextBox) {
                    this.onTouchStartOfCategoryTextBox();
                }
                konymp.logger.debug("#####End changeCategoryStart#####", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error("#####Exception in changeCategoryStart : " + exception.message, konymp.logger.EXCEPTION);
            }
        },
        /**
        * @function searchLocation
        * @description Triggers onTouchStartOfLocationTextBox event
        * @private
        * @event locationTextChanged
        */
        searchLocation: function searchLocation() {
            try {
                konymp.logger.debug("#####Start searchLocation#####", konymp.logger.FUNCTION_ENTRY);
                this.enableClearButton(this.view.flxHeader.txtLocation, this.view.flxHeader.btnClearLocation);
                var textLocation = this.view.flxHeader.txtLocation.text;
                if (this.locationTextChanged) {
                    this.locationTextChanged(textLocation);
                } else {
                    konymp.logger.info("#####user didn't opt for textChange Event of search location#####", konymp.logger.DEFAULT);
                }
                konymp.logger.debug("#####End searchLocation#####", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error("#####Exception in searchLocation : " + exception.message, konymp.logger.EXCEPTION);
            }
        },
        /**
        * @function searchPlaceOrCategory
        * @description Invokes custom event (placeCategoryTextChanged)
        * @private
        * @event placeCategoryTextChanged
        */
        searchPlaceOrCategory: function searchPlaceOrCategory() {
            try {
                konymp.logger.debug("#####Start searchPlaceOrCategory#####", konymp.logger.FUNCTION_ENTRY);
                this.enableClearButton(this.view.flxHeader.txtPlaceOrCategory, this.view.flxHeader.btnClearSearch);
                var textSearching = this.view.flxHeader.txtPlaceOrCategory.text;
                if (this.placeCategoryTextChanged) {
                    this.placeCategoryTextChanged(textSearching);
                } else {
                    konymp.logger.info("#####user didn't opt for textChange Event of search place or category#####", konymp.logger.DEFAULT);
                }
                konymp.logger.debug("#####End searchPlaceOrCategory#####", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error("#####Exception in searchPlaceOrCategory : " + exception.message, konymp.logger.EXCEPTION);
            }
        },
        /**
        * @function clearText
        * @description Clears text from location searchbox
        * @private
        * @param {Object} textBoxName
        */
        clearText: function clearText(textBoxName) {
            try {
                konymp.logger.debug("#####Start clearText#####");
                this.view[textBoxName].text = "";
                this.changeText(textBoxName);
                konymp.logger.debug("#####End clearText#####");
            } catch (exception) {
                konymp.logger.error("#####Exception in clearText : " + exception.message, konymp.logger.EXCEPTION);
            }
        },
        /**
        * @function getSearchData
        * @description Retuns searched data
        * @private
        * @return {Object} returnData
        */
        getSearchData: function getSeacrhData() {
            try {
                konymp.logger.debug("#####Start getSeacrhData#####", konymp.logger.FUNCTION_ENTRY);
                var searchLocation = this.view.txtLocation.text;
                var searchPlaceOrCategory = this.view.txtPlaceOrCategory.text;
                var returnData = {
                    "searchLocation": searchLocation,
                    "searchPlaceOrCategory": searchPlaceOrCategory
                };
                konymp.logger.debug("#####End getSeacrhData#####", konymp.logger.FUNCTION_EXIT);
                return returnData;
            } catch (exception) {
                konymp.logger.error("#####Exception in headerComponent.ui.searchHeader/getSeacrhData : " + exception.message, konymp.logger.EXCEPTION);
            }
        },
        /**
        * @function forceLayoutOnComponent
        * @description forceLayout On Component
        * @private
        */
        forceLayoutOnComponent: function forceLayoutOnComponent() {
            try {
                konymp.logger.debug("#####Start forceLayoutOnComponent#####", konymp.logger.FUNCTION_ENTRY);
                this.view.flxHeaderHolder.forceLayout();
                konymp.logger.debug("#####EndforceLayoutOnComponent#####", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error("#####Exception in forceLayoutOnComponent : " + exception.message, konymp.logger.EXCEPTION);
            }
        },
        /**
        * @function disableLocationTextBox
        * @description Sets button and textbox visibility to false
        * @private
        * @param {boolean} visibilityValue
        */
        disableLocationTextBox: function disableLocationTextBox(visibilityValue) {
            try {
                konymp.logger.debug("#####Start forceLayoutOnComponent#####", konymp.logger.FUNCTION_ENTRY);
                this.view.flxHeader.txtLocation.setEnabled(visibilityValue);
                this.view.btnClearLocation.setVisibility(visibilityValue);
                konymp.logger.debug("#####Start forceLayoutOnComponent#####", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error("#####Exception in headerComponent.ui.searchHeader/forceLayoutOnComponent : " + exception.message, konymp.logger.EXCEPTION);
            }
        }
    };
});
/*
#
#  Created by Team Kony.
#  Copyright (c) 2017 Kony Inc. All rights reserved.
#
*/
define(function () {
    var konymp = konymp || {};
    var KonyLoggerModule = require("com/konymp/placelocator/KonyLogger");
    konymp.logger = (new KonyLoggerModule("filterscreen")) || function () { };
    return {
        constructor: function (baseConfig, layoutConfig, pspConfig) {
            this._inactiveIcon = "";
            this._activeIcon = "";
            this._inactiveTimingsIcon = "";
            this._activeTimingsIcon = "";
            this._sortByAZ = "";
            this._sortByRating = "";
            this._sortByDistance = "";
          	this._skins = {
              konympPLsknBGLbl018ad1FontFFFFFFRobotoR91 : this.view.lblBestSort.skin,
              konympPLsknLblbdc3c7RobotoR91 : this.view.lblRatingSort.skin,
              konympPLsknLblFontDBDBDBRobotoR157 : this.view.lblPriceL1.skin
            };
        },
        //Logic for getters/setters of custom properties
        initGettersSetters: function () {
            defineSetter(this, "activeIcon", function (value) {
                konymp.logger.debug("#####Start setter activeIcon", konymp.logger.FUNCTION_ENTRY);
                if (value.search(".png") != -1) {
                    this._activeIcon = value;
                } else {
                    this._activeIcon = value + ".png";
                }
                konymp.logger.debug("#####End setter activeIcon", konymp.logger.FUNCTION_EXIT);
            });
            defineGetter(this, "activeIcon", function () {
                konymp.logger.debug("#####Start getter activeIcon", konymp.logger.FUNCTION_ENTRY);
                return this._activeIcon;
            });
            defineSetter(this, "inactiveIcon", function (value) {
                konymp.logger.debug("#####Start setter inactiveIcon", konymp.logger.FUNCTION_ENTRY);
                if (value.search(".png") != -1) {
                    this._inactiveIcon = value;
                } else {
                    this._inactiveIcon = value + ".png";
                }
                konymp.logger.debug("#####End setter inactiveIcon", konymp.logger.FUNCTION_EXIT);
            });
            defineGetter(this, "inactiveIcon", function () {
                konymp.logger.debug("#####Start getter inactiveIcon", konymp.logger.FUNCTION_ENTRY);
                return this._inactiveIcon;
            });

            defineSetter(this, "inactiveTimingsIcon", function (value) {
                konymp.logger.debug("#####Start setter inactiveTimingsIcon", konymp.logger.FUNCTION_ENTRY);
                if (value.search(".png") != -1) {
                    this._inactiveTimingsIcon = value;
                } else {
                    this._inactiveTimingsIcon = value + ".png";
                }
                konymp.logger.debug("#####End setter inactiveTimingsIcon", konymp.logger.FUNCTION_EXIT);
            });
            defineGetter(this, "inactiveTimingsIcon", function () {
                konymp.logger.debug("#####Start getter inactiveTimingsIcon", konymp.logger.FUNCTION_ENTRY);
                return this._inactiveTimingsIcon;
            });

            defineSetter(this, "activeTimingsIcon", function (value) {
                konymp.logger.debug("#####Start setter activeTimingsIcon", konymp.logger.FUNCTION_ENTRY);
                if (value.search(".png") != -1) {
                    this._activeTimingsIcon = value;
                } else {
                    this._activeTimingsIcon = value + ".png";
                }
                konymp.logger.debug("#####End setter activeTimingsIcon", konymp.logger.FUNCTION_EXIT);
            });
            defineGetter(this, "activeTimingsIcon", function () {
                konymp.logger.debug("#####Start getter activeTimingsIcon", konymp.logger.FUNCTION_ENTRY);
                return this._activeTimingsIcon;
            });
        },
        /**
         * @function changeFilterOptions
         * @description Changes filter options according to selected values
         * @private
         */
        changeFilterOptions: function () {
		try {
			konymp.logger.debug("#####Start getter changeFilterOptions", konymp.logger.FUNCTION_ENTRY);
            var widgets = this.view.flxSortOptions.widgets();
            var visibleWidgets = [];
            for (i = 0; i < widgets.length; i++) {
                if (this.view[widgets[i].id].isVisible == true) {
                    visibleWidgets.push((widgets[i].id).toString());
                }
            }
            if (visibleWidgets.length == 1) {
                this.sortVisibility = false;
            }
            else if (visibleWidgets.length == 2) {
                this.view.flxSortOptions.width = "45%";
                this.view.lblBestSort.width = "50%";
                this.view[visibleWidgets[1]].width = "50%";
            }
            else if (visibleWidgets.length == 3) {
                this.view.flxSortOptions.width = "67.5%";
                this.view.lblBestSort.width = "33%";
                this.view[visibleWidgets[1]].width = "33%";
                this.view[visibleWidgets[2]].width = "33%";
            }
            this.view.forceLayout();
			konymp.logger.debug("#####End setter changeFilterOptions", konymp.logger.FUNCTION_EXIT);
		} catch (exception) {
                konymp.logger.error("#####Exception in changeFilterOptions : " + exception.message, konymp.logger.EXCEPTION);
            }
        },
        /**
          * @function changeSortSelection
          * @description Applies filter on selected filter menu sorting option
          * @private
          * @param {Object} eventObject
          */
        changeSortSelection: function changeSortSelection(eventObject) {
            try {
                konymp.logger.debug("#####Start changeSortSelection", konymp.logger.FUNCTION_ENTRY);
                var sortOptions = ["lblBestSort", "lblRatingSort", "lblDistanceSort", "lblAZSort"];
                var sortOptionsCount = sortOptions.length;
                for (var i = 0; i < sortOptionsCount; i++) {
                    if (sortOptions[i] === eventObject.id) {
                        this.view.flxSortOptions[sortOptions[i]].skin = this._skins.konympPLsknBGLbl018ad1FontFFFFFFRobotoR91;
                    } else {
                        this.view.flxSortOptions[sortOptions[i]].skin = this._skins.konympPLsknLblbdc3c7RobotoR91;
                    }
                }
                konymp.logger.debug("#####End changeSortSelection", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error("#####Exception in changeSortSelection : " + exception.message, konymp.logger.EXCEPTION);
            }
        },
        /**
         * @function starRating
         * @description Applies filter on selected filter menu rating option
         * @private
         * @param {Object} eventObject
         */
        starRating: function starRating(eventObject) {
            try {
                konymp.logger.debug("#####Star startRating", konymp.logger.FUNCTION_ENTRY);
                var ratingCount = parseInt(eventObject.id.slice(-1));
                for (var i = 0; i < 5; i++) {
                    if ((i + 1) <= ratingCount) {
                        this.view["imgRating" + (i + 1)].src = this.activeIcon;
                    } else {
                        this.view["imgRating" + (i + 1)].src = this.inactiveIcon;
                    }
                }
                konymp.logger.debug("#####End starRating", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error("#####Exception in starRating : " + exception.message, konymp.logger.EXCEPTION);
            }
        },
        /**
         * @function priceFilter
         * @description Applies filter on selected filter menu price option
         * @private
         * @param {Object} eventObject
         */
        priceFilter: function priceFilter(eventObject) {
            try {
                konymp.logger.debug("#####Start priceFilter", konymp.logger.FUNCTION_ENTRY);
                var priceLevel = parseInt(eventObject.id.slice(-1));
                for (var i = 0; i < 4; i++) {
                    if ((i + 1) === priceLevel) {
                        this.view["lblPriceL" + (i + 1)].skin = this.view.lblHidden1.skin
                    } else {
                        this.view["lblPriceL" + (i + 1)].skin = this._skins.konympPLsknLblFontDBDBDBRobotoR157;
                    }
                }
                konymp.logger.debug("#####End priceFilter", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error("#####Exception in priceFilter : " + exception.message, konymp.logger.EXCEPTION);
            }
        },
        /**
         * @function toggleOpenClose
         * @description Toggles open and close of timings in filtermenu
         * @private
         * @param {Object} eventObject
         */
        toggleOpenClose: function toggleOpenClose(eventObject) {
            try {
                konymp.logger.debug("#####Start toggleOpenClose", konymp.logger.FUNCTION_ENTRY);
                if (this.view.flxOpenNow.imgOpen.src === this.activeTimingsIcon) {
                    this.view.flxOpenNow.imgOpen.src = this.inactiveTimingsIcon;
                } else {
                    this.view.flxOpenNow.imgOpen.src = this.activeTimingsIcon;
                }
                konymp.logger.debug("#####End toggleOpenClose", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error("#####Exception in toggleOpenClose : " + exception.message, konymp.logger.EXCEPTION);
            }
        },
        /**
         * @function resetFilters
         * @description Clears out all the selected options in filter menu
         * @private
         */
        resetFilters: function resetFilters() {
            try {
                konymp.logger.debug("#####Start resetFilters", konymp.logger.FUNCTION_ENTRY);
                this.changeSortSelection({
                    "id": "lblBestSort"
                });
                this.starRating({
                    "id": "imgRating0"
                });
                this.priceFilter({
                    "id": "lblPriceL0"
                });
                this.view.flxOpenNow.imgOpen.src = this.inactiveTimingsIcon;
                konymp.logger.debug("#####End resetFilters", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error("#####Exception in resetFilters : " + exception.message, konymp.logger.EXCEPTION);
            }
        },
        /**
         * @function applyFilter
         * @description Invokes custom callback event
         * @private
         * @event customApplyFilter 
         */
        applyFilter: function applyFilter() {
            try {
                konymp.logger.debug("#####Start applyFilter", konymp.logger.FUNCTION_ENTRY);
                var response = this.getAppliedFilter();
                if (this.customApplyFilter) {
                    this.customApplyFilter(response);
                }
                konymp.logger.info("##### data to return : " + JSON.stringify(response), konymp.logger.DEFAULT);
                konymp.logger.debug("#####End applyFilter", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error("#####Exception in applyFilter : " + exception.message, konymp.logger.EXCEPTION);
            }
        },
        /**
         * @function getAppliedFilter
         * @description Returns selected filter options in filter menu
         * @private
         * @returns response 
         */
        getAppliedFilter: function getAppliedFilter() {
            try {
                konymp.logger.debug("#####Start getAppliedFilter", konymp.logger.FUNCTION_ENTRY);
                var sortOption = this.getSelecctedSortOption();
                var ratingOption = this.getRatingFilterOption();
                var priceOption = this.getPriceFilterOption();
                var openNowOption;
                if (this.view.flxOpenNow.imgOpen.src === this.activeTimingsIcon) {
                    openNowOption = true;
                } else {
                    openNowOption = false;
                }
                var response = {
                    "sortOption": sortOption,
                    "ratingOption": ratingOption,
                    "priceOption": priceOption,
                    "openNowOption": openNowOption
                };
                konymp.logger.debug("#####End getAppliedFilter", konymp.logger.FUNCTION_EXIT);
                return response;
            } catch (exception) {
                konymp.logger.error("#####Exception in getAppliedFilter : " + exception.message, konymp.logger.EXCEPTION);
            }
        },
        /**
         * @function getSelecctedSortOption
         * @description Return selected sort option in filtermenu
         * @private
         * @returns selectedSortOption
         */
        getSelecctedSortOption: function getSelecctedSortOption() {
            try {
                konymp.logger.debug("#####Start getSelecctedSortOption", konymp.logger.FUNCTION_ENTRY);
                var sortOptions = ["lblBestSort", "lblRatingSort", "lblDistanceSort", "lblAZSort"];
                var sortOptionsCount = sortOptions.length;
                for (var i = 0; i < sortOptionsCount; i++) {
                    if (this.view.flxSortOptions[sortOptions[i]].skin === this._skins.konympPLsknBGLbl018ad1FontFFFFFFRobotoR91) {
                        return sortOptions[i].slice(3);
                    }
                }
                konymp.logger.debug("#####End getSelecctedSortOption", konymp.logger.FUNCTION_EXIT);
                return null;
            } catch (exception) {
                konymp.logger.error("#####Exception in getSelecctedSortOption : " + exception.message, konymp.logger.EXCEPTION);
            }
        },
        /**
         * @function getRatingFilterOption
         * @description Return rating of selected price option in filtermenu
         * @private
         * @returns selectedRating
         */
        getRatingFilterOption: function getRatingFilterOption() {
            try {
                konymp.logger.debug("#####Start getRatingFilterOption", konymp.logger.FUNCTION_ENTRY);
                for (var i = 0; i < 5; i++) {
                    if (this.view["imgRating" + (i + 1)].src === this.inactiveIcon) {
                        if (i === 0) {
                            return null;
                        }
                        return i;
                    }
                }
                konymp.logger.debug("#####End getRatingFilterOption", konymp.logger.FUNCTION_EXIT);
                return i;
            } catch (exception) {
                konymp.logger.error("#####Exception in getRatingFilterOption : " + exception.message, konymp.logger.EXCEPTION);
            }
        },
        /**
         * @function getPriceFilterOption
         * @description Return price of selected price option in filtermenu
         * @private
         * @returns selectedPrice 
         */
        getPriceFilterOption: function getPriceFilterOption() {
            try {
                konymp.logger.debug("#####Start getPriceFilterOption", konymp.logger.FUNCTION_ENTRY);
                for (var i = 0; i < 4; i++) {
                    if (this.view["lblPriceL" + (i + 1)].skin === this.view.lblHidden1.skin) {
                        return (i + 1);
                    }
                }
                konymp.logger.debug("#####End getPriceFilterOption", konymp.logger.FUNCTION_EXIT);
                return null;
            } catch (exception) {
                konymp.logger.error("#####Exception in getPriceFilterOption : " + exception.message, konymp.logger.EXCEPTION);
            }
        },
        /**
         * @function setDatatoFilterScreen
         * @description set Data to filter screen
         * @private
         * @param {Object} setDataJSON
         */
        setDatatoFilterScreen: function setDatatoFilterScreen(setDataJSON) {
            try {
                konymp.logger.debug("#####Start setDatatoFilterScreen", konymp.logger.FUNCTION_ENTRY);
                this.setSelecctedSortOption("lbl" + setDataJSON.sortOption);
                this.setRatingFilterOption(setDataJSON.ratingOption);
                this.setPriceFilterOption(setDataJSON.priceOption);
				//CHANGE NO.1
                var openNowOption = setDataJSON.openNowOption;
                if (openNowOption === true) {
                    this.view.flxOpenNow.imgOpen.src = this.activeTimingsIcon;
                } else {
                    this.view.flxOpenNow.imgOpen.src = this.inactiveTimingsIcon;
                }
                konymp.logger.debug("#####End setDatatoFilterScreen", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error("#####Exception in setDatatoFilterScreen : " + exception.message, konymp.logger.EXCEPTION);
            }
        },
        /**
         * @function setSelecctedSortOption
         * @description set Selected sort option in  filtermenu
         * @private
         * @param {number} sortOptionID
         */
        setSelecctedSortOption: function setSelecctedSortOption(sortOptionID) {
            try {
                konymp.logger.debug("#####Start setSelecctedSortOption", konymp.logger.FUNCTION_ENTRY);
                var sortOptions = ["lblBestSort", "lblRatingSort", "lblDistanceSort", "lblAZSort"];
                var sortOptionsCount = sortOptions.length;
                for (var i = 0; i < sortOptionsCount; i++) {
                    if (sortOptions[i] === sortOptionID) {
                        this.view.flxSortOptions[sortOptions[i]].skin = this._skins.konympPLsknBGLbl018ad1FontFFFFFFRobotoR91;
                    } else {
                        this.view.flxSortOptions[sortOptions[i]].skin = this._skins.konympPLsknLblbdc3c7RobotoR91;
                    }
                }
                konymp.logger.debug("#####End setSelecctedSortOption", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error("#####Exception in setSelecctedSortOption : " + exception.message, konymp.logger.EXCEPTION);
            }
        },
        /**
         * @function setRatingFilterOption
         * @description Sets rating option in filter menu
         * @private
         * @param {number} ratingOptionCount
         */
        setRatingFilterOption: function setRatingFilterOption(ratingOptionCount) {
            try {
                konymp.logger.debug("#####Start setRatingFilterOption", konymp.logger.FUNCTION_ENTRY);
                for (var i = 0; i < 5; i++) {
                    if (ratingOptionCount === null || (i + 1) > ratingOptionCount) {
                        this.view["imgRating" + (i + 1)].src = this.inactiveIcon;
                    } else {
                        this.view["imgRating" + (i + 1)].src = this.activeIcon;
                    }
                }
                konymp.logger.debug("#####End setRatingFilterOption", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error("#####Exception in setRatingFilterOption : " + exception.message, konymp.logger.EXCEPTION);
            }
        },
        /**
         * @function setPriceFilterOption
         * @description Set price as filter option in filter menu
         * @private
         * @param {number} filterOptionCount
         */
        setPriceFilterOption: function setPriceFilterOption(filterOptionCount) {
            try {
                konymp.logger.debug("#####Start setPriceFilterOption", konymp.logger.FUNCTION_ENTRY);
                for (var i = 0; i < 4; i++) {
                    if (filterOptionCount === null || filterOptionCount !== (i + 1)) {
                        this.view["lblPriceL" + (i + 1)].skin = this._skins.konympPLsknLblFontDBDBDBRobotoR157;
                    } else {
                        this.view["lblPriceL" + (i + 1)].skin = this.view.lblHidden1.skin;
                    }
                }
                konymp.logger.debug("#####End setPriceFilterOption", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error("#####Exception in setPriceFilterOption : " + exception.message, konymp.logger.EXCEPTION);
            }
        }
    };
});
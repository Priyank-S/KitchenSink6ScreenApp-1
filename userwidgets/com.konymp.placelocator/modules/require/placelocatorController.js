/*
#
#  Created by Team Kony.
#  Copyright (c) 2017 Kony Inc. All rights reserved.
#
*/
define(function() {
  var konymp = konymp || {};
  var KonyLoggerModule = require("com/konymp/placelocator/KonyLogger");
  konymp.logger = (new KonyLoggerModule("placelocator")) || function() {};
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.RECENT_SEARCH_KEY = "placeLocator_store_key";
      this.selecetedFromRecentSearch = false;
      this.CURRENT_LOCATION_IMAGE = "";
      this.mapAPIKey = null;
      this._recentSearches = true;
      this.previousPageToken = "";
      this.currentPageToken = "";
      this._distanceVisibility = true;
      this._phoneVisibility = true;
      this._directionsVisibility = true;
      this._ratingVisibility = true;
      this._addressVisibility = true;
      this._timingVisibility = true;
      this._imageVisibility = true;
      this._filterVisibility = true;
      this._inactiveIcon = "";
      this._halfIcon = "";
      this._activeIcon = "";
      this._distanceUnits = "";
      this._getDirectionsIcon = "";
      this._callIcon = "";
      this.selectedLocationForSearch = null;
      this.currentLocationData = {};
      this.selecetedFromRecentSearch = false;
      this.timeList = true;
      this.priceList = false;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineSetter(this, "currentLocationLabelText", function(val) {
        konymp.logger.debug("#####Start setter currentLocationLabelText", konymp.logger.FUNCTION_ENTRY);
        this.view.autoSuggest.currentLocationText = val;
        this.view.searchHeader.locationTbxText = val;
        this.view.searchHeader.locationPlaceHolder = val;
        CURRENT_LOCATION_VALUE = val;
        konymp.logger.debug("#####End setter currentLocationLabelText", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "currentLocationLabelText", function() {
        konymp.logger.debug("#####Start getter currentLocationLabelText", konymp.logger.FUNCTION_ENTRY);
        return this.view.searchHeader.LocatonTbxText;
      });
      defineSetter(this, "googleAPIKey", function(val) {
        konymp.logger.debug("#####Start setter googleAPIKey", konymp.logger.FUNCTION_ENTRY);
        this.mapAPIKey = val;
        konymp.logger.debug("#####End setter googleAPIKey", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "googleAPIKey", function() {
        konymp.logger.debug("#####Start getter googleAPIKey", konymp.logger.FUNCTION_ENTRY);
        return this.mapAPIKey;
      });
      defineSetter(this, "defaultSearchRadius", function(val) {
        konymp.logger.debug("#####Start setter defaultSearchRadius", konymp.logger.FUNCTION_ENTRY);
        try {
          if (!isNaN(val) && parseInt(val) !== null && parseInt(val) !== undefined) {
            REUSABLE_SEARCH_RADIUS = parseInt(val);
          } else {
            REUSABLE_SEARCH_RADIUS = "2000";
          }
        } catch (exception) {
          REUSABLE_SEARCH_RADIUS = "2000";
        }
        konymp.logger.info("#####defaultSearchRadius value is : " + REUSABLE_SEARCH_RADIUS, konymp.logger.DEFAULT);
        konymp.logger.debug("#####End setter defaultSearchRadius", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "defaultSearchRadius", function() {
        konymp.logger.debug("#####Start getter defaultSearchRadius", konymp.logger.FUNCTION_ENTRY);
        return REUSABLE_SEARCH_RADIUS;
      });
      defineSetter(this, "currentLocationImage", function(val) {
        konymp.logger.debug("#####Start setter currentLocationImage", konymp.logger.FUNCTION_ENTRY);
        this.CURRENT_LOCATION_IMAGE = val;
        konymp.logger.debug("#####End setter currentLocationImage", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "currentLocationImage", function() {
        konymp.logger.debug("#####Start getter currentLocationImage", konymp.logger.FUNCTION_ENTRY);
        return this.CURRENT_LOCATION_IMAGE;
      });
      defineGetter(this, "recentSearches", function() {
        konymp.logger.debug("#####Start getter recentSearches", konymp.logger.FUNCTION_ENTRY);
        return this._recentSearches;
      });
      defineSetter(this, "recentSearches", function(val) {
        konymp.logger.debug("#####Start setter recentSearches", konymp.logger.FUNCTION_ENTRY);
        this._recentSearches = val;
        konymp.logger.debug("#####End setter recentSearches", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "distanceVisibility", function() {
        konymp.logger.debug("#####Start getter distanceVisibility", konymp.logger.FUNCTION_ENTRY);
        return this._distanceVisibility;
      });
      defineSetter(this, "distanceVisibility", function(val) {
        konymp.logger.debug("#####Start setter distanceVisibility", konymp.logger.FUNCTION_ENTRY);
        this._distanceVisibility = val;
        konymp.logger.debug("#####End setter distanceVisibility", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "phoneVisibility", function() {
        konymp.logger.debug("#####Start getter phoneVisibility", konymp.logger.FUNCTION_ENTRY);
        return this._phoneVisibility;
      });
      defineSetter(this, "phoneVisibility", function(val) {
        konymp.logger.debug("#####Start setter phoneVisibility", konymp.logger.FUNCTION_ENTRY);
        this._phoneVisibility = val;
        konymp.logger.debug("#####End setter phoneVisibility", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "directionsVisibility", function() {
        konymp.logger.debug("#####Start getter directionsVisibility", konymp.logger.FUNCTION_ENTRY);
        return this._directionsVisibility;
      });
      defineSetter(this, "directionsVisibility", function(val) {
        konymp.logger.debug("#####Start setter directionsVisibility", konymp.logger.FUNCTION_ENTRY);
        this._directionsVisibility = val;
        konymp.logger.debug("#####End setter directionsVisibility", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "ratingVisibility", function() {
        konymp.logger.debug("#####Start getter ratingVisibility", konymp.logger.FUNCTION_ENTRY);
        return this._ratingVisibility;
      });
      defineSetter(this, "ratingVisibility", function(val) {
        konymp.logger.debug("#####Start setter ratingVisibility", konymp.logger.FUNCTION_ENTRY);
        this._ratingVisibility = val;
        konymp.logger.debug("#####End setter ratingVisibility", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "addressVisibility", function() {
        konymp.logger.debug("#####Start getter addressVisibility", konymp.logger.FUNCTION_ENTRY);
        return this._addressVisibility;
      });
      defineSetter(this, "addressVisibility", function(val) {
        konymp.logger.debug("#####Start setter addressVisibility", konymp.logger.FUNCTION_ENTRY);
        this._addressVisibility = val;
        konymp.logger.debug("#####End setter addressVisibility", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "timingVisibility", function() {
        konymp.logger.debug("#####Start getter timingVisibility", konymp.logger.FUNCTION_ENTRY);
        return this._timingVisibility;
      });
      defineSetter(this, "timingVisibility", function(val) {
        konymp.logger.debug("#####Start setter timingVisibility", konymp.logger.FUNCTION_ENTRY);
        this._timingVisibility = val;
        konymp.logger.debug("#####End setter timingVisibility", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "imageVisibility", function() {
        konymp.logger.debug("#####Start getter imageVisibility", konymp.logger.FUNCTION_ENTRY);
        return this._imageVisibility;
      });
      defineSetter(this, "imageVisibility", function(val) {
        konymp.logger.debug("#####Start setter imageVisibility", konymp.logger.FUNCTION_ENTRY);
        this._imageVisibility = val;
        konymp.logger.debug("#####End setter imageVisibility", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "filterVisibility", function() {
        konymp.logger.debug("#####Start getter filterVisibility", konymp.logger.FUNCTION_ENTRY);
        return this._filterVisibility;
      });
      defineSetter(this, "filterVisibility", function(val) {
        konymp.logger.debug("#####Start setter filterVisibility", konymp.logger.FUNCTION_ENTRY);
        this._filterVisibility = val;
        konymp.logger.debug("#####End setter filterVisibility", konymp.logger.FUNCTION_EXIT);
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
      defineSetter(this, "halfIcon", function (value) {
        konymp.logger.debug("#####Start setter halfIcon", konymp.logger.FUNCTION_ENTRY);
        if (value.search(".png") != -1) {
          this._halfIcon = value;
        } else {
          this._halfIcon = value + ".png";
        }
        konymp.logger.debug("#####End setter halfIcon", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "halfIcon", function () {
        konymp.logger.debug("#####Start getter halfIcon", konymp.logger.FUNCTION_ENTRY);
        return this._halfIcon;
      });
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
       defineSetter(this, "distanceUnits", function (value) {
        konymp.logger.debug("#####Start setter distanceUnits", konymp.logger.FUNCTION_ENTRY);
         if(value == "km"){
          this._distanceUnits = "km";
        }
         else if(value == "mi"){
           this._distanceUnits = "mi";
         }
        konymp.logger.debug("#####End setter distanceUnits", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "distanceUnits", function () {
        konymp.logger.debug("#####Start getter distanceUnits", konymp.logger.FUNCTION_ENTRY);
        return this._distanceUnits;
      });
      defineSetter(this, "callIcon", function (value) {
        konymp.logger.debug("#####Start setter callIcon", konymp.logger.FUNCTION_ENTRY);
        if (value.search(".png") != -1) {
          this._callIcon = value;
        } else {
          this._callIcon = value + ".png";
        }
        konymp.logger.debug("#####End setter callIcon", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "callIcon", function () {
        konymp.logger.debug("#####Start getter callIcon", konymp.logger.FUNCTION_ENTRY);
        return this._callIcon;
      });
      
      defineSetter(this, "getDirectionsIcon", function (value) {
        konymp.logger.debug("#####Start setter getDirectionsIcon", konymp.logger.FUNCTION_ENTRY);
        if (value.search(".png") != -1) {
          this._getDirectionsIcon = value;
        } else {
          this._getDirectionsIcon = value + ".png";
        }
        konymp.logger.debug("#####End setter getDirectionsIcon", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "getDirectionsIcon", function () {
        konymp.logger.debug("#####Start getter callIcon", konymp.logger.FUNCTION_ENTRY);
        return this._getDirectionsIcon;
      });
    },
   /**
    * @function createDynamicMenu
    * @description Creates a dynamic menu with provided data
    * @public
    * @param {Object} menuData
    */
    createDynamicMenu: function createDynamicMenu(menuData) {
      try {
        konymp.logger.debug("#####Start createDynamicMenu", konymp.logger.FUNCTION_ENTRY);
        this.view.flxScreen1.isVisible = true;
        if (this.createdDynamicMenu === null || this.createdDynamicMenu === undefined || this.createdDynamicMenu === false) {
          this.createdDynamicMenu = true;
          this.assignFunction();
          this.timeList = true;
          this.priceList = false;
          if(menuData!=null && menuData.length == 1){
            kony.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
            kony.location.getCurrentPosition(this.getCurrentLocationCoordinatesSuccessCallback.bind(this),this.getCurrentLocationCoordinatesErrorCallback.bind(this),{});
            this.menuData = menuData;
            this.searchPlacesNearMe({"lat":"","lon":""}, null);
            return;
          }
          if(menuData!=null && menuData!=undefined && menuData.length < 5){
            this.view.segRecentSearch.top = "35%";
            this.view.segRecentSearch.height = "65%";
            this.view.forceLayout();
          }
          else{
            this.view.segRecentSearch.top = "50%";
            this.view.segRecentSearch.height = "50%";
            this.view.forceLayout();
          }
          if (menuData === null || menuData === undefined) {
            konymp.logger.info("#####Setting default menu ", konymp.logger.DEFAULT);
            menuData = [{
              "placeTypeIcon_selected": "restaurants_selected.png",
              "placeTypeIcon_unselected": "restaurants.png",
              "browseKeyword": "restaurant",
              "displayText": "Restaurants",
              "mapPin": "restaurants_pin.png",
              "mapPin_selected": "restaurants_pin_active.png"
            },
                        {
                          "placeTypeIcon_selected": "coffee_shops_selected.png",
                          "placeTypeIcon_unselected": "coffee_shops.png",
                          "browseKeyword": "cafe",
                          "displayText": "Coffee Shops",
                          "mapPin": "coffee_shops_pin.png",
                          "mapPin_selected": "coffee_shops_pin_active.png"
                        },
                        {
                          "placeTypeIcon_selected": "bars_selected.png",
                          "placeTypeIcon_unselected": "bars.png",
                          "browseKeyword": "bar",
                          "displayText": "Bars",
                          "mapPin": "bars_pin.png",
                          "mapPin_selected": "bars_pin_active.png"
                        },
                        {
                          "placeTypeIcon_selected": "entertainment_selected.png",
                          "placeTypeIcon_unselected": "entertainment.png",
                          "browseKeyword": "movie_theater",
                          "displayText": "Entertainment",
                          "mapPin": "entertainment_pin.png",
                          "mapPin_selected": "entertainment_pin_active.png"
                        },
                        {
                          "placeTypeIcon_selected": "shopping_selected.png",
                          "placeTypeIcon_unselected": "shopping.png",
                          "browseKeyword": "shopping_mall",
                          "displayText": "Shopping",
                          "mapPin": "shopping_pin.png",
                          "mapPin_selected": "shopping_pin_active.png"
                        },
                        {
                          "placeTypeIcon_selected": "museums_selected.png",
                          "placeTypeIcon_unselected": "museums.png",
                          "browseKeyword": "museum",
                          "displayText": "Museums",
                          "mapPin": "museums_pin.png",
                          "mapPin_selected": "museums_pin_active.png"
                        },
                        {
                          "placeTypeIcon_selected": "banks_selected.png",
                          "placeTypeIcon_unselected": "banks.png",
                          "browseKeyword": "bank",
                          "displayText": "Banks",
                          "mapPin": "banks_pin.png",
                          "mapPin_selected": "banks_pin_active.png"
                        }
                       ];
          }
          for (var menuCount = 0; menuCount < menuData.length; menuCount++) {
            menuData[menuCount].imgId = "img" + menuCount;
          }
          this.menuData = menuData;
          this.view.menuComponent.creatDynamicMenu(menuData);
          this.addRecentSearchData();
        }
        konymp.logger.debug("#####End createDynamicMenu", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in createDynamicMenu : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function assignFunction
    * @description Helper function to assign callbacks
    * @private
    */
    assignFunction: function assignFunction() {
      try {
        konymp.logger.debug("#####Start assignFunction", konymp.logger.FUNCTION_ENTRY);
        this.view.filterScreen.changeFilterOptions();
        this.view.searchHeader.locationTextChanged = this.searchLocationStart.bind(this);
        this.view.searchHeader.placeCategoryTextChanged = this.searchforCategory.bind(this);
        this.view.searchHeader.onTouchStartOfLocationTextBox = this.changeOfLocationStart.bind(this);
        this.view.searchHeader.onTouchStartOfCategoryTextBox = this.changeCategoryStart.bind(this);
        this.view.searchHeader.changeText = this.clearTextTriggered.bind(this);
        this.view.searchHeader.onEditLocationDone = this.onEditLocationDone.bind(this);
        this.view.menuComponent.onSearchSelectionClicked = this.searchSelectionSelected.bind(this);
        this.view.menuComponent.selectedUnselectedImage = this.selectedUnselectedImage.bind(this);
        this.view.autoSuggest.fetchCurrentLocationSuccess = this.getCurrentLocationCoordinatesSuccessCallback.bind(this);
        this.view.autoSuggest.fetchCurrentLocationFailure = this.getCurrentLocationCoordinatesErrorCallback.bind(this);
        this.view.autoSuggest.currentLocationSelectionCallback = this.currentLocationSelected.bind(this);
        this.view.listMapView.getDirectionsInvokedCallback = this.getDirection.bind(this);
        this.view.listMapView.successDrawMapRoute = this.drawRouteSuccess.bind(this);
        this.view.listMapView.refreshData = this.refreshData.bind(this);
        this.view.listMapView.callToInvoked = this.callInvoked.bind(this);
        this.view.listMapView.callSearchHere = this.callSearchHere.bind(this);
        this.view.listMapView.getCurrentLocation = this.navigateToCurrentLocation.bind(this);
        this.view.listMapView.customPinClick = this.customPinClick.bind(this);
        this.view.listMapView.onMapClick = this.mapClickOrChangeView.bind(this);
        this.view.listMapView.cancelMapsSuccess = this.setVisibilityOfShiftView.bind(this);
        this.view.listMapView.openMapsSuccess = this.setVisibilityOfShiftView.bind(this);
        this.view.listMapView.getPlaceDetails = this.getPlaceDetailsFromList.bind(this);
        this.view.filterScreen.customApplyFilter = this.applyFilter.bind(this);
        this.view.filterScreen.cancelFilter = this.cancelFilter.bind(this);
        this.view.searchHeader.btnClearLocationVisibility = false;
        this.view.flxScreen2.isVisible = false;
        konymp.logger.debug("#####End assignFunction", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in assignFunction : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function changeCategoryStart
    * @description Changes category on click of category option
    * @private
    */
    changeCategoryStart: function changeCategoryStart() {
      try {
        konymp.logger.debug("#####Start changeCategoryStart", konymp.logger.FUNCTION_ENTRY);
        this.view.autoSuggest.addressSelected = this.categoryChangeSelected.bind(this);
        this.view.autoSuggest.currentLocationVisibility = true;
        konymp.logger.debug("#####End changeCategoryStart", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in changeCategoryStart : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function changeOfLocationStart
    * @description This function is triggered on selection of any location from suggestion menu
    * @private
    */
    changeOfLocationStart: function changeOfLocationStart() {
      try {
        konymp.logger.debug("#####Start changeOfLocationStart", konymp.logger.FUNCTION_ENTRY);
        this.view.autoSuggest.addressSelected = this.addressSelected.bind(this);
        this.view.flxScreen1.forceLayout();
        if (this.view.flxScreen2.isVisible === true ) {
          this.view.flxFilterBar.isVisible = false;
          this.view.flxScreen2.height = "93.8%";
          this.view.flxScreen2.top = "10%";
          this.view.flxSearchedContent.setVisibility(false);
          if(this.menuData.length==1){
            this.view.flxScreen2.isVisible = true;
            this.view.autoSuggest.isVisible = true;
          }
          if (this.searchHeaderText !== null && this.searchHeaderText !== undefined) {
            this.view.searchHeader.locationTbxText = this.searchHeaderText;
          }
          this.view.searchHeader.btnClearLocationVisibility = true;
          this.view.searchHeader.forceLayoutOnComponent();
          this.view.searchHeader.disableLocationTextBox(true);
          this.addRecentSearchData();
          if(this.menuData.length!=1){
            this.cancelSearch();
          }

        }
        var searchText = this.view.searchHeader.locationTbxText;
        if (searchText === "" || searchText.length < 1) {
          this.view.menuComponent.searchSelectionVisibility = false;
        }
        konymp.logger.debug("#####End changeOfLocationStart", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in changeOfLocationStart : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function clearTextTriggered
    * @description Clears text and sets default location as current location
    * @private
    * @param {Object} textBoxName
    */
    clearTextTriggered: function clearTextTriggered(textBoxName) {
      try {
        konymp.logger.debug("#####Start clearTextTriggered", konymp.logger.FUNCTION_ENTRY);
        if (textBoxName === "txtLocation") {
          this.onEditLocationDone();
        }
        konymp.logger.debug("#####End clearTextTriggered", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in clearTextTriggered : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function categoryChangeSelected
    * @description Triggered on selection of change of category
    * @private
    */
    categoryChangeSelected: function categoryChangeSelected() {
      try {
        konymp.logger.debug("#####Start categoryChangeSelected", konymp.logger.FUNCTION_ENTRY);
        var textCategory = this.view.searchHeader.categoryTbxText;
        if (!isNaN(textCategory) && textCategory !== null && textCategory.length >= 1) {
          this.view.menuComponent.isVisible = false;
          this.view.autoSuggest.currentLocationVisibility = false;
        } else {
          this.view.menuComponent.isVisible = true;
          this.view.autoSuggest.isVisible = false;
        }
        this.view.flxScreen1.forceLayout();
        konymp.logger.debug("#####End categoryChangeSelected", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in categoryChangeSelected : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function searchLocationStart
    * @description Triggered on selection of start location
    * @private
    */
    searchLocationStart: function searchLocationStart() {
      try {
        konymp.logger.debug("#####Start searchLocationStart", konymp.logger.FUNCTION_ENTRY);
        var searchText = this.view.searchHeader.locationTbxText;
        this.view.autoSuggest.isVisible = true;
        this.view.menuComponent.isVisible = false;
        this.view.flxScreen1.forceLayout();
        this.selectedLocationForSearch = null;
        if (searchText.length >= 1) {
          this.callAutosuggestAPI(searchText);
        } else {
          this.view.menuComponent.searchSelectionVisibility = false;
        }
        konymp.logger.debug("#####End searchLocationStart", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in searchLocationStart : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function callAutosuggestAPI
    * @description Invokes autosuggest feature
    * @private
    * @param {String} searchText
    * @event usernameOnDone 
    * @event passwordOnDone
    */
    callAutosuggestAPI: function callAutosuggestAPI(searchText) {
      try {
        konymp.logger.debug("#####Start callAutosuggestAPI", konymp.logger.FUNCTION_ENTRY);
        var objSvc = kony.sdk.getCurrentInstance().getObjectService("PlaceLocatorObjectServices", {
          "access": "online"
        });
        var currentObj = this;
        var dataObject = new kony.sdk.dto.DataObject("AutoSuggestions");
        var queryParams = {
          "searchText": searchText
        };
        if (this.mapAPIKey !== "null") {
          queryParams.key = this.mapAPIKey;
        }
        var options = {
          "dataObject": dataObject,
          "queryParams": queryParams
        };
        konymp.logger.info("#####Query params for autosuggest : "+JSON.stringify(options),konymp.logger.DEFAULT);
        objSvc.fetch(options, currentObj.autoSuggestCallback.bind(currentObj), autoSuggestErrorCallback = function(res) {
          konymp.logger.debug("#####Start autoSuggestErrorCallback", konymp.logger.FUNCTION_ENTRY);
          konymp.logger.info("#####Failure in autoSuggestErrorCallback :  " + JSON.stringify(res), konymp.logger.ERROR_CALLBACK);
          kony.application.dismissLoadingScreen();
          alert("Error occured while fetching data Please try after some time..");
          konymp.logger.debug("#####End autoSuggestErrorCallback", konymp.logger.FUNCTION_EXIT);
        });
        konymp.logger.debug("#####End callAutosuggestAPI", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in callAutosuggestAPI : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function autoSuggestCallback
    * @description Success callback for autosuggest
    * @private
    * @param {Object} response
    * @callback callAutosuggestAPI 
    */
    autoSuggestCallback: function autoSuggestCallback(response) {
      try {
        konymp.logger.debug("#####Start autoSuggestCallback", konymp.logger.FUNCTION_ENTRY);
        if (response.records[0].Predictions !== undefined) {
          konymp.logger.info("#####Data from service for autoSuggest is : " + JSON.stringify(response.records[0].Predictions), konymp.logger.SUCCESS_CALLBACK);
          this.setDataToAutoSuggest(response.records[0].Predictions);
        }
        konymp.logger.debug("#####End autoSuggestCallback", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in autoSuggestCallback : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function setDataToAutoSuggest
    * @description Sets data to autosuggest segment 
    * @private
    * @param {Object} data
    */
    setDataToAutoSuggest: function setDataToAutoSuggest(data) {
      try {
        konymp.logger.debug("#####Start setDataToAutoSuggest", konymp.logger.FUNCTION_ENTRY);
        var widgetMapping = {};
        widgetMapping["lblName"] = "description";
        this.view.autoSuggest.setDataToSegment(data, widgetMapping);
        konymp.logger.debug("#####End setDataToAutoSuggest", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in setDataToAutoSuggest : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function getCurrentLocationCoordinatesSuccessCallback
    * @description Success callback for getCurrentLocationCoordinates
    * @private
    * @param {Object} successResponse
    * @callback getCurrentLocationCoordinates 
    */
    getCurrentLocationCoordinatesSuccessCallback: function getCurrentLocationCoordinatesSuccessCallback(successResponse) {
      try {
        konymp.logger.debug("#####Start getCurrentLocationCoordinatesSuccessCallback", konymp.logger.FUNCTION_ENTRY);
        konymp.logger.info("#####Current location : " + JSON.stringify(successResponse), konymp.logger.SUCCESS_CALLBACK);
        var location = [{
          lat: successResponse.coords.latitude.toString(),
          lon: successResponse.coords.longitude.toString(),
          image: {
            source: this.CURRENT_LOCATION_IMAGE,
            anchor: kony.map.PIN_IMG_ANCHOR_CENTER
          },
          calloutData: {
            name: ""
          },
          showcallout: false
        }];
        this.selectedLocationForSearch = location[0];
        if (this.view.searchHeader.locationTbxText === this.view.autoSuggest.currentLocationText) {
          this.currentLocationData = location[0];
        }
        this.callNavigateToLocation = true;
        this.searchPlacesNearMe(location[0], null);
        konymp.logger.debug("#####End getCurrentLocationCoordinatesSuccessCallback", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        kony.application.dismissLoadingScreen();
        konymp.logger.error("#####Exception in getCurrentLocationCoordinatesSuccessCallback : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function getCurrentLocationCoordinatesErrorCallback
    * @description Failure callback for getCurrentLocationCoordinates
    * @private
    * @param {Object} successResponse
    * @callback getCurrentLocationCoordinates 
    */
    getCurrentLocationCoordinatesErrorCallback: function getCurrentLocationCoordinatesErrorCallback(failureResponse) {
      try {
        konymp.logger.debug("#####Start getCurrentLocationCoordinatesErrorCallback", konymp.logger.FUNCTION_ENTRY);
        konymp.logger.info("#####Failure in retriving location details using GPS : " + JSON.stringify(failureResponse), konymp.logger.ERROR_CALLBACK);
        kony.application.dismissLoadingScreen();
        switch (failureResponse.code) {
          case 1:
            alert("GPS access denied...");
            break;
          case 2:
            alert("Turn On GPS in settings..");
            break;
          case 3:
            alert("TIMED OUT...!!");
            break;
        }
        konymp.logger.debug("#####End getCurrentLocationCoordinatesErrorCallback", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in getCurrentLocationCoordinatesErrorCallback : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function currentLocationSelected
    * @description This function is triggered on selection of any location
    * @private
    */
    currentLocationSelected: function currentLocationSelected() {
      try {
        konymp.logger.debug("#####Start currentLocationSelected", konymp.logger.FUNCTION_ENTRY);
        if(this.menuData.length == 1){
          this.view.searchHeader.btnClearLocationVisibility = false;
          this.view.autoSuggest.getCurrentLocationCoordinates();
        }
        this.view.searchHeader.locationTbxText = this.view.autoSuggest.currentLocationText;
        this.view.autoSuggest.isVisible = false;
        this.view.menuComponent.isVisible = true;
        this.view.flxScreen1.forceLayout();
        var selectedCategory = this.view.menuComponent.getSelectedCategory();
        if (selectedCategory[0].length >= 1) {
          this.view.menuComponent.searchSelectionVisibility = true;
        } else {
          this.view.menuComponent.searchSelectionVisibility = false;
        }
        konymp.logger.debug("#####End currentLocationSelected", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in currentLocationSelected : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function addressSelected
    * @description Helper function to currentLocationSelected
    * @private
    * @param {Object} data
    */
    addressSelected: function addressSelected(data) {
      try {
        konymp.logger.debug("#####Start addressSelected", konymp.logger.FUNCTION_ENTRY);
        if(this.menuData.length == 1){
          var place = {};
          place.place_id = data.place_id;
          this.view.searchHeader.btnClearLocationVisibility = false;
          this.previousPageToken = "";
          this.currentPageToken = "";
          this.getCoordinatesFromPlaceID(place);
        }
        var locationData = data.description;
        this.view.searchHeader.locationTbxText = locationData;
        this.view.menuComponent.isVisible = true;
        this.view.autoSuggest.isVisible = false;
        this.view.flxScreen1.forceLayout();
        this.selectedLocationForSearch = data;
        this.view.searchHeader.btnClearLocationVisibility = true;
        var selectedCategory = this.view.menuComponent.getSelectedCategory();
        if (selectedCategory[0].length >= 1) {
          this.view.menuComponent.searchSelectionVisibility = true;
        }
        konymp.logger.debug("#####End addressSelected", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in addressSelected : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function selectedUnselectedImage
    * @description Toggles selection of image
    * @private
    * @param {boolean} isSelected
    */
    selectedUnselectedImage: function selectedUnselectedImage(isSelected) {
      try {
        konymp.logger.debug("#####Start selectedUnselectedImage", konymp.logger.FUNCTION_ENTRY);
        var listValues = this.view.menuComponent.getSelectedCategory();
        var list = listValues[0];      
        if (isSelected && ((this.selectedLocationForSearch !== null) || (this.view.searchHeader.locationTbxText === this.view.autoSuggest.currentLocationText))) {
          if (this.view.searchHeader.locationTbxText !== "") {
            if(this.menuData.length<5){
              this.view.segRecentSearch.top = "45%";
              this.view.segRecentSearch.height = "65%";
            }
            else{
              this.view.segRecentSearch.top = "57%";
              this.view.segRecentSearch.height = "43%";
            }
            this.view.menuComponent.searchSelectionVisibility = true;
            this.view.menuComponent.forceLayoutTheComponent();
          }
        } else {
          if (list.length >= 1 && ((this.selectedLocationForSearch !== null) || (this.view.searchHeader.locationTbxText === this.view.autoSuggest.currentLocationText))) {
            if (this.view.searchHeader.locationTbxText !== "") {
              if(this.menuData.length<5){
                this.view.segRecentSearch.top = "45%";
                this.view.segRecentSearch.height = "65%";
              }
              else{
                this.view.segRecentSearch.top = "57%";
                this.view.segRecentSearch.height = "43%";
              }
              this.view.menuComponent.searchSelectionVisibility = true;
            }
          } else {
            this.view.menuComponent.searchSelectionVisibility = false;
            if(this.menuData.length<5){
              this.view.segRecentSearch.top = "35%";
            }
            else{
              this.view.segRecentSearch.top = "50%";
            }   
            this.view.forceLayout();
            this.view.searchHeader.categoryTbxText = "";
          }
        }
        this.view.searchHeader.forceLayoutOnComponent();
        konymp.logger.debug("#####End selectedUnselectedImage", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in selectedUnselectedImage : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function searchSelectionSelected
    * @description Change the view on selection of any region
    * @private
    */
    searchSelectionSelected: function searchSelectionSelected() {
      try {
        konymp.logger.debug("#####Start searchSelectionSelected", konymp.logger.FUNCTION_ENTRY);
        if(this.filterVisibility==false){
          this.view.imgFilter.isVisible = false;
          this.view.lblFilter.isVisible = false;
          this.view.lblSeperator.isVisible = false;
          this.view.lblListMapView.width = "40%";
          this.view.lblListMapView.centerX = "65%"; 
          this.view.imgListMapView.width = "17%";
          this.view.imgListMapView.height = "70%";
          this.view.imgListMapView.centerX = "30%";
          this.view.flxShiftViews.width = "30%";
          this.view.flxShiftViews.centerX = "50%";
          this.view.forceLayout();
        }
        this.view.filterScreen.activeIcon = this.activeIcon;
        this.view.filterScreen.inactiveIcon = this.inactiveIcon;
        this.previousPageToken = "";
        this.currentPageToken = "";
        this.view.flxShiftViews.imgListMapView.src = "list_icon.png";
        this.view.flxShiftViews.lblListMapView.text = "List";
        kony.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
        if (this.selecetedFromRecentSearch === true) {
          this.selecetedFromRecentSearch = false;
          konymp.logger.info("#####Search Data from Available store Data : Recent Search location is choose.", konymp.logger.DEFAULT);
          this.searchdataFromAvailableLocationCoordinates(this.selectedLocationForSearch);
          return;
        }
        if (this.view.searchHeader.locationTbxText === "" || this.view.searchHeader.locationTbxText === null) {
          this.view.menuComponent.searchSelectionVisibility = false;
          this.view.menuComponent.forceLayoutTheComponent();
          kony.application.dismissLoadingScreen();
          alert("Enter location of search!!!");
        } else {
          var segData = this.selectedLocationForSearch;
          if (this.view.searchHeader.locationTbxText === this.view.autoSuggest.currentLocationText) {
            konymp.logger.info("#####Current location search choosen", konymp.logger.DEFAULT);
            this.view.autoSuggest.getCurrentLocationCoordinates();
          } else if (segData === null || segData === undefined || (segData.place_id !== null && segData.place_id !== undefined)) {
            konymp.logger.info("#####Search data of a place using the place ID is being called : " + JSON.stringify(segData), konymp.logger.DEFAULT);
            this.getCoordinatesFromPlaceID(segData);
          } else {
            this.callNavigateToLocation = true;
            konymp.logger.info("#####Search Place Near Me using the location already choose. It Already have data for selected location : " + JSON.stringify(segData), konymp.logger.DEFAULT);
            this.searchPlacesNearMe(segData, null);
          }
        }
        this.view.searchHeader.btnClearLocationVisibility = false;
        konymp.logger.debug("#####End searchSelectionSelected", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        kony.application.dismissLoadingScreen();
        konymp.logger.error("#####Exception in searchSelectionSelected : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function getCoordinatesFromPlaceID
    * @description Returns coordinates from provided place
    * @private
    * @param {Object} place
    */
    getCoordinatesFromPlaceID: function getCoordinatesFromPlaceID(place) {
      try {
        konymp.logger.debug("#####Start getCoordinatesFromPlaceID", konymp.logger.FUNCTION_ENTRY);
        var objSvc = kony.sdk.getCurrentInstance().getObjectService("PlaceLocatorObjectServices", {
          "access": "online"
        });
        var currentObj = this;
        var dataObject = new kony.sdk.dto.DataObject("GetLocationCoordinatesUsingPlaceID");
        var queryParams = {
          "placeID": place.place_id
        };
        if (this.mapAPIKey !== "null") {
          queryParams.key = this.mapAPIKey;
        }
        var options = {
          "dataObject": dataObject,
          "queryParams": queryParams
        };
        objSvc.fetch(options, currentObj.getCoordinatesFromPlaceIDSuccessCallback.bind(currentObj, place), getCoordinatesFromPlaceIDSuccessCallback = function(res) {
          konymp.logger.debug("#####Start getCoordinatesFromPlaceIDSuccessCallback", konymp.logger.FUNCTION_ENTRY);
          konymp.logger.info("#####Failure in getPlaceID :  " + JSON.stringify(res), konymp.logger.ERROR_CALLBACK);
          kony.application.dismissLoadingScreen();
          alert("Error occured while fetching data Please try after some time..");
          konymp.logger.debug("#####End getCoordinatesFromPlaceIDSuccessCallback", konymp.logger.FUNCTION_EXIT);
        });
        konymp.logger.debug("#####End getCoordinatesFromPlaceID", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        kony.application.dismissLoadingScreen();
        konymp.logger.error("#####Exception in getCoordinatesFromPlaceID : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function getCoordinatesFromPlaceIDSuccessCallback
    * @description Success callback for getCoordinatesFromPlaceID
    * @private
    * @param {Object} place
    * @param {Object} response 
    * @callback getCoordinatesFromPlaceID
    */
    getCoordinatesFromPlaceIDSuccessCallback: function getCoordinatesFromPlaceIDSuccessCallback(place, response) {
      try {
        konymp.logger.debug("#####Start getCoordinatesFromPlaceIDSuccessCallback", konymp.logger.FUNCTION_ENTRY);
        konymp.logger.info("#####Response of get coordinates using placeID : " + JSON.stringify(response), konymp.logger.SUCCESS_CALLBACK);
        var locationData = response.records[0];
        var responseToReturn = {
          coords: {
            latitude: locationData.lat,
            longitude: locationData.lng
          }
        };
        place.lat = locationData.lat;
        place.lng = locationData.lng;
        if(this.menuData.length == 1){
          this.selectedLocationForSearch.lat = locationData.lat;
          this.selectedLocationForSearch.lon = locationData.lng;
          this.searchPlacesNearMe({"lat":"","lon":""}, null);
          return;
        }
        this.storeSearchData(place);
        this.getCurrentLocationCoordinatesSuccessCallback(responseToReturn);
        konymp.logger.debug("#####End getCoordinatesFromPlaceIDSuccessCallback", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        kony.application.dismissLoadingScreen();
        konymp.logger.error("#####Exception in getCoordinatesFromPlaceIDSuccessCallback : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
    /**
    * @function searchPlacesNearMe
    * @description Returns list of all nearby places
    * @private
    * @param {Object} location
    * @param {String} radiusRequired 
    */
    searchPlacesNearMe: function searchPlacesNearMe(location, radiusRequired) {
      try {
        konymp.logger.debug("#####Start searchPlacesNearMe", konymp.logger.FUNCTION_ENTRY);
        var places = this.view.menuComponent.getSelectedCategory();
        var placeType = places[0].join("|");
        var radius = REUSABLE_SEARCH_RADIUS;
        if (radiusRequired !== null) {
          radius = radiusRequired;
        }
        if(this.menuData.length == 1){
          kony.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
          this.view.flxScreen2.isVisible = true;
          location = {};
          location.lat = this.selectedLocationForSearch.lat;
          location.lon = this.selectedLocationForSearch.lon;
          placeType = this.menuData[0].browseKeyword.toLowerCase();
        }
        var objSvc = kony.sdk.getCurrentInstance().getObjectService("PlaceLocatorObjectServices", {
          "access": "online"
        });
        var currentObj = this;
        var dataObject = new kony.sdk.dto.DataObject("SearchNearbyUsingCoordinates");
        if(location.lat == "" && location.lon ==""){
          location.lat = this.selectedLocationForSearch.lat;
          location.lon = this.selectedLocationForSearch.lon;
        }
        var queryParams = {
          "location": (location.lat + "," + location.lon).toString(),
          "radius": radius.toString(),
          "type": placeType,
          "pagetoken" : ""
        };
        if (this.mapAPIKey !== "null") {
          queryParams.key = this.mapAPIKey;
        }
        if(this.currentPageToken != "" && this.currentPageToken != null ){
          queryParams.pagetoken = this.currentPageToken;
        }
        konymp.logger.info("#####Query params : " + JSON.stringify(queryParams), konymp.logger.DEFAULT);
        var options = {
          "dataObject": dataObject,
          "queryParams": queryParams
        };
        objSvc.fetch(options, currentObj.searchPlacesNearMeSuccessCallback.bind(currentObj), searchPlacesNearMeErrorCallback = function(res) {
          konymp.logger.debug("#####Start searchPlacesNearMeErrorCallback", konymp.logger.FUNCTION_ENTRY);
          konymp.logger.info("#####Failure in searchPlacesNearMeErrorCallback :  " + JSON.stringify(res), konymp.logger.ERROR_CALLBACK);
          kony.application.dismissLoadingScreen();
          alert("Error occured while fetching data Please try after some time..");
          konymp.logger.debug("#####End searchPlacesNearMeErrorCallback", konymp.logger.FUNCTION_EXIT);
        });
        konymp.logger.debug("#####End searchPlacesNearMe", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        kony.application.dismissLoadingScreen();
        konymp.logger.error("#####Exception in searchPlacesNearMe : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function searchPlacesNearMeSuccessCallback
    * @description Success callback for searchPlacesNearMe 
    * @private
    * @param {Object} response
    * @callback searchPlacesNearMe
    */
    searchPlacesNearMeSuccessCallback: function searchPlacesNearMeSuccessCallback(response) {
      try {
        konymp.logger.debug("#####Start searchPlacesNearMeSuccessCallback", konymp.logger.FUNCTION_ENTRY);
        konymp.logger.info("#####Response of get places nearby : " + JSON.stringify(response), konymp.logger.SUCCESS_CALLBACK);
        var searchLoc = this.selectedLocationForSearch;
        var passData = [];
        passData.push(response);
        if (this.view.searchHeader.locationTbxText !== this.view.autoSuggest.currentLocationText) {
          this.view.autoSuggest.fetchCurrentLocationSuccess = this.getCurrentLocationSuccess.bind(this, passData);
          this.view.autoSuggest.fetchCurrentLocationFailure = this.getCurrentLocationError.bind(this, passData);
          this.view.autoSuggest.getCurrentLocationCoordinates();
          return;
        }
        passData.push(searchLoc);
        this.formatResponse(passData);
        kony.application.dismissLoadingScreen();
        konymp.logger.debug("#####End searchPlacesNearMeSuccessCallback", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        kony.application.dismissLoadingScreen();
        konymp.logger.error("#####Exception in searchPlacesNearMeSuccessCallback : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function getCurrentLocationSuccess
    * @description Success callback for getCurrentLocation 
    * @private
    * @param {Object} requiredData
    * @param {Object} response
    * @callback searchPlacesNearMe
    */
    getCurrentLocationSuccess: function getCurrentLocationSuccess(requiredData, response) {
      try {
        konymp.logger.debug("#####Start getCurrentLocationSuccess", konymp.logger.FUNCTION_ENTRY);
        this.view.autoSuggest.fetchCurrentLocationFailure = this.getCurrentLocationCoordinatesErrorCallback.bind(this);
        this.view.autoSuggest.fetchCurrentLocationSuccess = this.getCurrentLocationCoordinatesSuccessCallback.bind(this);
        konymp.logger.info("#####Response of get current location : " + JSON.stringify(response), konymp.logger.SUCCESS_CALLBACK);
        var location = [{
          lat: response.coords.latitude.toString(),
          lon: response.coords.longitude.toString(),
          image: {
            source: this.CURRENT_LOCATION_IMAGE,
            anchor: kony.map.PIN_IMG_ANCHOR_CENTE
          },
          calloutData: {
            name: ""
          },
          showcallout: false
        }];
        this.currentLocationData = location[0];
        requiredData.push(location[0]);
        this.formatResponse(requiredData);
        kony.application.dismissLoadingScreen();
        konymp.logger.debug("#####End getCurrentLocationSuccess", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        kony.application.dismissLoadingScreen();
        konymp.logger.error("#####Exception in getCurrentLocationSuccess : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function getCurrentLocationError
    * @description Failure callback for getCurrentLocation 
    * @private
    * @param {Object} requiredData
    * @param {Object} error
    * @callback searchPlacesNearMe
    */
    getCurrentLocationError: function getCurrentLocationError(requiredData, error) {
      try {
        konymp.logger.debug("#####Start getCurrentLocationError", konymp.logger.FUNCTION_ENTRY);
        this.view.autoSuggest.fetchCurrentLocationFailure = this.getCurrentLocationCoordinatesErrorCallback.bind(this);
        this.view.autoSuggest.fetchCurrentLocationSuccess = this.getCurrentLocationCoordinatesSuccessCallback.bind(this);
        konymp.logger.info("#####Error in getting current location : " + JSON.stringify(error), konymp.logger.ERROR_CALLBACK);
        kony.application.dismissLoadingScreen();
        switch (error.code) {
          case 1:
            alert("GPS access denied...");
            break;
          case 2:
            alert("Turn On GPS in settings..");
            break;
          case 3:
            alert("TIMED OUT...!!");
            break;
        }
        this.formatResponse(requiredData);
        konymp.logger.debug("#####End getCurrentLocationError", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in getCurrentLocationError : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function searchforCategory
    * @description Helper function for searchPlacesNearMe
    * @private
    */
    searchforCategory: function searchforCategory() {
      try {
        konymp.logger.debug("#####Start searchforCategory", konymp.logger.FUNCTION_ENTRY);
        var searchText = this.view.searchHeader.categoryTbxText;
        this.view.autoSuggest.isVisible = true;
        this.view.menuComponent.isVisible = false;
        this.selectedLocationForSearch = null;
        if (searchText.length >= 2) {
          this.callAutosuggestAPI(searchText);
        }
        konymp.logger.debug("#####End searchforCategory", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in searchforCategory : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function formatResponse
    * @description Formats response to map it to List and map view
    * @private
    * @param {Object} passData
    */
    formatResponse: function formatResponse(passData) {
      try {
        konymp.logger.debug("#####Start formatResponse", konymp.logger.FUNCTION_ENTRY);
        var response = passData[0].records[0].FinalResult;
        konymp.logger.info("#####Data from response : " + JSON.stringify(response), konymp.logger.DEFAULT);
        var locData = [];
        var resultLength = response.length;
        var segmentData = [];
        var selectedType = this.view.menuComponent.getSelectedCategory();
        for (var i = 0; i < resultLength; i++) {
          var timeList = "";
          if (this.timeList) {
            if (response[i].OpenNow !== null && response[i].OpenNow !== undefined) {
              if (response[i].OpenNow === "true") {
                timeList = "Open";
              } else {
                timeList = "Closed";
              }
            }
          }
          var phone = {
            "isVisible": this.phoneVisibility
          };
          var direction = {
            "isVisible" : this.directionsVisibility
          };
          if (response[i].Phone === null || response[i].Phone === undefined || response[i].Phone.length === 0) {
            konymp.logger.info("##### false : " + response[i].Name, konymp.logger.DEFAULT);
            phone = {
              "isVisible": false
            };
          }
          var rating = response[i].Rating;
          var ratingDisplayNumber = response[i].Rating;
          var flxRating = {
            "isVisible": this.ratingVisibility
          };
          if (response[i].Rating === null || response[i].Rating === undefined || response[i].Rating === "") {
            rating = 0;
            ratingDisplayNumber = "No rating";
            flxRating = {
              "isVisible": false
            };
          }
          rating = (Math.round(parseFloat(rating) * 2) / 2).toFixed(1);
          var img = [];
          for (var imageCount = 0; imageCount < 5; imageCount++) {
            if (rating >= 1) {
              img[imageCount] = this.activeIcon;
              rating = rating - 1;
            } else if (rating == 0.5) {
              img[imageCount] = this.halfIcon;
              rating = rating - 0.5;
            } else {
              img[imageCount] = this.inactiveIcon;
            }
          }
          var distance = response[i].distance;
          if(this.distanceUnits == "km"){
            distance = distance/1000;
          }
          else if (this.distanceUnits == "mi"){
            distance = distance*0.000621371192
          }
          distance = Math.round(distance * 100) / 100
          locData.push({
            lat: response[i].Latitude,
            lon: response[i].Longitude,
            id: i.toString(),
            image: {
              source: selectedType[1][0],
              anchor: kony.map.PIN_IMG_ANCHOR_CENTER
            },
            calloutData: {
              lblPlaceName: response[i].Name,
              Rating: ratingDisplayNumber,
              lblAddress: {"text":response[i].Vicinity,"isVisible":this.addressVisibility},
              lblPlaceType: selectedType[2][0],
              lblDistance: {"text":distance+ " "+this.distanceUnits,"isVisible":this.distanceVisibility},
              lblTiming: {"text":timeList,"isVisible":this.timingVisibility},
              PlaceID: response[i].PlaceID,
              Phone: response[i].Phone,
              flxCall: phone,
              flxDirections : direction,
              flxRating: flxRating,
              Distance : distance,
              imgCall : this.callIcon,
              imgGetDirections :this.getDirectionsIcon,
              index: i,
              img1: img[0],
              img2: img[1],
              img3: img[2],
              img4: img[3],
              img5: img[4]
            },
            showcallout: true
          });
          var photo = null;
          var imageURL = "no_image.png";
          konymp.logger.info("#####PhotoReference : " + response[i].PhotoReference, konymp.logger.DEFAULT);
          if (response[i].PhotoReference !== undefined) {
            photo = response[i].PhotoReference;
            imageURL = response[i].ImageURL;
          }
          if(this.imageVisibility==false && this.view.listMapView.rowTemplate!="flxHolder1" &&this.view.listMapView.segCalloutRowTemplate != "flxHolderCallout"){
            this.view.listMapView.rowTemplate = "flxHolder1";
            this.view.listMapView.segCalloutRowTemplate = "flxHolderCallout";
            this.view.forceLayout();
          }
          segmentData.push({
            lat: response[i].Latitude,
            lon: response[i].Longitude,
            Rating: ratingDisplayNumber,
            lblPlaceName: response[i].Name,
            lblAddress: {"text":response[i].Vicinity,"isVisible":this.addressVisibility},
            lblPlaceType: selectedType[2][0],
            PlaceID: response[i].PlaceID,
            lblDistance: {"text": distance+ " "+this.distanceUnits,"isVisible":this.distanceVisibility},
            lblTiming: {"text":timeList,"isVisible":this.timingVisibility},
            imgItem: {
              "src": imageURL
            },
            photoreference: photo,
            flxCall: phone,
            imgCall : this.callIcon,
            imgGetDirections :this.getDirectionsIcon,
            flxDirections : direction,
            flxRating: flxRating,
            Phone: response[i].Phone,
            index: i,
            Distance : distance,
            img1: img[0],
            img2: img[1],
            img3: img[2],
            img4: img[3],
            img5: img[4],
            lblLine: "test"
          });
        }
        if (passData.length === 2) {
          if(this.currentPageToken==""){
            var searchLocation = passData[1];
            searchLocation.id = "currentLocationPin";
            locData.push(searchLocation);
          }
        }
        if (resultLength === 0) {
          this.view.lblNoResults.isVisible = true;
        } else {
          this.view.lblNoResults.isVisible = false;
        }
        var widgetMapping = {};
        widgetMapping["lblPlaceName"] = "lblPlaceName";
        widgetMapping["lblAddress"] = "lblAddress";
        widgetMapping["lblDistance"] = "lblDistance";
        widgetMapping["lblTiming"] = "lblTiming";
        widgetMapping["lblRate"] = "Rating";
        widgetMapping["img1"] = "img1";
        widgetMapping["img2"] = "img2";
        widgetMapping["img3"] = "img3";
        widgetMapping["img4"] = "img4";
        widgetMapping["img5"] = "img5";
        widgetMapping["flxCall"] = "flxCall";
        widgetMapping["flxDirections"] = "flxDirections";
        widgetMapping["flxRating"] = "flxRating";
        widgetMapping["imgCall"] = "imgCall";
        widgetMapping["imgGetDirections"] = "imgGetDirections";
        if(this.imageVisibility==true){
          widgetMapping["imgItem"] = "imgItem";
          widgetMapping["lblLine"] = "lblLine";
          widgetMapping["lblPlaceType"] = "lblPlaceType";
        }
        var formattedData = {
          "segmentWidgetMapping": widgetMapping,
          "segmentData": segmentData,
          "locationData": locData
        };
        this.serviceData = formattedData;
        if(this.currentPageToken!=""){
          this.view.listMapView.appendDataToSegment(formattedData);
        }
        else{
          if (this.callNavigateToLocation === true) {
            this.view.listMapView.mapDataToSegmentAndMap(formattedData, {
              "lat": this.selectedLocationForSearch.lat,
              "lon": this.selectedLocationForSearch.lon
            }, selectedType[1][0], selectedType[4][0], true);
          } else {
            this.view.listMapView.mapDataToSegmentAndMap(formattedData, null, selectedType[1][0], selectedType[4][0], true);
          }
        }
        var myPageToken = passData[0].records[0].pagetoken;
        this.previousPageToken = this.currentPageToken;
        this.currentPageToken = myPageToken;
        this.view.flxScreen2.setVisibility(true);
        if (this.view.searchHeader.locationTbxText.replace(/\s*$/, "") !== "") {
          this.searchHeaderText = this.view.searchHeader.locationTbxText;
          var locationData = this.view.searchHeader.locationTbxText;
          if (locationData.length > 30 ) {
            if(this.menuData.length !=1)
            {
              locationData = locationData.substring(0, 30) + "...";
            }
            else{
              locationData = locationData.substring(0, 45) + "...";
            }
          }
          this.view.lblLocation.text = locationData;
          this.view.searchHeader.locationTbxText = " ";
        }
        this.view.lblCategory.text = selectedType[2][0];
        this.view.searchHeader.disableLocationTextBox(false);
        this.view.flxSearchedContent.setVisibility(true);
        this.view.searchHeader.forceLayoutOnComponent();
        this.view.searchHeader.btnClearLocationVisibility = false;
        this.view.forceLayout();
        if(this.currentPageToken=="")
        {
          this.view.flxShiftViews.imgListMapView.src = "list_icon.png";
          this.view.flxShiftViews.lblListMapView.text = "List";
        }
        this.view.filterScreen.resetFilters();
        this.view.flxFilterBar.isVisible = false;
        this.view.flxFilterBar.isVisible = false;
        this.view.flxScreen2.height = "93.8%";
        this.view.flxScreen2.top = "10%";
        kony.application.dismissLoadingScreen();
        konymp.logger.debug("#####End formatResponse", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in formatResponse : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
  /**
    * @function viewShift
    * @description shifts the view from List to Map and Vice Versa
    * @private
    * @param 
    */
    viewShift: function viewShift() {
      try {
        konymp.logger.debug("#####Start viewShift", konymp.logger.FUNCTION_ENTRY);
        this.mapClickOrChangeView();
        if (this.view.flxShiftViews.imgListMapView.src === "list_icon.png") {
          this.view.listMapView.shiftToView("ListView");
          this.view.flxShiftViews.imgListMapView.src = "map_icon.png";
          this.view.flxShiftViews.lblListMapView.text = "Map";
        } else {
          this.view.flxShiftViews.imgListMapView.src = "list_icon.png";
          this.view.flxShiftViews.lblListMapView.text = "List";
          this.view.listMapView.shiftToView("MapView");
        }
        konymp.logger.debug("#####End viewShift", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in viewShift : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function cancelSearch
    * @description to disable visibility of the search flex
    * @private
    */
    cancelSearch: function cancelSearch() {
      try {
        konymp.logger.debug("#####Start cancelSearch", konymp.logger.FUNCTION_ENTRY);
        this.view.flxScreen2.setVisibility(false);
        this.view.searchHeader.forceLayoutOnComponent();
        konymp.logger.debug("#####End cancelSearch", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in cancelSearch : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function getDirection
    * @description gives the direction from source(currentLocation) to destination
    * @private
    * @param {Object} context
    */
    getDirection: function getDirection(context) {
      try {
        konymp.logger.debug("#####Start getDirection", konymp.logger.FUNCTION_ENTRY);
        var selectedData;
        if (context !== null) {
          var locationData = this.view.listMapView.locationData;
          selectedData = locationData[context.rowIndex];
        } else {
          selectedData = this.view.listMapView.selectedPinLocation;
          selectedData.lblPlaceName = selectedData.calloutData.lblPlaceName;
        }
        this.view.lblSearchPlace.text = selectedData.lblPlaceName;
        var data = JSON.stringify(this.currentLocationData);
        if (data.lon !== null && data.lon !== undefined) {
          var destination = selectedData.lat.toString() + "," + selectedData.lon.toString();
          var origin = this.currentLocationData.lat.toString() + "," + this.currentLocationData.lon.toString();
          //#ifdef iphone
          this.view.flxShiftViews.setVisibility(false);
          //#endif
          this.view.listMapView.getDirections(origin, destination);
          this.view.forceLayout();
        } else {
          kony.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
          this.view.autoSuggest.fetchCurrentLocationSuccess = this.getCurrentLocationForDirectionSuccessCallback.bind(this, selectedData);
          this.view.autoSuggest.getCurrentLocationCoordinates();
        }
        konymp.logger.debug("#####End getDirection", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in getDirection : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function getCurrentLocationForDirectionSuccessCallback
    * @description success callback for getDirection
    * @private
    * @param {Object} destinationData, response
    * @event 
    * @event 
    */
    getCurrentLocationForDirectionSuccessCallback: function getCurrentLocationForDirectionSuccessCallback(destinationData, response) {
      try {
        konymp.logger.debug("#####Start getCurrentLocationForDirectionSuccessCallback", konymp.logger.FUNCTION_ENTRY);
        kony.application.dismissLoadingScreen();
        konymp.logger.info("#####Response of get coordinates for direction : " + JSON.stringify(response), konymp.logger.SUCCESS_CALLBACK);
        this.view.autoSuggest.fetchCurrentLocationSuccess = this.getCurrentLocationCoordinatesSuccessCallback.bind(this);
        var destination = destinationData.lat.toString() + "," + destinationData.lon.toString();
        var origin = response.coords.latitude.toString() + "," + response.coords.longitude.toString();
        //#ifdef iphone
        this.view.flxShiftViews.setVisibility(false);
        //#endif
        this.view.listMapView.getDirections(origin, destination);
        konymp.logger.debug("#####End getCurrentLocationForDirectionSuccessCallback", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in getCurrentLocationForDirectionSuccessCallback : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function setVisibilityOfShiftView
    * @description setting the visibility of flxShiftViews to true
    * @private
    */
    setVisibilityOfShiftView: function setVisibilityOfShiftView() {
      try {
        konymp.logger.debug("#####Start setVisibilityOfShiftView", konymp.logger.FUNCTION_ENTRY);
        //#ifdef iphone
        this.view.flxShiftViews.setVisibility(true);
        //#endif
        konymp.logger.debug("#####End setVisibilityOfShiftView", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in setVisibilityOfShiftView : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function drawRouteSuccess
    * @description setting the visibility of flxCloseRoutes, listMapView and flxShiftViews to true and false respectively
    * @private
    */
    drawRouteSuccess: function drawRouteSuccess() {
      try {
        konymp.logger.debug("#####Start drawRouteSuccess", konymp.logger.FUNCTION_ENTRY);
        this.view.flxCloseRoutes.setVisibility(true);
        this.view.listMapView.mapRouteVisibility = true;
        this.view.flxShiftViews.isVisible = false;
        this.view.flxScreen1.forceLayout();
        konymp.logger.debug("#####End drawRouteSuccess", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in drawRouteSuccess : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function closeRoutes
    * @description setting the visibility of flxCloseRoutes, listMapView and flxShiftViews to false and true respectively
    * @private
    */
    closeRoutes: function closeRoutes() {
      try {
        konymp.logger.debug("#####Start closeRoutes", konymp.logger.FUNCTION_ENTRY);
        this.view.flxCloseRoutes.setVisibility(false);
        this.view.listMapView.mapRouteVisibility = false;
        this.view.flxShiftViews.isVisible = true;
        konymp.logger.debug("#####End closeRoutes", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in closeRoutes : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function refreshData
    * @description to refresh the list data
    * @private
    */
    refreshData: function refreshData() {
      try {
        konymp.logger.debug("#####Start refreshData", konymp.logger.FUNCTION_ENTRY);
        this.searchSelectionSelected();
        konymp.logger.debug("#####End refreshData", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in refreshData : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function callInvoked
    * @description on click of mobile image dial the respective number
    * @private
    * @param {Object} selectedContext
    */
    callInvoked: function callInvoked(selectedContext) {
      try {
        konymp.logger.debug("#####Start callInvoked", konymp.logger.FUNCTION_ENTRY);
        var phoneNumber;
        if (selectedContext !== null) {
          var locationData = this.view.listMapView.locationData;
          phoneNumber = locationData[selectedContext.rowIndex].Phone;
        } else {
          phoneNumber = this.view.listMapView.selectedPinLocation.calloutData.Phone;
        }
        if (phoneNumber !== undefined && phoneNumber !== null) {
          kony.phone.dial(phoneNumber);
        }
        konymp.logger.debug("#####End callInvoked", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in callInvoked : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function callSearchHere
    * @description 
    * @private
    * @param {Object} radius, centerCoord
    * @event 
    * @event 
    */
    callSearchHere: function callSearchHere(radius, centerCoord) {
      try {
        konymp.logger.debug("#####Start callSearchHere", konymp.logger.FUNCTION_ENTRY);
        this.mapClickOrChangeView();
        this.previousPageToken = "";
        this.currentPageToken = "";
        this.searchPlacesNearMe(centerCoord, radius);
        this.callNavigateToLocation = false;
        konymp.logger.debug("#####End callSearchHere", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        kony.application.dismissLoadingScreen();
        konymp.logger.error("#####Exception in callSearchHere : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function navigateToCurrentLocation
    * @description navigates to current location
    * @private
    * @event 
    * @event 
    */
    navigateToCurrentLocation: function navigateToCurrentLocation() {
      try {
        konymp.logger.debug("#####Start navigateToCurrentLocation", konymp.logger.FUNCTION_ENTRY);
        this.view.autoSuggest.fetchCurrentLocationSuccess = this.getCurrentLocationNavigateToSuccess.bind(this);
        kony.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
        this.mapClickOrChangeView();
        this.view.autoSuggest.getCurrentLocationCoordinates();
        konymp.logger.debug("#####End navigateToCurrentLocation", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in navigateToCurrentLocation : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function getCurrentLocationNavigateToSuccess
    * @description success callback for navigateToCurrentLocation
    * @private
    * @param {Object} response
    * @event 
    * @event 
    */
    getCurrentLocationNavigateToSuccess: function getCurrentLocationNavigateToSuccess(response) {
      try {
        konymp.logger.debug("#####Start getCurrentLocationNavigateToSuccess", konymp.logger.FUNCTION_ENTRY);
        this.view.autoSuggest.fetchCurrentLocationSuccess = this.getCurrentLocationCoordinatesSuccessCallback.bind(this);
        var location = {
          lat: response.coords.latitude,
          lon: response.coords.longitude
        };
        this.view.listMapView.navigateToLocation(location);
        kony.application.dismissLoadingScreen();
        konymp.logger.debug("#####End getCurrentLocationNavigateToSuccess", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in getCurrentLocationNavigateToSuccess : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function onEditLocationDone
    * @description this function is invoked on done of modify/edit location
    * @private
    * @event 
    * @event 
    */
    onEditLocationDone: function onEditLocationDone() {
      try {
        konymp.logger.debug("#####Start onEditLocationDone", konymp.logger.FUNCTION_ENTRY);
        if (this.view.searchHeader.locationTbxText === "") {
          this.view.searchHeader.locationTbxText = this.view.autoSuggest.currentLocationText;
          this.view.searchHeader.btnClearLocationVisibility = false;
          this.view.autoSuggest.isVisible = false;
          this.view.menuComponent.isVisible = true;
          this.view.forceLayout();
          var selectedCategory = this.view.menuComponent.getSelectedCategory();
          if (selectedCategory[0].length >= 1) {
            this.view.menuComponent.searchSelectionVisibility = true;
          }
        }
        konymp.logger.debug("#####End onEditLocationDone", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in onEditLocationDone : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function storeSearchData
    * @description stores the searched data
    * @private
    * @param {Object} data
    * @event 
    * @event 
    */
    storeSearchData: function storeSearchData(data) {
      try {
        konymp.logger.debug("#####Start storeSearchData", konymp.logger.FUNCTION_ENTRY);
        var existingSearchData = kony.store.getItem(this.RECENT_SEARCH_KEY);
        konymp.logger.info("#####Data in store : " + JSON.stringify(existingSearchData), konymp.logger.DATA_STORE);
        if (existingSearchData === null) {
          konymp.logger.info("#####Data to store in store : " + JSON.stringify(data), konymp.logger.DATA_STORE);
          kony.store.setItem(this.RECENT_SEARCH_KEY, [data]);
          return;
        }
        var existingSearchDataLength = existingSearchData.length;
        var repeatedSearch = false;
        for (var i = 0; i < existingSearchDataLength; i++) {
          if (data.place_id === existingSearchData[i].place_id) {
            var repeatedElement = existingSearchData.splice(i, 1)[0];
            existingSearchData.unshift(repeatedElement);
            repeatedSearch = true;
            break;
          }
        }
        if (repeatedSearch === false) {
          if (existingSearchDataLength >= 5) {
            existingSearchData.pop();
          }
          existingSearchData.unshift(data);
        }
        kony.store.removeItem(this.RECENT_SEARCH_KEY);
        kony.store.setItem(this.RECENT_SEARCH_KEY, existingSearchData);
        konymp.logger.debug("#####End storeSearchData", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in storeSearchData : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function addRecentSearchData
    * @description this function adds the recent searched data into the segRecentSearch
    * @private
    * @event 
    * @event 
    */
    addRecentSearchData: function addRecentSearchData() {
      try {
        konymp.logger.debug("#####Start addRecentSearchData", konymp.logger.FUNCTION_ENTRY);
        var existingSearchData = kony.store.getItem(this.RECENT_SEARCH_KEY);
        if (existingSearchData !== null) {
          konymp.logger.info("#####Data to add to recent search segment : " + JSON.stringify(existingSearchData), konymp.logger.DATA_STORE);
          var widgetMapping = {};
          widgetMapping["lblName"] = "description";
          widgetMapping["lblRecentSearchHeader"] = "lblRecentSearchHeader";
          var dataToInsert = [
            [{
              "lblRecentSearchHeader": "Recent Searches"
            }, existingSearchData]
          ];
          this.view.segRecentSearch.widgetDataMap = widgetMapping;
          this.view.segRecentSearch.setData(dataToInsert);
          if(this.recentSearches){
            this.view.segRecentSearch.isVisible = true;
          }
          else{
            this.view.segRecentSearch.isVisible = false;
          }
        } else {
          this.view.segRecentSearch.isVisible = false;
        }
        konymp.logger.debug("#####End addRecentSearchData", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in addRecentSearchData : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function recentSearchItemSeleceted
    * @description gives the recent search items selected 
    * @private
    * @event 
    * @event 
    */
    recentSearchItemSeleceted: function recentSearchItemSeleceted() {
      try {
        konymp.logger.debug("#####Start recentSearchItemSeleceted", konymp.logger.FUNCTION_ENTRY);
        var selecetdItem = this.view.segRecentSearch.selectedRowItems[0];
        this.selecetedFromRecentSearch = true;
        this.selectedLocationForSearch = selecetdItem;
        var locationData = selecetdItem.description;
        this.view.searchHeader.locationTbxText = locationData;
        this.view.menuComponent.isVisible = true;
        this.view.autoSuggest.isVisible = false;
        var selectedCategory = this.view.menuComponent.getSelectedCategory();
        if (selectedCategory[0].length >= 1) {
          this.view.menuComponent.searchSelectionVisibility = true;
        }
        this.view.searchHeader.btnClearLocationVisibility = true;
        konymp.logger.debug("#####End recentSearchItemSeleceted", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in recentSearchItemSeleceted : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function searchdataFromAvailableLocationCoordinates
    * @description search the data from available location coordinates
    * @private
    * @param {Object} data
    * @event 
    * @event 
    */
    searchdataFromAvailableLocationCoordinates: function searchdataFromAvailableLocationCoordinates(data) {
      try {
        konymp.logger.debug("#####Start searchdataFromAvailableLocationCoordinates", konymp.logger.FUNCTION_ENTRY);
        var responseToReturn = {
          coords: {
            latitude: data.lat,
            longitude: data.lng
          }
        };
        this.storeSearchData(data);
        this.getCurrentLocationCoordinatesSuccessCallback(responseToReturn);
        konymp.logger.debug("#####End searchdataFromAvailableLocationCoordinates", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in searchdataFromAvailableLocationCoordinates : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function customPinClick
    * @description 
    * @private
    * @param {Object} location
    * @event 
    * @event 
    */
    customPinClick: function customPinClick(location) {
      try {
        konymp.logger.debug("#####Start customPinClick", konymp.logger.FUNCTION_ENTRY);
        if (this.view.flxShiftViews.bottom === "5%") {
          this.animateShiftViews("28%", 0.25, 0);
          this.view.listMapView.hideOrUnhideMapSegmentCallout("10", 0.25, 0.05);
        }
        konymp.logger.debug("#####End customPinClick", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in customPinClick : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function animateShiftViews
    * @description animates the flxShiftViews according to its params
    * @private
    * @param {Object} bottomValue, time, delay
    * @event 
    * @event 
    */
    animateShiftViews: function animateShiftViews(bottomValue, time, delay) {
      try {
        konymp.logger.debug("#####Start animateShiftViews", konymp.logger.FUNCTION_ENTRY);
        this.view.flxShiftViews.animate(
          kony.ui.createAnimation({
            "100": {
              "bottom": bottomValue,
              "stepConfig": {
                "timingFunction": kony.anim.EASE_OUT
              }
            }
          }), {
            "delay": delay,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": time
          }, {
            "animationEnd": function() {}
          });
        konymp.logger.debug("#####End animateShiftViews", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in animateShiftViews : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function mapClickOrChangeView
    * @description 
    * @private
    * @param {Object} 
    * @event 
    * @event 
    */
    mapClickOrChangeView: function mapClickOrChangeView() {
      try {
        konymp.logger.debug("#####Start mapClickOrChangeView", konymp.logger.FUNCTION_ENTRY);
        if (this.view.flxShiftViews.bottom !== "5%") {
          this.animateShiftViews("5%", 0.25, 0.05);
          this.view.listMapView.hideOrUnhideMapSegmentCallout("-250", 0.25, 0);
        }
        konymp.logger.debug("#####End mapClickOrChangeView", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in mapClickOrChangeView : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function enableFilterView
    * @description this function is invoked to enable the filter view
    * @private
    * @event 
    * @event 
    */
    enableFilterView: function enableFilterView() {
      try {
        konymp.logger.debug("#####Start enableFilterView", konymp.logger.FUNCTION_ENTRY);
        this.filterData = this.view.filterScreen.getAppliedFilter();
        this.animateFilterView("0%", 0, 0.25);
        konymp.logger.debug("#####End enableFilterView", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in enableFilterView : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function animateFilterView
    * @description to animate the filter screen respective to its params
    * @private
    * @param {Object} topValue, delay, time
    * @event 
    * @event 
    */
    animateFilterView: function animateFilterView(topValue, delay, time) {
      try {
        konymp.logger.debug("#####Start animateFilterView", konymp.logger.FUNCTION_ENTRY);
        this.view.filterScreen.animate(
          kony.ui.createAnimation({
            "100": {
              "top": topValue,
              "stepConfig": {
                "timingFunction": kony.anim.EASE_OUT
              }
            }
          }), {
            "delay": delay,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": time
          }, {
            "animationEnd": function() {}
          });
        konymp.logger.debug("#####End animateFilterView", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in animateFilterView : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function cancelFilter
    * @description this function is invoked to reset the filter data
    * @private
    * @event 
    * @event 
    */
    cancelFilter: function cancelFilter() {
      try {
        konymp.logger.debug("#####Start cancelFilter", konymp.logger.FUNCTION_ENTRY);
        this.animateFilterView("100%", 0, 0.25);
        if (this.filterData) {
          this.view.filterScreen.setDatatoFilterScreen(this.filterData);
        } else {
          this.view.filterScreen.resetFilters();
        }
        konymp.logger.debug("#####End cancelFilter", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in cancelFilter : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function applyFilter
    * @description this function is invoked to apply filters
    * @private
    * @param {Object} filterSortDetails
    * @event 
    * @event 
    */
    applyFilter: function applyFilter(filterSortDetails) {
      try {
        konymp.logger.debug("#####Start placeLocator applyFilter", konymp.logger.FUNCTION_ENTRY);
        if(	filterSortDetails.sortOption == "BestSort" && filterSortDetails.ratingOption == null && filterSortDetails.openNowOption==false){
          this.view.flxFilterBar.isVisible = false;
          this.view.flxScreen2.height = "93.8%";
          this.view.flxScreen2.top = "10%";
        }
        else{
          this.view.flxFilterBar.isVisible = true;
          this.view.flxScreen2.height = "88%";
          this.view.flxScreen2.top = "16%";
          var filterText = "Filters: ";
          var index = filterSortDetails.sortOption.search("Sort");
          if(filterSortDetails.sortOption!= "BestSort" && this.view.filterScreen.sortVisibility!=false){
          filterText = filterText + filterSortDetails.sortOption.substr(0,index) + " " + filterSortDetails.sortOption.substr(index,filterSortDetails.sortOption.length);
          }
            if(filterSortDetails.ratingOption!=null && filterSortDetails.ratingOption!=undefined && this.view.filterScreen.ratingsVisibility!=false){
              if(filterText!= "Filters: "){
                filterText = filterText + ", ";
              }
            filterText = filterText + filterSortDetails.ratingOption + "+ Stars";
          }
          if(filterSortDetails.openNowOption==true && this.view.filterScreen.timingsVisibility!=false)
          {
            if(filterText!= "Filters: "){
                filterText = filterText + ", ";
              }
            filterText = filterText + "Open now";
          }
          this.view.lblFilterApplied.text = filterText;
        }
        this.view.forceLayout();
        this.animateFilterView("100%", 0, 0.25);
        konymp.logger.info("##### data to set : " + JSON.stringify(filterSortDetails), konymp.logger.DEFAULT);
        konymp.logger.info("##### data of map :" + JSON.stringify(this.serviceData.locationData), konymp.logger.DEFAULT);
        konymp.logger.info("##### data of segment :" + JSON.stringify(this.serviceData.segmentData), konymp.logger.DEFAULT);
        kony.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
        var filteredData = this.applyfilterLevel(filterSortDetails, [this.serviceData.locationData, this.serviceData.segmentData]);
        var sortedData = this.applySortLevel(filterSortDetails, filteredData);
        var selectedType = this.view.menuComponent.getSelectedCategory();
        var formattedData = {
          "segmentData": sortedData[1],
          "locationData": sortedData[0],
          "segmentWidgetMapping": null
        };
        this.view.listMapView.mapDataToSegmentAndMap(formattedData, null, selectedType[1][0], selectedType[4][0], false);
        kony.application.dismissLoadingScreen();
        konymp.logger.debug("#####End placeLocator applyFilter", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        kony.application.dismissLoadingScreen();
        konymp.logger.error("#####Exception in applyFilter : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function applyfilterLevel
    * @description 
    * @private
    * @param {Object} filterSortDetails, data
    * @event 
    * @event 
    */
    applyfilterLevel: function applyfilterLevel(filterSortDetails, data) {
      try {
        konymp.logger.debug("#####Start applyfilterLevel", konymp.logger.FUNCTION_ENTRY);
        var dataLength = data[0].length;
        var returnData = [];
        returnData[0] = [];
        returnData[1] = [];
        for (var i = 0; i < dataLength; i++) {
          if (data[0][i].calloutData.index === null || data[0][i].calloutData.index === undefined) {
            returnData[0].push(data[0][i]);
          } else {
            if (data[0][i].calloutData.Rating !== null && data[0][i].calloutData.Rating !== undefined && parseInt(data[0][i].calloutData.Rating) >= filterSortDetails.ratingOption) {
              if (filterSortDetails.openNowOption === true && data[0][i].calloutData.lblTiming.text === "Open") {
                returnData[0].push(data[0][i]);
                returnData[1].push(data[1][data[0][i].calloutData.index]);
              } else if (filterSortDetails.openNowOption === false) {
                returnData[0].push(data[0][i]);
                returnData[1].push(data[1][data[0][i].calloutData.index]);
              }
            } else if (filterSortDetails.ratingOption === null) {
              if (filterSortDetails.openNowOption === true && data[0][i].calloutData.lblTiming.text === "Open") {
                returnData[0].push(data[0][i]);
                returnData[1].push(data[1][data[0][i].calloutData.index]);
              } else if (filterSortDetails.openNowOption === false) {
                returnData[0].push(data[0][i]);
                returnData[1].push(data[1][data[0][i].calloutData.index]);
              }
            }
          }
        }
        konymp.logger.debug("#####End applyfilterLevel", konymp.logger.FUNCTION_ENTRY);
        return returnData;
      } catch (exception) {
        kony.application.dismissLoadingScreen();
        konymp.logger.error("#####Exception in applyfilterLevel : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function applySortLevel
    * @description 
    * @private
    * @param {Object} filterSortDetails, data
    * @event 
    * @event 
    */
    applySortLevel: function applySortLevel(filterSortDetails, data) {
      try {
        konymp.logger.debug("#####Start applySortLevel", konymp.logger.FUNCTION_ENTRY);
        var returnData = [];
        returnData[0] = [];
        returnData[1] = [];
        switch (filterSortDetails.sortOption) {
          case "BestSort":
            returnData = [data[0], data[1].sort(this.sortBy("index"))];
            break;
          case "RatingSort":
            returnData = [data[0], data[1].sort(this.sortBy("Rating"))];
            break;
          case "AZSort":
            returnData = [data[0], data[1].sort(this.sortBy("lblPlaceName"))];
            break;
          case "DistanceSort":    
            returnData = [data[0], data[1].sort(this.sortBy("Distance"))];
            break;
          default:
            returnData = [data[0], data[1]];
            break;
        }
        konymp.logger.debug("#####End applySortLevel", konymp.logger.FUNCTION_ENTRY);
        return returnData;
      } catch (exception) {
        kony.application.dismissLoadingScreen();
        konymp.logger.error("#####Exception in applySortLevel : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function sortBy
    * @description 
    * @private
    * @param {Object} prop
    * @event 
    * @event 
    */
    sortBy: function sortBy(prop) {
      return function(a, b) {
        if (a[prop] > b[prop]) {
          return 1;
        } else if (a[prop] < b[prop]) {
          return -1;
        }
        return 0;
      };
    },
   /**
    * @function getPlaceDetailsFromList
    * @description 
    * @private
    * @param {Object} placeDetails
    * @event 
    * @event 
    */
    getPlaceDetailsFromList: function getPlaceDetailsFromList(placeDetails) {
      try {
        konymp.logger.debug("#####Start getPlaceDetailsFromList", konymp.logger.FUNCTION_ENTRY);
        if (this.getPlaceDetails) {
          this.getPlaceDetails(placeDetails);
        }
        konymp.logger.debug("#####End getPlaceDetailsFromList", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in getPlaceDetailsFromList : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
   /**
    * @function clearSelectedFilterOptions
    * @description this function is invoked to displays confirmation popup to remove the applied filters
    * @private
    * @param {Object} 
    * @event 
    * @event 
    */
    clearSelectedFilterOptions : function(){
      var alert = kony.ui.Alert({"message": "Confirm to remove all filters ?","alertType": constants.ALERT_TYPE_CONFIRMATION,"yesLabel": "Confirm", "noLabel": "Cancel",  "alertHandler": this.cancelAlertHandler.bind(this)},{});  
    },
   /**
    * @function cancelAlertHandler
    * @description a success callback for clearSelectedFilterOptions which sets the default filter
    * @private
    * @param {Object} response
    * @event 
    * @event 
    */
    cancelAlertHandler : function(response){
      if(response==true){
        this.view.filterScreen.resetFilters();
        var defaultFilters = {"sortOption":"BestSort","ratingOption":null,"priceOption":null,"openNowOption":false};
        this.applyFilter(defaultFilters);
        this.view.flxFilterBar.isVisible = false;
        this.view.flxScreen2.height = "93.8%";
        this.view.flxScreen2.top = "10%";
      }
    },
   /**
    * @function loadMoreNearbyPlaces
    * @description loads more near by places depending on lat and lon
    * @private
    * @event 
    * @event 
    */
    loadMoreNearbyPlaces : function(){
      if(this.previousPageToken!=this.currentPageToken)
      {
        this.searchPlacesNearMe({"lat":"","lon":""}, null);
        return;
      }
      if(this.previousPageToken == null || this.previousPageToken == undefined || this.currentPageToken == null || this.currentPageToken == undefined)
      {
        kony.application.dismissLoadingScreen();
        return;
      }
      if(this.previousPageToken==this.currentPageToken && this.previousPageToken== "" && this.currentPageToken == ""){
        this.searchPlacesNearMe({"lat":"","lon":""}, null);
      }
      else{
        kony.application.dismissLoadingScreen();
        return;
      }
    }
  };
});
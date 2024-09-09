/*
#
#  Created by Team Kony.
#  Copyright (c) 2017 Kony Inc. All rights reserved.
#
*/
define(function () {
  var konymp = konymp || {};
  var KonyLoggerModule = require("com/konymp/placelocator/KonyLogger");
  konymp.logger = (new KonyLoggerModule("ListMapView")) || function () { };

  return {
    constructor: function (baseConfig, layoutConfig, pspConfig) {
      this.CURRENT_LOCATION_IMAGE = "";
      this.selectedPin = {};
      this.initialDirectionPosition = 0;
      this.selectedPin.index = null;
      this.selectedPin.pinImage = null;
      this.selectedPin.pinActiveImage = null;
      this.DirectionsData = {};
      this.lastedselectedPinID = null;
      //this.selectedPinLocation= {};
      //this.pinImage = "";
      //this.searchThisAreaLocation = {};
      this.isPullToRefresh = false;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function () {
      defineGetter(this, "locationData", function () {
        konymp.logger.debug("#####Getter  locationData #####", konymp.logger.FUNCTION_ENTRY);
        return this.view.segListView.data;
      });
      defineGetter(this, "mapData", function () {
        konymp.logger.debug("#####Getter  mapData #####", konymp.logger.FUNCTION_ENTRY);
        return this.view.mapLayout.locationData;
      });
      defineGetter(this, "selectedPinLocation", function () {
        konymp.logger.debug("#####Getter  selectedPinLocation #####", konymp.logger.FUNCTION_ENTRY);
        return REUSABLE_LIST_SELECTED_PIN_LOCATION;
      });
      defineSetter(this, "currentLocation_image", function (val) {
        konymp.logger.debug("#####Start setter currentLocation_image", konymp.logger.FUNCTION_ENTRY);
        this.CURRENT_LOCATION_IMAGE = val;
        konymp.logger.debug("#####End setter currentLocation_image", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "currentLocation_image", function () {
        konymp.logger.debug("#####Start getter currentLocation_image", konymp.logger.FUNCTION_ENTRY);
        return this.CURRENT_LOCATION_IMAGE;
      });
    },
    /**
      * @function mapDataToSegmentAndMap
      * @description Maps data to map and segment in list and map screens
      * @private
      * @param {Object} formattedResponse
      * @param {Object} navigateLocation
      * @param {Object} pinImage
      * @param {Object} pinActiveImage
      * @param {Object} isShiftViews
      */
    mapDataToSegmentAndMap: function mapDataToSegmentAndMap(formattedResponse, navigateLocation, pinImage, pinActiveImage, isShiftViews) {
      try {
        konymp.logger.debug("#####Start mapDataToSegmentAndMap#####", konymp.logger.FUNCTION_ENTRY);
        if (formattedResponse.segmentWidgetMapping !== null) {
          this.view.segListView.widgetDataMap = formattedResponse.segmentWidgetMapping;
          this.view.segMapCallout.widgetDataMap = formattedResponse.segmentWidgetMapping;
        }
        this.view.forceLayout();
        this.selectedPin.index = null;
        this.lastedselectedPinID = null;
        this.selectedPin.pinActiveImage = pinActiveImage;
        if (isShiftViews) {
          this.view.flxListView.top = "100%";
        }
        if (parseInt(formattedResponse.segmentData.length) == 0) {
          this.view.lblNoResultsFound.isVisible = true;
          this.view.lblNoResultsFound.centerX = "50%";
          this.view.segListView.isVisible = false;
          this.view.segMapCallout.isVisible = false;
        }
        else {
          this.view.lblNoResultsFound.isVisible = false;
          this.view.segListView.isVisible = true;
          this.view.segMapCallout.isVisible = true;
        }
        this.view.forceLayout();
        this.view.flxListView.segListView.setData(formattedResponse.segmentData);
        this.view.flxMapView.segMapCallout.setData(formattedResponse.segmentData);
        this.view.flxMapView.mapLayout.locationData = formattedResponse.locationData;
        this.selectedPin.pinImage = pinImage;
        if (navigateLocation !== null && navigateLocation !== undefined && navigateLocation !== {}) {
          this.navigateToLocation(navigateLocation);
        }
        REUSABLE_LIST_SELECTED_PIN_LOCATION = {};
        if (this.postDataMapping) {
          this.postDataMapping(formattedResponse);
        }
        this.view.flxMapView.mapLayout.onBoundsChanged = this.moveOfMap.bind(this);
        konymp.logger.debug("#####End mapDataToSegmentAndMap#####", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in mapDataToSegmentAndMap : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
    /**
      * @function appendDataToSegment
      * @description appends data to segment
      * @private
      * @param {Object} formattedResponse
      */
    appendDataToSegment: function (formattedResponse) {
      try {
        konymp.logger.debug("#####Start appendDataToSegment#####", konymp.logger.FUNCTION_ENTRY);
        kony.application.dismissLoadingScreen();
        this.view.flxListView.segListView.addAll(formattedResponse.segmentData);
        this.view.flxMapView.segMapCallout.addAll(formattedResponse.segmentData);
        var previousData = this.view.flxMapView.mapLayout.locationData;
        for (i = 0; i < formattedResponse.locationData.length; i++) {
          previousData.push(formattedResponse.locationData[i]);
        }
        this.view.flxMapView.mapLayout.locationData = previousData;
        this.view.forceLayout();
      }
      catch (exception) {
        konymp.logger.error("#####Exception in appendDataToSegment : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
    /**
      * @function shiftToView
      * @description Toggles between map and list view
      * @private
      * @param {Object} viewnName
      */
    shiftToView: function shiftToView(viewName) {
      try {
        konymp.logger.debug("#####Start shiftToView#####", konymp.logger.FUNCTION_ENTRY);
        if (viewName === "ListView") {
          this.animateObject(this.view.flxListView, "0%", 0.25);
        } else {
          this.animateObject(this.view.flxListView, "100%", 0.25);
        }
        konymp.logger.debug("#####End shiftToView#####", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in shiftToView : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
    /**
      * @function animateObject
      * @description animates provided object to position(value)
      * @private
      * @param {Object} object
      * @param {String} value
      * @param {String} time
      */
    animateObject: function animateObject(object, value, time) {
      try {
        konymp.logger.debug("#####Start animateObject#####", konymp.logger.FUNCTION_ENTRY);
        object.animate(
          kony.ui.createAnimation({
            "100": {
              "top": value,
              "stepConfig": {
                "timingFunction": kony.anim.EASE_OUT
              }
            }
          }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": time
          }, {
            "animationEnd": function () { }
          });
        konymp.logger.debug("#####End animateObject#####", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in animateObject : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
    /**
      * @function pinClicked
      * @description Triggered on click of a pin on a map
      * @private
      * @param {Object} location
      * @event customPinClick 
      */
    pinClicked: function pinClicked(location) {
      try {
        konymp.logger.debug("#####Start pinClicked#####", konymp.logger.FUNCTION_ENTRY);
        var index = location.calloutData.index;
        if (index !== null && index !== undefined) {
          REUSABLE_LIST_SELECTED_PIN_LOCATION = location;
          if (this.customPinClick) {
            this.customPinClick(location);
          }
          this.changeCalloutSegmentSelection(location);
        }
        konymp.logger.debug("#####End pinClicked#####", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in pinClicked : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
    /**
      * @function changeCalloutSegmentSelection
      * @description Function is called on swipe of callout segment
      * @private
      * @param {Object} location
      */
    changeCalloutSegmentSelection: function changeCalloutSegmentSelection(location) {
      try {
        konymp.logger.debug("#####Start changeCalloutSegmentSelection#####", konymp.logger.FUNCTION_ENTRY);
        var index = location.calloutData.index;
        if (this.lastedselectedPinID !== null && this.lastedselectedPinID !== undefined) {
          if (this.lastedselectedPinID !== location) {
            this.lastedselectedPinID.image.source = this.selectedPin.pinImage;
            this.view.mapLayout.updatePin(this.lastedselectedPinID);
          }
        }
        this.lastedselectedPinID = location;
        location.image.source = this.selectedPin.pinActiveImage;
        this.view.flxMapView.mapLayout.updatePin(location);
        var segmentData = this.view.segMapCallout.data;
        var segmentDataLength = segmentData.length;
        for (var i = 0; i < segmentDataLength; i++) {
          if (segmentData[i].index === index) {
            //#ifdef android
            this.view.segMapCallout.selectedRowIndex = [0, i];
            //#endif
            //#ifdef iphone
            this.view.segMapCallout.setSelectedRowIndex(0, i, false);
            //#endif
            this.selectedPin.index = i;
            break;
          }
        }
        this.view.forceLayout();
        konymp.logger.debug("#####End changeCalloutSegmentSelection#####", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.debug("#####Exception in changeCalloutSegmentSelection : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
    /**
      * @function changeselectedMapPin
      * @description Changes map pins on swipe of callout segment
      * @private
      * @param {number} rowIndex
      */
    changeselectedMapPin: function changeselectedMapPin(rowIndex) {
      try {
        konymp.logger.debug("#####Start changeselectedMapPin#####", konymp.logger.FUNCTION_ENTRY);
        var data = this.view.segListView.data[rowIndex];
        var indexsData = this.view.mapLayout.locationData;
        indexsData[this.selectedPin.index].image.source = this.selectedPin.pinImage;
        for (var i = 0; i < indexsData.length; i++) {
          if (indexsData[i].calloutData.index !== null && indexsData[i].calloutData.index !== undefined) {
            if (indexsData[i].calloutData.index === data.index) {
              this.selectedPin.index = i;
              if (this.lastedselectedPinID !== undefined && this.lastedselectedPinID !== null) {
                this.lastedselectedPinID.image.source = this.selectedPin.pinImage;
                this.view.mapLayout.updatePin(this.lastedselectedPinID);
              }
              this.lastedselectedPinID = indexsData[i];
              indexsData[i].image.source = this.selectedPin.pinActiveImage;
              this.view.mapLayout.updatePin(indexsData[i]);
              break;
            }
          }
        }
        konymp.logger.debug("#####End changeselectedMapPin#####", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.debug("#####Exception in changeselectedMapPin : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
    /**
      * @function animateOptionsFlex
      * @description animtes Map options flex
      * @private
      * @param {String} bottom
      */
    animateOptionsFlex: function (bottom) {
      var self = this;
      this.view.flxActionSheetContent.animate(
        kony.ui.createAnimation({
          "100": {
            "bottom": bottom,
            "stepConfig": {
              "timingFunction": kony.anim.EASE_OUT
            }
          }
        }), {
          "delay": 0,
          "iterationCount": 1,
          "fillMode": kony.anim.FILL_MODE_FORWARDS,
          "duration": 0.5
        }, {
          "animationEnd": function () {
            if (self.view.flxActionSheetContent.bottom == "-50%")
              self.view.flxDirectionsOptions.isVisible = false;
            self.view.forceLayout();
          }
        });
    },
    /**
      * @function getDirections
      * @description SHos directions from source to destination
      * @private
      * @param {String} origin 
      * @param {String} destination
      */
    getDirections: function getDirections(origin, destination) {
      try {
        konymp.logger.debug("#####Start getDirections#####", konymp.logger.FUNCTION_ENTRY);
        kony.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
        //#ifdef iphone
        this.view.flxDirectionsOptions.isVisible = true;
        this.view.flxDirectionsOptions.zIndex = 10;
        this.animateOptionsFlex("6%");
        this.view.forceLayout();
        this.DirectionsData = {
          origin: origin,
          destination: destination
        };
        //#endif
        //#ifdef android
        kony.application.openURL("http://maps.google.com/maps?saddr=" + origin + "&daddr=" + destination);
        //#endif
        kony.application.dismissLoadingScreen();
        konymp.logger.debug("#####End getDirections#####", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        kony.application.dismissLoadingScreen();
        konymp.logger.error("#####Exception in getDirections : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
    /**
      * @function openAppleMaps
      * @description opens Apple maps and triggers openMapsSuccess
      * @private
      * @event openMapsSuccess
      */
    openAppleMaps: function openAppleMaps() {
      try {
        konymp.logger.debug("#####Start openAppleMaps#####", konymp.logger.FUNCTION_ENTRY);
        kony.application.openURL("http://maps.apple.com/maps?ui=maps&saddr=" + this.DirectionsData.origin + "&daddr=" + this.DirectionsData.destination + "");
        if (this.openMapsSuccess) {
          this.openMapsSuccess();
        }
        this.view.flxActionSheetContent.bottom = "-50%";
        this.view.flxDirectionsOptions.setVisibility(false);
        konymp.logger.debug("#####End openAppleMaps#####", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in openAppleMaps : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
    /**
      * @function openGoogleMaps
      * @description opens Google maps and triggers openMapsSuccess
      * @private
      * @event openMapsSuccess
      */
    openGoogleMaps: function openGoogleMaps() {
      try {
        konymp.logger.debug("#####Start openGoogleMaps#####", konymp.logger.FUNCTION_ENTRY);
        kony.application.openURL("http://maps.google.com/maps?saddr=" + this.DirectionsData.origin + "&daddr=" + this.DirectionsData.destination + "");
        if (this.openMapsSuccess) {
          this.openMapsSuccess();
        }
        this.view.flxActionSheetContent.bottom = "-50%";
        this.view.flxDirectionsOptions.setVisibility(false);
        konymp.logger.debug("#####End openGoogleMaps#####", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in openGoogleMaps : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
    /**
      * @function cancelDirections
      * @description Invokes custom event (cancelMapsSuccess)
      * @private
      * @event cancelMapsSuccess 
      */
    cancelDirections: function cancelDirections() {
      try {
        konymp.logger.debug("#####Start cancelDirections#####", konymp.logger.FUNCTION_ENTRY);
        this.animateOptionsFlex("-50%");
        if (this.cancelMapsSuccess) {
          this.cancelMapsSuccess();
        }
        konymp.logger.debug("#####End cancelDirections#####", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in cancelDirections : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
    /**
      * @function getDirectionsInvoked
      * @description Invokes custom event (getDirectionsInvokedCallback)
      * @private
      * @event getDirectionsInvokedCallback 
      */
    getDirectionsInvoked: function getDirectionsInvoked(context, selectedContext) {
      try {
        konymp.logger.debug("#####Start getDirectionsInvoked#####", konymp.logger.FUNCTION_ENTRY);
        if (this.getDirectionsInvokedCallback) {
          this.getDirectionsInvokedCallback(selectedContext);
        }
        konymp.logger.debug("#####End getDirectionsInvoked#####", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in getDirectionsInvoked : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
    /**
      * @function refreshSegmentData
      * @description Invokes segment refres functionality and triggers refreshData custom event
      * @private
      * @event refreshData 
      */
    refreshSegmentData: function refreshSegmentData() {
      try {
        konymp.logger.debug("#####Start refreshSegmentData#####", konymp.logger.FUNCTION_ENTRY);
        this.isPullToRefresh = true;
        if (this.refreshData) {
          this.refreshData();
        }
        konymp.logger.debug("#####End refreshSegmentData#####", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in refreshSegmentData : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
    /**
      * @function callInvoked
      * @description invokes custom event (callToInvoked)
      * @private
      * @event callToInvoked 
      */
    callInvoked: function callInvoked(context, selectedContext) {
      try {
        konymp.logger.debug("#####Start callInvoked#####", konymp.logger.FUNCTION_ENTRY);
        if (this.callToInvoked) {
          this.callToInvoked(selectedContext);
        }
        konymp.logger.debug("#####End callInvoked#####", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in callInvoked : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
    /**
      * @function distance
      * @description Calculates distance of a point on map
      * @private
      * @param {number} lat1
      * @param {number} lon1
      * @param {number} lat2
      * @param {number} lon2
      * @returns distance 
      */
    distance: function distance(lat1, lon1, lat2, lon2) {
      try {
        konymp.logger.debug("#####Start distance#####", konymp.logger.FUNCTION_ENTRY);
        var R = 6371; // km (change this constant to get miles)
        var dLat = (lat2 - lat1) * Math.PI / 180;
        var dLon = (lon2 - lon1) * Math.PI / 180;
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c * 500;
        konymp.logger.debug("#####End distance#####", konymp.logger.FUNCTION_EXIT);
        return d;
      } catch (exception) {
        konymp.logger.error("#####Exception in distance : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
    /**
      * @function searchThisArea
      * @description Searches for given location on selected area of map
      * @private
      * @event callSearchHere 
      */
    searchThisArea: function searchThisArea() {
      try {
        konymp.logger.debug("#####Start searchThisArea#####", konymp.logger.FUNCTION_ENTRY);
        kony.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
        var bounds = this.view.mapLayout.getBounds();
        var radius = this.distance(bounds.southwest.lat, bounds.southwest.lon, bounds.northeast.lat, bounds.northeast.lon);
        if (this.callSearchHere) {
          this.callSearchHere(radius, bounds.center);
        } else {
          kony.application.dismissLoadingScreen();
        }
        konymp.logger.debug("#####End searchThisArea#####", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        kony.application.dismissLoadingScreen();
        konymp.logger.error("#####Exception in searchThisArea : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
    /**
      * @function moveOfMap
      * @description Refresh layout on touch/move of map
      * @private
      */
    moveOfMap: function moveOfMap() {
      try {
        konymp.logger.debug("#####Start moveOfMap#####", konymp.logger.FUNCTION_ENTRY);
        this.view.forceLayout();
        konymp.logger.debug("#####End moveOfMap#####", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in moveOfMap : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
    /**
      * @function setDataToSegmentAtAPosition
      * @description Set data at given position in the segment
      * @private
      * @param {Object} data
      * @param {number} position
      */
    setDataToSegmentAtAPosition: function setDataToSegmentAtAPosition(data, position) {
      try {
        konymp.logger.debug("#####Start setDataToSegmentAtAPosition#####", konymp.logger.FUNCTION_ENTRY);
        konymp.logger.info("#####Row data : " + JSON.stringify(data));
        this.view.segListView.setDataAt(data, position);
        this.view.flxListView.forceLayout();
        this.view.segMapCallout.setDataAt(data, position);
        konymp.logger.debug("#####End setDataToSegmentAtAPosition#####", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in setDataToSegmentAtAPosition : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
    /**
      * @function navigateToLocation
      * @description Navigate to location by provided data
      * @private
      * @param {Object} locationData
      */
    navigateToLocation: function navigateToLocation(locationData) {
      try {
        konymp.logger.debug("#####Start navigateToLocation#####", konymp.logger.FUNCTION_ENTRY);
        this.view.mapLayout.navigateToLocation(locationData, false, false);
        konymp.logger.debug("#####End navigateToLocation#####", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in navigateToLocation : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
    /**
      * @function hideOrUnhideMapSegmentCallout
      * @description Hide/Show map segment callout
      * @private
      * @param {number} bottomValue
      * @param {String} time
      * @param {String} delay
      */
    hideOrUnhideMapSegmentCallout: function hideOrUnhideMapSegmentCallout(bottomValue, time, delay) {
      try {
        konymp.logger.debug("#####Start hideOrUnhideMapSegmentCallout#####", konymp.logger.FUNCTION_ENTRY);
        if (this.lastedselectedPinID !== null && this.lastedselectedPinID !== undefined) {
          this.lastedselectedPinID.image.source = this.selectedPin.pinImage;
          this.view.mapLayout.updatePin(this.lastedselectedPinID);
          this.lastedselectedPinID = null;
        }
        this.view.segMapCallout.animate(
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
            "animationEnd": function () { }
          });
        konymp.logger.debug("#####End hideOrUnhideMapSegmentCallout#####", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in hideOrUnhideMapSegmentCallout : " + exception.message, konymp.logger.EXCEPTION);
      }
    },
    /**
      * @function placeSelected
      * @description Invokes custom getPlaceDetails event
      * @private
      * @param {number} rowNumber
      * @event getPlaceDetails 
      */
    placeSelected: function placeSelected(rowNumber) {
      try {
        konymp.logger.debug("#####Start placeSelected#####", konymp.logger.FUNCTION_ENTRY);
        var details = this.view.flxListView.segListView.data[rowNumber];
        if (this.getPlaceDetails) {
          this.getPlaceDetails(details);
        }
        konymp.logger.debug("#####End placeSelected#####", konymp.logger.FUNCTION_EXIT);
      } catch (exception) {
        konymp.logger.error("#####Exception in placeSelected : " + exception.message, konymp.logger.EXCEPTION);
      }
    }
  };
});
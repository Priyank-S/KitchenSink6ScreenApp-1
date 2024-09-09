/*
#
#  Created by Team Kony.
#  Copyright (c) 2017 Kony Inc. All rights reserved.
#
*/
define(function() {
    var konymp = konymp || {};
    var KonyLoggerModule = require("com/konymp/placelocator/KonyLogger");
    konymp.logger = (new KonyLoggerModule("menucomponent")) || function() {};
    return {
        constructor: function(baseConfig, layoutConfig, pspConfig) {
            this.menuList = [];
        },
        //Logic for getters/setters of custom properties
        initGettersSetters: function() {
            defineSetter(this, "menuContainerSkin", function(val) {
                konymp.logger.debug("#####Start setter menuContainerSkin #####", konymp.logger.FUNCTION_ENTRY);
                this.view.flxMenu.skin = val;
                this.view.flxSearchSelection.skin = val;
                konymp.logger.debug("#####End setter menuContainerSkin #####", konymp.logger.FUNCTION_EXIT);
            });
            defineGetter(this, "menuContainerSkin", function() {
                konymp.logger.debug("#####Getter menuContainerSkin #####", konymp.logger.FUNCTION_ENTRY);
                return this.view.flxMenu.skin;
            });
        },
        /**
        * @function changeSelectedAndUnselectedImage
        * @description Toggles selected and unselected image and adds them to selectedImageList
        * @private
        * @param {Object} eventobject
        */
        changeSelectedAndUnselectedImage: function changeSelectedAndUnselectedImage(eventobject) {
            try {
                konymp.logger.debug("#####Start changeSelectedAndUnselectedImage#####", konymp.logger.FUNCTION_ENTRY);
                var idImage = eventobject.id;
                var srcImage = eventobject.src;
                var imagesList = this.menuList;
                var imageListLength = imagesList.length;
                for (var i = 0; i < imageListLength; i++) {
                    if (this.view.flxMenu[imagesList[i].imgId].src === imagesList[i].placeTypeIcon_selected) {
                        this.view.flxMenu[imagesList[i].imgId].src = imagesList[i].placeTypeIcon_unselected;
                    }
                    if (idImage === imagesList[i].imgId) {
                        if (srcImage === imagesList[i].placeTypeIcon_selected) {
                            eventobject.src = imagesList[i].placeTypeIcon_unselected;
                            this.selectedUnselectedImage(false);
                        } else {
                            eventobject.src = imagesList[i].placeTypeIcon_selected;
                            this.selectedUnselectedImage(true);
                        }
                    }
                }
                konymp.logger.debug("#####End changeSelectedAndUnselectedImage#####", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error("#####Exception in changeSelectedAndUnselectedImage : " + exception.message, konymp.logger.EXCEPTION);
            }
        },
        /**
        * @function selectedImageList
        * @description getSelected Image from list
        * @private
        * @param {Object} formattedResponse
        */
        getSelectedCategory: function getSelectedCategory() {
            try {
                konymp.logger.debug("#####Start getSelectedCategory#####", konymp.logger.FUNCTION_ENTRY);
                var imagesList = this.menuList;
                var imageListLength = imagesList.length;
                var selectedImageList = [],
                    selectedImageListDisplayName = [],
                    selectedImageListMapPin = [],
                    selectedImageListBrowseKey = [],
                    selectedImageName = [],
                    selectedImageListMapActivePin = [];
                for (var i = 0; i < imageListLength; i++) {
                    if ((this.view.flxMenu[imagesList[i].imgId].src) === imagesList[i].placeTypeIcon_selected) {
                        selectedImageListBrowseKey.push(imagesList[i].browseKeyword.toLowerCase());
                        selectedImageListMapPin.push(imagesList[i].mapPin);
                        selectedImageListMapActivePin.push(imagesList[i].mapPin_selected);
                        selectedImageListDisplayName.push(imagesList[i].displayText);
                        if (imagesList[i].defaultImage_listView !== undefined && imagesList[i].defaultImage_listView !== null) {
                            selectedImageName.push(imagesList[i].defaultImage_listView);
                        } else {
                            selectedImageName.push("no_image.png");
                        }
                    }
                }
                if (selectedImageListDisplayName !== []) {
                    selectedImageList.push(selectedImageListBrowseKey, selectedImageListMapPin, selectedImageListDisplayName, selectedImageName, selectedImageListMapActivePin);
                }
                konymp.logger.debug("#####End getSelectedCategory#####", konymp.logger.FUNCTION_EXIT);
                return selectedImageList;
            } catch (exception) {
                konymp.logger.error("#####Exception in getSelectedCategory : " + exception.message, konymp.logger.EXCEPTION);
            }
        },
        /**
        * @function enableDisableSearchButton
        * @description Set visibility Value of searchButton
        * @private
        * @param {Object} visibilityValue
        */
        enableDisableSearchButton: function enableDisableSearchButton(visibilityValue) {
            try {
                konymp.logger.debug("#####Start enableDisableSearchButton#####", konymp.logger.FUNCTION_ENTRY);
                this.view.flxSearchSelection.setVisibility(visibilityValue);
                this.view.flxSearchSelection.forceLayout();
                konymp.logger.debug("#####EndenableDisableSearchButton#####", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error("#####Exception in enableDisableSearchButton : " + exception.message, konymp.logger.EXCEPTION);
            }
        },
        /**
        * @function forceLayoutTheComponent
        * @description forceLayout menu component
        * @private
        */
        forceLayoutTheComponent: function forceLayoutTheComponent() {
            try {
                konymp.logger.debug("#####Start forceLayoutTheComponent#####", konymp.logger.FUNCTION_ENTRY);
                this.view.flxMenuHolder.forceLayout();
                konymp.logger.debug("#####End forceLayoutTheComponent#####", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.debug("#####Exception in forceLayoutTheComponent : " + exception.message, konymp.logger.EXCEPTION);
            }
        },
        /**
        * @function creatDynamicMenu
        * @description Creates dynamic menu in menu component
        * @private
        * @param {Object} menuItem
        */
        creatDynamicMenu: function creatDynamicMenu(menuItem) {
            try {
                konymp.logger.debug("#####Start creatDynamicMenu#####", konymp.logger.FUNCTION_ENTRY);
                this.menuList = menuItem;
                var menuList = this.menuList;
                var rowLimit = 4;
                var columnLimit = 2;
                var menuLength = menuList.length;
                var menuCount = 0;
                var centerY;
              	var centerXtoRearrange;
                for (var i = 0, l = 0, k = 0; i < columnLimit; i++) {
                    l = 0;
                          if(menuList.length == 2){
                            l = 1;
                          }
                          else if (menuList.length == 3){
                            l = 0.5;
                          }
                    for (var j = 0; j < rowLimit; menuCount++) {
                        if (k <= 3) {
                            centerY = "38%";
                        } else if (k >= 4) {
                            centerY = "78%";
                        }
                        if (menuCount < menuLength) {
                            var containerObject = {
                                "container": {
                                    "id": "flexContainer" + k,
                                    "centerX": (12.5 + (25 * l)).toString() + "%",
                                    "centerY": centerY,
                                    "height": "35%",
                                    "width": "25%"
                                },
                                "image": {
                                    "id": menuList[menuCount].imgId,
                                    "centerX": "50%",
                                    "top": "5%",
                                    "height": "65%",
                                    "width": "80%",
                                    "imageSrc": menuList[menuCount].placeTypeIcon_unselected
                                },
                                "label": {
                                    "id": "label" + k,
                                    "centerX": "50%",
                                    "top": "77%",
                                    "width": "100%",
                                    "text": menuList[menuCount].displayText
                                }
                            };
                            konymp.logger.info("##### containerObject : " + JSON.stringify(menuList[menuCount]), konymp.logger.DEFAULT);
                            k++;
                            j++;
                            l++;
                            var flexObject = this.getFlexContainer(containerObject);
                            this.view.flxMenuHolder.flxMenu.add(flexObject);
                        } else {
                            break;
                        }
                    }
                }
                this.view.flxMenu.forceLayout();
              	if(menuList.length < 5){
                  this.view.flxSearchSelection.top = "-30%";
                }
              this.view.forceLayout();
                konymp.logger.debug("#####End creatDynamicMenu#####", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.debug("#####Exception in creatDynamicMenu : " + exception.message, konymp.logger.EXCEPTION);
            }
        },
        /**
        * @function getFlexContainer
        * @description Creates and return flexContainer
        * @private
        * @param {Object} containerObject
        * @return {Object} FlexContainer
        */
        getFlexContainer: function getFlexContainer(containerObject) {
            try {
                konymp.logger.debug("#####Start menuComponent.ui.MenuComponent/getFlexContainer#####", konymp.logger.FUNCTION_ENTRY);
                var flexContainer = new kony.ui.FlexContainer({
                    "id": containerObject.container.id,
                    "centerX": containerObject.container.centerX,
                    "centerY": containerObject.container.centerY,
                    "height": containerObject.container.height,
                    "width": containerObject.container.width,
                    "zIndex": 1,
                    "isVisible": true,
                    "clipbounds": true,
                    "layoutType": kony.flex.FREE_FORM,
                    "skin": "slImage"
                }, {
                    "padding": [0, 0, 0, 0],
                    "marginInPixel": true,
                    "paddingInPixel": true
                }, {});
                var imageIcon = new kony.ui.Image2({
                    "id": containerObject.image.id,
                    "centerX": containerObject.image.centerX,
                    "centerY": containerObject.image.centerY,
                    "width": containerObject.image.height,
                    "height": containerObject.image.width,
                    "zIndex": 2,
                    "isVisible": true,
                    "src": containerObject.image.imageSrc,
                    "onTouchEnd": this.changeSelectedAndUnselectedImage.bind(this)
                }, {
                    "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO
                }, {});
                var label = new kony.ui.Label({
                    "centerX": containerObject.label.centerX,
                    "top": containerObject.label.top,
                    "id": containerObject.label.id,
                    "isVisible": true,
                    "skin": this.view.lblMore.skin,
                    "text": containerObject.label.text,
                    "width": containerObject.label.width,
                    "height": "preferred",
                    "zIndex": 1
                }, {
                    "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                    "padding": [0, 0, 0, 0],
                    "paddingInPixel": false
                }, {
                    "textCopyable": false,
                    "wrapping": constants.WIDGET_TEXT_WORD_WRAP
                });
                flexContainer.add(imageIcon, label);
                konymp.logger.debug("#####End getFlexContainer#####", konymp.logger.FUNCTION_EXIT);
                return flexContainer;
            } catch (exception) {
                konymp.logger.error("#####Exception in getFlexContainer : " + exception.message, konymp.logger.EXCEPTION);
            }
        }
    };
});
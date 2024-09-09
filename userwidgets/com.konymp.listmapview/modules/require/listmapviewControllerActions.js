define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnOption1 **/
    AS_Button_af9119d589c24b138a52168b1a18f296: function AS_Button_af9119d589c24b138a52168b1a18f296(eventobject) {
        var self = this;
        this.openAppleMaps();
    },
    /** onClick defined for btnClose **/
    AS_Button_c50d94d1dd6c4c42bbedb6eed81f1fbd: function AS_Button_c50d94d1dd6c4c42bbedb6eed81f1fbd(eventobject) {
        var self = this;
        this.cancelDirections();
    },
    /** onClick defined for btnOption2 **/
    AS_Button_if4bbf346a7147c1bb515f35eccf4cb4: function AS_Button_if4bbf346a7147c1bb515f35eccf4cb4(eventobject) {
        var self = this;
        this.openGoogleMaps();
    },
    /** onClick defined for flxSearchThisArea **/
    AS_FlexContainer_h2f70a3ef0784152a31a4b1e2f6f88e7: function AS_FlexContainer_h2f70a3ef0784152a31a4b1e2f6f88e7(eventobject) {
        var self = this;
        this.searchThisArea();
    },
    /** onPinClick defined for mapLayout **/
    AS_Map_c440de8f0c004dc48c7d987f750b1201: function AS_Map_c440de8f0c004dc48c7d987f750b1201(eventobject, location) {
        var self = this;
        this.pinClicked(location);
    },
    /** onRowClick defined for segListView **/
    AS_Segment_aeb287f605614902899cde10654d1949: function AS_Segment_aeb287f605614902899cde10654d1949(eventobject, sectionNumber, rowNumber) {
        var self = this;
        this.placeSelected(rowNumber);
    },
    /** onRowClick defined for segMapCallout **/
    AS_Segment_b14840cdee044ec6a1ad4c3f57a471ed: function AS_Segment_b14840cdee044ec6a1ad4c3f57a471ed(eventobject, sectionNumber, rowNumber) {
        var self = this;
        this.placeSelected(rowNumber);
    },
    /** onReachingEnd defined for segListView **/
    AS_Segment_d7a7bd94845e4b3f88054248199a58c3: function AS_Segment_d7a7bd94845e4b3f88054248199a58c3(eventobject) {
        var self = this;
        this.view.segListView.height = "88%";
        this.view.segListView.selectedRowIndex = [0, this.view.segListView.data.length - 1];
        this.view.forceLayout();
    },
    /** onTouchStart defined for segListView **/
    AS_Segment_e97eef4f026147e6993ece6ac8c9cc1b: function AS_Segment_e97eef4f026147e6993ece6ac8c9cc1b(eventobject, x, y) {
        var self = this;
        this.initialDirectionPosition = parseInt(y);
    },
    /** onSwipe defined for segMapCallout **/
    AS_Segment_f9a7b6c14e5346beb7d887bb1831dfe7: function AS_Segment_f9a7b6c14e5346beb7d887bb1831dfe7(seguiWidget, sectionIndex, rowIndex) {
        var self = this;
        this.changeselectedMapPin(rowIndex);
    },
    /** onPush defined for segListView **/
    AS_Segment_h191d51be3664efda32a34c89c4094c8: function AS_Segment_h191d51be3664efda32a34c89c4094c8(eventobject) {
        var self = this;
        if (this.onPushOfSegment != null && this.onPushOfSegment != undefined) {
            kony.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
            this.onPushOfSegment();
        }
    },
    /** onTouchMove defined for segListView **/
    AS_Segment_h1ed345f281c43f0888ef4ee75d648c4: function AS_Segment_h1ed345f281c43f0888ef4ee75d648c4(eventobject, x, y) {
        var self = this;
        if (parseInt(y) - this.initialDirectionPosition > 0) {
            if (this.view.segListView.height == "88%") {
                this.view.segListView.height = "100%";
            }
            this.view.forceLayout();
        }
    }
});
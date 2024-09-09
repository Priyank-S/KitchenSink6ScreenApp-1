define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnCloseRoutes **/
    AS_Button_gf9f3bf2c75347e19182798772276496: function AS_Button_gf9f3bf2c75347e19182798772276496(eventobject) {
        var self = this;
        this.closeRoutes();
    },
    /** postShow defined for placelocator **/
    AS_FlexContainer_c65c17252b3e472c88421dd225ef126e: function AS_FlexContainer_c65c17252b3e472c88421dd225ef126e(eventobject) {
        var self = this;
        this.createDynamicMenu(null);
    },
    /** onClick defined for flxSearchedContent **/
    AS_FlexContainer_caef1cb5330b4787971e9b55e5238d45: function AS_FlexContainer_caef1cb5330b4787971e9b55e5238d45(eventobject) {
        var self = this;
        this.changeOfLocationStart();
    },
    /** onClick defined for flxCloseRoutes **/
    AS_FlexContainer_f16a352bf4814c5488dab795c5ed91e3: function AS_FlexContainer_f16a352bf4814c5488dab795c5ed91e3(eventobject) {
        var self = this;
        kony.print("** Dummy action to make the actions of the below flex unaccessable **");
    },
    /** onClick defined for imgCancel **/
    AS_FlexContainer_ie31bbb67d0e47e7a1046cec1a725ca4: function AS_FlexContainer_ie31bbb67d0e47e7a1046cec1a725ca4(eventobject) {
        var self = this;
        this.clearSelectedFilterOptions();
    },
    /** onTouchEnd defined for imgFilter **/
    AS_Image_a86a3f55252f48e9a12a2201a1069e2f: function AS_Image_a86a3f55252f48e9a12a2201a1069e2f(eventobject, x, y) {
        var self = this;
        this.enableFilterView();
    },
    /** onTouchEnd defined for imgListMapView **/
    AS_Image_c13a76ef2d8240379b9247b5238476ec: function AS_Image_c13a76ef2d8240379b9247b5238476ec(eventobject, x, y) {
        var self = this;
        this.viewShift();
    },
    /** onTouchEnd defined for lblFilter **/
    AS_Label_d48f999e2bdd4f8282298e88f504ac3f: function AS_Label_d48f999e2bdd4f8282298e88f504ac3f(eventobject, x, y) {
        var self = this;
        this.enableFilterView();
    },
    /** onTouchEnd defined for lblListMapView **/
    AS_Label_idfe18d845904808bdd97392164cbd04: function AS_Label_idfe18d845904808bdd97392164cbd04(eventobject, x, y) {
        var self = this;
        this.viewShift();
    },
    /** onRowClick defined for segRecentSearch **/
    AS_Segment_if3bcf83366f404d8c51269baa6eb014: function AS_Segment_if3bcf83366f404d8c51269baa6eb014(eventobject, sectionNumber, rowNumber) {
        var self = this;
        this.recentSearchItemSeleceted();
    },
    /** onPushOfSegment defined for listMapView **/
    AS_UWI_b4841b07c7284605adf833ffb600c416: function AS_UWI_b4841b07c7284605adf833ffb600c416() {
        var self = this;
        this.loadMoreNearbyPlaces();
    }
});
define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for flxCurrentLocation **/
    AS_FlexContainer_ba122f00bd7f4cd1887be57c70d3296a: function AS_FlexContainer_ba122f00bd7f4cd1887be57c70d3296a(eventobject) {
        var self = this;
        this.currentLocationSelected();
    },
    /** onRowClick defined for segAutosuggest **/
    AS_Segment_ec0240d7e9ff4c6ba0d1295e9ae963ba: function AS_Segment_ec0240d7e9ff4c6ba0d1295e9ae963ba(eventobject, sectionNumber, rowNumber) {
        var self = this;
        this.dataSelected(rowNumber);
    }
});
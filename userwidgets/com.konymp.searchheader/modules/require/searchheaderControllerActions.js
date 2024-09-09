define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnClearSearch **/
    AS_Button_c5bcc81861d342ce8cd75b22518a720e: function AS_Button_c5bcc81861d342ce8cd75b22518a720e(eventobject) {
        var self = this;
        this.clearText("txtPlaceOrCategory");
    },
    /** onClick defined for btnClearLocation **/
    AS_Button_cf45624f7a33442283628eddb4163c42: function AS_Button_cf45624f7a33442283628eddb4163c42(eventobject) {
        var self = this;
        this.clearText("txtLocation");
    },
    /** onTextChange defined for txtLocation **/
    AS_TextField_e19b61d897fd4cd59273981b0fca345b: function AS_TextField_e19b61d897fd4cd59273981b0fca345b(eventobject, changedtext) {
        var self = this;
        this.searchLocation();
    },
    /** onTouchStart defined for txtLocation **/
    AS_TextField_e2f7a0054f954e83b2a5471c96464f25: function AS_TextField_e2f7a0054f954e83b2a5471c96464f25(eventobject, x, y) {
        var self = this;
        this.changeLocationStart();
    },
    /** onTextChange defined for txtPlaceOrCategory **/
    AS_TextField_f16a197c743b416285cc94e8a120dc3d: function AS_TextField_f16a197c743b416285cc94e8a120dc3d(eventobject, changedtext) {
        var self = this;
        this.searchPlaceOrCategory();
    },
    /** onTouchStart defined for txtPlaceOrCategory **/
    AS_TextField_jcc7671acc5b43a28529fcdd8de66f4c: function AS_TextField_jcc7671acc5b43a28529fcdd8de66f4c(eventobject, x, y) {
        var self = this;
        this.changeCategoryStart();
    }
});
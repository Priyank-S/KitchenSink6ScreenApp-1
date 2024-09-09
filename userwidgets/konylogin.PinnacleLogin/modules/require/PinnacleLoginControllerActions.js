define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnLogin **/
    AS_Button_ceee0ad573c74c888b4b686d5486179f: function AS_Button_ceee0ad573c74c888b4b686d5486179f(eventobject) {
        var self = this;
        return self.validateUsernameAndPassword.call(this);
    },
    /** onTouchStart defined for imgClose **/
    AS_Image_d91e60271a254aaa975701399f819584: function AS_Image_d91e60271a254aaa975701399f819584(eventobject, x, y) {
        var self = this;
        self.view.flxError.isVisible = false;
    },
    /** onDone defined for tbxUsername **/
    AS_TextField_f64e58290ef34cde8fefa201decc52b7: function AS_TextField_f64e58290ef34cde8fefa201decc52b7(eventobject, changedtext) {
        var self = this;
        return self.validateUsername.call(this);
    },
    /** onDone defined for tbxPassword **/
    AS_TextField_j92987848a664b3db753d8e60df27efc: function AS_TextField_j92987848a664b3db753d8e60df27efc(eventobject, changedtext) {
        var self = this;
        return self.validatePassword.call(this);
    }
});
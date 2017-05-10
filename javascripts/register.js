var register = (function () {
    var _validationItems;
    var _canFormSubmit = false;
    var _hasError = false;
    var _userData = {};
    var $document;
    var property;

    function initialize() {
        _cacheDom();
        _bindEvents();
    }

    function _cacheDom() {
        $document = $(document);
    }

    function _bindEvents() {
        _validationItemsCall();
        $document.on('click', '#userRegister', function () {
            var formSubmit = this.id;
            _validationCheck(_validationItems, formSubmit);
            _canFormSubmit = true;
        });
        $document.on('change keyup paste', '#register_form input', function () {
            if (_canFormSubmit) {
                _validationCheck(_validationItems);
            }
        });
    }

    function _validationItemsCall() {
        _validationItems = [{
            "first_name": {
                "stringLength": {
                    "min": 2
                },
                "notEmpty": {
                    "message": "Please supply your first name"
                },
                "first_name": {
                    "message": "Please supply a vaild Name"
                }
            },
            "last_name": {
                "stringLength": {
                    "min": 2
                },
                "notEmpty": {
                    "message": "Please supply your last name"
                }
            },
            "organization": {
                "stringLength": {
                    "min": 2
                },
                "notEmpty": {
                    "message": "Please supply your organization name"
                }
            },
            "email": {
                "stringLength": {
                    "min": 2
                },
                "notEmpty": {
                    "message": "Please supply your email id"
                },
                "emailAddress": {
                    "message": "Please supply a valid email address"
                }
            },
            "phone": {
                "stringLength": {
                    "min": 2,
                    "max": 10
                },
                "notEmpty": {
                    "message": "Please supply your phone number"
                },
                "phone": {
                    "message": "Please supply a vaild phone number"
                }
            },
            "password": {
                "stringLength": {
                    "min": 2
                },
                "notEmpty": {
                    "message": "The password is required and can't be empty"
                },
                "identical": {
                    "field": "confirmPassword",
                    "message": "The password and its confirm are not the same"
                }
            },
            "confirmPassword": {
                "stringLength": {
                    "min": 2
                },
                "notEmpty": {
                    "message": "The confirm password is required and can't be empty"
                },
                "identical": {
                    "field": "password",
                    "message": "The password and its confirm are not the same"
                }
            }
        }];
    }

    function _validationCheck(data, formSubmit) {
        var checkItems = data[0];
        var errorMessage;
        if (_hasError) {
            $('.help-block').remove();
            _hasError = false;
        }
        for (property in checkItems) {
            var fieldValue = $.trim($("input[name=" + property + "]").val());
            if (fieldValue === "") {
                errorMessage = "This value is not valid";
                _errorBlock(property, errorMessage);
            } else if ((fieldValue !== "") && (fieldValue.length < checkItems[property].stringLength.min)) {
                errorMessage = checkItems[property].notEmpty.message;
                _errorBlock(property, errorMessage);
            } else if ((checkItems[property].first_name)) {
                var first_nameVal = /^[a-zA-Z]+$/;
                if (fieldValue.match(first_nameVal)) {
                    _successBlock(fieldValue, property);
                } else {
                    errorMessage = checkItems[property].first_name.message;
                    _errorBlock(property, errorMessage);
                }
            } else if ((checkItems[property].phone)) {
                var phoneno = /^\d{10}$/;
                if (fieldValue.match(phoneno) && (fieldValue.length === checkItems[property].stringLength.max)) {
                    _successBlock(fieldValue, property);
                } else {
                    errorMessage = checkItems[property].phone.message;
                    _errorBlock(property, errorMessage);
                }
            } else if (checkItems[property].emailAddress) {
                var regex = /^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$/;
                if (!regex.test(fieldValue)) {
                    errorMessage = checkItems[property].emailAddress.message;
                    _errorBlock(property, errorMessage);
                } else {
                    _successBlock(fieldValue, property);
                }
            } else if (checkItems[property].identical) {
                var identicalVal = $("input[name=" + checkItems[property].identical.field + "]").val();
                if (fieldValue !== identicalVal) {
                    errorMessage = checkItems[property].identical.message;
                    _errorBlock(property, errorMessage);
                } else {
                    _successBlock(fieldValue, property);
                }
            } else {
                _successBlock(fieldValue, property);
            }
        }
        if ((!_hasError) && (formSubmit)) {
            _insertUserData(_userData);
        }
    }

    function _successBlock(fieldValue, property) {
        _userData[property] = fieldValue;
        $("input[name=" + property + "]").closest('.form-group').removeClass("has-error");
        $("input[name=" + property + "]").closest('.form-group').addClass("has-success");
    }

    function _errorBlock(property, errorMessage) {
        $("input[name=" + property + "]").closest('.form-group').addClass("has-error");
        $("input[name=" + property + "]").closest(".form-group").append('<small class="help-block">' + errorMessage + '</small>');
        _hasError = true;
    }

    function _insertUserData(data) {
        console.log(data);
    }

    return {
        initialize: initialize
    };

})();
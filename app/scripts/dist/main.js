'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jQuery = require('jQuery');

var _jQuery2 = _interopRequireDefault(_jQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormHandler = function () {
  function FormHandler(selector) {
    _classCallCheck(this, FormHandler);

    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$formElement = (0, _jQuery2.default)(selector);
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  _createClass(FormHandler, [{
    key: 'addSubmitHandler',
    value: function addSubmitHandler(fn) {
      console.log('Setting submit handler for form');
      this.$formElement.on('submit', function (event) {
        var _this = this;

        event.preventDefault();

        var data = {};
        (0, _jQuery2.default)(this).serializeArray().forEach(function (item) {
          data[item.name] = item.value;
          console.log(item.name + ' is ' + item.value);
        });
        console.log(data);
        fn(data).then(function () {
          _this.reset();
          _this.elements[0].focus();
        });
      });
    }
  }, {
    key: 'addInputHandler',
    value: function addInputHandler(fn) {
      console.log('Setting input handler for form');
      this.$formElement.on('input', '[name="emailAddress"]', function (event) {
        var emailAddress = event.target.value;
        var message = '';
        if (fn(emailAddress)) {
          event.target.setCustomValidity('');
        } else {
          message = emailAddress + ' is not an authorized email address!';
          event.target.setCustomValidity(message);
        }
      });
    }
  }]);

  return FormHandler;
}();

exports.default = FormHandler;

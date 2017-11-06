import $ from 'jQuery';


  class FormHandler {
    constructor(selector) {
      if (!selector) {
        throw new Error('No selector provided');
      }

      this.$formElement = $(selector);
      if (this.$formElement.length === 0) {
        throw new Error(`Could not find element with selector: ${selector}`);
      }
    }

    addSubmitHandler(fn) {
      console.log('Setting submit handler for form');
      this.$formElement.on('submit', function (event) {
        event.preventDefault();

        const data = {};
        $(this).serializeArray().forEach(item => {
          data[item.name] = item.value;
          console.log(`${item.name} is ${item.value}`);
        });
        console.log(data);
        fn(data)
          .then(() => {
            this.reset();
            this.elements[0].focus();
          });
      });
    }

    addInputHandler(fn) {
      console.log('Setting input handler for form');
      this.$formElement.on('input', '[name="emailAddress"]', event => {
        const emailAddress = event.target.value;
        let message = '';
        if (fn(emailAddress)) {
          event.target.setCustomValidity('');
        } else {
          message = `${emailAddress} is not an authorized email address!`;
          event.target.setCustomValidity(message);
        }
      });
    }
  }

export default FormHandler;

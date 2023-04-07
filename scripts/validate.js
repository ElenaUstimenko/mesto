const showInputError = (errorElement, message, inputErrorClass) => {
  errorElement.innerText = message;
  errorElement.classList.add(inputErrorClass); 
};

const hideInputError = (errorElement, inputErrorClass) => {
  errorElement.innerText = ' ';
  errorElement.classList.remove(inputErrorClass);
};

const showInputErrorRedLine = (inputElement, inputErrorLineClass) => {
  inputElement.classList.add(inputErrorLineClass);
};

const hideInputErrorRedLine = (inputElement, inputErrorLineClass) => {
  inputElement.classList.remove(inputErrorLineClass);
}

const setInputState = (inputElement, isValid, options) => {
  const {inputSectionSelector, inputErrorSelector, inputErrorClass, inputErrorLineClass} = options;
  const inputFieldElement = inputElement.closest(inputSectionSelector);
  const errorElement = inputFieldElement.querySelector(inputErrorSelector);
  if (isValid) {
    hideInputError(errorElement, inputErrorClass);
    hideInputErrorRedLine(inputElement, inputErrorLineClass);
  } else {
    showInputError(errorElement, inputElement.validationMessage, inputErrorClass);
    showInputErrorRedLine(inputElement, inputErrorLineClass);
  };
}

const toggleInputState = (inputElement, options) => {
  const isValid = inputElement.validity.valid;
   setInputState(inputElement, isValid, options);
};

const enableButtonSave = (buttonElement, disabledButtonClass) => {
  buttonElement.removeAttribute('disabled');
  buttonElement.classList.remove(disabledButtonClass);
};

const disableButtonSave = (buttonElement, disabledButtonClass) => {
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add(disabledButtonClass);
};

const toggleButtonState = (inputs, submitElement, disabledButtonClass) => {
  const formIsValid = inputs.every(inputElement => inputElement.validity.valid);
  if (formIsValid) {
    enableButtonSave(submitElement, disabledButtonClass);
  } else {
    disableButtonSave(submitElement, disabledButtonClass);
  };
};

const setEventListeners = (form, options) => {
  const submitElement = document.querySelector(options.submitSelector);
  const inputs = Array.from(document.querySelectorAll(options.inputSelector));
 
  inputs.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      toggleInputState(inputElement, options);
      toggleButtonState(inputs, submitElement, options.disabledButtonClass);
    });
  });
  toggleButtonState(inputs, submitElement, options.disabledButtonClass);
};

const enableValidation = (validationOptions) => {
  const forms = Array.from(document.querySelectorAll(validationOptions.formSelector));
  forms.forEach(form => {
    setEventListeners(form, validationOptions);
  });
};

//можно так:
/*const enableValidation = ({
  formSelector,
  submitSelector,
  inputSelector,
  inputSectionSelector,
  inputErrorSelector,
  inputErrorClass,
  inputErrorLineClass,
  disabledButtonClass,
}) => {
const forms = Array.from(document.querySelectorAll(formSelector));
forms.forEach(form => {
  setEventListeners(form,  {
    submitSelector,
    inputSelector,
    inputSectionSelector,
    inputErrorSelector,
    inputErrorClass,
    inputErrorLineClass,
    disabledButtonClass,
  });
 });
};
*/
//убираем для ПР 7 весь файл
//как показать или убрать ошибку
/*const showInputError = (errorElement, message, inputErrorClass) => {
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

//включение/отключение показа ошибки после проверки на валидность
export const setInputState = (inputElement, isValid, options) => {
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
};

//проверка на валидность for input
const toggleInputState = (inputElement, options) => {
  const isValid = inputElement.validity.valid;
   setInputState(inputElement, isValid, options);
};

//кнопка Сохранить включается для нажатия
const enableButtonSave = (buttonElement, disabledButtonClass) => {
  buttonElement.removeAttribute('disabled');
  buttonElement.classList.remove(disabledButtonClass);
};

//кнопка Сохранить отключается для нажатия
export const disableButtonSave = (buttonElement, disabledButtonClass) => {
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add(disabledButtonClass);
};

//проверка на валидность и включение/отключение кнопки Сохранить для нажатия
const toggleButtonState = (inputs, submitElement, disabledButtonClass) => {
  const formIsValid = inputs.every(inputElement => inputElement.validity.valid);
  if (formIsValid) {
    enableButtonSave(submitElement, disabledButtonClass);
  } else {
    disableButtonSave(submitElement, disabledButtonClass);
  };
};

//пройтись по массиву и на каждое поле ввода навесить слушатель для проверки на валидность полей и кнопки
const setEventListeners = (form, options) => {
  const submitElement = form.querySelector(options.submitSelector);
  const inputs = Array.from(form.querySelectorAll(options.inputSelector));
 
  inputs.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      toggleInputState(inputElement, options);
      toggleButtonState(inputs, submitElement, options.disabledButtonClass);
    });
  });
  toggleButtonState(inputs, submitElement, options.disabledButtonClass);
};

//проверка каждой формы на валидность, слушатель на каждую форму
export const enableValidation = (validationOptions) => {
  const forms = Array.from(document.querySelectorAll(validationOptions.formSelector));
  forms.forEach(form => {
    setEventListeners(form, validationOptions);
  });
};*/

//another variant
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
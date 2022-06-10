class ElementFinder {
  element: HTMLElement;
  constructor(elementId: string) {
    this.element = document.getElementById(elementId);
  }
}

class HtmlTextInput extends ElementFinder {
  isValid: boolean = false;
  constructor(elementId: string) {
    super(elementId);
  }
}

class HtmlSpanElement extends ElementFinder {
  constructor(elementId: string) {
    super(elementId);
  }
}

class HtmlDivElement extends ElementFinder {
  constructor(elementId: string) {
    super(elementId);
  }
}

const numericInput = new HtmlTextInput("numericInput");
const resultSpan = new HtmlSpanElement("resultSpan");
const valueSpan = new HtmlSpanElement("valueSpan");
const textSpan = new HtmlSpanElement("textSpan");
const validSpan = new HtmlSpanElement("validSpan");
const wrapperCalcInputDiv = new HtmlDivElement("wrapperCalcInputDiv");

function validationActions(isValid: boolean, text: string) {
  if (isValid) {
    const result = process(text);
    if (result) {
      resultSpan.element.textContent = result.toFixed(2);
      valueSpan.element.textContent = result.toFixed(2);
    }
    numericInput.isValid = true;
    validSpan.element.textContent = "true";
    wrapperCalcInputDiv.element.className = "";
    wrapperCalcInputDiv.element.classList.add("border-valid-focused");
  } else {
    numericInput.isValid = false;
    validSpan.element.textContent = "false";
    resultSpan.element.textContent = "?";
    valueSpan.element.textContent = "?";
    wrapperCalcInputDiv.element.className = "";
    wrapperCalcInputDiv.element.classList.add("border-invalid-focused");
  }
}

function textControl(text: string) {
  const isValid =
    !/^\+|^\-|^\*|^\/|\+(\s?)+\+|\-(\s?)+\-|\*(\s?)+\*|\/(\s?)+\/|\+(\s?)+\-|\-(\s?)+\+|\+(\s?)+\/|\/(\s?)+\+|\+(\s?)+\*|\*(\s?)+\+|\*(\s?)+\-|\-(\s?)+\*|\*(\s?)+\/|\/(\s?)+\*|\/(\s?)+\-|\-(\s?)+\/|\((\s?)+\-|\((\s?)+\+|\((\s?)+\*|\((\s?)+\/|\+$|\-$|\*$|\/$|[a-z]|[A-Z]|\!|\'|\^|\%|\&|\=|\?|\_|\||\}|\]|\[|\{|\§|\½|\$|\#|\£|\>|\<|\"|\;|\:|\,|\./g.test(
      text
    );
  let last = text.charAt(text.length - 1);

  if (isValid && last !== "") {
    do {
      text = text.replace(/\s/g, "");
      text = text.replace(/\(/g, "");
      text = text.replace(/\)/g, "");
      text = text.replace(/\+$/g, "");
      text = text.replace(/\-$/g, "");
      text = text.replace(/\*$/g, "");
      text = text.replace(/\/$/g, "");

      last = text.charAt(text.length - 1);
    } while (!/[0-9]/g.test(last));
  }

  validationActions(isValid, text);
}

function process(values: string) {
  return new Function("return " + values + ";").call(this);
}

function handleChange(event: Event) {
  const element = event.target as HTMLInputElement;
  textSpan.element.textContent = element.value;
  textControl(element.value);
}

function handleBlur() {
  if (numericInput.isValid) {
    wrapperCalcInputDiv.element.className = "";
    wrapperCalcInputDiv.element.classList.add("border-valid-non-focused");
  } else {
    wrapperCalcInputDiv.element.className = "";
    wrapperCalcInputDiv.element.classList.add("border-invalid-non-focused");
  }
}

function handleFocus() {
  if (numericInput.isValid) {
    wrapperCalcInputDiv.element.className = "";
    wrapperCalcInputDiv.element.classList.add("border-valid-focused");
  } else {
    wrapperCalcInputDiv.element.className = "";
    wrapperCalcInputDiv.element.classList.add("border-invalid-focused");
  }
}

numericInput.element.addEventListener("input", handleChange);
numericInput.element.addEventListener("blur", handleBlur);
numericInput.element.addEventListener("focus", handleFocus);

function destroyAll() {
  numericInput.element.removeEventListener("input", handleChange);
  numericInput.element.removeEventListener("blur", handleBlur);
  numericInput.element.removeEventListener("focus", handleFocus);
}

//UPDATE THE RATES => textBox2, rate text, add all option to both the options
let fromFlag = document.querySelector(".from .flag");
let fromSelect = document.querySelector(".select-to");
let fromTextBox = document.querySelector(".from .text-1");

let toFlag = document.querySelector(".to .flag");
let toSelect = document.querySelector(".to .select-to");
let toTextBox = document.querySelector(".to .text-1");

let rateText = document.querySelector(".rate");

//FROM
for (let countryCode in countryList) {
  let option = document.createElement("option");
  option.innerText = countryCode;

  fromSelect.append(option);
  if (countryCode === "USD") {
    option.selected = true;
  }
}

//TO
for (let countryCode in countryList) {
  let option = document.createElement("option");
  option.innerText = countryCode;

  toSelect.append(option);
  toSelect.append(option);
  if (countryCode === "INR") {
    option.selected = true;
  }
}

//SOMETING SELECTED IN FROM OR TO
fromSelect.addEventListener("change", (evt) => {
  let currCode = evt.target.value;
  //CHNAGE THE FLAG
  let code = countryList[currCode];
  fromFlag.src = `https://flagsapi.com/${code}/flat/64.png`;
  //UPDATE THE CURRENCY VALUES
  updateValues("select-from");
});
toSelect.addEventListener("change", (evt) => {
  let currCode = evt.target.value;
  //CHNAGE THE FLAG
  let code = countryList[currCode];
  toFlag.src = `https://flagsapi.com/${code}/flat/64.png`;
  //UPDATE THE CURRENCY VALUES
  updateValues("select-to");
});

//SOMETHING TYPED IN FROM TEXT BOX
fromTextBox.addEventListener("input", (evt) => {
  let currText = evt.target.value;

  //CHECKING FOR CERTAIN VALUES TO NOT OCCUR IN THE TEXTBOX
  if (currText < 0) {
    fromTextBox.value = "1";
  }

  //UPDATE THE CURRENCY VALUES
  updateValues(evt);
});
toTextBox.addEventListener("input", (evt) => {
  let currText = evt.target.value;

  //CHECKING FOR CERTAIN VALUES TO NOT OCCUR IN THE TEXTBOX
  if (currText < 0) {
    fromTextBox.value = "1";
  }

  //UPDATE THE CURRENCY VALUES
  updateValues(evt);
});

//FUNCTION FOR UPDATING THE VLAUES
const api_URL = "https://api.frankfurter.dev/v1/latest?base=USD&symbols=INR";
const updateValues = async (evt) => {
  //GETTING THE RATE VALUES
  const from = fromSelect.value;
  const to = toSelect.value;
  let rate = 1;
  if (from != to) {
    const URL = `https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`;
    let response = await fetch(URL);
    let data = await response.json();
    rate = eval(`data.rates.${to}`);
  }
  //UPDATING THE RATE VALUES AT DIFFERENT PLACES
  if (evt != null) {
    if (evt === "atStart") {
      toTextBox.value = (fromTextBox.value * rate).toFixed(2);
    } else if (evt === "select-to") {
      fromTextBox.value = (toTextBox.value / rate).toFixed(2);
    } else if (evt === "select-from") {
      toTextBox.value = (fromTextBox.value * rate).toFixed(2);
    } else if (evt === "select-to" || evt.target.name == "to") {
      fromTextBox.value = (toTextBox.value / rate).toFixed(2);
    } else if (evt === "select-from" || evt.target.name == "from") {
      toTextBox.value = (fromTextBox.value * rate).toFixed(2);
    }
  }
  rateText.innerText = `1.00 ${from} = ${rate} ${to}`;
};

//UPDATING THE RATED ON WINDOWS INITIALIZATION
updateValues("atStart");

//DISABLING RIGHT CLICK
document.addEventListener("contextmenu", (evt) => {
  evt.preventDefault();
});

//DISABLING TEXT SELECTION
document.addEventListener("selectstart", (evt) => {
  evt.preventDefault();
});

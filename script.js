const billInput = document.getElementById("bill-input");
const tipButtons = document.querySelectorAll(".tip-percent-btn");
const customTipInput = document.getElementById("custom-tip-input");
const peopleInput = document.getElementById("people-input");
const tipAmountDisplay = document.getElementById("tip-amount-display");
const totalAmountDisplay = document.getElementById("total-amount-display");

tipButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tipButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    customTipInput.value = "";
    calculateTip();
  });
});

[billInput, customTipInput, peopleInput].forEach((input) => {
  input.addEventListener("input", calculateTip);
});

function calculateTip() {
  const bill = parseFloat(billInput.value) || 0;
  const people = parseInt(peopleInput.value) || 1;

  let tipPercent = parseFloat(customTipInput.value);
  if (isNaN(tipPercent)) {
    const activeBtn = document.querySelector(".tip-percent-btn.active");
    tipPercent = activeBtn ? parseFloat(activeBtn.dataset.tip) : 0;
  }

  const tipAmount = (bill * tipPercent) / 100 / people;
  const totalAmount = bill / people + tipAmount;

  tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
  totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
}

function resetCalculator() {
  billInput.value = "";
  customTipInput.value = "";
  peopleInput.value = "";
  tipAmountDisplay.textContent = "$0.00";
  totalAmountDisplay.textContent = "$0.00";
  tipButtons.forEach((b) => b.classList.remove("active"));
}

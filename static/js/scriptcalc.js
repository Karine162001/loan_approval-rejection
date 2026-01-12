function updateValue(id, value) {
  document.getElementById(id).innerText =
    id === "rateValue" ? value + "%" : parseInt(value).toLocaleString();
}

function calculate() {
  const amount = parseFloat(document.getElementById('amount').value);
  const months = parseInt(document.getElementById('months').value);
  const rate = parseFloat(document.getElementById('rate').value) / 100 / 12;

  let monthly, total;

  if (!isNaN(amount) && !isNaN(months) && !isNaN(rate) && rate > 0) {
    // Աննուիտետ տարբերակ
    monthly = (amount * rate) / (1 - Math.pow(1 + rate, -months));
    total = monthly * months;

    document.getElementById('result').innerHTML =
      `Ամսական վճարում․ <br><b>${monthly.toFixed(0).toLocaleString()} ֏</b><br>` +
      `Ընդհանուր վճարում․ <br><b>${total.toFixed(0).toLocaleString()} ֏</b>`;
  } else {
    document.getElementById('result').innerHTML =
      `<span style="color:red">Խնդրում ենք լրացնել բոլոր դաշտերը ճիշտ</span>`;
  }
}
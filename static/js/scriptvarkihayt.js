async function submitForm() {
    // Ընթերցել բոլոր դաշտերը
    const data = {
        name: document.getElementById('name').value.trim(),
        age: parseFloat(document.getElementById('age').value),
        passport: document.getElementById('passport').value.trim(),
        employment_years: parseFloat(document.getElementById('employment_years').value),
        monthly_income: parseFloat(document.getElementById('monthly_income').value),
        credit_score: parseFloat(document.getElementById('credit_score').value),
        loan_amount: parseFloat(document.getElementById('loan_amount').value),
        loan_term_months: parseFloat(document.getElementById('loan_term_months').value),
        monthly_expenses: parseFloat(document.getElementById('monthly_expenses').value),
        other_loans_total: parseFloat(document.getElementById('other_loans_total').value),
        is_guaranteed: document.getElementById('is_guaranteed').value,
        loan_purpose: document.getElementById('loan_purpose').value,
        marital_status: document.getElementById('marital_status').value,
        region_code: document.getElementById('region_code').value,
        late_payments_last_1m: parseInt(document.getElementById('late_payments_last_1m').value)
    };

    // Ստուգել պարտադիր input-ները
    let inputs = document.querySelectorAll('#loanForm input[required]');
    for (let input of inputs) {
        if (!input.value.trim()) {
            alert("Խնդրում ենք լրացնել բոլոր դաշտերը");
            return false;
        }
    }

    // Ստուգել select-ները
    let selects = document.querySelectorAll('#loanForm select[required]');
    for (let select of selects) {
        if (!select.value) {
            alert("Խնդրում ենք ընտրել բոլոր ընտրանքները");
            return false;
        }
    }

    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log("Backend response:", result);

        const resultDiv = document.getElementById('result');
        resultDiv.innerText = result.message;
        resultDiv.style.color = (String(result.status).toLowerCase() === 'approved') ? 'green' : 'red';

        if (String(result.status).toLowerCase() === 'approved') {
            // Ցուցադրել փաստաթղթերի հատվածը, առանց redirect
            document.getElementById('document-upload').style.display = 'block';
            document.getElementById('retry').style.display = 'none';
        } else if (String(result.status).toLowerCase() === 'rejected') {
            document.getElementById('retry').style.display = 'block';
            document.getElementById('document-upload').style.display = 'none';
        } else {
            alert(result.message);
        }

    } catch (err) {
        console.error(err);
        alert("Սխալ տեղի ունեցավ։ Խնդրում ենք փորձել կրկին։");
    }
}

// Form listener
document.getElementById('loanForm').addEventListener('submit', function(e){
    e.preventDefault();
    submitForm();
});
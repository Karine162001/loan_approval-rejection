const cardRadio = document.getElementById('attachCard');
const branchRadio = document.getElementById('visitBranch');
const cardUpload = document.getElementById('cardUpload');
const branchList = document.getElementById('branchList');
const thankYou = document.getElementById('thankYou');
const form = document.getElementById('confirmationForm');
const branchDone = document.getElementById('but_subEnd'); 

cardRadio.addEventListener('change', () => {
     cardUpload.style.display = 'block';
     branchList.style.display = 'none';
     thankYou.style.display = 'none';
});

branchRadio.addEventListener('change', () => {
     cardUpload.style.display = 'none';
     branchList.style.display = 'block';
     thankYou.style.display = 'none';
});

// Քարտի submit
form.addEventListener('submit', (e) => {
     e.preventDefault(); 
     if (cardRadio.checked) {
         const fileInput = cardUpload.querySelector('input[type="file"]');
         if (!fileInput.value) {
             alert("Խնդրում ենք կցել քարտը։");
             return;
         }
     }
     cardUpload.style.display = 'none';
     thankYou.style.display = 'block';
});

// Մասնաճյուղի ավարտ
branchDone.addEventListener('click', () => {
     branchList.style.display = 'none';
     thankYou.style.display = 'block';
});
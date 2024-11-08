//now we get the steps
let steps = document.querySelectorAll(".step")
let prevBtn = document.querySelector(".previous-step")
let nextBtn = document.querySelector(".next-step")
const ourForm = document.querySelector(".form")

const username = document.getElementById("user-name")
const emailInput = document.querySelector("#user-email");
const userPhoneNumber = document.getElementById("user-tel");
const allInputs = document.querySelectorAll("input");
const intervalToggle = document.querySelector(".interval-toggle");
const link  = document.querySelector(".link")

const prices = document.querySelectorAll(".price");
const plans = document.querySelectorAll(".plan");
let radioOption;

let currentStep = 0;
showTab(currentStep);

link.addEventListener("click",()=>{
    steps[currentStep].style.display = "none";

    currentStep =  1;
    showTab(currentStep);
})

function showTab(currentStep) {
    steps[currentStep].style.display = 'flex';

    if (currentStep == 0) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'inline';
    }
    if (currentStep == (steps.length - 2)) {
        nextBtn.textContent = "Confirm";
    }else if(currentStep == (steps.length -1)){
        nextBtn.style.display = 'none';
        prevBtn.style.display = 'none';
    } 
    else {
        nextBtn.textContent = 'Next';
    }
}


nextBtn.addEventListener("click", (n) => {
    if(validateInputs() ===false){
        nextBtn.disabled = false;
    }
    else{
        nextBtn.disabled = true;
    }
    n = 1;
    if (n == 1 && !validateInputs()) return false;
    steps[currentStep].style.display = 'none';
    currentStep = currentStep + n;
   
    if (currentStep >=4) {
        showTab(currentStep);
        setTimeout(()=>{
            ourForm.submit();
        },2000)
        return false;
    }
    showTab(currentStep);
    setTimeout(() => {
        nextBtn.disabled = false;  // Re-enable after showing the next tab
    }, 3000);
    //moved here to ensure that values are checked after every tab switch
    //modify 
    intervalToggle.checked ? planChoice.textContent = radioOption + " (Yearly)" : planChoice.textContent = radioOption + " (Monthly)";
    if (intervalToggle.checked) {
        planChoice.textContent = radioOption + " (Yearly)";
        if (radioOption === "Arcade") {
            planChoicePrice.textContent = "$90/yr";
        } else if (radioOption === "Advanced") {
            planChoicePrice.textContent = "$120/yr";
        } else if (radioOption === "Pro") {
            planChoicePrice.textContent = "$150/yr";
        }
    } else {
        planChoice.textContent = radioOption + " (Monthly)";
        if (radioOption === "Arcade") {
            planChoicePrice.textContent = "$9/mo";
        } else if (radioOption === "Advanced") {
            planChoicePrice.textContent = "$12/mo";
        } else if (radioOption === "Pro") {
            planChoicePrice.textContent = "$15/mo";
        }
    }
})
prevBtn.addEventListener("click", (n) => {
    steps[currentStep].style.display = "none";
    n = -1;
    currentStep = currentStep + n;
    showTab(currentStep);
})

function validateInputs() {
    let valid = true;

    allInputs.forEach((input, index) => {
        if (input.value.trim() === "") {
            input.style.border = '1px solid hsl(354, 84%, 57%)';
            const errormsg = input.previousElementSibling.querySelector(".error");
            errormsg.textContent = "This field is required";
            errormsg.classList.add("enabled-error");

            valid = false
        } else {
            input.style.border = "1px solid hsl(231, 11%, 63%)";
            const errormsg = input.previousElementSibling?.querySelector(".error");
            if (errormsg) {
                errormsg.textContent = "";  // Clear the error message
                errormsg.classList.remove("enabled-error");  // Remove the error class
            }
        }

    })
    if (emailInput.value.trim() === "") {
        const errormsg = emailInput.previousElementSibling.querySelector(".error");
        errormsg.textContent = "This field is required";
        errormsg.classList.add("enabled-error");

    }
    else if (!validateEmail(emailInput.value)) {
        const errormsg = emailInput.previousElementSibling.querySelector(".error");
        errormsg.textContent = "Invalid Email";
        errormsg.classList.add("enabled-error");
        valid = false;
    }
    //validate the phone number 
    if (userPhoneNumber.value.length - 2 !== 10 && userPhoneNumber.value !== "") {
        const errormsg = userPhoneNumber.previousElementSibling.querySelector(".error");
        errormsg.textContent = "Enter 10 digits.";
        errormsg.classList.add("enabled-error");
        valid = false;
    }
    //validate the plan selection
    if (currentStep === 1) { // Adjust this to the correct step index where radio buttons are located
        if (areAllRadioButtonsUnchecked()) {
            valid = false;
            // Add an error message for radio buttons
            const errorMsg = document.querySelector(".option-error"); // Assuming you have a div for error messages
            errorMsg.textContent = "Please select a plan.";
            errorMsg.classList.add("enabled-error");
        } else {
            const errorMsg = document.querySelector(".option-error");
            errorMsg.classList.remove("enabled-error");
        }
    }

    return valid;
}

function areAllRadioButtonsUnchecked() {
    return Array.from(radioBtns).every((radioBtn) => !radioBtn.checked);
}

function validateEmail(email) {
    return /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(email);
}

//main purpose is to ensure that only numbers are inserted into tel user input
userPhoneNumber.addEventListener("input", () => {
    let inputValue = userPhoneNumber.value;
    //first lets ensure we only get number values from users
    let digits = inputValue.replace(/\D/g, "");///replace non digit characters with an empty space
    let formatedInputValues = "";

    if (digits.length > 0) formatedInputValues += digits.substring(0, 3) + " ";
    if (digits.length >= 4) formatedInputValues += digits.substring(3, 6) + " "
    if (digits.length >= 7) formatedInputValues += digits.substring(6, 10);
    userPhoneNumber.value = formatedInputValues.trim();

})

let radioBtns = document.querySelectorAll(".plan-options");
radioBtns.forEach((radioBtn) => {

    radioBtn.addEventListener("change", (e) => {
        radioBtns.forEach((btn) => {
            btn.parentElement.classList.remove("active-plan");
        });

        if (radioBtn.checked) {
            radioBtn.parentElement.classList.add("active-plan")
            radioOption = radioBtn.value;

        }


    })
})

let yearlyPrices = ["$90/yr", "$120/yr", "$150/yr"];
let monthlyPrices = ["$9/mo", "$12/mo", "$15/mo"];

let addOnYearPrices = ["$10/yr", "$20/yr", "$20/yr"];
let addOnMonthPrices = ["$1/mo", "$2/mo", "$2/mo"];

const promoMsg = document.querySelectorAll(".promo-msg");
const addOnIntervals = document.querySelectorAll(".interval-price");
const planChoice = document.querySelector(".plan-choice");
const planChoicePrice = document.querySelector(".plan-choice-price");

intervalToggle.addEventListener("change", (e) => {
    e.preventDefault();
    const selectedInterval = intervalToggle.checked ? yearlyPrices : monthlyPrices;
    prices.forEach((price, index) => {
        price.textContent = selectedInterval[index];
    })
    //adding the promo message that only shows up if interval is yearly
    promoMsg.forEach((promo) => {
        intervalToggle.checked ? promo.style.display = "block" : promo.style.display = "none";
    })
    //modifying add-ons based on interval chosen
    let addSelectedInterval = intervalToggle.checked ? addOnYearPrices : addOnMonthPrices;
    addOnIntervals.forEach((addOnInterval, index) => {
        addOnInterval.textContent = addSelectedInterval[index];
    })


})

const addOnCheckBoxs = document.querySelectorAll(".add-on");
const addOnContainers = document.querySelectorAll(".step.add-ons .option");
const addOnParentContainer = document.querySelector(".add-on-container");


addOnCheckBoxs.forEach((addOnBox) => {
    addOnBox.addEventListener("change", () => {
        let value = addOnBox.value; //the checkbox value
        const price = addOnBox.closest(".option").querySelector(".interval-price").textContent;
        //checkboxes add border and bgc to container 
        if (addOnBox.checked) {
            addOnBox.parentElement.parentElement.parentElement.parentElement.classList.add("active-plan");
            //there is only three options that can be checked yes,
            const addOnElement = document.createElement("div");
            addOnElement.classList.add("add-ons");
            addOnElement.setAttribute('data-addon',addOnBox.id);
            
            addOnElement.innerHTML = `
                <div class="inner">
                  <span class="chosen-addon">${value}</span>
                </div>
                <span class="chosen-addon-price">${price}</span>
            `
            addOnParentContainer.appendChild(addOnElement);
        } else {
            addOnBox.parentElement.parentElement.parentElement.parentElement.classList.remove("active-plan");
            const addOnElement = addOnParentContainer.querySelector(`[data-addon="${addOnBox.id}"]`);
            if(addOnElement){
                addOnParentContainer.removeChild(addOnElement);
            }
        }
    })
})
function cutHtml(){
    const form  = document.querySelector(".form");
    const buttonContainer = document.querySelector(".button-container");
    const screenwith = window.innerWidth;
    if(screenwith >= 768){
        if(form && buttonContainer){
            form.append(buttonContainer);
        }
    }
}
window.onload = cutHtml;


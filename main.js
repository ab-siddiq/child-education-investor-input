
let investorForm = document.getElementById("investor-form");
investorForm.addEventListener("submit", (e) => {
    e.preventDefault();
})

const investorInput = () => {
    let investorNameInput = getInputFieldValue("investor-name-input");
    let investorCurrentAgeInput = getInputFieldValue("investor-current-age-input");
    let investorAnnualIncomeInput = getInputFieldValue("investor-annual-income-input");
    let investorChildCurrentAgeInput = getInputFieldValue("investor-child-current-age-input");
    let investorNeedAmountChildAtAgeInput = getInputFieldValue("investor-at-age-input");
    let investorChildCurrentEducationalCostInput = getInputFieldValue("investor-current-educational-cost-input");
    let investorPossibleInvestInput = getInputFieldValue("investor-possible-invest-input");
    let investorRiskAptitudeInput = getSelectInputValue("investor-risk-aptitude-input");


    const investorInput = {
        name: investorNameInput,
        currentAge: investorCurrentAgeInput,
        annualIncome: investorAnnualIncomeInput,
        childCurrentAge: investorChildCurrentAgeInput,
        childAtAge: investorNeedAmountChildAtAgeInput,
        childEducationCostNow: investorChildCurrentEducationalCostInput,
        possibleInvest: investorPossibleInvestInput,
        riskAptitude: investorRiskAptitudeInput,
    }
    calculationInvestorInput(investorInput);

}

const getInputFieldValue = (id) => document.getElementById(id).value;

const getSelectInputValue = (id) => {
    let selectOptionValue = document.getElementById(id);
    let selectInputValue = selectOptionValue.options[selectOptionValue.selectedIndex].text;
    return selectInputValue;
}

const calculationInvestorInput = (inputValues) => {
    console.log(inputValues.currentAge);
    const inflationPercent = 5.5;
    const estimatedPercent = 11;
    let ageDifference = inputValues.childAtAge - inputValues.childCurrentAge;
    let fv1 = inputValues.childEducationCostNow * Math.pow((1 + inflationPercent / 100), ageDifference);
    let fv2 = inputValues.possibleInvest * Math.pow((1 + estimatedPercent / 100), ageDifference);
    let r = (estimatedPercent / (100 * 12));
    let npr = ageDifference * 12;
    let pmt = ((fv1-fv2) * r) / (Math.pow((1 + r), npr))-1;
    console.log(fv1, fv2, pmt);
    
    const outputValues = {
        name: inputValues.name,
        ageGoal: inputValues.childAtAge,
        fv1: fv1,
        fv2: fv2,
        inflationPercent: inflationPercent,
        estimatedPercent: estimatedPercent,
        pmt: pmt,
        possibleInvest: inputValues.possibleInvest,
    }
    showOutput(outputValues);
}

const showOutput = (outputValues) => {
    document.getElementById('output').innerHTML = `
        <p class="text-justify"> 
        Dear Mr/ Mrs. ${outputValues.name} When your Child will be at the Age of  ${outputValues.ageGoal} You are to have ${outputValues.fv1} Taka For the Education Plan
        The Inflation is considered at ${outputValues.inflationPercent}% , And The return is Estimated to be ${outputValues.estimatedPercent}% Your monthly SIP investment of ${outputValues.pmt} Taka
        with initial investment of  ${outputValues.possibleInvest} Taka help you to achieve your children's education at the age of ${outputValues.ageGoal} <br>
        
        ${outputValues.fv2}
        </p>
    
    
    `
}

const setOutputValue = (id, value) => document.getElementById(id).innerHTML = value;



const form=document.querySelector(".add");
let transactions = localStorage.getItem("transactions") !== null ? JSON.parse(localStorage.getItem("transactions")) : [];
const incomeList=document.querySelector("ul.incomeList");
const expenseList=document.querySelector("ul.expenseList");

function generateTemplate(id,source,amount,time){
    return `<li data-id="${id}">
                <p>
                    <span>${source}</span>
                    <span>${time}</span>
                </p>
                <span>₹${Math.abs(amount)}</span>
                <i class="bi bi-trash delete"></i>
            </li>`
}

function addTransactionDOM(id,source,amount,time){
    if(amount>0){
        incomeList.innerHTML+= generateTemplate(id,source,amount,time);
    }else{
        expenseList.innerHTML+= generateTemplate(id,source,amount,time)
    }

}

function addTransaction(source,amount){
    const time=new Date();
    const transaction={
        id: Math.floor(Math.random()*100000),
        source: source,
        amount: amount,
        time: `${time.toLocaleTimeString()}   ${time.toLocaleDateString()}`
    };
    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    addTransactionDOM(transaction.id,source,amount,transaction.time);

}
form.addEventListener("submit",event => {
    event.preventDefault();
    addTransaction(form.source.value,form.amount.value);
    form.reset();
})

function getTransaction(){
    transactions.forEach(transaction => {
        if(transaction.amount>0){
            incomeList.innerHTML+= generateTemplate(transaction.id,transaction.source,transaction.amount,transaction.time);
        }else{
            expenseList.innerHTML+= generateTemplate(transaction.id,transaction.source,transaction.amount,transaction.time);  
        }
    });
}
getTransaction();
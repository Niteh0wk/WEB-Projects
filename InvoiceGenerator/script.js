const checker = new Set();
let totalAmount = 0;

function addTask(taskNr) {
    if (checker.has(taskNr)) {
        alert('Task has already been added');
    } else {
        checker.add(taskNr);
        const taskLi = document.createElement('li');
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        removeBtn.onclick = () => removeTask(taskLi, priceLi, taskNr, taskPrice);

        let taskPrice;
        switch (taskNr) {
            case 1:
                taskLi.textContent = "Wash Car";
                taskPrice = 10;
                break;
            case 2:
                taskLi.textContent = "Mow Lawn";
                taskPrice = 20;
                break;
            case 3:
                taskLi.textContent = "Pull Weed";
                taskPrice = 30;
                break;
            default:
                return;
        }
        taskLi.appendChild(removeBtn);
        document.getElementById('taskList').appendChild(taskLi);

        const priceLi = document.createElement('li');
        priceLi.textContent = taskPrice + '€';
        document.getElementById('priceList').appendChild(priceLi);

        totalAmount += taskPrice;
        updateTotalAmount();
    }
}

function removeTask(taskLi, priceLi, taskNr, taskPrice) {
    document.getElementById('taskList').removeChild(taskLi);
    document.getElementById('priceList').removeChild(priceLi);
    checker.delete(taskNr);

    totalAmount -= taskPrice;
    updateTotalAmount();
}

function updateTotalAmount(){
    document.getElementById('totalAmount').textContent = totalAmount;
}
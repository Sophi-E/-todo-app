const form = document.querySelector('form');
const btn = document.querySelector('#btn');
const ul = document.querySelector('ul');
const input = document.querySelector('input');

let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []

localStorage.setItem('items', JSON.stringify(itemsArray))
const data = JSON.parse(localStorage.getItem('items'))

loadEvents();

function loadEvents(){
    form.addEventListener('submit', submit);
    btn.addEventListener('click', clearList);
    ul.addEventListener('click', deleteOrCheck);
}

function submit(e){
    e.preventDefault();
    if(input.value !== ''){
        itemsArray.push(input.value)
        localStorage.setItem('items', JSON.stringify(itemsArray))
        addTask(input.value)
        input.value = ''
    }

}

function addTask(task){
    let li = document.createElement('li');
    li.innerHTML = `<span class='delete'> x </span><input type='checkbox'><label>${task}</label>`
    ul.appendChild(li);
}

function clearList(e){
    localStorage.clear()
    ul.innerHTML ='';
}

function deleteOrCheck(e){
    if(e.target.className === 'delete'){
        deleteTask(e)
    }else{
        TickTask(e)
    }
}

function deleteTask(e){
    let remove = e.target.parentNode;
    let parentNode = remove.parentNode;
    parentNode.removeChild(remove)
}

function TickTask(e){
    const task = e.target.nextSibling;
    if(e.target.checked){
        task.style.textDecoration ='line-through';
        task.style.color = 'red';
    }else{
        task.style.textDecoration ='none';
        task.style.color = 'black';
    }
}
data.forEach(item => {
    addTask(item)
  })
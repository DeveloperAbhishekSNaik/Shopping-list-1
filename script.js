//1)init 2)onAddItemSubmit 3)removeItemFromStorage 4)getItemFromStorage




const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFiiter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');

let isEditMode = false;

function setItemToEdit() {

}

function removeItem(item) {
    if (confirm('Are you sure?')) {
        // remove item from the DOM
        item.remove();

        //remove item from the DOM 
        removeItemFromStorage(item.textContent);

        checkUI();
    }

}

function onClickItem(e) {
    e.preventDefault();
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement);
    } else {
        setItemToEdit(e.target);
    }
}


function checkUI() {
    itemInput.value = '';

    const items = itemList.querySelectorAll('li');

    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFiiter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFiiter.style.display = 'block';
    }
    formBtn.innerHTML = '<i class=" fa-solid  fa-plus"></i> Add item';
    formBtn.style.backgroundColor = "#333";

    isEditMode = false;

}

function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();

    // Add new items to the array
    itemsFromStorage.push(item);

    // convert to JSON string and set to local storage 
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));

}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid  fa-xmark')
    button.appendChild(icon);
    return button;
}

function addItemToDOM(item) {
    // Create a list item
    const li = document.createElement('li');
    let textNode = document.createTextNode(item);
    li.appendChild(textNode);

    // create and append button
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    // Add li to the DOM
    itemList.appendChild(li);
}


function getItemsFromStorage() {
    let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage;
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();

    //Filter out items to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    //Re store to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}


function checkIfItemExists(item) {
    const itemsFromStorage = getItemsFromStorage();
    return itemsFromStorage.includes(item);
}


function onAddItemSubmit(e) {
    e.preventDefault();
    const newItem = itemInput.value;//

    //To validate the input 
    if (newItem === '') {
        alert('Please add an item');
        return;
    }

    //To check for edit mode 
    if (isEditMode) {
        const itemToEdit = itemList.querySelector('.edit -mode');

        //remove it from local storage 
        removeItemFromStorage(itemToEdit.textContent);//
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false;
    } else {
        //check if the items exist
        if (checkIfItemExists(newitem)) {
            alert('That item already exists !');
            return;
        }
    }
    // create item dom element
    addItemToDOM(newItem);

    // add item to local storage 
    addItemToStorage(newItem);

    checkUI();

    itemInput.value = '';


}



function init() {
    itemForm.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click', onClickItem);
}

init();
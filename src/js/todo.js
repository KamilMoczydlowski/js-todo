const addItemBtn = document.querySelector('.add-item-btn');
const textInput = document.querySelector('.text-input');
const accordion = document.querySelector('.accordion');
const listItemTemp = document.querySelector('.list-item-temp');
const alertInfo = document.querySelector('.alert-info');
const manageCategoryBtn = document.querySelector('.manage-category-btn');

const editItemPopup = document.querySelector('.edit-task-popup');
const editItemInput = document.querySelector('.edit-input');
const editItemErrMsg = document.querySelector('.edit-error-msg');
const editItemBtnAccept = document.querySelector('.edit-button-accept');
const editItemBtnCancel = document.querySelector('.edit-button-cancel');

const manageCategoryPopup = document.querySelector('.manage-category-popup');
const manageCategoryTemplate = document.querySelector(
	'.categories-list-item-template'
);
const manageCategoryList = document.querySelector('.categories-list');
const manageCategoryInfo = document.querySelector('.manage-category-info');
const createCategoryBtn = document.querySelector('.add-category-btn');
const manageCategoryCloseBtn = document.querySelector('.close-category-btn');

const categorySelect = document.querySelector('.category-select');

const editCategoryPopup = document.querySelector('.edit-category-popup');
const editCategoryInput = document.querySelector('.edit-category-input');
const editCategoryErrMsg = document.querySelector('.edit-category-error-msg');
const editCategoryAcceptBtn = document.querySelector('.edit-category-accept');
const editCategoryCancelBtn = document.querySelector('.edit-category-cancel');

const createCategoryPopup = document.querySelector('.create-category-popup');
const createCategoryErrMsg = document.querySelector(
	'.create-category-error-msg'
);
const createCategoryBtnAccept = document.querySelector(
	'.create-category-accept'
);
const createCategoryBtnCancel = document.querySelector(
	'.create-category-cancel'
);
const createCategoryInput = document.querySelector('.create-category-input');

let textToEdit;

let itemIdNumber = 0;

const addItem = () => {
	let listItem = listItemTemp.content.cloneNode(true);

	if (textInput.value !== '') {
		const categoryValue = categorySelect.value;
		const categoryTitleUpperCase =
			categoryValue[0].toUpperCase() + categoryValue.slice(1);

		let accBox = accordion.querySelector(`#${categoryValue}`);

		itemIdNumber++;
		alertInfo.textContent = '';

		if (accBox) {
			if (accBox.id == categoryValue) {
				let accList = accBox.querySelector('.acc-list');
				let item = listItem.querySelector('.list-item');
				let textContent = item.querySelector('.text-content');
				let accBtn = accList.previousElementSibling;
				let accNumber = accBtn.querySelector(
					'.category-todo-number'
				).textContent;
				accNumber++;

				accBtn.querySelector('.category-todo-number').textContent = accNumber;

				item.setAttribute('id', `item-${itemIdNumber}`);
				textContent.textContent = textInput.value;

				textInput.value = '';

				addBtnsAndListeners(item);

				accList.appendChild(item);
				accList.classList.remove('hide');
				accList.previousElementSibling
					.querySelector('.category-arrow')
					.classList.remove('rotate');
			}
		} else {
			let accBox = listItem.querySelector('.acc-box');
			accBox.setAttribute('id', `${categoryValue}`);
			let accordionButton = accBox.querySelector('.category-todo-title-btn');
			let title = accBox.querySelector('.category-todo-text');
			let number = accBox.querySelector('.category-todo-number');
			let item = listItem.querySelector('.list-item');
			let textContent = item.querySelector('.text-content');

			accordionButton.addEventListener('click', toggleAccordion);
			title.textContent = categoryTitleUpperCase;
			number.textContent = '1';
			item.setAttribute('id', `item-${itemIdNumber}`);
			textContent.textContent = textInput.value;

			textInput.value = '';

			addBtnsAndListeners(item);

			accordion.appendChild(accBox);
		}
	} else {
		alertInfo.textContent = 'Write something to do!';
	}
};

const addBtnsAndListeners = el => {
	let btnCheckItem = el.querySelector('.button-check');
	let btnEditItem = el.querySelector('.button-edit');
	let btnDeleteItem = el.querySelector('.button-delete');

	btnCheckItem.addEventListener('click', checkItem);
	btnEditItem.addEventListener('click', editItem);
	btnDeleteItem.addEventListener('click', deleteItem);
	btnDeleteItem.addEventListener('click', checkIfAnyItemLeft);
};

const enterKeyAddItem = () => {
	if (event.keyCode === 13) {
		addItem();
	}
};

const checkItem = e => {
	let checkBtn = e.target.closest('.button-check');
	let editBtn = checkBtn.nextElementSibling;
	let listItem = checkBtn.closest('.list-item');
	let accBox = e.target.closest('.acc-box');
	let number = accBox.querySelector('.category-todo-number').textContent;

	if (!listItem.classList.contains('completed')) {
		editBtn.disabled = true;
		listItem.classList.add('completed');
		number--;
		accBox.querySelector('.category-todo-number').textContent = number;
	} else {
		editBtn.disabled = false;
		listItem.classList.remove('completed');
		number++;
		accBox.querySelector('.category-todo-number').textContent = number;
	}
};

const editItem = e => {
	let editBtn = e.target.closest('.button-edit');
	let listItem = editBtn.closest('.list-item');
	textToEdit = listItem.querySelector('.text-content');
	editItemPopup.closest('.popup').classList.add('display-block');
	editItemInput.value = textToEdit.textContent;
};

const deleteItem = e => {
	let accBox = e.target.closest('.acc-box');
	let deleteBtn = e.target.closest('.button-delete');
	let number = accBox.querySelector('.category-todo-number').textContent;

	if (deleteBtn.closest('.list-item').classList.contains('completed')) {
		deleteBtn.closest('.list-item').remove();
		editItemInput.value = '';
	} else {
		deleteBtn.closest('.list-item').remove();
		editItemInput.value = '';
		number--;
		accBox.querySelector('.category-todo-number').textContent = number;
	}

	if (accBox.querySelectorAll('.list-item').length === 0) {
		accBox.remove();
	}
};

const acceptEditedText = () => {
	textToEdit.textContent = editItemInput.value;
	editItemPopup.closest('.popup').classList.remove('display-block');
	textToEdit.textContent = editItemInput.value;
	editItemErrMsg.textContent = '';
	editItemInput.style.border = 'none';
};

const enterKeyEditItem = () => {
	if (event.keyCode === 13) {
		acceptEditedText();
	}
};

const checkEditItemInput = () => {
	if (textToEdit.textContent === editItemInput.value) {
		editItemInput.style.border = '2px solid red';
		editItemErrMsg.textContent = 'Please, change something!';
	} else if (editItemInput.value === '') {
		editItemInput.style.border = '2px solid red';
		editItemErrMsg.textContent = 'Please, write something!';
	} else {
		acceptEditedText();
	}
};

const cancelEditedText = () => {
	editItemPopup.closest('.popup').classList.remove('display-block');
	editItemInput.value = '';
	editItemErrMsg.textContent = '';
	editItemInput.style.border = 'none';
};

const showMeManageCategoryPopup = () => {
	let categoryOptions = document.querySelectorAll('.category-option');

	categoryOptions.forEach(item => {
		createLi(item);
	});

	manageCategoryPopup.closest('.popup').classList.add('display-block');
};

const createLi = el => {
	const template = manageCategoryTemplate.content.cloneNode(true);
	const newLi = template.querySelector('.categories-list-item');
	const textParagraph = newLi.querySelector('.categories-list-item-text');
	const text = el.textContent;

	const editBtn = newLi.querySelector('.category-edit-button');
	const deleteBtn = newLi.querySelector('.category-delete-button');

	editBtn.addEventListener('click', editCategory);
	deleteBtn.addEventListener('click', deleteCategory);

	textParagraph.textContent = text;
	manageCategoryList.appendChild(newLi);
};

const editCategory = e => {
	const btn = e.target.closest('.category-edit-button');
	const closestLi = btn.closest('.categories-list-item');
	textToEdit = closestLi.querySelector('.categories-list-item-text');
	const textValueLowerCase = textToEdit.textContent.toLowerCase();

	let categoryTitles = document.querySelectorAll('.category-todo-text');
	let arr = [];

	categoryTitles.forEach(title => {
		arr.push(title.textContent.toLowerCase());
	});

	if (arr.includes(textValueLowerCase)) {
		manageCategoryInfo.textContent = 'You are using this one!';
		manageCategoryInfo.classList.add('display-block');
	} else {
		editCategoryInput.value = textToEdit.textContent;

		editCategoryPopup.closest('.popup').classList.add('display-block');
		manageCategoryPopup.closest('.popup').classList.remove('display-block');
		manageCategoryInfo.classList.remove('display-block');
	}
};

const checkEditCategoryInput = () => {
	let inputValue = editCategoryInput.value;
	let inputValueToLowerCase = inputValue.toLowerCase();
	let categoryTitles = document.querySelectorAll('.categories-list-item-text');
	let arr = [];

	categoryTitles.forEach(title => {
		arr.push(title.textContent.toLowerCase());
	});

	if (inputValue === '') {
		editCategoryErrMsg.textContent = 'Please, write something!';
	} else if (arr.includes(inputValueToLowerCase)) {
		editCategoryErrMsg.textContent = 'Please, write new category!';
	} else {
		acceptEditCategoryInput();
	}
};

const enterKeyEditCategory = () => {
	if (event.keyCode === 13) {
		checkEditCategoryInput();
	}
};

const acceptEditCategoryInput = () => {
	let textValue = textToEdit.textContent.toLowerCase();

	let option = document.querySelector(`.category-option[value = ${textValue}]`);

	option.value = editCategoryInput.value.toLowerCase();
	option.textContent =
		editCategoryInput.value.charAt(0).toUpperCase() +
		editCategoryInput.value.slice(1);

	textToEdit.textContent =
		editCategoryInput.value.charAt(0).toUpperCase() +
		editCategoryInput.value.slice(1);
	editCategoryInput.value = '';
	editCategoryErrMsg.textContent = '';
	editCategoryPopup.closest('.popup').classList.remove('display-block');
	manageCategoryPopup.closest('.popup').classList.add('display-block');
};

const closeEditCategoryPopup = () => {
	editCategoryPopup.closest('.popup').classList.remove('display-block');
	manageCategoryPopup.closest('.popup').classList.add('display-block');
	editCategoryInput.value = '';
	editCategoryErrMsg.textContent = '';
};

const deleteCategory = e => {
	const deleteBtn = e.target.closest('.category-delete-button');
	const closestLi = deleteBtn.closest('.categories-list-item');
	const paragraph = closestLi.querySelector('.categories-list-item-text');
	const paragraphValue = paragraph.textContent.toLowerCase();

	const itemsTitles = document.querySelectorAll('.category-todo-text');

	let categoryOptions = document.querySelectorAll('.category-option');
	let arr = [];

	if (itemsTitles.length > 0) {
		itemsTitles.forEach(title => {
			const titleToLower = title.textContent.toLowerCase();
			arr.push(titleToLower);
		});

		if (arr.includes(paragraphValue)) {
			manageCategoryInfo.textContent = 'You are using this category!';
			manageCategoryInfo.classList.add('display-block');
		} else {
			categoryOptions.forEach(option => {
				if (categoryOptions.length > 1) {
					if (option.value === paragraphValue) {
						closestLi.remove();
						option.remove();
						manageCategoryInfo.classList.remove('display-block');
					}
				} else {
					manageCategoryInfo.textContent = 'You need at least one category!';
					manageCategoryInfo.classList.add('display-block');
				}
			});
		}
	} else {
		categoryOptions.forEach(option => {
			if (categoryOptions.length > 1) {
				if (option.value === paragraphValue) {
					closestLi.remove();
					option.remove();
					manageCategoryInfo.classList.remove('display-block');
				}
			} else {
				manageCategoryInfo.textContent = 'You need at least one category!';
				manageCategoryInfo.classList.add('display-block');
			}
		});
	}
};

const closeCategoryPopup = () => {
	if (document.querySelectorAll('.categories-list-item')) {
		let allLi = document.querySelectorAll('.categories-list-item');

		allLi.forEach(li => {
			li.remove();
		});
	}

	manageCategoryPopup.closest('.popup').classList.remove('display-block');
	manageCategoryInfo.classList.remove('display-block');
};

const showMecreateCategoryPopup = () => {
	createCategoryPopup.closest('.popup').classList.add('display-block');
	manageCategoryInfo.classList.remove('display-block');
	closeCategoryPopup();
};

const acceptNewCategory = () => {
	let newCategoryOption = document.createElement('option');
	newCategoryOption.value = createCategoryInput.value.toLowerCase();
	newCategoryOption.textContent =
		createCategoryInput.value.charAt(0).toUpperCase() +
		createCategoryInput.value.slice(1);
	newCategoryOption.classList.add('category-option');

	categorySelect.append(newCategoryOption);

	createCategoryPopup.closest('.popup').classList.remove('display-block');
	createCategoryInput.value = '';
	createCategoryErrMsg.textContent = '';
};

const checkCategoryInput = () => {
	let categoryInputValue = createCategoryInput.value;
	let categoryInputToLowerCase = categoryInputValue.toLowerCase();
	let categoryOptions = document.querySelectorAll('.category-option');
	let arr = [];

	categoryOptions.forEach(option => {
		arr.push(option.value);
	});

	if (createCategoryInput.value === '') {
		createCategoryErrMsg.textContent = 'Please, write something!';
	} else if (arr.includes(categoryInputToLowerCase)) {
		createCategoryErrMsg.textContent = 'You already have this one!';
	} else {
		acceptNewCategory();
		showMeManageCategoryPopup();
	}
};

const enterKeyAddCategory = () => {
	if (event.keyCode === 13) {
		checkCategoryInput();
	}
};

const cancelNewCategory = () => {
	createCategoryPopup.closest('.popup').classList.remove('display-block');
	createCategoryInput.value = '';
	createCategoryErrMsg.textContent = '';
	showMeManageCategoryPopup();
};

const checkIfAnyItemLeft = () => {
	if (accordion.querySelector('.acc-box')) {
		alertInfo.textContent = '';
	} else {
		alertInfo.textContent = 'For now there is nothing to do.';
	}
};

const toggleAccordion = e => {
	const accordionBtn = e.target.closest('.category-todo-title-btn');
	const categoryArrow = accordionBtn.querySelector('.category-arrow');
	const accordionBox = accordionBtn.nextElementSibling;

	accordionBox.classList.toggle('hide');
	categoryArrow.classList.toggle('rotate');
};

addItemBtn.addEventListener('click', addItem);
textInput.addEventListener('keyup', enterKeyAddItem);

editItemBtnAccept.addEventListener('click', checkEditItemInput);
editItemInput.addEventListener('keyup', enterKeyEditItem);
editItemBtnCancel.addEventListener('click', cancelEditedText);

manageCategoryBtn.addEventListener('click', showMeManageCategoryPopup);
manageCategoryCloseBtn.addEventListener('click', closeCategoryPopup);

editCategoryInput.addEventListener('keyup', enterKeyEditCategory);
editCategoryAcceptBtn.addEventListener('click', checkEditCategoryInput);
editCategoryCancelBtn.addEventListener('click', closeEditCategoryPopup);

createCategoryBtn.addEventListener('click', showMecreateCategoryPopup);
createCategoryBtnAccept.addEventListener('click', checkCategoryInput);
createCategoryInput.addEventListener('keyup', enterKeyAddCategory);
createCategoryBtnCancel.addEventListener('click', cancelNewCategory);

//signUp-Login

let signName = document.querySelector('#user_name');
let signCity = document.querySelector('#user_city');
let signPassword = document.querySelector('#user_password');
let signEmail = document.querySelector('#user_email');
let signupAdmin = document.querySelector('#signup_admin');

let restored = localStorage.getItem('user');
let dataBox = restored ? JSON.parse(restored) : [];

let signUp = () => {
    let user = {
        Name: signName.value,
        City: signCity.value,
        Password: signPassword.value,
        Email: signEmail.value,
        Admin: signupAdmin.value
    };

    dataBox.push(user);
    let stored = localStorage.setItem('user', JSON.stringify(dataBox));

    signCity.value = signName.value = signEmail.value = signPassword.value = signupAdmin.value = '';

    document.querySelector("#main_login").style.display = "flex";
    document.querySelector("#main_signup").style.display = "none";

};

let logEmail = document.querySelector('#login_email');
let loginAdmin = document.querySelector('#login_admin');
let logPassword = document.querySelector('#login_password');
let uniqueAdminId;

let logIn = () => {

    for (var i of dataBox) {

        if (i.Password == logPassword.value && i.Email == logEmail.value && logEmail.value != "") {
            if (loginAdmin.value == i.Admin && loginAdmin.value != "") {
                console.log(i.Admin, loginAdmin.value)
                localStorage.setItem('code', 'Admin')
                // window.location.href = './index.html';
                window.location.href = './signup.html'; // this is index file
                return;
            };
            localStorage.setItem('code', 'User');
            // window.location.href = './index.html';
            window.location.href = './signup.html';// this is index file
            return;
        };

    };

    console.log("unsucces");
    window.location.reload(true);

};



// dashboarding

let carding = document.querySelector('.card');
let restName = document.querySelector('#rest_name');
let restLocation = document.querySelector('#rest_location');
let imageFile = document.querySelector("#image_file");
let popUp = document.querySelector('#pop_up');
let nextBtn = document.querySelector('#next_btn');
let titleName = document.querySelector('#title_name');
let itemName;
let itemPrice;
let itemBox;
let switched = 0;


let card_table;
let card_item_title1;
let card_item_name;
let card_item_price;
let card_hotel_naming;

let restoredItem = localStorage.getItem('items');
let items = restoredItem ? JSON.parse(restoredItem) : [];
let cardInfo = [];
let itemList;
let itemBtn;


let imgURL;
let imagingURL;

let rN;
let rL;
let rI = document.createElement('input');



let reCreate = () => {

    popUp.innerHTML = null;
    rN = document.createElement('input');
    rN.type = 'text';
    rN.id = 'rest_name'
    rN.placeholder = 'Resturant Name';

    rL = document.createElement('input');
    rL.type = 'text';
    rL.id = 'rest_location'
    rL.placeholder = 'Resturant Location';

    rI.type = 'file';
    rI.accept = 'image/*';
    rI.id = 'image_file';

    nextBtn.textContent = "Next";
    popUp.append(rN, rL, rI);

    let adminInfo = document.querySelector('.admin_info');
    adminInfo.append(popUp, nextBtn);
    carding.style.display = 'flex';
    editInput.style.display = 'none';
};


//generating Iamage URL

imageFile.addEventListener("change", () => {
    let fileRead = new FileReader();
    fileRead.onload = () => (imgURL = fileRead.result);
    if (imageFile.files.length > 0) {
        fileRead.readAsDataURL(imageFile.files[0]);
    }
});

rI.addEventListener("change", () => {
    let fileRead = new FileReader();
    fileRead.onload = () => (imagingURL = fileRead.result);
    if (rI.files.length > 0) {
        fileRead.readAsDataURL(rI.files[0]);
    }
});

let nextTo;
nextTo = () => {

    let restNameValue = restName ? restName.value.toUpperCase() : '';
    let rNValue = rN ? rN.value.toUpperCase() : '';
    let rLValue = rL ? rL.value.toLowerCase() : '';

    titleName.innerText = rNValue || restNameValue || 'Restaurant';
    if (switched == 0) {

        popUp.innerHTML = null;
        nextBtn.innerText = "Close";

        itemBox = document.createElement('div');
        itemBox.setAttribute('class', 'item_box');

        itemName = document.createElement("input");
        itemName.setAttribute('type', 'text');
        itemName.setAttribute('id', 'item_name');

        itemPrice = document.createElement("input");
        itemPrice.setAttribute('type', 'number');
        itemPrice.setAttribute('id', 'item_price');

        itemBtn = document.createElement('button');
        itemBtn.setAttribute('class', 'btn btn-outline-success');
        itemBtn.setAttribute('onclick', 'item()');
        itemBtn.textContent = "Item";

        itemBox.append(itemName, itemPrice);

        itemBox.appendChild(itemBtn);
        popUp.appendChild(itemBox);

        switched = 1;

        card_table = document.createElement('table');
        let card_hotel_name = document.createElement('tr');
        let card_hotel_naming = document.createElement('th');
        card_hotel_naming.setAttribute('onclick', 'clearCard(this)')
        card_hotel_naming.setAttribute('colspan', 2);
        card_hotel_naming.textContent = rNValue || restName.value.toUpperCase();
        let card_hotel_image = document.createElement('tr');
        let card_hotel_imaging = document.createElement('th');
        card_hotel_imaging.setAttribute('colspan', 2);
        let hotel_image = document.createElement('img');
        hotel_image.src = imagingURL || imgURL;
        card_item_title1 = document.createElement('tr');
        card_item_name = document.createElement('th');
        card_item_name.textContent = 'DISH';
        card_item_price = document.createElement('th');
        card_item_price.textContent = 'PRICE';
        card_hotel_naming.appendChild(hotel_image);
        card_hotel_image.appendChild(card_hotel_imaging)
        card_hotel_name.appendChild(card_hotel_naming);
        card_item_title1.append(card_item_name, card_item_price);
        card_table.append(card_hotel_name, card_hotel_image, card_item_title1);
    }
    else if (switched == 1) {

        addtoCard();
        carding.style.display = 'none';
        let info = {
            restName: rNValue || restName.value.toLowerCase(),
            restLocation: rLValue || restLocation.value.toLowerCase(),
            imaging: imagingURL || imgURL,
            items: cardInfo
        };
        items.push(info);
        localStorage.setItem('items', JSON.stringify(items));

        document.querySelector('.btn').disabled = false;

        switched = 0;
    };

};

let item = () => {

    itemList = {
        itemName: itemName.value, itemPrice: +itemPrice.value
    };
    cardInfo.push(itemList);
    {
        let = card_item_title2 = document.createElement('tr');

        let = card_item_pricing = document.createElement('td');
        card_item_pricing.textContent = itemName.value || "-";
        let = card_item_naming = document.createElement('td');
        card_item_naming.textContent = itemPrice.value || "-";

        card_item_title2.append(card_item_pricing);
        card_item_title2.append(card_item_naming);
        card_table.append(card_item_title2);
    };
    itemName.value = itemPrice.value = '';
};

let cards_container = document.querySelector('#cards_container');
let card_figure;
let card;

let addtoCard = () => {
    card_figure = document.createElement('figure');
    card_figure.id = 'card';
    card_figure.append(card_table);
    cards_container.appendChild(card_figure);
    card = document.querySelectorAll('#card table tr td');

    card.forEach((td) => {
        if (td.innerText && Boolean != td.innerText) {
            td.setAttribute('onclick', 'editDelete(this)')
        };
    });
};

console.log(localStorage.getItem('code'))

let recreatedCardFigure;
if (localStorage.getItem('code') == 'User') {
   let mainContainer = document.getElementById('main_container');
   mainContainer.style.backgroundImage='URL("./User_Background.jpg")'

    carding.style.display = document.querySelector('.re_create').style.display = 'none';
    document.querySelector('#addto_card').style.display = 'flex';

    for (var i = 0; i < items.length; i++) {

        recreatedCardFigure = document.createElement('figure');
        recreatedCardFigure.id = 'Re_card';

        let recreatedTable = document.createElement('table');

        let cardHotelName = document.createElement('tr');
        let cardHotelNaming = document.createElement('th');
        cardHotelNaming.setAttribute('colspan', 2);
        cardHotelNaming.classList = 'Name';

        let cardHotelLocation = document.createElement('tr');
        let cardHotelArea = document.createElement('th');
        cardHotelArea.setAttribute('colspan', 2);
        cardHotelArea.setAttribute('onclick', 'clearCard(this)')

        cardHotelNaming.innerHTML = items[i] ? items[i].restName : 'RESTURANT';
        cardHotelArea.innerHTML = items[i] ? items[i].restLocation : 'AREA';

        let cardHotelImage = document.createElement('tr');
        let cardHotelImaging = document.createElement('th');
        cardHotelImaging.setAttribute('colspan', 2);
        let hotelImage = document.createElement('img');

        hotelImage.src = items[i] ? items[i].imaging : 'Image';
        let nameRow = document.createElement('tr');
        let itemHeading = document.createElement('th');
        itemHeading.textContent = 'Items';
        let priceHeading = document.createElement('th');
        priceHeading.textContent = 'Price';

        cardHotelName.appendChild(cardHotelNaming);
        cardHotelLocation.appendChild(cardHotelArea);
        cardHotelImaging.appendChild(hotelImage);
        cardHotelImage.appendChild(cardHotelImaging);
        nameRow.append(itemHeading, priceHeading);
        recreatedTable.append(cardHotelName, cardHotelLocation, cardHotelImage, nameRow);

        for (var j = 0; j < items[i].items.length; j++) {
            let detailedRow = document.createElement('tr');
            let itemRow = document.createElement('td');
            itemRow.textContent = items[i].items[j] ? items[i].items[j].itemName : '-';
            let priceRow = document.createElement('td');
            priceRow.textContent = items[i].items[j] ? items[i].items[j].itemPrice : '-';

            detailedRow.append(itemRow, priceRow);
            recreatedTable.appendChild(detailedRow);
        }

        let addTOCardBtn = document.createElement('span');
        addTOCardBtn.textContent = 'Add-to-Card';
        addTOCardBtn.setAttribute('class', 'addto_card');

        addTOCardBtn.setAttribute('onclick', ' addToCardUser(this)')

        recreatedCardFigure.append(recreatedTable, addTOCardBtn);
        cards_container.append(recreatedCardFigure);
    };
};

let cardsContainer = document.querySelector('#cards_container');
let editInput = document.createElement('input');
let reCard = document.querySelectorAll('#Re_card table tr td');

let editDelete = (e) => {
    editInput.type = 'text';
    editInput.id = 'edit_input';
    if (card) {
        card.forEach((card) => {
            editInput.style.display = 'block';
            card.classList.remove('change_item');
            editInput.remove();
        });
    };

    reCard.forEach((reCard) => {
        editInput.style.display = 'block';
        reCard.classList.remove('change_item');
        editInput.remove();
        // console.log(reCard);
    });
    
    e.classList.add('change_item');
    editInput.oninput = () => {
        document.querySelector('.change_item').innerText = editInput.value;
    };
    document.body.append(editInput);

    editInput.value = '';

};

let inputField = (event) => {
    if (event.keyCode === 27) {
        editInput.style.display = 'none';
    };
};
document.onkeydown = (event) => {
    inputField(event);
};








let clearCard = (f) => {
    let currentElemet = f.closest('figure');
    for (let i = items.length - 1; i >= 0; i--) {
        if (items[i].restName == f.innerText && items[i].restID) {
            items.splice(i, 1);
            console.log(items[i].restName, f.innerText, items[i].restID, items[i])
            localStorage.setItem('items', JSON.stringify(items));
        };
    };
    currentElemet.remove();
};

//logout

let logOut = () => {
    localStorage.setItem('code', Math.floor(Math.random() * 1000 + 1));
    // window.location.href = './signUp.html';
    window.location.href = './index.html'; //this is signup
};
if (localStorage.getItem('code') === 'User') {
    carding.style.display = "none";

    if (window.location.pathname !== '/signup.html') {
        window.location.href = './signup.html';
    };
}
else if (localStorage.getItem('code') === 'Admin') {
    if (window.location.pathname !== '/signup.html') {
        window.location.href = './signup.html';
    };
    if (screen.width <= 768) {
        document.querySelector('#dashboard').style.gridTemplateColumns = '100%';
    };
}
else {
    if (window.location.pathname !== '/index.html') {
        window.location.href = './index.html';
    };
};


let totalAmount = 0;
let orderedList = document.querySelector('ul');

let addToCardUser = (r) => {

    let list = document.createElement('li');
    list.setAttribute('id', 'list');
    let deleteButton = document.createElement('button');

    let tdPrice = r.parentElement.getElementsByTagName('td');
    let NameLocation = r.parentElement.getElementsByTagName('th');
    for (var k = 0; k < tdPrice.length; k++) {
        if (!isNaN(tdPrice[k].innerText)) {
            totalAmount += Number(tdPrice[k].innerText);
        };
    };

    let totalBill = document.querySelector('#addto_card span');
    totalBill.innerText = `Total Bill : ${totalAmount}`;
    deleteButton.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    deleteButton.classList.add('btn');
    deleteButton.setAttribute('onclick', 'deleteOrder(this)');
    list.textContent = `${NameLocation[0].innerText} : ${NameLocation[1].innerText}`;
    list.appendChild(deleteButton);
    orderedList.append(list);

};

let deleteOrder = (d) => {
    d.parentElement.remove();
};

if (localStorage.getItem('code') == 'Admin') {
    if (screen.width <= 768) {
        document.querySelector('#dashboard').style.gridTemplateColumns = '100%';
    };
};

let searchField = document.getElementById('search');
let searchingCardItems = document.querySelectorAll('figure');
let searchingItems = document.querySelectorAll('figure table tr .Name');
let searchItem = () => {
    for (var i = 0; i < searchingItems.length; i++) {
        let cardName = searchingItems[i]
        if (cardName) {
            let nameText = cardName.textContent || cardName.innerHTML;
            if(nameText.toLowerCase().indexOf(searchField.value.toLowerCase())>-1){
               searchingCardItems[i].style.display='';
            }
            else{
                searchingCardItems[i].style.display='none';
            }
        }
    }
};



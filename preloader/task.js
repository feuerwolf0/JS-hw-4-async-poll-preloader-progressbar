function createItems(items) {
    const itemsContainer = document.getElementById('items');

    Object.values(items).forEach((item) => {
        const itemContainer = document.createElement('div');
        itemContainer.classList.add('item');

        const itemCode = document.createElement('div');
        itemCode.classList.add('item__code');
        itemCode.textContent = item.CharCode;

        const itemValue = document.createElement('div');
        itemValue.classList.add('item__value');
        itemValue.textContent = item.Value;

        const itemCurrency = document.createElement('div');
        itemCurrency.classList.add('item__currency');
        itemCurrency.textContent = 'руб. ';

        // собираю получившийся item
        itemContainer.appendChild(itemCode);
        itemContainer.appendChild(itemValue);
        itemContainer.appendChild(itemCurrency);

        itemsContainer.appendChild(itemContainer);
    })
}


const loader = document.getElementById('loader');
const xhr = new XMLHttpRequest();
// получаю валюты из локального хранилища
const cachedValutes = JSON.parse(localStorage.getItem('valutes'));

// если валюты есть в локальном хранилище создаю items
if (cachedValutes) {
    loader.classList.remove('loader_active');
    createItems(cachedValutes);
}

xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === xhr.DONE) {
        loader.classList.remove('loader_active');

        const response = JSON.parse(xhr.response);
        const valutes = response.response.Valute;

        // добавляю данные в localStorage
        localStorage.setItem('valutes', JSON.stringify(valutes));

        // очищаю container items
        const oldItems = document.getElementById('items');
        oldItems.textContent = '';
        
        createItems(valutes);
    }
})

xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');
xhr.send();



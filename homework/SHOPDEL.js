let phones=[];
let obj={};
function getValue(){
    const img=document.getElementById('img');
    const brand=document.getElementById('brand');
    const model=document.getElementById('model');
    const price=document.getElementById('price');
    const sale=document.getElementById('sale');
    obj={
        img: img.value,
        brand: brand.value,
        model: model.value,
        price: price.value,
        sale: sale.value,
        id: Math.random()
    };
    phones.push(obj);
}

function render(){
    let html='';
    for(i=0; i<phones.length; i++){
        html+=`<div class="card" style="width: 18rem;">
<img src="${phones[i].img}" class="card-img-top" alt="...">
<div class="card-body">
  <h5 class="card-title">${phones[i].brand}</h5>
  <h6 class="card-title">${phones[i].model}</h6>
  <p class="card-text">iOS, экран 6.1" IPS (828x1792), A13 Bionic, ОЗУ 4 ГБ, флэш-память 64 ГБ, камера 12 Мп, аккумулятор 3046 мАч, 1 SIM</p>
  <h5 class="card-title">${phones[i].price}$</h5>
  <button onclick='del()' class="btn btn-primary" data-addid=${phones[i].id}>Удалить</button>
</div>
</div>`
}
let add=document.getElementById('add');
add.innerHTML=html;
del();
}

function del(){
    const btns=add.querySelectorAll('button');
btns.forEach((btn, indx)=>{
    btn.addEventListener("click", function(e){
        console.log(e.target.dataset.addid);
        let idClick=e.target.dataset.addid;
        phones=phones.filter(v => v.id != idClick);
    render();
    })
})
}




//Администраторская панель интернет магазина.
// Добавить товар
// Создаём форму для заполнения
// Администратор заполняет форму данными по товару
// По кнопке добавляем данные по товару через функцию в объект, потом пушим его в массив. (phones.push(obj);)
// У нас получается массив объектов из информации по товару, которую мы будем заполнять в карточку.

// Создаем пустую переменную (=строка’’) в которую потом ляжет карточка товара в виде HTML кода с добавленными нами данными из объекта.
// Создаем функцию, которая будет автоматически подставлять нужные нам параметры по товару в карточку
// Перебираем массив циклом и в `HTML` где нам надо подставляем данные из массива ${phones[i].model}
// На выходе у нас получается карточка с HTML кодом и автоматически заполненными параметрами по каждому товару.
// Создаем пустой div который будет отображать карточку товара
// Находим этот div по id присваиваем его в переменную add
// Через innerHTML добавляем в этот div переменную с HTML кодом

// Создаем кнопку Воспроизвести, которая будет отображать готовую карточку товара, по onclick вызов функции



// let buttonCss=document.querySelector('input#img');
// buttonCss.style.cssText='border: 2px solid red';

// let buttonCss=add.querySelector('button.btn');
// buttonCss.style.cssText='display: block; margin: auto';

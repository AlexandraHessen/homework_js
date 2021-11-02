'use strict'
//Будем хранить в localStorage:  КЛЮЧ (drinks ) – название темы;  ЗНАЧЕНИЕ ({"марго":{"alco":true,"recipe":"водка"},"сок":{"alco":false,"recipe":"яблоко"}}) - вся информация в виде объекта объектов. 
class LocStorageClass  {
    constructor (nameLoc){
        this.nameLoc=nameLoc;
        this.obj={};
        let infoLocStorage=JSON.parse(localStorage.getItem(nameLoc));
        if(infoLocStorage){
            this.obj=infoLocStorage
        } 
    }
    addValue(key, value){
        this.obj[key]=value;
        localStorage.setItem(this.nameLoc, JSON.stringify(this.obj))
        // не делаем return, т.к. мы ничего не возвращаем, а вносим данные в объект
        // return this.obj;
    };

    

    getValue(key){
        return this.obj[key];

        // можно не проверять ключ, а просто написать return this.obj[key]; 
        // если обратиться к несуществующему ключу в объекте, то нам вернуться undefined
        // т.е. тоже самое если бы мы ставили проверку и писали раздельно

        // if (key in this.obj){
        //     return this.obj[key];
        // } 
        // return;

        // не писать так
        // else{
        //     return false;
        // }
    };

    deleteValue(key){
        if (key in this.obj){
            delete this.obj[key]
            localStorage.setItem(this.nameLoc, JSON.stringify(this.obj))
            return true;                 
        } else{
            return false;
        }
    };

    getKeys(){
        // for(let k in this.obj);
        //Object.getOwnPropertyNames(this.obj);
        return (Object.keys(this.obj));
    };
}

let drinkStorage=new LocStorageClass('drinks');
let dishStorage=new LocStorageClass('dishes');
//Чтобы понять к какой теме подтягивать нужный localStorage, передаем ключ в класс

let nam;
let alco;
let recipe;
function addDrink(){
    nam =prompt('Введите название напитка:'); 
    alco=confirm('Если напиток алкогольный, нажмите \”ОК\”, если безалкогольный, нажмите \”Отмена\”');
    recipe=prompt('Введите рецепт приготовления:');
    drinkStorage.addValue(nam, {alco: alco, recipe: recipe});
}

function getDrinkInfo(){
    nam=prompt('Введите название напитка:');
    let info=drinkStorage.getValue(nam);
    if (info){
    alert(
    `напиток ${nam}
алкогольный: ${(info.alco)?'да':'нет'}
рецепт приготовления: ${info.recipe}`)
    } else{
        alert ('Указаного напитка нету в списке рецептов!');
    }         
}

function deleteDrink(){
    nam =prompt('Введите название напитка:');
    if (drinkStorage.deleteValue(nam)){
        alert('Напиток успешно удален.');
    } else {
        alert ('Указаного напитка нету в списке рецептов!');
    }
}

function getDrinkName(){
    alert(drinkStorage.getKeys().map(v=>'  '+v));
}


//dish
let spicy;
function addDish(){
    nam =prompt('Введите название блюда:'); 
    spicy=confirm('Если блюдо острое, нажмите \”ОК\”, если не острое, нажмите \”Отмена\”');
    recipe=prompt('Введите рецепт приготовления:');
    dishStorage.addValue(nam, {spicy: spicy, recipe: recipe});
}

function getDishInfo(){
    nam=prompt('Введите название блюда:');
    let info=dishStorage.getValue(nam);
    if (info){
    alert(
    `блюдо ${nam}
острое: ${(info.spicy)?'да':'нет'}
рецепт приготовления: ${info.recipe}`)
    } else{
        alert ('Указаного блюда нету в списке рецептов!');
    }         
}

function deleteDish(){
    nam =prompt('Введите название блюда:');
    if (dishStorage.deleteValue(nam)){
        alert('Блюдо успешно удалено.');
    } else {
        alert ('Указаного блюда нету в списке рецептов!');
    }
}

function getDishName(){
    alert(dishStorage.getKeys().map(v=>'  '+v));
}  
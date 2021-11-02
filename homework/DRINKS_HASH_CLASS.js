'use strict'
class HashStorageClass {
    constructor (){
        this.obj={};
    }
    addValue(key, value){
        this.obj[key]=value;
        // не делаем return, т.к. мы ничего не возвращаем, а вносим данные в объект
        // return this.obj;
    }

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
            return (delete this.obj[key]);                 
        } else{
            return false;
        }
    }

    getKeys(){
        // for(let k in this.obj);
        //Object.getOwnPropertyNames(this.obj);
        return (Object.keys(this.obj));
    }
}

let drinkStorage=new HashStorageClass;

let nam;
let alco;
let recipe;
function addDrink(){
    nam =prompt('Введите название напитка:'); 
    alco=confirm('Если напиток алкогольный нажмите, нажмите \”ОК\”, если безалкогольный, нажмите \”Отмена\”');
    recipe=prompt('Введите рецепт приставления:');
    drinkStorage.addValue(nam, {alco: alco, recipe: recipe});
    // function Add(nam){
    // let self=this;
    // self.alco=confirm('Если напиток алкогольный нажмите, нажмите \”ОК\”, если безалкогольный, нажмите \”Отмена\”');
    // self.recipe=prompt('Введите рецепт приставления:');
    // }
    // let namObj=new Add(nam);
    // drinkStorage.addValue(nam, namObj);
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
//             let infoObj=drinkStorage.getValue(nam);
//             if (infoObj){
//             alert(
//             `напиток ${nam}
// алкогольный: ${(infoObj.alco)?'да':'нет'}
// рецепт приготовления: ${infoObj.recipe}`)
//             } else{
//                 alert ('Указаного напитка нету в списке рецептов!');
//             }          
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
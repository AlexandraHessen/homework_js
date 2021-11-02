'use strict'
function HashStorageFunc(){
    const self=this;
    let obj={};
    
    self.addValue=function (key,value){
        obj[key]=value;
        // не делаем return, т.к. мы ничего не возвращаем, а вносим данные в объект
        // return this.obj;
    };
    // ставить ;
    self.getValue=function(key){
        return obj[key];
        // можно не проверять ключ, а просто написать return obj[key]; 
        // если обратиться к несуществующему ключу в объекте, то нам вернуться undefined
        // т.е. тоже самое если бы мы ставили проверку и писали раздельно

        // if (key in obj){
        //     return (obj[key]);
        // }
        // return;

        // не писать так
        // else{
        //     return false;
        // }
    };

    self.deleteValue=function(key){
        if (key in obj){
            return (delete obj[key]);
        } else{
            return false;
        }
    };

    self.getKeys=function(){
        // for(let k in obj);
        //Object.getOwnPropertyNames(obj);
        return (Object.keys(obj));
    };
}

let drinkStorage = new HashStorageFunc();

let nam;
function addDrink(){
    nam =prompt('Введите название напитка:'); 
    // ВЕРНО
    // alco=confirm('Если напиток алкогольный, нажмите \”ОК\”, если безалкогольный, нажмите \”Отмена\”');
    // recipe=prompt('Введите рецепт приготовления:');
    // drinkStorage.addValue(nam, {alco: alco, recipe: recipe});
    function Add(nam){
    let self=this;
    self.alco=confirm('Если напиток алкогольный нажмите, нажмите \”ОК\”, если безалкогольный, нажмите \”Отмена\”');
    self.recipe=prompt('Введите рецепт приставления:');
    }
    let namObj=new Add(nam);
    drinkStorage.addValue(nam, namObj);
}

function getDrinkInfo(){
    nam=prompt('Введите название напитка:');
    let infoObj=drinkStorage.getValue(nam);
    if (infoObj){
    alert(
    `напиток ${nam}
алкогольный: ${(infoObj.alco)?'да':'нет'}
рецепт приготовления: ${infoObj.recipe}`)
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

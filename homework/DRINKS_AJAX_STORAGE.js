'use strict'
        let ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
        let updatePassword;
        let stringName='yakovleva_drinks';
        let dataAjax;
        class AJAXStorage{
            constructor (){ 
                dataAjax={};
                function restoreInfo() {
                    $.ajax(
                        {
                            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                            data : { f : 'READ', n : stringName },
                            success : readReady, error : errorHandler
                        }
                    );
                }

                function readReady(callresult) {
                    if ( callresult.error!=undefined )
                        alert(callresult.error);
                    else {
                        dataAjax={};
                        if ( callresult.result!="" ) {
                            dataAjax=JSON.parse(callresult.result);
                        } 
                    }
                }


                function errorHandler(jqXHR,statusStr,errorStr) {
                    alert(statusStr+' '+errorStr);
                }

                restoreInfo();
                
            }

            store(info){
                function storeInfo(info) {
                    updatePassword=Math.random();
                    $.ajax( {
                    url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                    data : { f : 'LOCKGET', n : stringName, p : updatePassword },
                    success : lockGetReady, error : errorHandler
                        }
                    );
                }
                function lockGetReady(callresult) {
                    if ( callresult.error!=undefined )
                        alert(callresult.error);
                    else {
                        $.ajax( {
                            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                            data : { f : 'UPDATE', n : stringName, v : info, p : updatePassword },
                            success : updateReady, error : errorHandler
                        }
                        );
                    }
                    }
                function updateReady(callresult) {
                    if ( callresult.error!=undefined )
                        alert(callresult.error);
                }
                function errorHandler(jqXHR,statusStr,errorStr) {
                    alert(statusStr+' '+errorStr);
                }
                storeInfo(info);
            }

            addValue(key, value){
                dataAjax[key]=value;
                let info=JSON.stringify(dataAjax);
                this.store(info);
                // не делаем return, т.к. мы ничего не возвращаем, а вносим данные в объект
                // return dataAjax;
            };

            getValue(key){
                return dataAjax[key];

                // можно не проверять ключ, а просто написать return dataAjax[key]; 
                // если обратиться к несуществующему ключу в объекте, то нам вернуться undefined
                // т.е. тоже самое если бы мы ставили проверку и писали раздельно

                // if (key in dataAjax){
                //     return dataAjax[key];
                // } 
                // return;

                // не писать так
                // else{
                //     return false;
                // }
            };

            deleteValue(key){
                if (key in dataAjax){
                    delete dataAjax[key]
                    let info=JSON.stringify(dataAjax);
                    this.store(info);
                    return true;                 
                } else{
                    return false;
                }
            };
            
            getKeys(){
                return (Object.keys(dataAjax));
            };
        }

        let drinkStorage=new AJAXStorage();

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
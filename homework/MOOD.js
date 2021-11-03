"use strict";
function randomDiap(n,m) {
        return Math.floor(Math.random()*(m-n+1))+n;
}
function mood(count) {
    const colors=[ '', 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый' ];
    console.log( 'цветов: ' + count );
    let obj={}; 
        for ( let i=1; Object.keys(obj).length<count; i++ ) { 
        let n=randomDiap(1,7);
        if (colors[n] in obj) 
            continue; 
        obj[colors[n]]=true; 
        console.log(colors[n]);
    }
    }
    
mood(3);

// function mood(count) {
//     const colors=[ '', 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый' ];
//     console.log( 'цветов: ' + count ); //цветов: 3   просто запись 
//     let obj={}; //используем свойство объекта, что не может быть два одинаковых ключа, поэтому создаем пустой объект в котором не будет повторов
//         for ( let i=1; Object.keys(obj).length<count; i++ ) { //перебираем последовательно сколько цветов нужно, при этом так чтобы длинна объекта была равна нужному количеству цветов
//            //длина объекта только Object.keys(obj).length, просто .length не получится
//         let n=randomDiap(1,7); // рандомно при помощи функции перебераем индексы - номера цветов в массиве
//         if (colors[n] in obj) //проверяем есть ли цвет в объекте, colors[n] = colors[1] = 'красный' значение в массиве по индексу arr[i]=значение которое видим 
//             continue; // пропускаем если уже есть такой цвет
//         obj[colors[n]]=true; //если нет, то вносим новый цвет  в объект присваиваем true для чтобы было какое-то значение (можно любое)
//                              [] лучше чем точка чтобы не было ошибок 
//         console.log(colors[n]);
//     }
//     }
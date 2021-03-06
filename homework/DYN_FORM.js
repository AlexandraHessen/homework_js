'use strict'
var formDef1=
    [
    {label:'Название сайта:',kind:'longtext',name:'sitename'},
    {label:'URL сайта:',kind:'longtext',name:'siteurl'},
    {label:'Посетителей в сутки:',kind:'number',name:'visitors'},
    {label:'E-mail для связи:',kind:'shorttext',name:'email'},
    {label:'Рубрика каталога:',kind:'combo',name:'division',
        variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
    {label:'Размещение:',kind:'radio',name:'payment',
        variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
    {label:'Разрешить отзывы:',kind:'check',name:'votes'},
    {label:'Описание сайта:',kind:'memo',name:'description'},
    {label:'Опубликовать:',kind:'submit'},
    ];
    
var formDef2=
    [
    {label:'Фамилия:',kind:'longtext',name:'lastname'},
    {label:'Имя:',kind:'longtext',name:'firstname'},
    {label:'Отчество:',kind:'longtext',name:'secondname'},
    {label:'Возраст:',kind:'number',name:'age'},
    {label:'Зарегистрироваться:',kind:'submit'},
    ];
function dynForm (frm, arr){
    for (let i=0; i<arr.length; i++){
        let label;
        let labelText;
        if(arr[i].kind!='submit'){
        label=document.createElement('label');
        labelText=document.createTextNode(arr[i].label);
        label.appendChild(labelText);
        }
        let nam=tag=>tag.name=arr[i].name;
        let variants=arr[i].variants;
        let input;

        switch (arr[i].kind){
            case 'longtext':
            case 'number':
            case 'shorttext':
                // три кейса работают одинаково
                arr[i].kind='text';
                input=document.createElement('input');
                input.type=arr[i].kind;
                nam(input);
                label.appendChild(input);
            break;

            case 'check':
                arr[i].kind='checkbox'
                input=document.createElement('input');
                input.type=arr[i].kind;
                nam(input);
                label.appendChild(input);
            break;

            case 'combo':
                let select=document.createElement('select');
                nam(select);
                for(let i=0; i<variants.length; i++){
                    let option=document.createElement('option');
                    option.value=variants[i].value;
                    let optionText=document.createTextNode(variants[i].text);
                    option.appendChild(optionText);  
                    select.appendChild(option);                    
                }     
                label.appendChild(select);                  
            break;

            case 'radio':
                for(let i=0; i<variants.length; i++){
                    let labelRadio=document.createElement('label')
                    input=document.createElement('input');
                    input.type='radio';
                    nam(input);
                    input.value=variants[i].value;
                     let radioText=document.createTextNode(variants[i].text);
                     input.appendChild(radioText); 
                    labelRadio.appendChild(input);   
                    labelRadio.appendChild(radioText);
                    label.appendChild(labelRadio);
                } 
            break;

            case 'memo':
                let textarea=document.createElement('textarea');                  
                nam (textarea);
                label.appendChild(textarea);
            break;

            case 'submit':
                input=document.createElement('input');
                input.type=arr[i].kind;
                input.value=(arr[i].label.replace(':', ''));
                frm.appendChild(input);
            break;

        }
        
        let br=document.createElement('br');
        if(arr[i].kind!='submit'){
            frm.appendChild(label);
        }
     
        frm.appendChild(br);
    }

    return frm;
}

dynForm(document.forms['form1'], formDef1)
dynForm(document.forms['form2'], formDef2)

// ВСЕГДА ДЕЛАТЬ ЧЕРЕЗ LABEL FOR!!!
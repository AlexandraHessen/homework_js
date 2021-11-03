'use strict'
//загружаем массивы через ajax
// отдельно создаем файл с jsonом этого массива с разширением json
// подключаем через ajax dataType:'json'

$.ajax('json1.json',
{type:'GET', dataType:'json', success: dataLoaded, error:errorHandler}
);

function dataLoaded(data){
    let formDef1=data;
    dynForm(document.forms['form1'], formDef1);
}


$.ajax('json2.json',
{type:'GET', dataType:'json', success: dataLoaded2, error:errorHandler}
);

function dataLoaded2(data){
    let formDef2=data;
    dynForm(document.forms['form2'], formDef2);
}

function errorHandler(jqXHR,statusStr,errorStr) {
alert(statusStr+' '+errorStr);
}

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
// <!-- ВСЕГДА ДЕЛАТЬ ЧЕРЕЗ LABEL FOR!!! -->
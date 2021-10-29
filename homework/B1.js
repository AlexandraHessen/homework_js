let yearPl=parseInt(prompt('Введите год:'));
let getCentury=year=>Math.ceil(year/100);
alert(`${yearPl} год - ${getCentury(yearPl)} век`);
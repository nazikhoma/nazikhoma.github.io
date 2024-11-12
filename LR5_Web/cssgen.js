function generate() {
    var rtl = document.getElementById('rtl').value;
    var rtr = document.getElementById('rtr').value;
    var rbr = document.getElementById('rbr').value;
    var rbl = document.getElementById('rbl').value;

    var ttl = document.getElementById('ttl');
    var ttr = document.getElementById('ttr');
    var tbr = document.getElementById('tbr');
    var tbl = document.getElementById('tbl');

    var block = document.getElementById('block');
    var cssOutput = document.getElementById('cssOutput');

    ttl.value = rtl;
    ttr.value = rtr;
    tbr.value = rbr;
    tbl.value = rbl;

    var borderRadius = `${rtl}px ${rtr}px ${rbr}px ${rbl}px`;
    block.style.borderRadius = borderRadius;

    cssOutput.value = `border-radius: ${borderRadius};`;
}


var tab;
var tabContent;

window.onload=function() {
    tabContent=document.getElementsByClassName('tabContent');
    tab=document.getElementsByClassName('tab');
    hideTabsContent(1);
}

function hideTabsContent(a) {
    for (var i = a; i < tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add("hide");
        tab[i].classList.remove('whiteborder');
    }
}

function showTabsContent(b){
    if (tabContent[b].classList.contains('hide')) {
        hideTabsContent(0);
        tab[b].classList.add('whiteborder');
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
    }
}

document.getElementById('tabs').onclick=function (event) {
    var target=event.target;
    if (target.className== 'tab') {
        for (var i=0; i<tab.length; i++) {
            if (target== tab[i]) {
                showTabsContent(i);
                break;
            }}}}

function updateIndent() {
    const indentValue = document.getElementById('indentRange').value;
    const textBlock = document.getElementById('textBlock');
    const output = document.getElementById('indentCSSOutput');

    // Застосування стилю text-indent
    textBlock.style.textIndent = `${indentValue}px`;

    // Виведення значення у текстове поле
    document.getElementById('indentValue').value = indentValue;
    output.value = `text-indent: ${indentValue}px;`;
}

function updateShadow() {
    const shadowX = document.getElementById('shadowXRange').value;
    const shadowY = document.getElementById('shadowYRange').value;
    const shadowBlur = document.getElementById('shadowBlurRange').value;
    const shadowColor = document.getElementById('shadowColorPicker').value;

    const shadowBlock = document.getElementById('shadowBlock');
    const output = document.getElementById('shadowCSSOutput');

    // Застосування стилю text-shadow
    const textShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowColor}`;
    shadowBlock.style.textShadow = textShadow;

    // Оновлення значень в текстових полях
    document.getElementById('shadowXValue').value = shadowX;
    document.getElementById('shadowYValue').value = shadowY;
    document.getElementById('shadowBlurValue').value = shadowBlur;

    output.value = `text-shadow: ${textShadow};`;
}

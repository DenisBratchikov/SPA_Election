"use strict"
// Нативный JavaScript
window.onload = function() {
    let crimeDone = false,
        skinColor = document.querySelectorAll('.skin-color'),
        hairStyle = document.querySelectorAll('.hair-style'),
        clothesStyle = document.querySelectorAll('.clothes-style'),
        personSkin = document.querySelector('.custom-char .person-skin'),
        personHair = document.querySelector('.custom-char .person-hair'),
        personClothes = document.querySelector('.custom-char .person-clothes'),
        isFemale = false,
        iSkin = 0, // Счетчик для слайдера цветов кожи
        iHair = 0, // Счетчик для слайдера прически
        iClothes = 0, // Счетчик для слайдера одежды
        maxVote = 0; // Переменная для кнопок "Провести честное голосование" и "Вмешаться в выборы"
    
    //
    // Событие клика на кнопку модального окна
    //
    document.querySelector('#popup-btn').onclick = function() {
        // Создание карточки персонажа
        let mainDiv = document.createElement('div');
        mainDiv.classList.add('main-cards-item', 'custom-candidate');
        mainDiv.innerHTML = '<div class="candidate-block"><div class="photo"><div class="person construct"><div id="person-skin" class="person-skin"></div><div id="person-clothes" class="person-clothes"></div><div id="person-hair" class="person-hair"></div><div class="person-shoes"></div></div></div><div class="result"><div class="result-count">0%</div><div class="progress"><div class="progress-bar progress-bar-3"></div></div></div></div><div class="name"></div><div class="age"> лет</div>Пол:<div class="sex">$</div>Полит. взгляды:<div class="views"></div>Биография<div class="bio"></div>';
        document.querySelector('.main-cards').appendChild(mainDiv);
        
        document.querySelector('.overlay').style.display = 'none';
        document.querySelector('.main').style.display = 'none';
        
        // Анимирование блоков кастомизации персонажа
        document.querySelector('.custom').style.display = 'flex';
        document.querySelector('.custom-info').style.display = 'inline';
        document.querySelector('.custom-char').style.display = 'inline';
        document.querySelector('.custom-style').style.display = 'inline';       document.querySelector('.custom-info').classList.add('flipInY', 'animated');
        document.querySelector('.custom-char').classList.add('zoomIn', 'animated');
        document.querySelector('.custom-style').classList.add('flipInY', 'animated');
    };
    
    //
    // Запрет ввода невалидной информации в поля input (ФИО и возраст)
    //
    document.querySelector('.custom #name').onkeypress = function(event) {
        let w = event.which;
        if (w < 32 || (w > 32 && w < 65) || (w > 90 && w < 97) || (w > 122 && w < 1025)
            || (w > 1025 && w < 1040) || (w > 1103 && w < 1105) || (w > 1105)) {
            event.preventDefault();
        }
    };
    document.querySelector('.custom #age').onkeypress = function(event) {
        let w = event.which;
        if (w < 48 || w > 57) {
            event.preventDefault();
        }
    };
    
    //
    // Изменение картинки персонажа в зависимости от выбранного пола
    //
    document.querySelector('.custom .radio').onchange = function() {
        isFemale = !isFemale;
        
        for (let i = 0; i < skinColor.length; i++) {
            skinColor[i].style.display = 'none';
        }
        for (let i = 0; i < hairStyle.length; i++) {
            hairStyle[i].style.display = 'none';
            clothesStyle[i].style.display = 'none';
        }
        skinColor[0].style.display = 'block';
        iSkin = 0; // Обнуление счетчика для слайдера цветов кожи
        
        if (isFemale) {
            personSkin.style.background = 'url(img/skin/skin-4.png) center / cover no-repeat';
            personHair.style.background = 'url(img/hair/construct/hair-4.png) center / cover no-repeat';
            personClothes.style.background = 'url(img/clothes/construct/clothes-4.png) center / cover no-repeat';
            hairStyle[3].style.display = 'block';
            clothesStyle[3].style.display = 'block';
            iHair = 3; // Задание начального значения счетчику слайдера прически
            iClothes = 3; // Задание начального значения счетчику слайдера одежды
        } else {
            personSkin.style.background = 'url(img/skin/skin-1.png) center / cover no-repeat';
            personHair.style.background = 'url(img/hair/construct/hair-1.png) center / cover no-repeat';
            personClothes.style.background = 'url(img/clothes/construct/clothes-1.png) center / cover no-repeat';
            hairStyle[0].style.display = 'block';
            clothesStyle[0].style.display = 'block';
            iHair = 0; // Задание начального значения счетчику слайдера прически
            iClothes = 0; // Задание начального значения счетчику слайдера одежды
        }
    };
    
    //
    // Настройка слайдера цветов кожи
    //
    document.querySelector('.skin .next').onclick = function() {
        let val = (isFemale) ? 3 : 0;
        skinColor[iSkin].style.display = 'none';
        iSkin++;
        if (iSkin >= skinColor.length) {
                iSkin = 0;
        }
        skinColor[iSkin].style.display = 'block';
        personSkin.style.background = `url(img/skin/skin-${iSkin+val+1}.png) center / cover no-repeat`;
    };
    document.querySelector('.skin .prev').onclick = function() {
        let val = (isFemale) ? 3 : 0;
        skinColor[iSkin].style.display = 'none';
        iSkin--;
        if (iSkin < 0) {
            iSkin = skinColor.length - 1;
        }
        skinColor[iSkin].style.display = 'block';
        personSkin.style.background = `url(img/skin/skin-${iSkin+val+1}.png) center / cover no-repeat`;
    };
    
    //
    // Настройка слайдера прически
    //
    document.querySelector('.hair .next').onclick = function() {
        let val = (isFemale) ? 3 : 0;
        hairStyle[iHair].style.display = 'none';
        iHair++;
        if (iHair >= hairStyle.length - (3 - val)) {
            iHair = val;
        }
        hairStyle[iHair].style.display = 'block';
        personHair.style.background = `url(img/hair/construct/hair-${iHair+1}.png) center / cover no-repeat`;
    };
    document.querySelector('.hair .prev').onclick = function() {
        let val = (isFemale) ? 3 : 0;
        hairStyle[iHair].style.display = 'none';
        iHair--;
        if (iHair < val) {
            iHair = hairStyle.length - 1 - (3 - val);
        }
        hairStyle[iHair].style.display = 'block';
        personHair.style.background = `url(img/hair/construct/hair-${iHair+1}.png) center / cover no-repeat`;
    };
    
    //
    // Настройка слайдера одежды
    //
    document.querySelector('.clothes .next').onclick = function() {
        let val = (isFemale) ? 3 : 0;
        clothesStyle[iClothes].style.display = 'none';
        iClothes++;
        if (iClothes >= clothesStyle.length - (3 - val)) {
            iClothes = val;
        }
        clothesStyle[iClothes].style.display = 'block';
        personClothes.style.background = `url(img/clothes/construct/clothes-${iClothes+1}.png) center / cover no-repeat`;
    };
    document.querySelector('.clothes .prev').onclick = function() {
        let val = (isFemale) ? 3 : 0;
        clothesStyle[iClothes].style.display = 'none';
        iClothes--;
        if (iClothes < val) {
            iClothes = clothesStyle.length - 1 - (3 - val);
        }
        clothesStyle[iClothes].style.display = 'block';
        personClothes.style.background = `url(img/clothes/construct/clothes-${iClothes+1}.png) center / cover no-repeat`;
    };
    
    //
    // Событие нажатия на кнопку "Готово" после кастомизации персонажа
    //
    document.querySelector('#ready').onclick = function() {
        let name = document.querySelector('.custom #name'),
            age = document.querySelector('.custom #age'),
            sex = document.querySelector('.custom .radio input:checked'),
            views = document.querySelector('#select'),
            bio = document.querySelector('.custom #bio'),
            skin = window.getComputedStyle(document.querySelector('.custom-char .person-skin')).background,
            hair = window.getComputedStyle(document.querySelector('.custom-char .person-hair')).background,
            clothes = window.getComputedStyle(document.querySelector('.custom-char .person-clothes')).background,
            resultCount = document.querySelectorAll('.result-count');
        
        // Заполнение карточки персонажа
        document.querySelector('.custom-candidate .name').textContent = name.value;
        document.querySelector('.custom-candidate .age').textContent = age.value;
        document.querySelector('.custom-candidate .sex').textContent = sex.value;
        document.querySelector('.custom-candidate .views').textContent = views.options[views.selectedIndex].value;
        document.querySelector('.custom-candidate .bio').textContent = bio.value;
        document.querySelector('.main-cards-item .candidate-block .person-skin').style.background = skin;
        document.querySelector('.main-cards-item .candidate-block .person-hair').style.background = hair;
        document.querySelector('.main-cards-item .candidate-block .person-clothes').style.background = clothes;
        
        // Настройка анимации выхода карточек персонажей
        document.querySelector('.custom').style.display = 'none';
        document.querySelector('.main').style.display = 'block';
        document.querySelector('.main-cards-item:nth-of-type(1)').classList.add('slideInLeft', 'animated');
        document.querySelector('.main-cards-item:nth-of-type(2)').classList.add('slideInDown', 'animated');
        document.querySelector('.main-cards-item:nth-of-type(3)').classList.add('slideInRight', 'animated');
        document.querySelector('.progress-bar-1').style.height = '0%';
        document.querySelector('.progress-bar-2').style.height = '0%';
        for (let i = 0; i < resultCount.length; i++) {
            resultCount[i].textContent = '0%';
        }
    };
    
    //
    // Событие нажатия на кнопку "Сбросить результаты"
    //
    document.querySelector('#reset').onclick = function() {
        document.querySelector('.custom').style.display = 'flex';
        document.querySelector('.main').style.display = 'none';
    };
    
    //
    // Событие нажатия на кнопку "Провести честное голосование"
    //
    document.querySelector('#voting').onclick = function() {
        let n1 = Math.floor(Math.random()*100),
            n2 = Math.floor(Math.random()*100),
            arr = [],
            arrHeights = [];
        
        if (n1 < n2) {
            arr[0] = n1;
            arr[1] = n2;
        } else {
            arr[0] = n2;
            arr[1] = n1;
        }
        arrHeights = [arr[0], arr[1] - arr[0], 100 - arr[1]];
        maxVote = Math.max.apply(null, arrHeights);
        
        for (let i = 0; i < arrHeights.length; i++) {
            document.querySelector(`.main-cards-item:nth-child(${i+1}) .result-count`).textContent = arrHeights[i] + '%';
            document.querySelector(`.progress-bar-${i+1}`).style.height = arrHeights[i] + '%';
            
            document.querySelector(`.main-cards-item:nth-child(${i+1})`).classList.remove('main-cards-item-active');
            if (arrHeights[i] == maxVote) {
                document.querySelector(`.main-cards-item:nth-child(${i+1})`).classList.add('main-cards-item-active');
            }
        }
        
        crimeDone = false;
        document.querySelector('#crime').classList.remove('zoomOut');
        document.querySelector('#crime').classList.add('zoomIn');
        document.querySelector('#crime').style.cursor = 'pointer';
    };
    
    //
    // Событие нажатия на кнопку "Вмешаться в выборы"
    //
    document.querySelector('#crime').onclick = function() {
        if (!crimeDone) {
            let currentHeight = document.querySelector('.main-cards-item:nth-child(3) .result-count').textContent;
            
            currentHeight = parseInt(currentHeight) + 25;
            if (currentHeight >= 100) {
                currentHeight = 100;
            }
            if (currentHeight > maxVote) {
                document.querySelector('.main-cards-item:nth-child(1)').classList.remove('main-cards-item-active');
                document.querySelector('.main-cards-item:nth-child(2)').classList.remove('main-cards-item-active');
                document.querySelector('.main-cards-item:nth-child(3)').classList.add('main-cards-item-active');
            }
            
            document.querySelector('.main-cards-item:nth-child(3) .result-count').textContent = currentHeight + '%';
            document.querySelector('.progress-bar-3').style.height = currentHeight + '%';
            
            document.querySelector('#crime').classList.remove('zoomIn');
            document.querySelector('#crime').classList.add('animated', 'zoomOut');
            document.querySelector('#crime').style.cursor = 'default';
        }
        
        crimeDone = true;
    }
    
};
























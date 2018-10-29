"use strict"
// JQuery
$(function() {
    let crimeDone = false,
        skinColor = $('.skin-color'),
        hairStyle = $('.hair-style'),
        clothesStyle = $('.clothes-style'),
        personSkin = $('.custom-char .person-skin'),
        personHair = $('.custom-char .person-hair'),
        personClothes = $('.custom-char .person-clothes'),
        isFemale = false,
        iSkin = 0, // Счетчик для слайдера цветов кожи
        iHair = 0, // Счетчик для слайдера прически
        iClothes = 0, // Счетчик для слайдера одежды
        maxVote = 0; // Переменная для кнопок "Провести честное голосование" и "Вмешаться в выборы"
    
    //
    // Событие клика на кнопку модального окна
    //
    $('#popup-btn').on('click', function() {
        // Создание карточки персонажа
        let mainDiv = document.createElement('div');
        mainDiv.classList.add('main-cards-item', 'custom-candidate');
        mainDiv.innerHTML = `<div class="candidate-block"><div class="photo"><div class="person construct"><div id="person-skin" class="person-skin"></div><div id="person-clothes" class="person-clothes"></div><div id="person-hair" class="person-hair"></div><div class="person-shoes"></div></div></div><div class="result"><div class="result-count">0%</div><div class="progress"><div class="progress-bar progress-bar-3"></div></div></div></div><div class="name"></div><div class="age"> лет</div>Пол:<div class="sex">$</div>Полит. взгляды:<div class="views"></div>Биография<div class="bio"></div>`;
        $('.main-cards').append(mainDiv);
        
        $('.overlay').css('display', 'none');
        $('.main').css('display', 'none');
        
        // Анимирование блоков кастомизации персонажа
        $('.custom').css('display', 'flex');
        $('.custom-info').css('display', 'inline');
        $('.custom-char').css('display', 'inline');
        $('.custom-style').css('display', 'inline');
        $('.custom-info').addClass('flipInY animated');
        $('.custom-char').addClass('zoomIn animated');
        $('.custom-style').addClass('flipInY animated');
    });
    
    //
    // Запрет ввода невалидной информации в поля input (ФИО и возраст)
    //
    $('.custom #name').on('keypress', function(event) {
        let w = event.which;
        if (w < 32 || (w > 32 && w < 65) || (w > 90 && w < 97) || (w > 122 && w < 1025)
            || (w > 1025 && w < 1040) || (w > 1103 && w < 1105) || (w > 1105)) {
            event.preventDefault();
        }
    });
    $('.custom #age').on('keypress', function(event) {
        let w = event.which;
        if (w < 48 || w > 57) {
            event.preventDefault();
        }
    });
    
    //
    // Изменение картинки персонажа в зависимости от выбранного пола
    //
    $('.custom .radio input').on('change', function() {
        isFemale = !isFemale;
        
        skinColor.css('display', 'none');
        hairStyle.css('display', 'none');
        clothesStyle.css('display', 'none');
        skinColor[0].style.display = 'block';
        iSkin = 0; // Обнуление счетчика для слайдера цветов кожи
        
        if (isFemale) {
            personSkin.css('background', `url(img/skin/skin-4.png) center / cover no-repeat`);
            personHair.css('background', `url(img/hair/construct/hair-4.png) center / cover no-repeat`);
            personClothes.css('background', `url(img/clothes/construct/clothes-4.png) center / cover no-repeat`);
            hairStyle[3].style.display = 'block';
            clothesStyle[3].style.display = 'block';
            iHair = 3; // Задание начального значения счетчику слайдера прически
            iClothes = 3; // Задание начального значения счетчику слайдера одежды
        } else {
            personSkin.css('background', `url(img/skin/skin-1.png) center / cover no-repeat`);
            personHair.css('background', `url(img/hair/construct/hair-1.png) center / cover no-repeat`);
            personClothes.css('background', `url(img/clothes/construct/clothes-1.png) center / cover no-repeat`);
            hairStyle[0].style.display = 'block';
            clothesStyle[0].style.display = 'block';
            iHair = 0; // Задание начального значения счетчику слайдера прически
            iClothes = 0; // Задание начального значения счетчику слайдера одежды
        }
    });
    
    //
    // Настройка слайдера цветов кожи
    //
    $('.skin .next').on('click', function() {
        let val = (isFemale) ? 3 : 0;
        skinColor[iSkin].style.display = 'none';
        iSkin++;
        if (iSkin >= skinColor.length) {
                iSkin = 0;
        }
        skinColor[iSkin].style.display = 'block';
        personSkin.css('background', `url(img/skin/skin-${iSkin+val+1}.png) center / cover no-repeat`);
    });
    $('.skin .prev').on('click', function() {
        let val = (isFemale) ? 3 : 0;
        skinColor[iSkin].style.display = 'none';
        iSkin--;
        if (iSkin < 0) {
            iSkin = skinColor.length - 1;
        }
        skinColor[iSkin].style.display = 'block';
        personSkin.css('background', `url(img/skin/skin-${iSkin+val+1}.png) center / cover no-repeat`);
    });
    
    //
    // Настройка слайдера прически
    //
    $('.hair .next').on('click', function() {
        let val = (isFemale) ? 3 : 0;
        hairStyle[iHair].style.display = 'none';
        iHair++;
        if (iHair >= hairStyle.length - (3 - val)) {
            iHair = val;
        }
        hairStyle[iHair].style.display = 'block';
        personHair.css('background', `url(img/hair/construct/hair-${iHair+1}.png) center / cover no-repeat`);
    });
    $('.hair .prev').on('click', function() {
        let val = (isFemale) ? 3 : 0;
        hairStyle[iHair].style.display = 'none';
        iHair--;
        if (iHair < val) {
            iHair = hairStyle.length - 1 - (3 - val);
        }
        hairStyle[iHair].style.display = 'block';
        personHair.css('background', `url(img/hair/construct/hair-${iHair+1}.png) center / cover no-repeat`);
    });
    
    //
    // Настройка слайдера одежды
    //
    $('.clothes .next').on('click', function() {
        let val = (isFemale) ? 3 : 0;
        clothesStyle[iClothes].style.display = 'none';
        iClothes++;
        if (iClothes >= clothesStyle.length - (3 - val)) {
            iClothes = val;
        }
        clothesStyle[iClothes].style.display = 'block';
        personClothes.css('background', `url(img/clothes/construct/clothes-${iClothes+1}.png) center / cover no-repeat`);
    });
    $('.clothes .prev').on('click', function() {
        let val = (isFemale) ? 3 : 0;
        clothesStyle[iClothes].style.display = 'none';
        iClothes--;
        if (iClothes < val) {
            iClothes = clothesStyle.length - 1 - (3 - val);
        }
        clothesStyle[iClothes].style.display = 'block';
        personClothes.css('background', `url(img/clothes/construct/clothes-${iClothes+1}.png) center / cover no-repeat`);
    });
    
    
//    function Slider(slides, prev, next, candidateStyle, mask, countStart) {
//        let slider = this,
//            c = countStart;
//        slider.slides = slides;
//        slider.prev = $(prev);
//        slider.next = $(next);
//        slider.candidateStyle = candidateStyle;
//        
//        slider.prev.on('click', function(){
//            if (isFemale && countStart == 0 || !isFemale && countStart == 3) {
//                return;
//            }
//            slider.slides.css('display', 'none');
//            c--;
//            if (c < countStart) {
//                c = slider.slides.length - 1 - (3 - countStart);
//            }
//            slider.slides[c].style.display = 'block';
//            slider.candidateStyle.css('background', `url(img/${mask}/construct/${mask}-${c+1}.png) center / cover no-repeat`);
//        });
//        
//        slider.next.on('click', function(){
//            if (isFemale && countStart == 0 || !isFemale && countStart == 3) {
//                return;
//            }
//            slider.slides.css('display', 'none');
//            c++;
//            if (c >= (slides.length - (3 - countStart))) {
//                c = countStart;
//            }
//            slider.slides[c].style.display = 'block';
//            slider.candidateStyle.css('background', `url(img/${mask}/construct/${mask}-${c+1}.png) center / cover no-repeat`);
//        });
//    }
//    
//    let hairSliderMale = new Slider(hairStyle, '.hair .prev', '.hair .next', personHair, 'hair', 0),
//        clothesSliderMale = new Slider(clothesStyle, '.clothes .prev', '.clothes .next', personClothes, 'clothes', 0),
//        hairSlideFemale = new Slider(hairStyle, '.hair .prev', '.hair .next', personHair, 'hair', 3),
//        clothesSliderFemale = new Slider(clothesStyle, '.clothes .prev', '.clothes .next', personClothes, 'clothes', 3); 
    
    
//    function nextSlide(iCount, slides, callback) {
//        if (isFemale) {
//            slides[iCount].style.display = 'none';
//            iCount++;
//            if (iCount >= slides.length) {
//                iCount = 3;
//            }
//            slides[iCount].style.display = 'block';
//        } else {
//            slides[iCount].style.display = 'none';
//            iCount++;
//            if (iCount >= slides.length - 3) {
//                iCount = 0;
//            }
//            slides[iCount].style.display = 'block';
//        }
//        callback();
//    }
//    function prevSlide(slides, callback) {
//        if (isFemale) {
//            slides[j].style.display = 'none';
//            j--;
//            if (j < 3) {
//                j = slides.length - 1;
//            }
//            slides[j].style.display = 'block';
//        } else {
//            slides[j].style.display = 'none';
//            j--;
//            if (j < 0) {
//                j = slides.length - 4;
//            }
//            slides[j].style.display = 'block';
//        }
//        callback();
//    }
//    $('.hair .next').on('click', function() {
//        nextSlide(iHair, hairStyle, function() {
//            personHair.css('background', `url(img/hair/construct/hair-${iHair+1}.png) center / cover no-repeat`);
//            console.log(iHair);
//        });
//    });
//    $('.clothes .next').on('click', function() {
//        nextSlide(iClothes, clothesStyle, function() {
//            personClothes.css('background', `url(img/clothes/construct/clothes-${iClothes+1}.png) center / cover no-repeat`);
//        });
//    });
//    $('.hair .prev').on('click', function() {
//        prevSlide(hairStyle, function() {
//            personHair.css('background', `url(img/hair/construct/hair-${j+1}.png) center / cover no-repeat`);
//        });
//    });
//    $('.clothes .prev').on('click', function() {
//        prevSlide(clothesStyle, function() {
//            personClothes.css('background', `url(img/clothes/construct/clothes-${j+1}.png) center / cover no-repeat`);
//        });
//    });
    
    
    
    
    
    //
    // Событие нажатия на кнопку "Готово" после кастомизации персонажа
    //
    $('#ready').on('click', function() {
        let name = $('.custom #name'),
            age = $('.custom #age'),
            sex = $('.custom .radio input:checked'),
            views = $('#select option:selected'),
            bio = $('.custom #bio'),
            skin = $('.custom-char .person-skin').css('background'),
            hair = $('.custom-char .person-hair').css('background'),
            clothes = $('.custom-char .person-clothes').css('background');
        
        // Заполнение карточки персонажа
        $('.custom-candidate .name').text(name.val());
        $('.custom-candidate .age').text(age.val());
        $('.custom-candidate .sex').text(sex.val());
        $('.custom-candidate .views').text(views.val());
        $('.custom-candidate .bio').text(bio.val());
        $('.main-cards-item .candidate-block .person-skin').css('background', skin);
        $('.main-cards-item .candidate-block .person-hair').css('background', hair);
        $('.main-cards-item .candidate-block .person-clothes').css('background', clothes);
        
        // Настройка анимации выхода карточек персонажей
        $('.custom').css('display', 'none');
        $('.main').css('display', 'block');
        $('.main-cards-item:first').addClass('slideInLeft animated');
        $('.main-cards-item:nth-of-type(2)').addClass('slideInDown animated');
        $('.main-cards-item:last').addClass('slideInRight animated');
        $('.result-count').text('0%');
        $('.progress-bar-1').css('height', '0%');
        $('.progress-bar-2').css('height', '0%');
    });
    
    //
    // Событие нажатия на кнопку "Сбросить результаты"
    //
    $('#reset').on('click', function() {
        $('.custom').css('display', 'flex');
        $('.main').css('display', 'none');
    });
    
    //
    // Событие нажатия на кнопку "Провести честное голосование"
    //
    $('#voting').on('click', function() {
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
            $(`.main-cards-item:nth-child(${i+1}) .result-count`).text(arrHeights[i] + '%');
            $(`.progress-bar-${i+1}`).css('height', arrHeights[i] + '%');
            
            $(`.main-cards-item:nth-child(${i+1})`).removeClass('main-cards-item-active');
            if (arrHeights[i] == maxVote) {
                $(`.main-cards-item:nth-child(${i+1})`).addClass('main-cards-item-active');
            }
        }
        
        crimeDone = false;
        $('#crime').removeClass('zoomOut').addClass('zoomIn');
        $('#crime').css('cursor', 'pointer');
    });
    
    //
    // Событие нажатия на кнопку "Вмешаться в выборы"
    //
    $('#crime').on('click', function() {
        if (!crimeDone) {
            let currentHeight = $(`.main-cards-item:nth-child(3) .result-count`).text();
            
            currentHeight = parseInt(currentHeight) + 25;
            if (currentHeight >= 100) {
                currentHeight = 100;
            }
            if (currentHeight > maxVote) {
                $(`.main-cards-item:nth-child(1)`).removeClass('main-cards-item-active');
                $(`.main-cards-item:nth-child(2)`).removeClass('main-cards-item-active');
                $(`.main-cards-item:nth-child(3)`).addClass('main-cards-item-active');
            }
            
            $(`.main-cards-item:nth-child(3) .result-count`).text(currentHeight + '%');
            $(`.progress-bar-3`).css('height', currentHeight + '%');
            
            $('#crime').removeClass('zoomIn').addClass('animated zoomOut');
            $('#crime').css('cursor', 'default');
        }
        
        crimeDone = true;
    })
    
});
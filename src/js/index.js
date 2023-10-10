let buttonVille = $('#button--ville');
let buttonMontagne = $('#button--montagne');
let buttonRealiste = $('#button--realiste');
let buttonCartoon = $('#button--cartoon');

let img1 = $('#img1');
let img2 = $('#img2');
let img3 = $('#img3');
let img4 = $('#img4');

let buttons = [buttonVille, buttonMontagne, buttonRealiste, buttonCartoon];

let originalImageNumbers;
let url = '../src/data/data.json';

function generateUniqueRandomNumbers(count, min, max) {
    let uniqueNumbers = [];
    while (uniqueNumbers.length < count) {
        let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!uniqueNumbers.includes(randomNum)) {
            uniqueNumbers.push(randomNum);
        }
    }
    return uniqueNumbers;
}

function initialImages() {
    let randomIndices = generateUniqueRandomNumbers(4, 1, 35);
    img1.attr('src', '../src/images/img' + randomIndices[0] + '.jpg');
    img2.attr('src', '../src/images/img' + randomIndices[1] + '.jpg');
    img3.attr('src', '../src/images/img' + randomIndices[2] + '.jpg');
    img4.attr('src', '../src/images/img' + randomIndices[3] + '.jpg');
}

function AjaxQuery(nomJSON) {
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var nomVariable = data.options.find(function (option) {
                return option.nom === nomJSON;
            });

            var randomIndices = generateUniqueRandomNumbers(4, 0, nomVariable.imgs.length - 1);

            img1.attr('src', nomVariable.imgs[randomIndices[0]]);
            img2.attr('src', nomVariable.imgs[randomIndices[1]]);
            img3.attr('src', nomVariable.imgs[randomIndices[2]]);
            img4.attr('src', nomVariable.imgs[randomIndices[3]]);
        }
    });
}

function updateImagesBasedOnActiveButtons() {
    if (buttonMontagne.hasClass('active')) {
        if (buttonRealiste.hasClass('active')) {
            AjaxQuery("Montagnes Réalistes");
        } else if (buttonCartoon.hasClass('active')) {
            AjaxQuery("Montagnes Cartoon");
        } else {
            AjaxQuery("Montagnes");
        }
    } else if (buttonVille.hasClass('active')) {
        if (buttonRealiste.hasClass('active')) {
            AjaxQuery("Ville Réaliste");
        } else if (buttonCartoon.hasClass('active')) {
            AjaxQuery("Ville Cartoon");
        } else {
            AjaxQuery("Ville");
        }
    } else if (buttonRealiste.hasClass('active')) {
        AjaxQuery("Réaliste");
    } else if (buttonCartoon.hasClass('active')) {
        AjaxQuery("Cartoon");
    } else {
        initialImages();
    }
}

$(document).ready(function () {
    originalImageNumbers = generateUniqueRandomNumbers(4, 1, 35);
    initialImages(originalImageNumbers);

    buttonCartoon.click(function () {
        buttonCartoon.toggleClass('active');
        buttonRealiste.removeClass('active');
        updateImagesBasedOnActiveButtons();
    });

    buttonRealiste.click(function () {
        buttonRealiste.toggleClass('active');
        buttonCartoon.removeClass('active');
        updateImagesBasedOnActiveButtons();
    });

    buttonMontagne.click(function () {
        buttonMontagne.toggleClass('active');
        buttonVille.removeClass('active');
        updateImagesBasedOnActiveButtons();
    });

    buttonVille.click(function () {
        buttonVille.toggleClass('active');
        buttonMontagne.removeClass('active');
        updateImagesBasedOnActiveButtons();
    });
});

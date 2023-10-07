let buttonVille = $('#button--ville');
let buttonMontagne = $('#button--montagne');
let buttonRealiste = $('#button--realiste');
let buttonCartoon = $('#button--cartoon');

let img1 = $('#img1');
let img2 = $('#img2');
let img3 = $('#img3');
let img4 = $('#img4');

// fonction au chargement de la page qui initialise des images alétoires dans les 4 divs
$(document).ready(function () {
    // Créez un tableau pour stocker les numéros d'images aléatoires
    let uniqueImageNumbers = generateUniqueRandomNumbers(4, 1, 14);

    // Mettez à jour les images en utilisant les numéros uniques
    img1.attr('src', '../src/images/img' + uniqueImageNumbers[0] + '.jpg');
    img2.attr('src', '../src/images/img' + uniqueImageNumbers[1] + '.jpg');
    img3.attr('src', '../src/images/img' + uniqueImageNumbers[2] + '.jpg');
    img4.attr('src', '../src/images/img' + uniqueImageNumbers[3] + '.jpg');
});

// Fonction pour générer un tableau de 'count' nombres aléatoires uniques entre 'min' et 'max'
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

buttonCartoon.click(function () {
    buttonCartoon.toggleClass('active');
    buttonRealiste.removeClass('active');
});

buttonRealiste.click(function () {
    buttonRealiste.toggleClass('active');
    buttonCartoon.removeClass('active');
});

buttonVille.click(function () {
    buttonVille.toggleClass('active');
    buttonMontagne.removeClass('active');
});

buttonMontagne.click(function () {
    buttonMontagne.toggleClass('active');
    buttonVille.removeClass('active');
});

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

// Fonction pour générer des nombres aléatoires uniques
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


// Fonction pour afficher les images de base au chargement de la page
function initialImages() {
    let randomIndices = generateUniqueRandomNumbers(4, 1, 35);

    img1.attr('src', '../src/images/img' + randomIndices[0] + '.jpg');
    img2.attr('src', '../src/images/img' + randomIndices[1] + '.jpg');
    img3.attr('src', '../src/images/img' + randomIndices[2] + '.jpg');
    img4.attr('src', '../src/images/img' + randomIndices[3] + '.jpg');
}

// Fonction de base en ajax pour chercher dans le fichier json qui est adapté par rapport au nom de chaque catégorie dans le JSON

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



// Fonction que j'ai imaginé pour au enelever la classe des autres boutons sauf le dernier qui reste, j'ai pensé faire ça quand justement on a 2 boutons genre Montagne et réaliste, si tu clique à nouveau sur montagne ça laisse la classe active sur réaliste
function returnToFirstChoice(choice) {
    buttonCartoon.removeClass('active');
    buttonRealiste.removeClass('active');
    buttonMontagne.removeClass('active');
    buttonVille.removeClass('active');
    choice.addClass('active');
}

// Variable pour dire que si il reste encore un bouton actif, on ne retourne pas à l'image de base
let check;

$(document).ready(function () {
    originalImageNumbers = generateUniqueRandomNumbers(4, 1, 35);

    // De base ya les images aléatoires
    initialImages(originalImageNumbers);


    // Et après on fait les fonctions pour chaque bouton qui sont les mêmes sauf dans les noms bien sur
    buttonCartoon.click(function () {
        buttonCartoon.toggleClass('active');
        buttonRealiste.removeClass('active');
        if (buttonCartoon.hasClass('active')) {
            if (buttonMontagne.hasClass('active')) {
                AjaxQuery("Montagnes Cartoon");
            } else if (buttonVille.hasClass('active')) {
                AjaxQuery("Ville Cartoon");
            } else {
                AjaxQuery("Cartoon");
            }
        } else {
            buttons.forEach(function (button) {
                if (button.hasClass('active')) {
                    returnToFirstChoice(button);
                    check = true;
                }
            });
            if (check == false) {
                initialImages();
            }
        }
    });









    buttonRealiste.click(function () {
        // si le bouton cartoon n'a pas la classe active
        if (buttonRealiste.hasClass('active')) {
            buttonRealiste.removeClass('active');
            buttons.forEach(function (button) {
                if (button.hasClass('active')) {
                    returnToFirstChoice(button);
                }
            });
        } else {
            buttonRealiste.addClass('active');
        }
        buttonCartoon.removeClass('active');
        if (buttonRealiste.hasClass('active')) {
            if (buttonMontagne.hasClass('active')) {
                AjaxQuery("Montagnes Réalistes");
            } else if (buttonVille.hasClass('active')) {
                AjaxQuery("Ville Réaliste");
            } else {
                AjaxQuery("Réaliste");
            }
        } else {
            buttons.forEach(function (button) {
                if (button.hasClass('active')) {
                    returnToFirstChoice(button);
                    check = true;
                }
            });
            if (check == false) {
                initialImages();
            }
        }
    });








    buttonMontagne.click(function () {
        // si le bouton cartoon n'a pas la classe active
        if (buttonMontagne.hasClass('active')) {
            buttonMontagne.removeClass('active');
            buttons.forEach(function (button) {
                if (button.hasClass('active')) {
                    returnToFirstChoice(button);
                }
            });
        } else {
            buttonMontagne.addClass('active');
        }
        buttonVille.removeClass('active');
        if (buttonMontagne.hasClass('active')) {
            if (buttonRealiste.hasClass('active')) {
                AjaxQuery("Montagnes Réalistes");
            } else if (buttonCartoon.hasClass('active')) {
                AjaxQuery("Montagnes Cartoon");
            } else {
                AjaxQuery("Montagnes");
            }
        } else {
            buttons.forEach(function (button) {
                if (button.hasClass('active')) {
                    returnToFirstChoice(button);
                    check = true;
                }
            });
            if (check == false) {
                initialImages();
            }
        }
    });







    buttonVille.click(function () {
        // si le bouton cartoon n'a pas la classe active
        if (buttonVille.hasClass('active')) {
            buttonVille.removeClass('active');
            buttons.forEach(function (button) {
                if (button.hasClass('active')) {
                    returnToFirstChoice(button);
                }
            });
        } else {
            buttonVille.addClass('active');
        }
        buttonMontagne.removeClass('active');
        if (buttonVille.hasClass('active')) {
            if (buttonRealiste.hasClass('active')) {
                AjaxQuery("Ville Réaliste");
            } else if (buttonCartoon.hasClass('active')) {
                AjaxQuery("Ville Cartoon");
            } else {
                AjaxQuery("Ville");
            }
        } else {
            buttons.forEach(function (button) {
                if (button.hasClass('active')) {
                    returnToFirstChoice(button);
                    check = true;
                }
            });
            if (check == false) {
                initialImages();
            }
        }
    });
});
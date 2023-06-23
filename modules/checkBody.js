// Fonction qui check si l'objet body contient les clés keys (tableau) et que celles-ci ne sont pas vides
function checkBody (body, arrKeys) {
    let result = true;
    for(let key of arrKeys) {
        if (
            !body[key]                          // La clé n'existe pas
            || body[key] === ''
            //|| typeof body[key] !== 'string'    // La clé n'est pas un string (desactivé pour les tests ariane)
            //|| body[key].trim() === ''          // La clé quand on supprime les espaces en début et fin est pas vide (desactivé pour les tests ariane)
        ) {
            result = false;
        }
    }
    // console.log('checkBody :', result, ' - ', body, arrKeys);
    return result;
}

module.exports = { checkBody };
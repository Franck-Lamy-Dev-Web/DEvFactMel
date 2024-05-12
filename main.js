

function calculerDevis() {
    
    // Récupérer les valeurs du formulaire
    var DevFact = document.getElementById("FactDevis").value;
    console.log("Test variable :" + DevFact);
    var descriptif = document.getElementById("descriptif").value;
    var tarif = parseFloat(document.getElementById("tarif").value);
    var nombrePersonnes = parseInt(document.getElementById("nombrePersonnes").value);
    var tva = parseInt(document.getElementById("tvaChoice").value);
    var deplacement = parseFloat(document.getElementById("deplacement").value) || 0;
    var Total = 0;
    // Calculer le montant HT
    var montantHT = tarif * nombrePersonnes + deplacement;
    
    // Calculer le montant TTC
    var montantTTC = (montantHT * (1 + tva / 100)).toFixed(2);

    //Calculer le deplacement HT 
    var deplacementHT = (deplacement / 1.2).toFixed(2);

    //Calcul du montant Total
    var Total = parseFloat(deplacement) + parseFloat(montantTTC);
    
    // Enregistrer les résultats dans le stockage local
    let devis = {
        nombrePersonnes: nombrePersonnes,
        descriptif: descriptif,
        montantHT: montantHT,
        montantTTC: montantTTC,
        titre: DevFact,
        prixDeplacement: deplacement,
        prixUnit:tarif,
        deplacementHT: deplacementHT,
        total: Total,
    };
    
    localStorage.setItem("devis", JSON.stringify(devis));
    
    // Rediriger vers la page de résultat
    window.location.href = "PageDevis.html";
}

// Récupérer le contenu du localStorage
var devisEnregistre = localStorage.getItem("devis");

// Vérifier si le contenu existe
if (devisEnregistre) {
    // Convertir la chaîne JSON en objet JavaScript
    var devis = JSON.parse(devisEnregistre);

    // Vous pouvez maintenant accéder aux propriétés de l'objet devis
    console.log(devis);
} else {
    console.log("Aucun devis n'est enregistré dans le localStorage.");
}

document.getElementById('devFactTitle').innerHTML =devis.titre + " N° 202410001";
document.getElementById('descriptif').innerHTML = devis.descriptif;
document.getElementById('nombrePersonnes').innerHTML = devis.nombrePersonnes;
document.getElementById('deplacement').innerHTML = devis.prixDeplacement;
document.getElementById('tarifHT').innerHTML = devis.montantHT;
document.getElementById('tarifTTC').innerHTML = devis.montantTTC;
document.getElementById('prixUnit').innerHTML = devis.prixUnit;
document.getElementById('deplacementHT').innerHTML = devis.deplacementHT;
document.getElementById('total').innerHTML ="Montant Total TTC : " + devis.total;


function telechargerPDF() {
    var element = document.getElementById('resultats');
    var opt = {
        margin:       1,
        filename:     'devis.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait', compressPDF: true }
      };
    html2pdf().set(opt).from(element).save();
}

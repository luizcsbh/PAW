function SelecionaImagemGaleria(event) {
    document.getElementById("img-big").src = event.target.src;

    document.getElementById("img1").style.border = "none";
    document.getElementById("img2").style.border = "none";
    document.getElementById("img3").style.border = "none";
    event.target.style.border = "5px solid #81BEF7";
}

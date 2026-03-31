async function carregarLayout() {

    const header = await fetch("/layout/header.html").then(r => r.text());
    const menu = await fetch("/layout/menu.html").then(r => r.text());
    const footer = await fetch("/layout/footer.html").then(r => r.text());

    document.getElementById("header").innerHTML = header;
    document.getElementById("menu").innerHTML = menu;
    document.getElementById("footer").innerHTML = footer;
}

document.addEventListener("DOMContentLoaded", carregarLayout);
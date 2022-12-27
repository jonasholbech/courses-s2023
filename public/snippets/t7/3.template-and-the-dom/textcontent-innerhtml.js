const el = document.querySelector("p");

//browseren laver det om til tekst
//brugeren ser HTML tagget
el.textContent = "<h1>Hej Verden</h1>";

//browseren laver det om til HTML
//brugeren ser stor tekst
el.innerHTML = "<h1>Hej Verden</h1>";

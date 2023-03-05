function s(elemento) {
  return document.querySelector(elemento);
}

const cidade = s("#cidade");
const btn = s(".btn-clima");
const climaCidade = s(".clima__cidade");
const tempCidade = s(".clima__cidade-temperatura");
const dataCidade = s(".clima__cidade-data");
const imgIntro = s(".imgIntro");
const imgClima = document.querySelectorAll(".imagens img");

function gerarClima(e) {
  e.preventDefault();

  function zerarValoresAoPesquisar() {
    document.body.querySelector(".imgIntro").style.display = "none";
    climaCidade.innerText = "Buscando...";
    tempCidade.innerText = "";
    dataCidade.innerText = "";
    imgClima[0].src = "";
    imgClima[1].src = "";
  }
  zerarValoresAoPesquisar();

  function retornoDadosAPI() {
    fetch("https://api.api-ninjas.com/v1/weather?city=" + cidade.value, {
      headers: { "X-Api-Key": "pScC5YBQwZ+Yk7/40nkd/g==us43uy3iCgd1GS3k" },
    })
      .then((r) => r.json())
      .then((j) => {
        if (j.temp === undefined) {
          climaCidade.innerText = "Cidade não encontrada";
          tempCidade.innerHTML = `
          <p>Max: --</p>
          <p>Min: --</p>
          `;
          dataCidade.innerText = "";
          imgClima[0].src = "";
          imgClima[1].src = "";
          imgIntro.style.display = "inline";
          imgIntro.src =
            "https://cdn-icons-png.flaticon.com/512/616/616516.png";
        } else {
          fetch(
            "https://api.api-ninjas.com/v1/worldtime?city=" + cidade.value,
            {
              headers: {
                "X-Api-Key": "pScC5YBQwZ+Yk7/40nkd/g==us43uy3iCgd1GS3k",
              },
            }
          )
            .then((r) => r.json())
            .then((j) => {
              dataCidade.innerText = `
              ${j.day}/${j.month}/${j.year} - ${j.hour}:${j.minute}
              `;

              if (j.hour >= 18 || j.hour < 6) {
                imgClima[0].src =
                  "https://cdn-icons-png.flaticon.com/512/581/581601.png";
                document.body.classList.add("nigth");
              } else {
                document.body.classList.remove("nigth");
                imgClima[0].src =
                  "https://cdn-icons-png.flaticon.com/512/5903/5903519.png";
              }
            });

          climaCidade.innerText = `
        ${cidade.value} - ${j.temp}° Graus
        `;
          tempCidade.innerHTML = `
        <p>Max: ${j.max_temp}°</p>
        <p>Min: ${j.min_temp}°</p>
        `;

          if (j.temp <= 18) {
            imgClima[1].src =
              "https://cdn-icons-png.flaticon.com/512/1684/1684374.png";
          } else {
            imgClima[1].src =
              "https://cdn-icons-png.flaticon.com/512/5782/5782170.png";
          }
        }
      });
  }
  retornoDadosAPI();
}

function botao() {
  if (cidade.value === "") {
    btn.setAttribute("disabled", "");
  } else {
    btn.removeAttribute("disabled");
  }
}

function preload() {
  const preload = document.querySelector(".preload");
  preload.style.display = "none";
  document.body.classList.add("load");
}

btn.addEventListener("click", gerarClima);
cidade.addEventListener("keyup", botao);
window.addEventListener("load", preload);

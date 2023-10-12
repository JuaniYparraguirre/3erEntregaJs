const pizzas = [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];

const form = document.getElementById("add-form");
const input = document.querySelector(".input-number");
const resultContainer = document.getElementById("result-container");

const activePizza = JSON.parse(localStorage.getItem("pizza")) || null;

const saveToLocalStorege = (pizza) => {
  if (!pizza) return;
  localStorage.setItem("pizza", JSON.stringify(pizza));
};

const searchPizza = (value) => pizzas.find((pizza) => pizza.id === value);

const renderCard = (pizza) => {
  const { nombre, precio, ingredientes, imagen } = pizza;
  return `<div class="card">
  <img src="${imagen}" alt="${nombre}" class="card_img" />
  <div class="card-info">
    <h3 class="card-title">${nombre.toUpperCase()}</h3>

    <div class="card-body">
      <span class="card-description">${ingredientes
        .map((ingrediente) => ingrediente)
        .join(", ")}
        </span><br>
      <span class="card-price">Precio $${precio}</span>
    </div>
  </div>
  </div>
  `;
};
const showEmptyError = () => {
  resultContainer.innerHTML = `<div class="pizza-container">
  <h3 class="error-title">Por davor, ingrese un numero (del 1 al 5) para buscar una pizza del menu</h3>
</div>`;
};
const renderResult = (pizza) => {
  if (!pizza) {
    resultContainer.innerHTML = `<div class="pizza-container">
    <h3 class="error-title">Menu con numeros del 1 al 5</h3>
  </div>`;
  } else {
    resultContainer.innerHTML = renderCard(pizza);
  }
};

const initialRender = () => {
  if (!activePizza) {
    resultContainer.innerHTML = `<div class="pizza-container">
    <h3 class="error-title">No hay pizza guardada en LS</h3>
  </div>
    `;
  } else {
    resultContainer.innerHTML = `<span class="last__title>Ultima Pizza encontrada</span>
    ${renderCard(activePizza)}`;
  }
};

const submitSearch = (e) => {
  e.preventDefault();
  const searchedValue = input.value;
  if (!searchedValue) {
    showEmptyError(searchedValue);
    return;
  }
  const searchedPizza = searchPizza(Number(searchedValue));
  renderResult(searchedPizza);
  saveToLocalStorege(searchedPizza);
  form.reset();
};
const init = () => {
  initialRender();
  form.addEventListener("submit", submitSearch);
};
init();

let grid = document.querySelector(".grid");
let fragment = document.createDocumentFragment();

const obtainDogs = async (breeds) => {
  grid.innerHTML = ""; // Vaciamos el contenido del elemento grid
  try {
    const breedsWithEncodedSpaces = breeds.replace(/ /g, "%20");
    const requestGetDogs = await fetch(
      `https://dog.ceo/api/breed/${encodeURIComponent(
        breedsWithEncodedSpaces
      )}/images`
    );
    if (requestGetDogs.status !== 200) {
      // No se ha encontrado la imagen, no hacemos nada
      return;
    }
    const jsonDog = await requestGetDogs.json();

    if (Array.isArray(jsonDog.message)) {
      jsonDog.message.forEach((dog) => {
        const item = document.createElement("div");
        item.className = "item";

        const img = document.createElement("img");
        img.src = dog;

        item.appendChild(img);
        fragment.appendChild(item);
      });
    } else {
      const item = document.createElement("div");
      item.className = "item";

      const img = document.createElement("img");
      img.src = jsonDog.message;

      item.appendChild(img);
      fragment.appendChild(item);
    }

    grid.appendChild(fragment);
  } catch (error) {
    console.error(error);
  }
};

const debounce = (func, delay) => {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(func, delay);
  };
};

const search = document.querySelector(".search");
const searchButton = document.querySelector(".search-icon");

search.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    if (search.value !== "") {
      obtainDogs(search.value);
    } else {
      grid.innerHTML = "";
    }
  }
});

searchButton.addEventListener("click", () => {
  if (search.value !== "") {
    obtainDogs(search.value);
  } else {
    grid.innerHTML = "";
  }
});

const moviSection = document.getElementById("movieDisplay");
const popularMovies = document.getElementById("popularMovies");
const upcomingMovies = document.getElementById("upcomingMovies");
const home = document.querySelectorAll(".home");
const loader = document.getElementById("loader");
const search = document.getElementById("search-id");
const input = document.getElementById("search");
const posterPath = `https://www.themoviedb.org/t/p/w220_and_h330_face`;

const loadMovies = async (genre) => {
  let search = "search";
  loader.classList.remove("d-none");
  let apiurl = `https://api.themoviedb.org/3/movie/${genre}?api_key=60dbf41a1c537e450033c2a17a17dddf`;
  let res = await fetch(apiurl);
  let data = await res.json();
  showMovies(data.results);
};

const showMovies = (movies) => {
  loader.classList.add("d-none");
  moviSection.textContent = "";
  movies.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("movie-card");
    const {
      original_title: name,
      poster_path: poster,
      release_date: date,
      vote_average: rating,
      id,
    } = movie;
    div.innerHTML = `
    <div class="poster">
    <img src="${
      posterPath + poster
    }" alt="" /> <span class="rating">${rating}</span>
  </div>

  <div class="details">
    <h5>${name}</h5>
    <p>${date}</p>
  </div>
    `;
    moviSection.appendChild(div);
  });
};

loadMovies("popular", false);

popularMovies.addEventListener("click", () => loadMovies("top_rated", false));
upcomingMovies.addEventListener("click", () => loadMovies("upcoming"), false);

home.forEach((h) => {
  h.addEventListener("click", () => loadMovies("popular", false));
});

const getSearch = async (value) => {
  loader.classList.remove("d-none");
  let apiurl = `https://api.themoviedb.org/3/search/movie?api_key=60dbf41a1c537e450033c2a17a17dddf&language=en-US&query=${value}&page=1&include_adult=true`;
  let res = await fetch(apiurl);
  let data = await res.json();
  showMovies(data.results);
};
search.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.target);
  let inputValue = input.value;
  getSearch(inputValue);
  input.value = "";
});

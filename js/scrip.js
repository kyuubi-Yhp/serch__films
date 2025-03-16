// fetch('', {
//   method: 'POST',
//   body: JSON.stringify({
//     title: 'new point',
//     complieted: false
//   }),
//   headers: {
//     'sfd': 43545
//   }
// })
//   .then(response => response.json())
//   .then(json => console.log(json))


  const movieTitleInput = document.getElementById("movieTitle");
  const searchButton = document.getElementById("searchButton");
  const movieInfoDiv = document.getElementById("movieInfo");
  const apiKey = "6f0f0ddd"; // Ваш API ключ
  
  searchButton.addEventListener("click", () => {
    const title = movieTitleInput.value;
    if (title) {
      searchMovies(title);
    } else {
      movieInfoDiv.innerHTML = "Введите название фильма.";
    }
  });
  
  function searchMovies(title) {
    fetch(`http://www.omdbapi.com/?s=${encodeURIComponent(title)}&apikey=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        if (data.Search) {
          displayMovies(data.Search);
          console.log(data)
        } else {
          movieInfoDiv.innerHTML = "Фильмы не найдены.";
        }
      })
      .catch(error => {
        console.error("Ошибка:", error);
        movieInfoDiv.innerHTML = "Произошла ошибка при поиске.";
      });
  }
  
  function displayMovies(movies) {
    let html = "";
    movies.forEach(movie => {
      html += `
        <div>
          <h3>${movie.Title} (${movie.Year})</h3>
          <img src="${movie.Poster}" alt="${movie.Title}" style="max-width: 200px;">
          <button onclick="getMovieDetails('${movie.imdbID}')">Подробнее</button>
        </div>
      `;
    });
    movieInfoDiv.innerHTML = html;
  }
  
  function getMovieDetails(imdbID) {
    fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`)
      .then(response => response.json())
      .then(movie => {
        movieInfoDiv.innerHTML = `
          <h2>${movie.Title} (${movie.Year})</h2>
          <img src="${movie.Poster}" alt="${movie.Title}" style="max-width: 300px;">
          <p><strong>Жанр:</strong> ${movie.Genre}</p>
          <p><strong>Режиссер:</strong> ${movie.Director}</p>
          <p><strong>Актеры:</strong> ${movie.Actors}</p>
          <p><strong>Сюжет:</strong> ${movie.Plot}</p>
        `;
      })
      .catch(error => console.error("Ошибка:", error));
  }
  
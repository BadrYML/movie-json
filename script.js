function displayMovies(sortType, sortKey) {
  var searchValue = document.getElementById("search-input").value.toLowerCase();
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var movies = JSON.parse(this.responseText);
      // Sort movies if sortKey and sortType are provided
      if (sortKey && sortType) {
        movies.sort((a, b) => {
          var x = a[sortKey];
          var y = b[sortKey];
          if (sortType === "asc") {
            if (x < y) return -1;
            if (x > y) return 1;
            return 0;
          } else {
            if (x > y) return -1;
            if (x < y) return 1;
            return 0;
          }
        });
      }
      var movieList = document.getElementById("movie-list");
      movieList.innerHTML = ""; // Clear movie list
      for (var i = 0; i < movies.length; i++) {
        var movie = movies[i];
        if (
          movie.title.toLowerCase().includes(searchValue) ||
          movie.director.toLowerCase().includes(searchValue) ||
          movie.actors.join(", ").toLowerCase().includes(searchValue) ||
          movie.theaters.join(", ").toLowerCase().includes(searchValue) ||
          movie.year.toString().includes(searchValue) ||
          movie.length.toString().includes(searchValue)
        ) {
          // Only include movies that match search value
          var movieDiv = document.createElement("div");
          movieDiv.classList.add("movie");
          movieDiv.innerHTML = `
            <img src="${movie.cover_art}" class="movie-cover" alt="${movie.title} cover art">
            <h2>${movie.title}</h2>
            <h3>Directed by ${movie.director}</h3>
            <p>Length: ${movie.length} minutes</p>
            <p>Year: ${movie.year}</p>
            <p>Theaters: ${movie.theaters.join(", ")}</p>
            <p>Actors: ${movie.actors.join(", ")}</p>
          `;
          movieList.appendChild(movieDiv);
        }
      }
    }
  };
  xhttp.open("GET", "movies.json", true);
  xhttp.send();
}

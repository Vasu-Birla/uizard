import React, { useEffect } from 'react'
import './Home.css'; 

const Home = () => {
  useEffect(() => {
    const seats = document.querySelectorAll(".row .seat:not(.occupied)");
    const selectedSeats = [];

    const seatContainer = document.querySelector(".row-container");
    const count = document.getElementById("count");
    const total = document.getElementById("total");
    const movieSelect = document.getElementById("movie");
    const bookBtn = document.getElementById("bookBtn");

    let normalPrice = 450;
    let diamondPrice = 650;

    function setMovieData(movieIndex, moviePrice) {
      localStorage.setItem("selectedMovieIndex", movieIndex);
      localStorage.setItem("selectedMoviePrice", moviePrice);
    }

    function updateSelectedCount() {
      count.textContent = selectedSeats.length;
      total.textContent = selectedSeats.length * getTicketPrice();
    }

    function bookSeats() {
      selectedSeats.forEach(seat => {
        seat.classList.add("occupied");
      });
      selectedSeats.length = 0;
      updateSelectedCount();
    }

    seatContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
        e.target.classList.toggle("selected");
        const seatIndex = selectedSeats.indexOf(e.target);
        if (seatIndex > -1) {
          selectedSeats.splice(seatIndex, 1);
        } else {
          selectedSeats.push(e.target);
        }
        updateSelectedCount();
      }
    });

    bookBtn.addEventListener("click", () => {
      if (selectedSeats.length > 0) {
        bookSeats();
      } else {
        alert("Please select at least one seat before booking.");
      }
    });

    movieSelect.addEventListener("change", (e) => {
      setMovieData(e.target.selectedIndex, getTicketPrice());
      updateSelectedCount();
    });

    function getTicketPrice() {
      return movieSelect.selectedIndex === 1 ? diamondPrice : normalPrice;
    }

    // Create seat layout
    const rowContainer = document.getElementById("rowContainer");
    for (let i = 1; i <= 15; i++) {
      const row = document.createElement("div");
      row.classList.add("row");

      const rowLabel = document.createElement("p");
      rowLabel.textContent = "R" + i;
      row.appendChild(rowLabel);

      for (let j = 1; j <= 15; j++) {
        const seat = document.createElement("div");
        seat.classList.add("seat");
        seat.textContent = "R" + i + String.fromCharCode(64 + j);
        row.appendChild(seat);
      }
      rowContainer.appendChild(row);
    }

    updateSelectedCount();



      // Load jQuery from CDN
    //   const script = document.createElement('script');
    //   script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
    //   script.async = true;
    //   document.body.appendChild(script);

    // // Use jQuery to make an AJAX request
    // $.ajax({
    //   method: 'GET',
    //   url: 'https://jsonplaceholder.typicode.com/posts',
    //   success: function (data) {
    //     console.log('Received data:', data);
    //     // Handle the received data here
    //   },
    //   error: function (error) {
    //     console.error('Error occurred:', error);
    //     // Handle the error here
    //   },
    // });



  }, []);

  return (
    <body class="home-body">
    <div>
        <h2>CISS Theater (15 x 15)</h2>
    <div class="movie-container">

        <label>Pick a movie:</label>
        <select id="movie">
            <option value="450">Normal Movie (₹450)</option>
            <option value="650">Diamond Movie (₹650)</option>
        </select>
        <button id="bookBtn">Book Seats</button>
    </div>

    <div class="container">
        <div class="movie-screen">
            <img src='../images/screen-thumb.png' alt='screen' />
        </div>

        <div class="row-container" id="rowContainer">
        
        </div>
    </div>

    <div class="text-wrapper">
        <p class="text">Selected Seats <span id='count'>0</span></p>
        <p class="text">Total Price ₹<span id="total">0</span></p>
    </div>
    </div>
    </body>
  );
};

export default Home;

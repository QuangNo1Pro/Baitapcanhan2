import { dbProvider } from './dbProvider.js'

// Header component
const Header = {
  props: ['isDarkMode'],
  template: `
    <header>
      <div class="mssv">22120296</div>
      <div class="title">Movies Info</div>
      <div class="switch">
        <input @change="toggleDarkMode" :checked="isDarkMode" type="checkbox" id="mode-switch" class="toggle-switch">
        <label for="mode-switch"></label>
        <div class="setting">{{ isDarkMode ? '🌙' : '⚙️' }}<div/>
      </div>
    </header>
  `,
  methods: {
    toggleDarkMode(event) {
      const isDarkMode = event.target.checked;
      this.$emit("toggle-dark-mode", isDarkMode);
    },
  },
};

// NavBar component
const NavBar = {
  template: `
    <nav>
      <button @click="goHome" class="home">🏠</button>
      <div class="search">
        <input class="input_search" type="search" placeholder="Search" />
        <button class="button_search">Search</button>
      </div>
    </nav>
  `,
  data() {
    return {
      searchQuery: '', // Lưu trữ query tìm kiếm
    };
  },
  methods: {
    goHome() {
      this.$emit('go-home');
    },
  },
};

// Main component
const Main = {
  props: ["top5movies_doanhthu", "top15_30moviePopular", "top15_30movieRank"],
  data() {
    return {
      currentMovieIndex: 0, // Chỉ số hiện tại của top 5 doanh thu
      currentPopularIndex: 0, // Chỉ số hiện tại của Most Popular
      currentRankIndex: 0, // Chỉ số hiện tại của Top Rating
      currentMovie: null,
      showModal: false, // Trạng thái hiển thị modal
    };
  },
  methods: {
    // Điều hướng cho top5movies_doanhthu
    previousMovie() {
      if (this.currentMovieIndex > 0) {
        this.currentMovieIndex -= 1;
      }
    },
    nextMovie() {
      if (this.currentMovieIndex < this.top5movies_doanhthu.length - 1) {
        this.currentMovieIndex += 1;
      }
    },
    // Điều hướng cho Most Popular Movies
    previousPopular() {
      if (this.currentPopularIndex > 0) {
        this.currentPopularIndex -= 3; // Lùi 3 phim
      }
    },
    nextPopular() {
      if (this.currentPopularIndex < this.top15_30moviePopular.length - 3) {
        this.currentPopularIndex += 3; // Tiến 3 phim
      }
    },

    // Điều hướng cho Top Rated Movies
    previousRank() {
      if (this.currentRankIndex > 0) {
        this.currentRankIndex -= 3; // Lùi 3 phim
      }
    },
    nextRank() {
      if (this.currentRankIndex < this.top15_30movieRank.length - 3) {
        this.currentRankIndex += 3; // Tiến 3 phim
      }
    },

    // Hiển thị chi tiết phim từ Top 5 Movies
  showDetailsTop5(movie) {
    this.currentMovie = movie; // Lưu bộ phim hiện tại
    this.modalType = "top5";   // Đặt loại modal là "top5"
    this.showModal = true;     // Hiển thị modal
  },
  // Hiển thị chi tiết phim từ Top 15/30 Movies
  showDetailsTop15_30(movie) {
    this.currentMovie = movie; // Lưu bộ phim hiện tại
    this.modalType = "top15_30"; // Đặt loại modal là "top15_30"
    this.showModal = true;     // Hiển thị modal
  },
  // Đóng modal
  closeModal() {
    this.showModal = false;
    this.modalType = "";       // Reset loại modal
  },
  },
  template: `
    <main>
    <!-- Top 5 Movies -->
    <section>
      <div class="movie-item">
        <div class="movie-navigation">
          <button @click="previousMovie"><</button>
        </div>
        <div class="movie-content">
          <div 
            class="movie-poster" 
            @click="showDetailsTop5(top5movies_doanhthu[currentMovieIndex])" 
            :style="{ backgroundImage: 'url(' + top5movies_doanhthu[currentMovieIndex]?.image + ')' }"
          >
            <h3 class="movie-title">
              <br>{{ top5movies_doanhthu[currentMovieIndex]?.fullTitle || 'N/A' }}
              <br />
              [
                <span v-for="(genre, index) in top5movies_doanhthu[currentMovieIndex]?.genreList || []" :key="index">
                  {{ genre.key }}<span v-if="index < top5movies_doanhthu[currentMovieIndex]?.genreList.length - 1">, </span>
                </span>
              ]
            </h3>
          </div>
        </div>
        <div class="movie-navigation">
          <button @click="nextMovie">></button>
        </div>
      </div>
    </section>

    <!-- Most Popular Movies -->
    <section>
      <h2>Most Popular</h2>
      <div class="movie-item">
        <div class="movie-navigation">
          <button @click="previousPopular"><</button>
        </div>
        <div class="movie-content">
          <div v-for="(movie, index) in top15_30moviePopular.slice(currentPopularIndex, currentPopularIndex + 3)" 
            :key="index" 
            class="movie-poster" 
            @click="showDetailsTop15_30(movie)" 
            :style="{ backgroundImage: 'url(' + movie.image + ')' }"
          >
            <h3 class="movie-title">
              {{ movie.fullTitle || 'N/A' }}
            </h3>
          </div>
        </div>
        <div class="movie-navigation">
          <button @click="nextPopular">></button>
        </div>
      </div>
    </section>

    <!-- Top Rated Movies -->
    <section>
      <h2>Top Rating</h2>
      <div class="movie-item">
        <div class="movie-navigation">
          <button @click="previousRank"><</button>
        </div>
        <div class="movie-content">
          <div v-for="(movie, index) in top15_30movieRank.slice(currentRankIndex, currentRankIndex + 3)" 
            :key="index" 
            class="movie-poster" 
            @click="showDetailsTop15_30(movie)" 
            :style="{ backgroundImage: 'url(' + movie.image + ')' }"
          >
            <h3 class="movie-title">
              {{ movie.fullTitle || 'N/A' }}
            </h3>
          </div>
        </div>
        <div class="movie-navigation">
          <button @click="nextRank">></button>
        </div>
      </div>
    </section>

  <!-- Modal for displaying movie details -->
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <button class="close-btn" @click="closeModal">X</button>
      <template v-if="modalType === 'top5'">
        <!-- Chi tiết Top 5 Movies -->
          <h2>{{ currentMovie?.fullTitle || 'N/A' }}</h2>
          <p><strong>Plot:</strong> {{ currentMovie?.plot || 'N/A' }}</p>
          <p><strong>Director:</strong> {{ currentMovie?.directorList?.map(d => d.name).join(", ") || 'N/A' }}</p>
          <p><strong>Actors:</strong> {{ currentMovie?.actorList?.map(a => a.name).join(", ") || 'N/A' }}</p>
          <p><strong>Genres:</strong> {{ currentMovie?.genreList?.map(g => g.value).join(", ") || 'N/A' }}</p>
          <p><strong>Release Date:</strong> {{ currentMovie?.releaseDate || 'N/A' }}</p>
          <p><strong>Box Office:</strong> {{ currentMovie?.boxOffice?.cumulativeWorldwideGross || 'N/A' }}</p>
      </template>

      <template v-else-if="modalType === 'top15_30'">
        <!-- Chi tiết Top 15/30 Movies -->
        <h2>{{ currentMovie?.fullTitle || 'N/A' }}</h2>
        <p><strong>Rank:</strong> {{ currentMovie?.rank || 'N/A' }}</p>
        <p><strong>Title:</strong> {{ currentMovie?.title || 'N/A' }} ({{ currentMovie?.year || 'N/A' }})</p>
        <p><strong>IMDB Rating:</strong> {{ currentMovie?.imDbRating || 'N/A' }} ({{ currentMovie?.imDbRatingCount || 'N/A' }} votes)</p>
        <p><strong>Crew:</strong> {{ currentMovie?.crew || 'N/A' }}</p>
      </template>
    </div>
  </div>

</main>
`
};

// Footer component
const Footer = {
  template: `
    <footer><p>© LeVanQuang </p></footer>
  `,
};

// Vue app
const app = Vue.createApp({
  components: {
    Header,
    NavBar,
    Main,
    Footer,
  },
  data() {
    return {
      currentPage: 1,
      isDarkMode: false,

      moviesData: [],
      mostPopular: [],
      top50Movies: [],

      top5movies_doanhthu: [],
      top15_30moviePopular: [],
      top15_30movieRank: [],
    };
  },
  methods: {
    loadPage() {
      this.currentPage = 1;
    },
    toggleDarkMode(isDarkMode) {
      this.isDarkMode = isDarkMode;
      const body = document.body;
      if (isDarkMode) {
        body.classList.add("dark-mode");
      } else {
        body.classList.remove("dark-mode");
      }
    },
    async fetchMovies() {
      try {
        // Sử dụng dbProvider để gọi API
        const response = await dbProvider.fetch('get/Movies');
        const response3 = await dbProvider.fetch('get/Top50Movies');
        const response4 = await dbProvider.fetch('get/MostPopularMovies');

        // Gán dữ liệu từ API vào các biến
        this.moviesData = response.items || [];
        this.top50Movies = response3.items || [];
        this.mostPopular = response4.items || [];

        console.log("Movie", this.moviesData);
        console.log("top50", this.top50Movies);
        console.log("Popular", this.mostPopular);

        // Lọc và lấy dữ liệu
        this.top5movies_doanhthu = this.moviesData
          .map(movie => ({
            ...movie,
            // Chuyển đổi doanh thu thành số, nếu không có thì gán 0
            numericRevenue: parseFloat(
              movie.boxOffice?.cumulativeWorldwideGross?.replace(/[\$,]/g, "") || 0
            ),
          }))
        .sort((a, b) => b.numericRevenue - a.numericRevenue) // Sắp xếp theo doanh thu giảm dần
        .slice(0, 5); // Lấy 5 phim đầu tiên


        this.top15_30moviePopular = this.mostPopular.slice(0, 20);

        this.top15_30movieRank = this.top50Movies
          .sort((a, b) => a.rank - b.rank)
          .slice(0, 20);
        
        console.log(this.top5movies_doanhthu);

      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
      }
    }
  },
  mounted() {
    this.loadPage();
    this.fetchMovies();
  },
  template: `
    <Header @toggle-dark-mode="toggleDarkMode" :isDarkMode="isDarkMode" />
    <NavBar />
    <Main 
      :mostPopular="mostPopular"  
      :top5movies_doanhthu="top5movies_doanhthu" 
      :top15_30moviePopular="top15_30moviePopular" 
      :top15_30movieRank="top15_30movieRank" 
    />
    <Footer />
  `
});

app.mount("#app");


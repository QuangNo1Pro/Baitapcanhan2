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
        <input class="input_search" type="text" placeholder="Search" v-model="searchQuery"/>
        <button class="button_search" @click="searchMovies"> Search </button>
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
    searchMovies() {
      this.$emit('search-movies', this.searchQuery);
    },
  },

  watch: {
    searchQuery(newQuery) {
      this.$emit('update:searchQuery', newQuery);
    },
  },
};

const Main = {
  props: ["top5movies_doanhthu", "top15_30moviePopular", "top15_30movieRank", "searchResults", "moviesData", "searchQuery"],
  data() {
    return {
      currentMovieIndex: 0, 
      currentPopularIndex: 0, 
      currentRankIndex: 0,
      currentMovie: null,
      showModal: false, 
    };
  },
  methods: {
    // Reset lại trạng thái
    resetState() {
      this.currentMovieIndex = 0;
      this.currentPopularIndex = 0;
      this.currentRankIndex = 0;
      this.showModal = false;
      this.currentMovie = null;
    },

    // Điều hướng phim trong top5movies_doanhthu
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
        this.currentPopularIndex -= 3;
      }
    },
    nextPopular() {
      if (this.currentPopularIndex < this.top15_30moviePopular.length - 3) {
        this.currentPopularIndex += 3; 
      }
    },
    previousRank() {
      if (this.currentRankIndex > 0) {
        this.currentRankIndex -= 3; 
      }
    },
    nextRank() {
      if (this.currentRankIndex < this.top15_30movieRank.length - 3) {
        this.currentRankIndex += 3; 
      }
    },

    // Mở modal và lấy thông tin chi tiết của phim
    openModal(movieId) {
      this.currentMovie = this.getMovieById(movieId);
      this.showModal = true;
    },

    // Đóng modal
    closeModal() {
      this.showModal = false;
    },

    // Hàm tìm phim theo ID
    getMovieById(id) {
      return this.moviesData.find(movie => movie.id === id);
    },

    // Lấy tên đạo diễn từ danh sách đạo diễn
    getDirector(directorList) {
      return directorList?.map(director => director.name).join(", ");
    },

    // Lấy tên diễn viên từ danh sách diễn viên
    getActors(actorList) {
      return actorList?.map(actor => actor.name).join(", ");
    },

    // Lấy thể loại phim từ danh sách thể loại
    getGenres(genreList) {
      return genreList?.map(genre => genre.value).join(", ");
    },
  },
  template: `
    <main>
      <!-- Hiển thị kết quả tìm kiếm -->
      <section v-if="searchResults.length > 0">
        <div class="search-results-wrapper">
          <div class="search-results-grid">
            <div class="search-item" v-for="(movie, index) in searchResults" :key="movie.id">
              <div 
                class="movie-poster-card" 
                @click="openModal(movie.id)" 
                :style="{ backgroundImage: 'url(' + movie.image + ')', height: '500px' }"
              >
                <h3 class="movie-title-text">
                  <div>{{ movie.title || 'N/A' }} </div>
                  <div class="genre-list">
                    [
                    <span v-for="(genre, index) in movie.genreList || []" :key="index">
                      {{ genre.key }}<span v-if="index < movie.genreList.length - 1">, </span>
                    </span>
                    ]
                  </div>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Nếu không có kết quả tìm kiếm, hiển thị các mục phim -->
      <section v-else>
        <!-- Top 5 Movies -->
        <section>
          <div class="movie-item" style="margin-bottom : 30px">
            <div class="movie-navigation">
              <button @click="previousMovie"><</button>
            </div>
            <div class="movie-content">
              <div 
                class="movie-poster top5" 
                @click="openModal(top5movies_doanhthu[currentMovieIndex].id)" 
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
          <h2 style="margin-bottom: 30px;">Most Popular</h2>
          <div class="movie-item">
            <div class="movie-navigation">
              <button @click="previousPopular"><</button>
            </div>
            <div class="movie-content">
              <div 
                v-for="(movie, index) in top15_30moviePopular.slice(currentPopularIndex, currentPopularIndex + 3)" 
                :key="index" 
                class="movie-poster top15-30" 
                @click="openModal(movie.id)" 
                :style="{
                  backgroundImage: 'url(' + movie.image + ')',
                  height: '250px', 
                  width: '350px',  
                }"
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
          <h2 style="margin-bottom: 30px;">Top Rating</h2>
          <div class="movie-item">
            <div class="movie-navigation">
              <button @click="previousRank"><</button>
            </div>
            <div class="movie-content">
              <div 
                v-for="(movie, index) in top15_30movieRank.slice(currentRankIndex, currentRankIndex + 3)" 
                :key="index" 
                class="movie-poster top15-30" 
                @click="openModal(movie.id)" 
                :style="{
                  backgroundImage: 'url(' + movie.image + ')',
                  height: '250px', 
                  width: '350px', 
                }"
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
      </section>
      
      <!-- Modal hiển thị thông tin chi tiết phim -->
      <div v-if="showModal && currentMovie" class="modal">
        <div class="modal-content">

          <!-- Poster -->
          <div class="movie-poster" 
               :style="{ backgroundImage: 'url(' + currentMovie.image + ')', width: '100%', height: '400px', backgroundSize: 'cover', backgroundPosition: 'center' }">
          </div>

          <!-- Thông tin chi tiết phim -->
          <div class="movie-details">
            <h2><strong>Tiêu đề:</strong> {{ currentMovie.title || 'N/A' }}</h2>
            <p><strong>Năm sản xuất:</strong> {{ currentMovie.year || 'N/A' }}</p>
            <p><strong>Tóm tắt:</strong> {{ currentMovie.plot || 'Không có thông tin' }}</p>

            <p><strong>Đạo diễn:</strong> {{ getDirector(currentMovie.directorList) || 'Không có thông tin.' }}</p>
            <p><strong>Diễn viên:</strong> {{ getActors(currentMovie.actorList) || 'Không có thông tin.' }}</p>

            <p><strong>Thể loại:</strong> {{ getGenres(currentMovie.genreList) || 'Không có thông tin.' }}</p>
          </div>
        </div>
        <button class="close-btn" @click="closeModal">X</button>
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
      isDarkMode: false,

      moviesData: [],
      mostPopular: [],
      top50Movies: [],

      top5movies_doanhthu: [],
      top15_30moviePopular: [],
      top15_30movieRank: [],

      searchQuery: '', 
      searchResults: [], 
    };
  },
  methods: {
    goHome() {
        this.searchResults = [];
        this.searchQuery = ''; 
        this.$refs.main.resetState();
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

        // Lọc và lấy dữ liệu
        this.top5movies_doanhthu = this.moviesData
          .map(movie => ({
            ...movie,
            numericRevenue: parseFloat(
              movie.boxOffice?.cumulativeWorldwideGross?.replace(/[\$,]/g, "") || 0
            ),
          }))
        .sort((a, b) => a.numericRevenue - b.numericRevenue) // Sắp xếp theo doanh thu giảm dần
        .slice(0, 5); // Lấy 5 phim đầu tiên

        this.top15_30moviePopular = this.mostPopular.slice(0, 20);

        this.top15_30movieRank = this.top50Movies
          .sort((a, b) => a.rank - b.rank)
          .slice(0, 20);
        
        console.log("top5: ", this.top5movies_doanhthu);
        console.log("popular: ", this.top15_30moviePopular);
        console.log("rate: ", this.top15_30movieRank);

      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
      }
    },

        // Tìm kiếm 
    searchMovies(query) {
      const lowerCaseQuery = query.toLowerCase(); // Sử dụng this.searchQuery

      // Lọc phim theo tên 
      this.searchResults = this.moviesData.filter(movie =>
        movie.title?.toLowerCase().includes(lowerCaseQuery) 
      );

      this.isSearching = true;
      if (this.searchResults.length === 0)
      {
        alert("Không có kết quả tìm kiếm ! ")
      }
    },
  },

  mounted() {
    this.fetchMovies();
  },
  template: `
    <Header @toggle-dark-mode="toggleDarkMode" :isDarkMode="isDarkMode" />
    <NavBar @go-home="goHome"  @search-movies="searchMovies" />
    <Main
        ref="main"
        :moviesData="moviesData"
        :top5movies_doanhthu="top5movies_doanhthu" 
        :top15_30moviePopular="top15_30moviePopular" 
        :top15_30movieRank="top15_30movieRank"
        :searchResults="searchResults"
        :searchQuery="searchQuery"
      />
    </div>
    <Footer />
  `,
});

app.mount("#app");


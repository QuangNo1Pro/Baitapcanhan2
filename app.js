
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
    props: ['top5movies_doanhthu', 'top20moviesPopular', 'top20moviesRank'],
    template: `
      <main>
        <!-- Hiển thị top 5 phim doanh thu cao nhất -->
        <div class="top-movie">
          <h2>Top 5 Movie Doanh Thu Cao Nhất</h2>
          <div v-if="top5movies_doanhthu.length > 0">
            <div class="movie" v-for="(movie, index) in top5movies_doanhthu" :key="index">
              <img :src="movie.image" alt="Top Movie" />
              <div class="movie-details">
                <h3>{{ movie.title }}</h3>
                <p><strong>Year:</strong> {{ movie.year }}</p>
                <p><strong>Rating:</strong> {{ movie.imDbRating }}</p>
                <p><strong>Rank:</strong> {{ movie.rank }}</p>
                <p>{{ movie.plot }}</p>
              </div>
            </div>
            <div class="pagination">
              <button @click="changeTopMovie('prev')" :disabled="currentTopMovieIndex === 0">Previous</button>
              <button @click="changeTopMovie('next')" :disabled="currentTopMovieIndex === top5movies_doanhthu.length - 1">Next</button>
            </div>
          </div>
        </div>
  
        <!-- Hiển thị 20 phim phổ biến nhất -->
        <div class="popular-movies">
          <h2>Top 20 Movie Phổ Biến Nhất</h2>
          <div class="movie-list">
            <div v-for="(movie, index) in currentPopularMovies" :key="index" class="movie-item">
              <img :src="movie.image" alt="Popular Movie" />
              <div class="movie-details">
                <h3>{{ movie.title }}</h3>
                <p><strong>Year:</strong> {{ movie.year }}</p>
                <p><strong>Rating:</strong> {{ movie.imDbRating }}</p>
              </div>
            </div>
          </div>
          <div class="pagination">
            <button @click="changePopularMovies('prev')" :disabled="currentPopularMoviesIndex === 0">Previous</button>
            <button @click="changePopularMovies('next')" :disabled="currentPopularMoviesIndex === totalPopularMoviesPages - 1">Next</button>
          </div>
        </div>
  
        <!-- Hiển thị 20 phim hạng cao nhất -->
        <div class="ranked-movies">
          <h2>Top 20 Movie Hạng Cao Nhất</h2>
          <div class="movie-list">
            <div v-for="(movie, index) in currentRankMovies" :key="index" class="movie-item">
              <img :src="movie.image" alt="Ranked Movie" />
              <div class="movie-details">
                <h3>{{ movie.title }}</h3>
                <p><strong>Year:</strong> {{ movie.year }}</p>
                <p><strong>Rating:</strong> {{ movie.imDbRating }}</p>
              </div>
            </div>
          </div>
          <div class="pagination">
            <button @click="changeRankMovies('prev')" :disabled="currentRankMoviesIndex === 0">Previous</button>
            <button @click="changeRankMovies('next')" :disabled="currentRankMoviesIndex === totalRankMoviesPages - 1">Next</button>
          </div>
        </div>
      </main>
    `,
    data() {
      return {
        currentTopMovieIndex: 0,
        currentPopularMoviesIndex: 0,
        currentRankMoviesIndex: 0,
        moviesPerPage: 3,
      };
    },
    computed: {
      currentPopularMovies() {
        const start = this.currentPopularMoviesIndex * this.moviesPerPage;
        const end = start + this.moviesPerPage;
        return this.top20moviesPopular.slice(start, end);
      },
      totalPopularMoviesPages() {
        return Math.ceil(this.top20moviesPopular.length / this.moviesPerPage);
      },
      currentRankMovies() {
        const start = this.currentRankMoviesIndex * this.moviesPerPage;
        const end = start + this.moviesPerPage;
        return this.top20moviesRank.slice(start, end);
      },
      totalRankMoviesPages() {
        return Math.ceil(this.top20moviesRank.length / this.moviesPerPage);
      },
    },
    methods: {
      changeTopMovie(direction) {
        if (direction === 'prev' && this.currentTopMovieIndex > 0) {
          this.currentTopMovieIndex--;
        } else if (direction === 'next' && this.currentTopMovieIndex < this.top5movies_doanhthu.length - 1) {
          this.currentTopMovieIndex++;
        }
      },
      changePopularMovies(direction) {
        if (direction === 'prev' && this.currentPopularMoviesIndex > 0) {
          this.currentPopularMoviesIndex--;
        } else if (direction === 'next' && this.currentPopularMoviesIndex < this.totalPopularMoviesPages - 1) {
          this.currentPopularMoviesIndex++;
        }
      },
      changeRankMovies(direction) {
        if (direction === 'prev' && this.currentRankMoviesIndex > 0) {
          this.currentRankMoviesIndex--;
        } else if (direction === 'next' && this.currentRankMoviesIndex < this.totalRankMoviesPages - 1) {
          this.currentRankMoviesIndex++;
        }
      },
    },
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
        
        moviesData:[], // Danh sách các movie sau khi gộp các thuộc tính
        
        top5movies_doanhthu : [],
        top15_30moviePopular:[],
        top15_30movieRank:[],

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
            const urls = {
            movies: "http://matuan.online:2422/api/Movies",
            names: "http://matuan.online:2422/api/Names",
            reviews: "http://matuan.online:2422/api/Reviews",
            top50: "http://matuan.online:2422/api/Top50Movies",
            mostPopular: "http://matuan.online:2422/api/MostPopularMovies",
            };
        
            const movieMap = new Map(); // Bảng hash để gộp dữ liệu
            try {
            // Fetch dữ liệu từ các API
            const [movies, names, reviews, top50, mostPopular] = await Promise.all(
                Object.values(urls).map((url) => fetch(url).then((res) => res.json()))
            );
        
            // Gộp dữ liệu từng API vào movieMap, chuẩn hóa các thuộc tính
            movies.forEach((movie) => {
                if (!movieMap.has(movie.id)) {
                movieMap.set(movie.id, { ...movie });
                }
            });
        
            // Gộp dữ liệu từ bảng Names
            names.forEach((name) => {
                const movie = movieMap.get(name.movieId);
                if (movie) {
                movie.names = name.names || [];
                }
            });
        
            // Gộp dữ liệu từ bảng Reviews
            reviews.forEach((review) => {
                const movie = movieMap.get(review.movieId);
                if (movie) {
                movie.reviews = review.reviews || [];
                }
            });
        
            // Gộp dữ liệu từ bảng Top50Movies (rank)
            top50.forEach((topMovie) => {
                const movie = movieMap.get(topMovie.id);
                if (movie) {
                movie.rank = topMovie.rank;
                }
            });
        
            // Gộp dữ liệu từ bảng MostPopularMovies (popularity)
            mostPopular.forEach((popularMovie) => {
                const movie = movieMap.get(popularMovie.id);
                if (movie) {
                // Xử lý trường hợp 'popularity' và 'rankUpDown' có thể là các tên khác nhau
                movie.popularity = popularMovie.rankUpDown || popularMovie.popularity; // Dùng trường 'rankUpDown' hoặc 'popularity'
                }
            });
        
            // Chuyển từ Map thành Array
            this.moviesData = Array.from(movieMap.values());
        
            // **Lọc bỏ thuộc tính trùng và không cần thiết**
            this.moviesData.forEach(movie => {
                // Kiểm tra nếu các thuộc tính như 'grossRevenue' và 'imDbRatingCount' trùng nhau
                // Nếu cùng giá trị thì chỉ giữ lại 1 trong 2
                if (movie.grossRevenue && movie.grossRevenue === movie.imDbRatingCount) {
                delete movie.imDbRatingCount; // Bỏ đi nếu giá trị trùng
                }
            });
        
            // **Lấy top 5 phim doanh thu cao nhất** (Dựa trên grossRevenue nếu có, hoặc ratingCount)
            this.top5movies_doanhthu = this.moviesData
                .filter((movie) => movie.grossRevenue)
                .sort((a, b) => b.grossRevenue - a.grossRevenue) // Sắp xếp theo doanh thu giảm dần
                .slice(0, 5);
        
            // **Lấy 20 phim phổ biến nhất** (Dựa vào 'popularity')
            this.top20moviesPopular = this.moviesData
                .filter((movie) => movie.popularity)
                .sort((a, b) => b.popularity - a.popularity) // Sắp xếp theo độ phổ biến giảm dần
                .slice(0, 20);
        
            // **Lấy 20 phim hạng cao nhất** (Dựa vào 'rank')
            this.top20moviesRank = this.moviesData
                .filter((movie) => movie.rank)
                .sort((a, b) => a.rank - b.rank) // Sắp xếp theo thứ hạng tăng dần
                .slice(0, 20);
        
            } catch (error) {
            console.error("Error fetching or merging movies:", error);
            }
        },      
        mounted() {
        this.loadPage();
        this.fetchMovies(); 
        },
    
    template: `
        <Header @toggle-dark-mode="toggleDarkMode" :isDarkMode="isDarkMode" />
        <NavBar  />
        <Main :top5movies_doanhthu="top5movies_doanhthu" :top20moviesPopular="top20moviesPopular" :top20moviesRank="top20moviesRank"/>
        <Footer />
    `,}
});

app.mount("#app");

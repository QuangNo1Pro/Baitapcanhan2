const Header={
    props:['isDarkMode'],
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
  methods:{
    //Sự kiện DarkMode
    toggleDarkMode(event){
        const isDarkMode= event.target.checked;
        this.$emit("toggle-dark-mode", isDarkMode);
    },


  },
};

const NavBar={
    template:`
        <nav>
            <button @click="goHome" class="home">🏠</button>
            <div class="search">
                <input class="input_search" type="search" placeholder="Search">
                <button class="button_search">Search</button>
            </div>
        </nav>
    `,

    methods:{
        goHome(){
            this.$emit('go-home');


        },


    },
};

const Main = {
    template:`
        <main>
        </main>
    `,

    methods:{

    },

};
const Footer = {
    template: `
      <footer><p>© LeVanQuang </p></footer>
    `,
};

const app = Vue.createApp({
    components:{
        Header,
        NavBar,
        Main,
        Footer,
    },
    data(){
        return{
            currentPage:1,
            isDarkMode:false,

        };
    },
    methods:{
        loadPage()
        {
            this.currentPage=1;
        },
        toggleDarkMode(isDarkMode){
            this.isDarkMode=isDarkMode;
            const body=document.body;
            if(isDarkMode)
            {
                body.classList.add("dark-mode")
            }
            else{
                body.classList.remove("dark-mode")

            }

        },
    },
    mounted(){
        this.loadPage();
    },

    template:`
        <Header @toggle-dark-mode="toggleDarkMode" :isDarkMode="isDarkMode"/ >
        <NavBar @go-home="loadPage()" />
        <Main/>
        <Footer/>
    `,
});  
app.mount("#app") ;

const Header={
    template: `
        <header>
            <div class="mssv">22120296</div>  
            <div class="title">Movies Info</div>
            <div class="switch">
                <input type="checkbox" id="mode-switch" class="toggle-switch">
                <label for="mode-switch"></label>
                <div class="setting">⚙️<div/>
            </div>
        </header>
  `,
};

const NavBar={
    template:`
        <nav>
            <button class="home">🏠</button>
            <div class="search">
                <input class="input_search" type="search" placeholder="Search">
                <button class="button_search">Search</button>
            </div>
        </nav>
    `,

    methods:{

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

        };
    },
    methods:{

    },

    template:`
        <Header/>
        <NavBar/>
        <Main/>
        <Footer/>
    `,
});  
app.mount("#app") ;

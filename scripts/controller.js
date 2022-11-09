class Controller
{
    constructor()
    {
        this.plan = {};
        this.funny = false;

        // Components
        this.todo = new Todo();
        this.alert = new Alert();
        this.time = new Time();
        this.video = new Video();

        // DOM
        this.DOMorientation = document.getElementById("orientation");
        this.DOMsplash = document.getElementById("splash");
        this.DOMalertTest = document.getElementById("alertTest");

        // Events
        window.addEventListener("orientationchange", this.checkOrientation.bind(this));
        document.body.addEventListener("touchstart", e => {}); // Required by Safari for some stupid fucking reason
        this.DOMalertTest.addEventListener("click", this.alertTest.bind(this));

        this.checkOrientation();
    }

    async load()
    {
        debugPrint(`Fetching plan [${PLAN_URL}]...`);

        // Fetch list of stuff
        const res = await fetch(PLAN_URL);
        this.plan = await res.json();

        // Preload video files
        await this.video.preloadVideos(this.plan.videos);

        // Preload audio jingle
        var jingle = await preload(this.plan.jingle);

        // load stuff
        this.time.loadAlerts(this.plan.alerts, msg => this.alert.createAlert(msg));
        this.alert.loadJingle(jingle);

        this.updateContent();

        debugPrint("Loading done.");
        
        // Keep "loading" for another second
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Hide splash
        var a = this.DOMsplash.animate({ opacity: [1, 0], easing: ["ease"] }, 1000);
        a.onfinish = () => {
            this.DOMsplash.classList.add("hidden");
        };
    }

    updateContent()
    {
        // Get amount of days since 1 jan 1970
        var now = new Date();
        var day = Math.floor(now.getTime() / 86400000);

        var todoList = this.plan.todo[now.getDay()];
        var projectVideo = day % this.plan.videos.length;
        var gymDay = this.plan.gym[day % this.plan.gym.length];

        this.todo.loadList(todoList); // might cause problem, cause we're not running Todo.clearList()
        this.video.loadVideo(projectVideo);
        // TODO: add gym
    }

    checkOrientation()
    {
        var o = this.DOMorientation.classList;
    
        Math.abs(window.orientation) != 90 ? o.remove("hidden") : o.add("hidden");
    }

    alertTest()
    {
        this.alert.createAlert(this.funny ? "🖕" : "Alert test");
        this.funny = !this.funny;
    }
}

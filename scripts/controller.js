class Controller
{
    constructor()
    {
        this.plan = {};
        this.funny = false;

        this.interval = setInterval(this.count.bind(this), 1000);

        this.alerts = [];
        this.reset = {};

        // Components
        this.todo = new Todo();
        this.alert = new Alert();
        this.time = new Time();
        this.video = new Video();
        this.gym = new Gym();
        
        // DOM
        this.DOMorientation = document.getElementById("orientation-warning");
        this.DOMsplash = document.getElementById("splash-screen");
        this.DOMalertTest = document.getElementById("main-alert-test");

        // Events
        window.addEventListener("orientationchange", this.checkOrientation.bind(this));
        document.body.addEventListener("touchstart", e => {}); // Required by Safari for some stupid fucking reason
        this.DOMalertTest.addEventListener("click", this.alertTest.bind(this));

        this.checkOrientation();
    }

    count()
    {
        var now = new Date();

        // Check for alerts
        for (var alert of this.alerts)
        {
            if (alert.h == now.getHours() && alert.m == now.getMinutes() && 0 == now.getSeconds())
                this.alert.createAlert(alert.message);
        }

        // Check for reset
        if (this.reset.h == now.getHours() && this.reset.m == now.getMinutes() && 0 == now.getSeconds())
            this.updateContent(true);

        
        this.time.update(now);
    }

    async load()
    {
        // Preloading
        debugPrint(`Fetching plan [${PLAN_URL}]...`);

        const res = await fetch(PLAN_URL);
        this.plan = await res.json();

        await this.video.preloadVideos(this.plan.videos);

        var jingle = await preload(this.plan.jingle);

        // load stuff
        this.reset = this.plan.reset;
        this.alerts = this.plan.alerts;

        this.alert.loadJingle(jingle);

        this.updateContent(false);

        debugPrint("Loading done.");
        
        // Keep "loading" for another second
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Hide splash
        var a = this.DOMsplash.animate({ opacity: [1, 0], easing: ["ease"] }, 1000);
        a.onfinish = () => {
            this.DOMsplash.classList.add("hidden");
        };
    }

    // If reset == true, the to-do list will be cleared
    updateContent(reset)
    {
        debugPrint("Updating content!");

        // Get amount of days since 1 jan 1970
        var now = new Date();
        var day = Math.floor(now.getTime() / 86400000);

        var todoList = this.plan.todo[now.getDay()];
        var projectVideo = day % this.plan.videos.length;
        var gymDay = this.plan.gym[day % this.plan.gym.length];

        if (reset) this.todo.clearList();
        this.todo.loadList(todoList);
        this.video.loadVideo(projectVideo);
        this.gym.loadList(gymDay);

        this.todo.updateTitle(now.getDay());
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

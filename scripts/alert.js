class Alert
{
    constructor()
    {
        // DOM
        this.messageLabel = document.getElementById("alertMessage");
        this.progressBar = document.getElementById("alertProgressBarProgress");

        this.alertDiv = document.getElementById("alert");
        this.alertCanvas = document.getElementById("alertCanvas");
        this.alertWindow = document.getElementById("alertWindow");

        this.video = document.getElementById("video"); // remove

        // Setup canvas
        this.alertCanvas.width = window.innerWidth;
        this.alertCanvas.height = window.innerHeight;
        this.ctx = this.alertCanvas.getContext("2d");

        // Other
        this.running = false;
        this.time = 10000; // ms
        this.frame = 0;
        this.waitedSeconds = 0;

        this.stripeWidth = 100;
        this.stripeSpeed = 10;

        // Audio
        this.alertJingle = null;

        // Animations
        this.slideInAnimation = {
            transform: ["translate(-50%, -50%) translateY(-100vh)", "translate(-50%, -50%)"],
            easing: ["ease"]
        };

        this.progressAnimation = {
            width: ["0%", "100%"],
            easing: ["linear"]
        }
    }

    loadJingle(url)
    {
        this.alertJingle = new Audio(url);
    }

    createAlert(message)
    {


        if (this.running)
        {
            debugPrint("Error: Alert has already been called!");
            return;
        }

        this.alertJingle.play();

        this.running = true;
        this.frame = 0;

        // Update message
        this.messageLabel.innerHTML = message;

        this.video.pause();

        // Start timer
        this.interval = setTimeout(this.done.bind(this), this.time);

        // Start background animation
        this.update();

        // Show alert div
        this.alertDiv.classList.remove("hidden");
        this.alertWindow.animate(this.slideInAnimation, 2000);

        // Progress bar animation
        this.progressBar.animate(this.progressAnimation, this.time);
    }

    done()
    {
        // Hide alert div
        this.alertDiv.classList.add("hidden");
            
        this.video.play();
        this.alertJingle.pause();
        this.alertJingle.currentTime = 0;

        this.running = false;
    }

    update()
    {
        this.frame++;

        // Draw background
        this.ctx.fillStyle = COLOR_YELLOW;
        this.ctx.fillRect(0, 0, this.alertCanvas.width, this.alertCanvas.height);

        // Draw stripes
        var stripes = Math.ceil(this.alertCanvas.height / this.stripeWidth / 2) + 1;

        var offset = ((this.frame * this.stripeSpeed) % (this.stripeWidth * 2)) - this.stripeWidth; //idk, it works

        this.ctx.fillStyle = COLOR_RED;
        for (var i = 0; i < stripes; i++)
            this.ctx.fillRect(0, offset + (i * this.stripeWidth * 2), this.alertCanvas.width, this.stripeWidth);

        // Next frame
        if (this.running)
            window.requestAnimationFrame(this.update.bind(this));
    }
}
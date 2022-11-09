class Todo
{
    constructor()
    {
        this.items = [];

        // DOM
        this.todoBackground = document.getElementById("todoBackground");
        this.todoWindow = document.getElementById("todoWindow");

        this.video = document.getElementById("video");

        // Events
        this.video.addEventListener("click", this.openWindow.bind(this));
        this.todoBackground.addEventListener("click", this.closeWindow.bind(this));

        // Animations
        this.busy = false; // is true when an animation is playing

        this.slideInAnimation = {
            transform: ["translate(-50%, -50%) translateY(-100vh)", "translate(-50%, -50%)"],
            easing: ["ease"]
        };

        this.slideOutAnimation = {
            transform: ["translate(-50%, -50%)", "translate(-50%, -50%) translateY(-100vh)"],
            easing: ["ease"]
        };
    }

    loadList(list)
    {
        for (var name of list)
        {
            var item = new Item(name);

            // Append items to parent (this.todoWindow)
            this.todoWindow.appendChild(item.element);

            this.items.push(item);
        }
    }

    clearList()
    {
        localStorage.clear();
        this.items = [];
    }

    openWindow()
    {
        if (this.busy) return;

        this.busy = true;

        this.todoWindow.classList.remove("hidden");
        var a = this.todoWindow.animate(this.slideInAnimation, 500);
        
        a.onfinish = () => {
            this.todoBackground.classList.remove("hidden");

            this.busy = false;
        };
    }

    closeWindow()
    {
        if (this.busy) return;

        this.busy = true;

        this.todoBackground.classList.add("hidden");
        var a = this.todoWindow.animate(this.slideOutAnimation, 500);

        a.onfinish = () => {
            this.todoWindow.classList.add("hidden");

            this.busy = false;
        };
        
    }
}

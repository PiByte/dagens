class Item
{
    constructor(name)
    {
        // Check localStorage
        var storedItem = localStorage.getItem(name);

        this.name = name;
        this.value = false;

        // DOM
        // Create elements
        this.element = document.createElement("div");
        var checkbox = document.createElement("div");
        this.check = document.createElement("div");
        var box = document.createElement("div");
        this.text = document.createElement("p");

        this.text.innerHTML = name;

        // Classes
        this.element.className = "todoItem";
        checkbox.className = "pressable checkbox";
        this.check.className = "check hidden";
        box.className = "box";

        // Append to parent (this.element)
        checkbox.appendChild(this.check);
        checkbox.appendChild(box);
        this.element.appendChild(checkbox);
        this.element.appendChild(this.text);

        checkbox.addEventListener("click", this.toggle.bind(this));

        if (storedItem != null && storedItem == "true")
            this.toggle();
    }

    toggle()
    {
        this.value = !this.value;

        this.check.classList.toggle("hidden");
        this.text.classList.toggle("strikeThroughText");

        localStorage.setItem(this.name, this.value);
    }
}
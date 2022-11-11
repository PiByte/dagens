class Gym
{
    constructor()
    {
        // DOM
        this.dayLabel = document.getElementById("main-gym-day");
        this.exercisesDiv = document.getElementById("main-gym-exercises");
    }

    loadList(list)
    {
        // Clear out the old list
        var child = this.exercisesDiv.lastElementChild;

        while (child) {
            this.exercisesDiv.removeChild(child);
            child = this.exercisesDiv.lastElementChild;
        }

        // Add new stuff
        this.dayLabel.innerHTML = list.name;

        for (var exercise of list.exercises)
        {
            var element = document.createElement("p");
            element.innerHTML = exercise;

            this.exercisesDiv.appendChild(element);
        }
    }
}
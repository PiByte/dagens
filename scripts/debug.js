// Makes it easier to debug on an iPad
function debugPrint(message)
{
    var element = document.createElement("p");
    element.innerHTML = message;

    document.getElementById("debug").appendChild(element);
}
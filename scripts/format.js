// Good function to have
String.format = (string, ...subseq) => {

    var currentString = string;
    for (var seq of subseq)
    {
        currentString = currentString.replace("%", seq);
    }

    return currentString;
};
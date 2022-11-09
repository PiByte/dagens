async function preload(path)
{
    debugPrint(`Fetching [${path}]...`);

    const res = await fetch(path);
    const blob = await res.blob();

    return URL.createObjectURL(blob);
}
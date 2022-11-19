function write_to_file(flHandle) {
    return null;
}

async function read_from_file(flHandle) {
    
    reader = await fl.stream().getReader();
    data = await reader.read().then(console.log("READ DATA"));
    return new TextDecoder().decode(data.value);

}


async function saveFile(flHandle) {

} 
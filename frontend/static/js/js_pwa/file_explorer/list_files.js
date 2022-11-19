import { generate_handler_info } from "./file_access_helper.js";

async function list_files() {
    let listElement = document.getElementById("directory-files");
    dirInfo = await generate_handler_info();

    dirInfo.file_handles.forEach(fileHandleDir => {
        let child = document.createElement("li");
        child.innerHTML = fileHandleDir.name;
        listElement.append(child);
    });

}
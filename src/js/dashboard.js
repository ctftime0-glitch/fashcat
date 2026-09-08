const search = document.getElementById("search");
const fileUpload = document.getElementById("fileUpload");
const searchButton = document.getElementById("searchButton");
const outputBox = document.getElementById("outputBox");
const fileName = document.getElementById("fileName");

fileUpload.addEventListener("change", function(){
        if(this.files.length > 0){
            fileName.textContent = this.files[0].name;
        }else{
            fileName.textContent = 'file belum di masukan';
        }
    });

searchButton.addEventListener("click", async function(){
    const prompt = search.value.trim();
    const file = fileUpload.files[0];

    if(!prompt && !file){
        return;
    }

    outputBox.innerHTML = `<h3>sedang di prosses</h3>`;

    searchButton.disabled = true;
 
    try{
        const formdata = new FormData();

        formdata.append("prompt", prompt);

        if(file){
            formdata.append("file", file);
        }

        const response = await fetch("/", {
            method:"POST",
            body:formdata
        });

        const data = await response.json();
        
        if(!response.ok) {
            throw new Error(data.error || "terjadi kesalahan");
        }

        let output = data.response;
        
        outputBox.innerHTML = formatOutput(output);
        Prism.highlightAllUnder(outputBox);
    }catch(error) {
        console.error(error);

        outputBox.innerHTML = `${escapeHTML(error.message)}`
    }finally{
        searchButton.disabled = false;
    }

});

function escapeHTML(text){
    const element = document.createElement("div");

    element.textContent = text;

    return element.innerHTML;

}

function formatOutput(text) {

    return text.replace(
        /```([a-zA-Z0-9_+-]+)?\r?\n([\s\S]*?)```/g,
        function(match, language, code) {

            language = language || "none";

            return `
                <pre>
                    <code class="language-${language}">
${escapeHTML(code)}
                    </code>
                </pre>
            `;
        }
    );
}
const pickerButton = document.querySelector(".picker-btn")
const colorsList = document.querySelector(".color-list")
const clearAllBtn = document.querySelector(".clear-color")


const colorsPickedList = JSON.parse(localStorage.getItem("picked-color") || "[]")

const copyColor = (element) => {
    copyText(element.dataset.color)
    element.innerHTML = "Copied"
    setTimeout(() => element.innerHTML = element.dataset.color, 500);
}

const copyText = (text) => {
    if (window.navigator) {
        navigator.clipboard.writeText(text)
    } else {
        console.log("Yor browser does not support navigator api");
    }
}

const createUiColorList = () => {
    const colorItem = colorsPickedList.map(color => {
        return `
        <li class="color-item">
            <span class="rect-color" style="background:${color}; border: 1px solid #bfbfbf;"></span>
            <span class="color-value" data-color="${color}">${color}</span>
        </li>
      `
    }).join("")
    colorsList.innerHTML = colorItem

    colorsList.querySelectorAll("li").forEach(item => {
        item.addEventListener("click", (e) => {
            copyColor(e.currentTarget.lastElementChild)
        })
    })
}
createUiColorList()

const clearAllColor = () => {
    colorsPickedList.length = 0
    localStorage.setItem("picked-color", JSON.stringify(colorsPickedList))
    createUiColorList()
}

const pickedColor = async () => {
    try {
        const eyeDraper = new EyeDropper();
        const { sRGBHex } = await eyeDraper.open();

        copyText(sRGBHex);
        if (!colorsPickedList.includes(sRGBHex)) {
            colorsPickedList.push(sRGBHex);
        }
        localStorage.setItem("picked-color", JSON.stringify(colorsPickedList));
        createUiColorList();
    } catch (error) {
        console.log(error.message);
    }
};


pickerButton.addEventListener("click", pickedColor)
clearAllBtn.addEventListener("click", clearAllColor)



// Global objects for storing application settings received from backend
var defaultFontList
var defaultUserList

window.onload = async function () {
    defaultUserList = await getDefaultUserList()
    defaultFontList = await getDefaultFontList()
    createUserSelectOptions()
    createFamilySelectOptions()
    updateText()
}

document.getElementById("user-select").onchange = (selectedOption) => {
    loadUserSettings(selectedOption.target.value)
}

document.getElementById("text-input").oninput = () => {
    updateText()
}

document.getElementById("family-select").onchange = () => {
    updateTextStyles()
}

document.getElementById("size-input").oninput = () => {
    updateTextStyles()
    // restrictNumberInput()
}

// document.getElementById("size-input").focusout = () => {
//     restrictSizeRange()
// }

document.getElementById("color-select").onchange = () => {
    updateTextStyles()
}

document.getElementById("style-select").onchange = () => {
    updateTextStyles()
}

document.getElementById("save").onclick = () => {
    updateUserSettings()
}
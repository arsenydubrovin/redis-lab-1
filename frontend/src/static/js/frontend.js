function createFamilySelectOptions() {
    const selectElement = document.getElementById("family-select")

    Object.entries(defaultFontList).forEach(([shortName, fullName]) => {
        const option = document.createElement("option")
        option.value = shortName
        option.textContent = fullName
        selectElement.appendChild(option)
    })
}

function createUserSelectOptions() {
    const selectElement = document.getElementById("user-select")

    defaultUserList.forEach(user => {
        const option = document.createElement("option")
        option.value = user
        option.textContent = user
        selectElement.appendChild(option)
    })
}

function updateTextStyles() {
    const displayedText = document.getElementById("displayed-text")
    const currSettings = getCurrentSettings()

    displayedText.style.fontFamily = convertFontFamily(currSettings.fontFamily)
    displayedText.style.fontSize = currSettings.fontSize + "px"
    displayedText.style.color = currSettings.fontColor
    switch (currSettings.fontStyle) {
        case "bold":
            displayedText.style.fontStyle = "normal"
            displayedText.style.fontWeight = "bold"
            break
        case "italic":
            displayedText.style.fontStyle = "italic"
            displayedText.style.fontWeight = "normal"
            break
        default:
            displayedText.style.fontStyle = "normal"
            displayedText.style.fontWeight = "normal"
            break
    }
}

function convertFontFamily(shortName) {
    return defaultFontList[shortName]
}

function updateText() {
    const input = document.getElementById("text-input")
    const displayedText = document.getElementById("displayed-text")
    displayedText.innerHTML = input.value
}

function getCurrentSettings() {
    const familySelect = document.getElementById("family-select")
    const sizeInput = document.getElementById("size-input")
    const styleSelect = document.getElementById("style-select")
    const colorSelect = document.getElementById("color-select")

    return {
        fontFamily: familySelect.value,
        fontSize: sizeInput.value,
        fontStyle: styleSelect.value,
        fontColor: colorSelect.value,
    }
}

function updateCurrentSettings(fontFamily, fontSize, fontStyle, fontColor) {
    const familySelect = document.getElementById("family-select")
    familySelect.value = fontFamily

    const sizeInput = document.getElementById("size-input")
    sizeInput.value = fontSize

    const styleSelect = document.getElementById("style-select")
    styleSelect.value = fontStyle

    const colorSelect = document.getElementById("color-select")
    colorSelect.value = fontColor
}

async function loadUserSettings(userName) {
    const settings = await getUserSettings(userName)
    updateCurrentSettings(settings.fontFamily, settings.fontSize, settings.fontStyle, settings.fontColor)
    updateTextStyles()
}


/*
function restrictNumberInput() {
    sizeInput = document.getElementById("size-input")
    console.log(sizeInput.value)
    sizeInput.value = sizeInput.value.replace(/\D/g, "")
}

function restrictSizeRange() {
    sizeInput = document.getElementById("size-input")
    switch (true) {
        case sizeInput.value === "":
            sizeInput.value = "1"
            break
        case sizeInput.value < 1:
            sizeInput.value = "1"
            break
        case sizeInput.value > 200:
            sizeInput.value = "200"
            break
    }
}
*/
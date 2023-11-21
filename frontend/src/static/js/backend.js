async function getDefaultUserList() {
    try {
        return await window.go.main.App.ServeUserList()
    } catch (err) {
        console.log(err)
    }
}

async function getDefaultFontList() {
    try {
        return await window.go.main.App.ServeDefaultFontList()
    } catch (err) {
        console.log(err)
    }
}

async function getUserSettings(userName) {
    try {
        let a = await window.go.main.App.GetUserSettings(userName)
        return a
    } catch (err) {
        console.log(err)
    }
}


function updateUserSettings() {
    const userSettings = getCurrentSettings()
    const userName = document.getElementById("user-select").value
    window.go.main.App.UpdateUserSettings(userName, userSettings)
}

import {app, BrowserWindow} from 'electron'
import serve from 'electron-serve'
import {createWindow} from './helpers'
import * as electron from "electron";

const isProd: boolean = process.env.NODE_ENV === 'production'

if (isProd) {
    serve({directory: 'app'})
} else {
    app.setPath('userData', `${app.getPath('userData')} (development)`)
}


;(async () => {
    await app.whenReady()

    const mainWindow = createWindow('main', {

        autoHideMenuBar: true,
        title: 'Pemantauan suhu ruangan dan kelembaban',

        fullscreenable:true

    })

    if (isProd) {
        await mainWindow.loadURL('app://./home')
    } else {
        const port = process.argv[2]
        await mainWindow.loadURL(`http://localhost:${port}/home`)

    }
})()



app.on('window-all-closed', () => {
    app.quit()
})

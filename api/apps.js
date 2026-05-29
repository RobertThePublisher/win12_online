```js id="l8g4dr"
// WIN12 WEB API
// apps.js

const Win12Apps = {

    installedApps: [],

    register(appName) {

        this.installedApps.push(appName);

        console.log(appName + " registered.");

    },

    launch(appName) {

        console.log("Launching " + appName + "...");

    },

    close(appName) {

        console.log("Closing " + appName + "...");

    },

    listApps() {

        return this.installedApps;

    }

};

export default Win12Apps;
```

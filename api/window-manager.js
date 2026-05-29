```js id="y2n7tv"
// WIN12 WEB API
// window-manager.js

const WindowManager = {

    windows: [],

    create(title) {

        const windowObject = {

            id: Date.now(),

            title: title,

            minimized: false,

            maximized: false

        };

        this.windows.push(windowObject);

        console.log(title + " window created.");

        return windowObject;

    },

    minimize(windowId) {

        console.log("Window minimized:", windowId);

    },

    maximize(windowId) {

        console.log("Window maximized:", windowId);

    },

    close(windowId) {

        this.windows = this.windows.filter(
            window => window.id !== windowId
        );

        console.log("Window closed:", windowId);

    }

};

export default WindowManager;
```

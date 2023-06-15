import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App.jsx";
import {ConfigProvider} from "antd";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ConfigProvider theme={{
            "token": {
                "colorPrimary": "#A0D911"
            },
            "components": {
                "Form": {
                    "marginLG": 10,
                },
                "Input": {
                    "controlHeight": 38
                }
            }
        }}>
            <App/>
        </ConfigProvider>
    </React.StrictMode>,
)

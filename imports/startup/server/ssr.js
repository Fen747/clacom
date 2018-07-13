import React from 'react'
import { renderToString } from 'react-dom/server'
import { SheetsRegistry } from 'react-jss/lib/jss'
import JssProvider from 'react-jss/lib/JssProvider'
import { onPageLoad } from 'meteor/server-render'
import StaticRouter from 'react-router-dom/StaticRouter'
import {
    createGenerateClassName,
    MuiThemeProvider,
    createMuiTheme
} from '@material-ui/core/styles'
import NodeCache from 'node-cache'

import App from '/imports/ui/App'

const ssrCache = new NodeCache({ stdTTL: 3600 })

onPageLoad(sink => {
    let html = ''
    let css = ''
    const cachedString = ssrCache.get(sink.request.url.path)

    if (cachedString) {
        console.log('CACHE FOUND')
        cached = JSON.parse(cachedString)
        html = cached.html
        css = cached.css
    } else {
        console.log('CACHE NOT FOUND, GENERATING IT')

        const sheetsRegistry = new SheetsRegistry()
        const generateClassName = createGenerateClassName()
        const theme = createMuiTheme({})

        html = renderToString(
            <StaticRouter location={sink.request.url} context={{}}>
                <JssProvider
                    registry={sheetsRegistry}
                    generateClassName={generateClassName}
                >
                    <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
                        <App />
                    </MuiThemeProvider>
                </JssProvider>
            </StaticRouter>
        )

        css = sheetsRegistry.toString()

        ssrCache.set(
            sink.request.url.path,
            JSON.stringify({
                html,
                css
            })
        )
    }

    sink.renderIntoElementById('jss-server-side', css)
    sink.renderIntoElementById('render_target', html)
})

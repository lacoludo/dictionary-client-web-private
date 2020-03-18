import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import 'bootstrap/dist/css/bootstrap.min.css'

import Words from './words/words.component'
import Word from './word/word.component'
import WordCreate from './word/word-create.component'
import WordUpdate from './word/word-update.component'
import * as serviceWorker from './serviceWorker'

const client = new ApolloClient({
  uri: 'https://tamil-monster-dictionary.herokuapp.com/graphql'
})

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <div>
        <Route exact path="/" component={Words} />
        <Route path="/word/:id" component={Word} />
        <Route path="/word-create" component={WordCreate} />
        <Route path="/word/:id/update" component={WordUpdate} />
      </div>
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

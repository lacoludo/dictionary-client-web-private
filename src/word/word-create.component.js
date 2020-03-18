import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Mutation } from 'react-apollo'

import { CREATE_WORD } from './word.mutation'

export default class extends Component {
  render() {
    let name
    return (
      <Mutation
        mutation={CREATE_WORD}
        onCompleted={() => this.props.history.push('/')}
      >
        {(createWord, { loading, error }) => (
          <div className="container">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">ADD WORD</h3>
              </div>
              <div className="panel-body">
                <h4>
                  <Link to="/" className="btn btn-primary">
                    Word list
                  </Link>
                </h4>
                <form
                  onSubmit={e => {
                    e.preventDefault()
                    createWord({
                      variables: {
                        name: name.value
                      }
                    })
                    name.value = ''
                  }}
                >
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      ref={node => {
                        name = node
                      }}
                      placeholder="Name"
                    />
                  </div>
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                </form>
                {loading && <p>Loading...</p>}
                {error && <p>Error :( Please try again</p>}
              </div>
            </div>
          </div>
        )}
      </Mutation>
    )
  }
}

import React from 'react'
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom'

const AnecdoteList = ({anecdotes}) => (
    <div>
        <h2>Anecdotes</h2>
        <ul className="list-group">
            {anecdotes.map(anecdote =>
                <li key={anecdote.id} class="list-group-item">
                    <NavLink to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</NavLink>
                </li>)}
        </ul>
    </div>
)

const Anecdote= ({anecdote}) => (
    <div>
        <h2>{anecdote.content} by {anecdote.author}</h2>
        <p>has {anecdote.votes} votes</p>
        <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
)

const About = () => (
    <div className="row">
        <div className="col-7 col-md-9">
            <h2>About anecdote app</h2>
            <p>According to Wikipedia:</p>

            <em>An anecdote is a brief, revealing account of an individual person or an incident.
                Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke
                laughter but to reveal a truth more general than the brief tale itself,
                such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea
                about a person, place, or thing through the concrete details of a short narrative.
                An anecdote is "a story with a point."</em>

            <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </div>
        <div className="col-5 col-md-3">
            <div class="card">
                <img class="card-img-top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Edsger_Wybe_Dijkstra.jpg/800px-Edsger_Wybe_Dijkstra.jpg" alt="Card image cap" />
                    <div class="card-body">
                        <p><strong>Edsger W. Dijkstra</strong></p>
                        <p class="card-text"><small>By Hamilton Richards - manuscripts of Edsger W. Dijkstra, University Texas at Austin, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=4204157</small></p>
                    </div>
            </div>
        </div>
    </div>
)

const footyStyle = {
    marginTop: '14px',
    backgroundColor: '#7fa4e0'
}

const Footer = () => (
    <div class="card text-white mb-3" style={footyStyle}>
        <div class="card-body">
            <h5 class="card-title">Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.</h5>

            <p class="card-text">See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for
                the source code.</p>
        </div>
    </div>
)

class CreateNew extends React.Component {
    constructor() {
        super()
        this.state = {
            content: '',
            author: '',
            info: ''
        }
    }

    handleChange = (e) => {
        console.log(e.target.name, e.target.value)
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.addNew({
            content: this.state.content,
            author: this.state.author,
            info: this.state.info,
            votes: 0
        })
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <h2>create a new anecdote</h2>
                <form className="col-7" onSubmit={this.handleSubmit}>
                    <div class="form-group">
                        <label for="contentField">content</label>
                        <input name='content' class="form-control" id="contentField" value={this.state.content} onChange={this.handleChange}/>
                    </div>
                    <div class="form-group">
                        <label for="authorField">author</label>
                        <input name='author' class="form-control" id="authorField" value={this.state.author} onChange={this.handleChange}/>
                    </div>
                    <div class="form-group">
                        <label for="urlField">url for more info</label>
                        <input name='info' class="form-control" id="urlField" value={this.state.info} onChange={this.handleChange}/>
                    </div>
                    <button class="btn btn-primary">create</button>
                </form>
            </div>
        )
    }
}

const Notification = ({message}) => {
    const notifyStyle = {
        padding: '10px',
        border: '1px solid green',
        'border-radius': '10px'
    }
    if (message) {
        return (
            <div style={notifyStyle} class="alert alert-success" role="alert">
                <span>{message}</span>
            </div>
        )
    } else {
        return null
    }
}

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            anecdotes: [
                {
                    content: 'If it hurts, do it more often',
                    author: 'Jez Humble',
                    info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
                    votes: 0,
                    id: '1'
                },
                {
                    content: 'Premature optimization is the root of all evil',
                    author: 'Donald Knuth',
                    info: 'http://wiki.c2.com/?PrematureOptimization',
                    votes: 0,
                    id: '2'
                }
            ],
            notification: ''
        }
    }

    addNew = (anecdote) => {
        anecdote.id = (Math.random() * 10000).toFixed(0)
        this.setState({
            anecdotes: this.state.anecdotes.concat(anecdote),
            notification: `a new anecdote ${anecdote.content} created!`
        })
        setTimeout(() => this.setState({ notification: '' }), 10000)
    }

    anecdoteById = (id) =>
        this.state.anecdotes.find(a => a.id === id)

    vote = (id) => {
        const anecdote = this.anecdoteById(id)

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1
        }

        const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

        this.setState({anecdotes})
    }

    menuStyle = {
        margin: '10px 0',
        padding: '0, 7px',
        backgroundColor: '#7fa4e0'
    }

    passiveStyle = {
        display: 'inline-block',
        margin: '-4px 7px'
    }

    activeStyle = {
        padding: '14px 7px',
        fontStyle: 'italic',
        color: 'white',
        textDecoration: 'none',
        backgroundColor: 'black'
    }

    render() {
        return (
            <div>
                <h1 className="display-4 text-uppercase">Software anecdotes</h1>
                <Router>
                    <div>
                        <div style={this.menuStyle}>
                            <NavLink exact to="/" style={this.passiveStyle} activeStyle={this.activeStyle}>anecdotes</NavLink>
                            <NavLink to="/create" style={this.passiveStyle} activeStyle={this.activeStyle}>create new</NavLink>
                            <NavLink to="/about" style={this.passiveStyle} activeStyle={this.activeStyle}>about</NavLink>
                        </div>
                        <Notification message={this.state.notification} />
                        <Route exact path="/" render={() =>
                            <AnecdoteList anecdotes={this.state.anecdotes} />}
                        />
                        <Route exact path="/anecdotes/:id" render={({match}) =>
                            <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
                        />
                        <Route path="/create" render={({history}) =>
                            <CreateNew history={history} addNew={this.addNew} />}
                        />
                        <Route path="/about" render={() => <About />} />
                    </div>
                </Router>

                <Footer/>
            </div>
        );
    }
}

export default App;

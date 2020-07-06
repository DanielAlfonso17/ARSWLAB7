const { Component } = React;
const { render } = ReactDOM;
const Router = ReactRouterDOM.BrowserRouter;
const Route =  ReactRouterDOM.Route;
const Link =  ReactRouterDOM.Link;
const Switch = ReactRouterDOM.Switch;
const Redirect = ReactRouterDOM.Redirect;

function TicTacToeServiceURL(sala) {
    var host = window.location.host;
    var url = 'ws://' + (host) + '/game/'+ sala;
    console.log("URL Calculada: " + url);
    return url;
}

class WSTicTacToeChannel {
    constructor(URL, callback) {
        this.URL = URL;
        this.wsocket = new WebSocket(URL);
        this.wsocket.onopen = (evt) => this.onOpen(evt);
        this.wsocket.onmessage = (evt) => this.onMessage(evt);
        this.wsocket.onerror = (evt) => this.onError(evt);
        this.receivef = callback;
    }


    onOpen(evt) {
        console.log("In onOpen", evt);
    }
    onMessage(evt) {
        console.log("In onMessage", evt);
        // Este if permite que el primer mensaje del servidor no se tenga en cuenta.
        // El primer mensaje solo confirma que se estableció la conexión.
        // De ahí en adelante intercambiaremos solo puntos(x,y) con el servidor
        if (evt.data != "Connection established.") {
            this.receivef(evt.data);
        }
    }
    onError(evt) {
        console.error("In onError", evt);
    }

    send(estado) {
        let msg = estado;
        console.log("sending: ", msg);
        this.wsocket.send(msg);
    }


}


function Square(props){
    return (
      <button className="square" 
		onClick={() => {props.onClick()}}>
        {props.value}
      </button>
 	);
}

class Board extends React.Component {

  renderSquare(i) {
    return <Square value={this.props.squares[i]} 
		onClick={() => this.props.onClick(i)}
	/>;
  }

  

  render() {
   
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props){
	console.log(window.location.pathname.split("/")[2]);
	super(props);
	
	this.state = {
		history: [{
			squares: Array(9).fill(null),
		}],
		xIsNext: true,
		stepNumber: 0,
	};
	this.comunicationWS =
		                new WSTicTacToeChannel(TicTacToeServiceURL(window.location.pathname.split("/")[2]),
		                        (msg) => {
		                    var obj = JSON.parse(msg);
		                    console.log("On func call back ", msg);
		                    this.actualizarEstado(obj);
		                });
  }

  jumpTo(step){
	this.setState({
		stepNumber: step,
		xIsNext: (step % 2) === 0,
	})
	
  }

  actualizarEstado(estado){
	this.setState(estado);
  }

  handleClick(i){
	//.slice copia de array
	//no mutar 
	//var player = {score: 1, name: 'Jeff'};
	//var newPlayer = Object.assign({}, player, {score: 2});
	// Ahora `player` no ha cambiado, pero `newPlayer` es {score: 2, name: 'Jeff'}
	// O si usas la sintaxis propuesta de propagación de objeto, puedes escribir:
	// var newPlayer = {...player, score: 2};
	const history = this.state.history.slice(0,this.state.stepNumber + 1);
	const current = history[history.length -1];
	const squares = current.squares.slice();
	if(calculateWinner(squares) || squares[i]){
		return;
	}
	squares[i] = this.state.xIsNext ? 'X': 'O';
	this.setState({
		//concat no muta el array como push 
		history: history.concat([{
			squares: squares,
		}]),
		stepNumber: history.length,
		xIsNext: !this.state.xIsNext,
		}, () => {
			this.comunicationWS.send(JSON.stringify(this.state));
		});
		console.log(this.state)
  }
  render() {
	const history = this.state.history;
	const current = history[this.state.stepNumber];
	const winner = calculateWinner(current.squares);
	const moves = history.map((step,move) => {
		const desc = move ? 'Go to move #' + move: 
		'Go to game start';
		return (
			<li key={move}>
				<button onClick={() => this.jumpTo(move)} >{desc}
				</button>
			</li>
		);
	});
	let status;
	if(winner){
		status = 'Winner: ' + winner;
	}else{
		status = 'Next player: ' + (this.state.xIsNext ? 'X': 'O');
	}
	
	
    return (
      <div className="game">
        <div className="game-board">
          <Board 
			squares={current.squares} 
			onClick={(i) => 
					this.handleClick(i)
			}
			/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Main extends React.Component{
	constructor(props){
		super(props);
		this.state={
			sala: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeSala = this.handleChangeSala.bind(this);
	}
	
	handleSubmit(event){
		event.preventDefault();
		console.log("clickeo boton");
		const {  history } = this.props;
    	history.push('/sala/' + this.state.sala);
		console.log(this.props);
		
		
	}
	
	handleChangeSala(event){
		this.setState({ sala: event.target.value });
		console.log(this.state.sala);
		
	}
	
	render(){
		return(
			<div id="login">
				<form  onSubmit={this.handleSubmit}>
					<label for="nombre">Sala</label>
					<input type="text" name="sala" onChange={this.handleChangeSala} id="sala" placeholder="Escribe nombre de la sala"/>
					<button className="btn btn-primary" type="submit">Entrar</button>	
				</form>
			</div>
		)
	}
}

class App extends React.Component{
	render(){
		return(
			<Router>
		        <Switch>
		          <Route path='/' exact={true} component={Main}/>
				  <Route path="/sala/:id" exact={true} component={Game} />
		         
		        </Switch>
	      </Router>
		)
	}
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

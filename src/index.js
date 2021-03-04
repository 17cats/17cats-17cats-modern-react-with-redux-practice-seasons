import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from "./components/SeasonDisplay";
import Spinner from "./components/Spinner";


class App extends React.Component{
  state = {lat: null, errorMessage: ''}

  componentDidMount() {
    console.log('My component was rendered to the screen');
    window.navigator.geolocation.getCurrentPosition(
        position => {this.setState({lat: position.coords.latitude})},
        err => {this.setState({errorMessage: err.message})}
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('My component was updated and rerendered');
  }

  renderContent(){
    if(this.state.errorMessage && !this.state.latitude){
      return(
          <div>Error: {this.state.errorMessage}</div>
      );
    }

    if(!this.state.errorMessage && this.state.lat){
      return(
          <div>
            <SeasonDisplay
                lat={this.state.lat}
            />
          </div>
      );
    }
    return(
        <div>
          <Spinner
              text="Waiting for user location permission..."
          />
        </div>
    );
  }


  render(){
       return (
        <div className="border red">{this.renderContent()}</div>
       );
      };
}

ReactDOM.render(<App/>, document.querySelector('#root'));

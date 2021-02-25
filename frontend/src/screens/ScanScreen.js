import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Scanner from '../components/Scanner'
import Result from './Result'
import Axios from 'axios'


class App extends Component {
  state = {
    scanning: false,
    results: [],
  }

  _scan = () => {
    this.setState({ scanning: !this.state.scanning })
  }

  _onDetected = async(result) => {
    
    console.log(result.codeResult)
      const scanCode = result.codeResult.code;
      console.log("scancode:" + scanCode)
      let companyCode = scanCode.substr(0, 3);
      //this.state.companyCode
      console.log(companyCode)

      const yearRes= await Axios.get('/year.json')
      const year = yearRes.data.session
      //this.props.history.push(`/product/${scanCode}`)
      this.props.history.push(`/product/${companyCode}/${year}/${scanCode}`)
      
      //this.setState({ results: this.state.results.concat([result]) })
      // 
  }

  render() {
    return (
      <div>
        <button onClick={this._scan}>
          {this.state.scanning ? 'Stop Scanning' : 'Start Scanning'}
        </button>
        <ul className="results">
          {this.state.results.map((result, i) => (
            <Result key={result.codeResult.code + i} result={result} />
          ))}
        </ul>
        {this.state.scanning ? <Scanner onDetected={this._onDetected} /> : null}
      </div>
    )
  }
}

export default App

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
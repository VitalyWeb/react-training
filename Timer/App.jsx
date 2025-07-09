import React, { Component } from "react";

class App extends Component {
  state = {
    startTime: null, // Хранит временную метку
    elapsedTime: parseInt(localStorage.getItem("elapsedTime")) || 0, // Суммарное время работы таймера
    isStart: false, // Работает ли таймер
    laps: JSON.parse(localStorage.getItem("laps")) || [] // Хранит временные метки всех сохранённых кругов
  };

  animationFrameId = null; // Нужен для отмены анимации
  lastUpdateTime = null; // Временная метка предыдущего кадра анимации

  componentDidMount() {
    if (this.state.isStart) {
      this.startTimer();
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  formatTime = (milliseconds) => {
    const totalSeconds = milliseconds / 1000;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = (totalSeconds % 60).toFixed(2);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.padStart(5, '0')}`;
  };

  updateTimer = (timestamp) => {
    if (!this.state.isStart) return;
    
    if (!this.lastUpdateTime) {
      this.lastUpdateTime = timestamp;
    }
    
    const deltaTime = timestamp - this.lastUpdateTime;
    this.lastUpdateTime = timestamp;
    
    this.setState(prevState => ({
      elapsedTime: prevState.elapsedTime + deltaTime
    }), () => {
      localStorage.setItem("elapsedTime", this.state.elapsedTime);
    });
    
    this.animationFrameId = requestAnimationFrame(this.updateTimer);
  };

  startTimer = () => {
    this.setState({
      startTime: Date.now() - this.state.elapsedTime,
      isStart: true
    });
    this.lastUpdateTime = null;
    this.animationFrameId = requestAnimationFrame(this.updateTimer);
  };

  stopTimer = () => {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.lastUpdateTime = null;
  };

  handleStart = () => {
    this.startTimer();
  };

  handleStop = () => {
    this.setState({ isStart: false });
    this.stopTimer();
  };

  handleRestart = () => {
    this.stopTimer();
    this.setState({ 
      elapsedTime: 0,
      isStart: false,
      laps: []
    }, () => {
      localStorage.setItem("elapsedTime", 0);
      localStorage.setItem("laps", JSON.stringify([]));
    });
  };

  handleLap = () => {
    this.setState(prevState => ({
      laps: [...prevState.laps, prevState.elapsedTime]
    }), () => {
      localStorage.setItem("laps", JSON.stringify(this.state.laps));
    });
  };

  render() {
    return(
      <div className="App">
        <h1 className="timer">React Timer</h1>
        <p className="display-time">{this.formatTime(this.state.elapsedTime)}</p>
        <div className="container">
          { this.state.isStart ? 
            <button type="button" className="stop-time" onClick={this.handleStop}>Stop</button> 
            : 
            <button type="button" className="start-time" onClick={this.handleStart}>Start</button>
          }
          <button type="button" className="lap-time" onClick={this.handleLap} disabled={!this.state.isStart}>Lap</button>
          <button type="button" className="restart-time" onClick={this.handleRestart}>Restart</button>
        </div>
        
        {this.state.laps.length > 0 && (
          <div className="laps-container">
            <h3>Laps:</h3>
            <ul className="laps-list">
              {this.state.laps.map((lapTime, index) => (
                <li key={index} className="lap-item">
                  <span>Lap {index + 1}:</span> 
                  <span>{this.formatTime(lapTime)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default App;
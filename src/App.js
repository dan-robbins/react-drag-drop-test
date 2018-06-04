import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  state = {
    tasks: [{name:"A",
             category: "left",
             bgcolor: "rgb(255, 43, 43)"},

            {name:"B",
             category: "center",
             bgcolor: "rgb(68, 255, 90)"},

            {name:"C",
             category: "right",
             bgcolor: "rgb(11, 96, 232)"}]
  };

  onDragOver = (e) => {
    e.preventDefault();
  }

  onDragStart = (e, id) => {
    console.log('now dragging',id);
    e.dataTransfer.setData("id", id);
  }

  onDrop = (e, cat) => {
    let id = e.dataTransfer.getData("id");
    let tasks = this.state.tasks.filter((task) => {
      if(task.name === id){
        task.category = cat;
      }
      return task;
    });
    console.log('now dropping',id,'in category',cat)
    this.setState({
      tasks: tasks
    });
  }

  componentDidMount(){
    document.title = "Drag Drop Test"
  }

  render() {
    let tasks = {left: [], right: [], center: []}

    this.state.tasks.forEach ((t) => {
      tasks[t.category].push(
        <div
          key={t.name}
          onDragStart={(e)=>this.onDragStart(e,t.name)}
          draggable
          className="draggable"
          style={{backgroundColor: t.bgcolor}}
        >
          {t.name}
        </div>
      );
    });

    return (
      <div className="container-drag">
        <h1 className="header">Drag & Drop Test</h1>

        <div className="left"
          onDragOver={(e)=>this.onDragOver(e)}
          onDrop={(e)=>this.onDrop(e, "left")}
        >
          <span className="task-header">LEFT</span>
          {tasks.left}
        </div>

        <div className="right"
            onDragOver={(e)=>this.onDragOver(e)}
            onDrop={(e)=>this.onDrop(e, "right")}
        >
          <span className="task-header">RIGHT</span>
          {tasks.right}
        </div>

        <div className="center"
            onDragOver={(e)=>this.onDragOver(e)}
            onDrop={(e)=>this.onDrop(e, "center")}
        >
          <span className="task-header">CENTER</span>
          {tasks.center}
        </div>

      </div>
    );
  }
}

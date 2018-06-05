import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  state = {
    items: [{name:"A",
             category: "left",
             bgcolor: "rgb(255, 43, 43)"},

            {name:"B",
             category: "center",
             bgcolor: "rgb(43, 255, 43)"},

            {name:"C",
             category: "right",
             bgcolor: "rgb(43, 43, 255)"}]
  };

  onDragOver = (e) => {
    e.preventDefault();
  }

  onDragStart = (e, name) => {
    console.log('now dragging',name);
    e.dataTransfer.setData("name", name);
  }

  onDrop = (e, cat) => {
    let name = e.dataTransfer.getData("name");
    let arr1 = this.state.items.filter((item) => {
      if(item.name !== name){
        return true
      }
      return false;
    });
    let arr2 = this.state.items.filter((item) => {
      if(item.name === name){
        item.category = cat;
        return true;
      }
      return false;
    });
    let items = arr1.concat(arr2);
    console.log('now dropping',name,'in category',cat)
    this.setState({
      items: items
    });
  }

  componentDnameMount(){
    document.title = "Drag Drop Test"
  }

  render() {
    let items = {left: [], right: [], center: []}

    this.state.items.forEach ((t) => {
      items[t.category].push(
        <div
          key={t.name}
          onDragStart={(e)=>this.onDragStart(e,t.name)}
          draggable
          className="drag-box"
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
          <span className="item-header">LEFT</span>
          {items.left}
        </div>

        <div className="center"
            onDragOver={(e)=>this.onDragOver(e)}
            onDrop={(e)=>this.onDrop(e, "center")}
        >
          <span className="item-header">CENTER</span>
          {items.center}
        </div>

        <div className="right"
            onDragOver={(e)=>this.onDragOver(e)}
            onDrop={(e)=>this.onDrop(e, "right")}
        >
          <span className="item-header">RIGHT</span>
          {items.right}
        </div>
      </div>
    );
  }
}

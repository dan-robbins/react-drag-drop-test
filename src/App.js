import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  state = {
    items: [{name:"A",
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
    /*
    let items = this.state.items.map((item) => {
      if(item.name === id){
        item.category = cat;
      }
      return item;
    });
    */
    let arr1 = this.state.items.filter((item) => {
      let newItem;
      if(item.name !== id){
        newItem = item;
      }
      return newItem;
    });
    let arr2 = this.state.items.filter((item) => {
      let newItem;
      if(item.name === id){
        item.category = cat;
        newItem = item;
      }
      return newItem;
    });
    let items = arr1.concat(arr2);
    console.log('now dropping',id,'in category',cat)
    this.setState({
      items: items
    });
  }

  componentDidMount(){
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

        <div className="background"></div>

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

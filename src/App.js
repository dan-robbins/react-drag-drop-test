import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

export default class App extends Component {
  /* Takes array of items to show in draggable area
  Items should be objects with name, category, and bgcolor attributes
    name:     string name of object to show, and also the text that is displayed
              inside the draggable object
    category: string category the object should start in
    bgcolor:  string color for the background fill of the object */
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({name: PropTypes.string,
                       category: PropTypes.oneOf(["left", "center", "right"]).isRequired,
                       bgcolor: PropTypes.string})).isRequired
  }

  /* constructor initializes object's state with the array of items passed to
  this component */
  constructor(props){
    super(props);
    this.state = {items: this.props.items};
  }

  // enables dragging into categories
  onDragOver(e){
    e.preventDefault();
  }

  // on drag start, store the object's name to be retrieved when it is dropped
  onDragStart(e, name){
    console.log('now dragging',name);
    e.dataTransfer.setData("name", name);
  }

  /* on drop, rebuild the internal list of items, updating the category of the
  moved item to the category it was moved to and relocating the moved item to
  the end of the array so that the moved item is always displayed after items
  already in the category that the item was moved to */
  onDrop(e, cat){
    // retrieve name of object meing moved
    let name = e.dataTransfer.getData("name");

    /* construct first part of new array by retrieving all elements from old
    array except the element being moved */
    let arr1 = this.state.items.filter((item) => {
      if(item.name !== name){
        return true
      }
      return false;
    });

    /* construct second part by retrieving only the item bieng moved, and
    updating that item's category */
    let arr2 = this.state.items.filter((item) => {
      if(item.name === name){
        item.category = cat;
        return true;
      }
      return false;
    });

    /* append second array to the end of first, constructing a new array of
    items with the updated moved item at the end */
    let items = arr1.concat(arr2);

    console.log('now dropping',name,'in category',cat)

    // update state to contain updated item array
    this.setState({
      items: items
    });
  }

  //set page title
  componentDidMount(){
    document.title = "Drag Drop Test"
  }

  /* generate JSX elements for all items in array of items to be displayed,
  sort these items into individual arrays for each category, generate elements
  for categories, and return element containing all categories with items
  displayed */
  render(){
    let items = {left: [], right: [], center: []}

    /* convert each item in items array to JSX elements and push to local array
    corresponding to item's category */
    this.state.items.forEach ((item) => {
      items[item.category].push(
        <div key={item.name}
        onDragStart={(e)=>this.onDragStart(e,item.name)}
        draggable
        className="drag-box"
        style={{backgroundColor: item.bgcolor}}>
          {item.name}
        </div>
      );
    });

    //generate categories and render in container
    return (
      // outer container for drag categories and elements
      <div className="container-drag">
        {/* container header */}
        <h1 className="header">Drag & Drop Test</h1>

        {/* left category and items */}
        <div
        className="left"
        onDragOver={(e)=>this.onDragOver(e)}
        onDrop={(e)=>this.onDrop(e, "left")}>
          {/* left container header */}
          <span className="item-header">LEFT</span>

          {/* display left items array */}
          {items.left}
        </div>

        {/* center category and items */}
        <div
        className="center"
        onDragOver={(e)=>this.onDragOver(e)}
        onDrop={(e)=>this.onDrop(e, "center")}>
          {/* center container header */}
          <span className="item-header">CENTER</span>

          {/* display center items array */}
          {items.center}
        </div>

        {/* right category and items */}
        <div
        className="right"
        onDragOver={(e)=>this.onDragOver(e)}
        onDrop={(e)=>this.onDrop(e, "right")}>
          {/* right container header */}
          <span className="item-header">RIGHT</span>

          {/* display right items array */}
          {items.right}
        </div>
      </div>
    );
  }
}

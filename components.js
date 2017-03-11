class StoryBox extends React.Component { // upper camel case. inherits from React base class.
  render() { // all components need this.
    return ( <div>Story Box</div>); // don't need quotes bc 'jsx'
  }
}

ReactDOM.render( // takes two arguments. 1) invoke StoryBox 2) target container element to be rendered to
  <StoryBox />, document.getElementById('story-app')
);

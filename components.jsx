
class StoryBox extends React.Component { // upper camel case. inherits from React base class.
  render() { // all components need this.
    return (
      <div>
        <h3>Stories App</h3>
        <p className="lead">Sample paragraph</p>
      </div>
    );
  }
}

ReactDOM.render( // takes two arguments. 1) invoke StoryBox 2) target container element to be rendered to
  <StoryBox />, document.getElementById('story-app')
);

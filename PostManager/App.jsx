import React, { Component } from "react";
import { Posts } from './Posts';

/* 
originalPosts - хранит неизменяемую версию всех постов с их исходными позициями

activePosts - текущие отображаемые посты

removedPosts - удаленные посты

removePost - переносит пост из activePosts в removedPosts

returnPost - возвращает пост из removedPosts в activePosts на исходную позицию

В render отображаются сначала активные, затем (если есть) удаленные посты
*/

class App extends Component {
  state = {
    originalPosts: [
      { id: 'abc1', name: 'JS Basics', originalIndex: 0 },
      { id: 'abc2', name: 'JS Advanced', originalIndex: 1 },
      { id: 'abc3', name: 'React JS', originalIndex: 2 },
      { id: 'abc4', name: 'Node.js Fundamentals', originalIndex: 3 },
      { id: 'abc5', name: 'TypeScript Essentials', originalIndex: 4 },
      { id: 'abc6', name: 'Vue.js Introduction', originalIndex: 5 },
      { id: 'abc7', name: 'Angular Framework', originalIndex: 6 },
      { id: 'abc8', name: 'Express.js Tutorial', originalIndex: 7 },
      { id: 'abc9', name: 'MongoDB with JavaScript', originalIndex: 8 },
      { id: 'abc10', name: 'Webpack Configuration', originalIndex: 9 }
    ],
    activePosts: [],
    removedPosts: []
  };

  componentDidMount() {
    this.setState({
      activePosts: [...this.state.originalPosts],
      removedPosts: []
    });
  }

  removePost = (id) => {
    this.setState(prevState => {
      const postToRemove = prevState.activePosts.find(post => post.id === id);
      return {
        activePosts: prevState.activePosts.filter(post => post.id !== id),
        removedPosts: [...prevState.removedPosts, postToRemove]
      };
    });
  }

  returnPost = (id) => {
    this.setState(prevState => {
      const postToReturn = prevState.removedPosts.find(post => post.id === id);
      
      const newActivePosts = [...prevState.activePosts];
      newActivePosts.splice(postToReturn.originalIndex, 0, postToReturn);
      
      return {
        activePosts: newActivePosts,
        removedPosts: prevState.removedPosts.filter(post => post.id !== id)
      };
    });
  }

  render() {
    const { activePosts, removedPosts } = this.state;
    return (
      <div className="App">
        <h1>Posts Management</h1>
        <div className="posts-container">
          <Posts posts={activePosts} removePost={this.removePost} returnPost={this.returnPost} isRemoved={false} />
          
          {removedPosts.length > 0 && (
            <>
              <h2>Removed Posts</h2>
              <Posts posts={removedPosts} removePost={this.removePost} returnPost={this.returnPost} isRemoved={true} />
            </>
          )}
        </div>
      </div>
    );
  }
}

export default App;
import React, { Component, Suspense } from 'react';
// import axios from 'axios';
import { Route, NavLink, Switch, Redirect} from 'react-router-dom';
import './Blog.css';
import Posts from './Posts/Posts';
import asyncComponent from '../../hoc/asyncComponent';
//import NewPost from './NewPost/NewPost';
//import FullPost from './FullPost/FullPost';

// this is for lazy loading 
const AsyncNewPost = asyncComponent (() => {
    return import('./NewPost/NewPost');
})

//Lazy Loading with React Suspence
// const Posts = React.lazy(() => import('./Posts/Posts'));

class Blog extends Component {
    state = {
        auth : true
    }
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink 
                                to="/posts" 
                                exact
                                activeClassName='active'
                                activeStyle={{
                                    color:'blue',
                                    textDecoration:'underline'
                            }}>Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact render={() => <h1>Home</h1>} />
                <Route path="/" render={() => <h1>Home 2</h1>} /> */}
                
                
                <Switch>
                    {this.state.auth ? <Route path="/new-post" exact component={AsyncNewPost} /> : null}
                    <Route path="/posts" component={Posts} />
                    {/* <Route path="/posts" render={() => (
                        <Suspense fallback={<div>Loading...</div>}>
                            <Posts />
                        </Suspense>
                    )} /> */}
                    <Route render={() => <h1>Not Found!!</h1>} />
                     {/* <Redirect from='/' to='/posts' /> */}
                     {/* <Route path="/" component={Posts} /> */}
                     {/* not found and path = '/' won't work together because both accepts all the paths */}
                     {/* we have to use only one and in the end of switch */}
                </Switch>
                

            </div>
        );
    }
}

export default Blog;
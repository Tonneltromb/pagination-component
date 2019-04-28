import React, {Component} from 'react';

import axios from 'axios';

import './App.css';
// import Pagination from "./components/Pagination_mine/Pagination";
import Pagination from "./components/Pagination_v2/Pagination";
import URL from "./common/URL";

class App extends Component {
    state = {
        page: 1,
        pageSize: 10,
        users: []
    };

    componentDidMount() {
        this.loadUsers();
    }

    loadUsers = () => {
        axios.get(`${URL.JSON_SERVER_URL}/users`)
            .then((response) => {
                console.log(response.data);
                const users = response.data.map((user) => {
                    return {...user};
                });
                this.setState({users: users});
            })
            .catch((error) => {
                console.log(error);
            })
    };

    changeActivePage = (page) => {
        this.setState({page: page});
    };

    render() {
        return (
            <div className='App'>
                <div className='App_pagination-wrapper'>
                    <Pagination
                        page={this.state.page}
                        pageSize={this.state.pageSize}
                        changeActivePage={this.changeActivePage}
                        pagesCount={Math.ceil(this.state.users.length / this.state.pageSize)}
                        centerButtonsCount={3}/>
                </div>
                {/*<Users data={this.state.users}/>*/}
            </div>
        );
    }


}

export default App;
import React, {Component} from 'react';

class Home extends Component {

    render(){
        return (
            <div>
                {this.context.userID}
            </div>
        );
    }
}

export default Home;
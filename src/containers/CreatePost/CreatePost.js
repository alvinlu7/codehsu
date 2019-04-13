import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';

class CreatePost extends Component{
    state = {
        title: null,
        pitch: null,
        description: null,
        difficulty: null,
        tags: null,
        compensation: null
    }

    titleChangeHandler = (event) => {
        const oldState = this.state;
        this.setState({
            ...oldState,
            title: event.target.value
        });
    }

    pitchChangeHandler = (event) => {
        const oldState = this.state;
        this.setState({
            ...oldState,
            pitch: event.target.value
        });
    }

    descriptionChangeHandler = (event) => {
        const oldState = this.state;
        this.setState({
            ...oldState,
            description: event.target.value
        });
    }

    difficultyChangeHandler = (event) => {
        const oldState = this.state;
        this.setState({
            ...oldState,
            difficulty: event.target.value
        });
    }

    tagsChangeHandler = (event) => {
        const oldState = this.state;
        this.setState({
            ...oldState,
            tags: event.target.value
        });
    }

    compensationChangeHandler = (event) => {
        const oldState = this.state;
        this.setState({
            ...oldState,
            compensation: event.target.value
        });
    }

    render(){

        return(
            <div>
                <TextField
                    id= "postTitle"
                    label = "Title"
                    value = {this.state.title}
                    onChange = {this.titleChangeHandler}
                />

                <TextField
                    id= "pitch"
                    label = "Pitch"
                    value = {this.state.pitch}
                    onChange = {this.pitchChangeHandler}
                />

                <TextField
                    id= "description"
                    label = "Description"
                    value = {this.state.description}
                    onChange = {this.descriptionChangeHandler}
                />
                <TextField
                    id= "difficulty"
                    label = "Difficulty"
                    value = {this.state.difficulty}
                    onChange = {this.difficultyChangeHandler}
                />
                <TextField
                    id= "tags"
                    label = "Tags"
                    value = {this.state.tags}
                    onChange = {this.tagsChangeHandler}
                />

                <TextField
                    id= "compensation"
                    label = "Compensation"
                    value = {this.state.compensation}
                    onChange = {this.compensationChangeHandler}
                />
            </div>
        )
    }

}

export default CreatePost
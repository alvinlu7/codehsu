import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Layout from '../../components/Layout/Layout';
import NewPostCard from '../../components/NewPostCard/NewPostCard';
import {auth, db} from '../../backend/Firebase';

class CreatePost extends Component{
    state = {
        title: null,
        pitch: null,
        description: null,
        difficulty: null,
        tags: [],
        compensation: null,
        tagsValue: null,
        errors: {}
    }

    titleChangedHandler = (event) => {
        const oldState = {...this.state};
        this.setState({
            ...oldState,
            title: event.target.value
        });
    }

    pitchChangedHandler = (event) => {
        const oldState = {...this.state};
        this.setState({
            ...oldState,
            pitch: event.target.value
        });
    }

    descriptionChangedHandler = (event) => {
        const oldState = {...this.state};
        this.setState({
            ...oldState,
            description: event.target.value
        });
    }

    difficultyChangedHandler = (event, difficulty) => {
        const oldState = {...this.state};
        this.setState({
            ...oldState,
            difficulty: difficulty
        });
    }

    tagsAddHandler = (event) => {
        let oldState = {...this.state};
        if(event.keyCode == 13){
            if(event.target.value){
                console.log("what")
                oldState.tags.push(event.target.value);
                this.setState({
                    ...oldState,
                    tags: oldState.tags,
                    tagsValue: ""
                });
            }
        }
    }

    tagsChangedHandler = (event) =>{
        let oldState = {...this.state};
        this.setState({
            ...oldState,
            tagsValue: event.target.value
        });
    }

    handleDeleteTag = (index) => {
        let oldState = {...this.state};
        oldState.tags.splice(index, 1);
        this.setState({
            ...oldState,
            tags: oldState.tags
        });

    }

    compensationChangedHandler = (event) => {
        const oldState = {...this.state};
        this.setState({
            ...oldState,
            compensation: event.target.value
        });
    }


    onSubmit = () =>{

        const errors = {};
        let properInput = true;

        if(!this.state.title)
        {
            console.log("No title")
            errors.title = true;
            properInput = false;
        }

        if(!this.state.pitch || (this.state.pitch.length > 500))
        {
            if(!this.state.pitch){
                console.log("No pitch")
                errors.pitch = true;
                properInput = false;
            }
            else if(this.state.pitch.length > 500)
            {
                console.log("Pitch too long")
                errors.pitch = true;
                properInput = false;
            }
        }

        if(!this.state.description)
        {
            console.log("No description")
            errors.description = true;
            properInput = false;
        }

        if(!this.state.difficulty)
        {
            console.log("No diffulty chosen")
            errors.difficulty = true;
            properInput = false
        }

        if(this.state.tags.length == 0)
        {
            console.log("No tags chosen")
            errors.tags = true;
            properInput = false
        }

        if(!this.state.compensation)
        {
            console.log("No compensation")
            errors.compensation = true;
            properInput = false
        }

        if(/*this.state.title &&
            this.state.pitch &&
            this.state.description &&
            this.state.difficulty &&
            this.state.tags &&
            this.state.compensation*/ properInput){

            const userID = auth.currentUser.uid;
            db.collection("posts").doc().set({
                title: this.state.title,
                pitch: this.state.pitch,
                description: this.state.description,
                difficulty: this.state.difficulty,
                tags: this.state.tags,
                compensation: this.state.compensation,
                timestamp: new Date().getTime(),
                auth_id: userID
            })
            .then(() => {
                this.props.history.push('/home');
            })
            .catch(function(error) {
                alert("Error writing document: ", error);
            });
        }
        else{

            var oldState = {...this.state};
            this.setState({...oldState, errors: errors})
            window.scrollTo(0, 0)

            //alert("Please fill out everything (including tags)")
        }

    }

    render(){
        console.log(this.state);
        return(
            <Layout>
                <NewPostCard
                title={this.state.title}
                pitch={this.state.pitch}
                description={this.state.description}
                difficulty={this.state.difficulty}
                tags={this.state.tags}
                compensation={this.state.compensation}
                titleChangedHandler={this.titleChangedHandler}
                pitchChangedHandler={this.pitchChangedHandler}
                descriptionChangedHandler={this.descriptionChangedHandler}
                difficultyChangedHandler={this.difficultyChangedHandler}
                tagsChangedHandler={this.tagsChangedHandler}
                compensationChangedHandler={this.compensationChangedHandler}
                submit={this.onSubmit}
                tagsValue={this.state.tagsValue}
                handleDeleteTag={this.handleDeleteTag}
                tagsAddHandler={this.tagsAddHandler}
                errors={this.state.errors}
                />
            </Layout>
        )
    }

}

export default CreatePost;
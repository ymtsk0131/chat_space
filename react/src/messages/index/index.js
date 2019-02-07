import React from 'react';
import ReactDOM from 'react-dom';

class MessagesIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        const params = JSON.parse(document.querySelector(`meta[name='params']`).getAttribute('content'))
        console.log(params)
        this.setState(params)
    }

    handleChange(event) {
        let newState = this.state
        newState.newMessage = {
            content: event.target.value,
            name: this.state.user.name
        }
        console.log(newState)
        this.setState(newState);
    }

    handleSubmit(event) {
        console.log('submit')
        const token = document.querySelector(`meta[name="csrf-token"]`).getAttribute('content')
        const data = JSON.stringify({
            content: this.state.newMessage.content, user_id: this.state.user.id
        })
        fetch('', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-type': 'application/json',
                'X-CSRF-Token': token
            },
            body: data
        })
        .then(response => {
            return response.json()
        }).then(data => {
            let newState = this.state
            newState.messages.push(data)
            this.setState(newState)
        }).catch(error => {
            alert('通信に失敗しました。再度お試しください。')
        })
        event.preventDefault();
    }

    renderGroupDetail() {
        if(this.state.group) {
            return(
                <div className="right-content-group-detail">
                    <div className="right-content-group-detail__name">
                    { this.state.group.name }
                    </div>
                    <div className="right-content-group-detail__edit-botton">
                        EDIT
                    </div>
                    <div className="right-content-group-detail__member-list">
                        member: { this.renderMembers() }
                    </div>
                </div>
            )
        }
    }

    renderMembers() {
        const members = []
        for(let i in this.state.members) {
            const member = this.state.members[i]
            members.push(member.name)
        }
        return members
    }

    renderMessages() {
        const messages = []
        for(let i in this.state.messages) {
            let message = this.state.messages[i]
            messages.push(
                <div key={i} className="right-content-main-message">
                    <div className=".right-content-main-message__user-name">
                        { message.name }
                    </div>
                    <div className=".right-content-main-message__date">
                        { message.created_at}
                    </div>
                    <div className="right-content-main-message__message-text">
                        { message.content }
                    </div>
                </div>
            )
        }
        return (
            <div className="right-content-main">
                { messages }
            </div>
        ) 
    }

    renderForm() {
        return(
            <div className="form">
                <form className="form__new_message" onSubmit={ this.handleSubmit }>
                    <input className="form__new_message__text" type="text" value={this.state.value} onChange={this.handleChange} />
                    <input className="form__new_message__submit-btn" type="submit" value="Submit" />
                </form>
            </div>
        )
    }

    render() {
        return(
            <div>
                { this.renderGroupDetail() }
                { this.renderMessages() }
                { this.renderForm() }
            </div>
        )
    }
}

ReactDOM.render(
  <MessagesIndex />,
  document.getElementById('messages-index')
);

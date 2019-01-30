import React from 'react';
import ReactDOM from 'react-dom';

class GroupIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const params = JSON.parse(document.querySelector(`meta[name='params']`).getAttribute('content'))
    this.setState(params)
  }

  renderUserInfo() {
    if(this.state.user) {
      return (
        <div className="side-bar-user-detail">
          <div className="side-bar-user-detail__name">
            {this.state.user.name}
            <a href="users/edit">
              [Edit]
            </a>
          </div>
        </div>
      )
    }
  }

  renderGroups() {
    const groups = [
        <a href="groups/new">[New]</a>
    ]
    for(let i in this.state.groups) {
      let group = this.state.groups[i]
      groups.push(
        <div key={group.id} className="side-bar-group-list">
          <a href={"groups/" + group.id + "/messages"}>
            <div className="side-bar-group-list__name">
              {group.name}
            </div>
          </a>
        </div>
      )
    }
    return groups
  }

  render() {
    return(
      <div className="side-bar">
        {this.renderUserInfo()}
        {this.renderGroups()}
      </div>
    )
  }
}

ReactDOM.render(
  <GroupIndex />,
  document.getElementById('group-index')
);
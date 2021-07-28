import React from 'react';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstModal: true
    };

    this.delete = this.delete.bind(this);
  }

  delete() {
    this.setState({
      firstModal: false
    });
  }

  delePost() {
    const id = { postId: this.props.active.postId };
    fetch('/api/feed/profile/post', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(id)
    })
      .then(res => {
        this.props.getPosts();
        this.props.close();
      });
  }

  render() {
    if (!this.props.active) return null;

    if (this.state.firstModal) {
      return (
        <div className="modal" onClick={this.props.close}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="">
              <div className="col-half image-side">
                <img className="modal-photo" src={this.props.active.photo} alt="" />
              </div>
              <div className="col-half text-side">
                <h2>{this.props.active.description}</h2>
              </div>
            </div>
            <div className="">
            </div>
            <div>
              <a onClick={this.delete} className="delete">DELETE</a>
            </div>
            <div className="text-right modal-btns">
              <button className="btn btn-red" onClick={this.props.close}>Cancel</button>
              <button className="btn btn-green" onClick={this.props.accept}>Accept</button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
      <div className="modal" onClick={this.props.close}>
        <div className="modal-content delete-modal" onClick={e => e.stopPropagation()}>

            <h2 className="deleteText">ARE YOU SURE YOU WANT TO DELETE</h2>
            <div className="row">
              <div className="col-half">
            <button className="btn btn-red" onClick={this.props.close}>Cancel</button>
              </div>
              <div className="col-half">
            <button className="btn btn-green" onClick={() => { this.delePost(); this.props.close(); }}>Accept</button>
              </div>

            </div>

        </div>
      </div>);
    }
  }

}

export default Modal;

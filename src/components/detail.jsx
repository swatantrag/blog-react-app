import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchComments } from './store/actions';


class CommentList extends React.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.item !== this.props.item;
    }
    render() {
        const item = this.props.item;
        return(
            <p> - {item.name.slice(0, 1).toUpperCase() + item.name.slice(1, item.name.length)}</p>
        );
    }
}


class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isComment: false,
            comments: []
        }
    };

    handleCommentClick = () => {
        this.setState({isComment: !this.state.isComment}, () => {
            if (this.state.isComment) this.props.fetchComments(this.props.item.id);
        })
    }

    render() {
        const prop = this.props.item;
        return (
            <div className='wrap'>
                <h3>{prop.id}. {prop.title.slice(0, 1).toUpperCase() + prop.title.slice(1, prop.title.length)}</h3>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{prop.body.slice(0, 1).toUpperCase() + prop.body.slice(1, prop.body.length)}</p>
                <button type='button' className='comment-btn' onClick={this.handleCommentClick}>Comments&nbsp;&nbsp;{this.state.isComment? <span>&#8679;</span> : <span>&#8681;</span> }</button>
                {this.state.isComment?
                    <div className='comments'>
                        {(this.props.commentsList && this.props.commentsList.length > 0 ) ?
                            this.props.commentsList.map(item => <CommentList item={item} key={item.id} />) : <p className='no-record'>No Record Found!!!</p> } 
                    </div>
                : null }
            </div>
        );
    }
}

Detail.propTypes = { fetchComments: PropTypes.func.isRequired }

const mapStateToProps = state => ({ commentsList: state.commentsList })

export default connect(mapStateToProps, { fetchComments })(Detail);

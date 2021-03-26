import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchBlogs } from './store/actions';
import Detail from './detail';

class Blogs extends React.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.item !== this.props.item;
    }
    render() {
        const item = this.props.item;
        return(
            <tr className={item.id % 2 === 0 ? 'even' : null}>
                <td onClick={this.props.onClick}>{item.id}</td>
                <td onClick={this.props.onClick}>{item.title.slice(0, 1).toUpperCase() + item.title.slice(1, item.title.length)}</td>
                <td onClick={this.props.onClick}>{item.body.slice(0, 1).toUpperCase() + item.body.slice(1, item.body.length)}</td>
            </tr>
        );
    }
}

class Listing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDetail: false,
            detail: {},
            blogs: this.props.blogsList ? this.props.blogsList : [],
            comments: [],
            search: ''
        }
        this.props.fetchBlogs();
    }

    handleBlogClick = ( item ) => {
        this.setState({ isDetail: true, detail: item });
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.blogsList !== this.state.blogs;
    }

    handleSearch = ( e ) => {
        const value = e.target.value;
        let filterBlogs = [];
        this.props.blogsList.map( item => {
            if (item.title.includes(value) || item.body.includes(value)) filterBlogs.push(item);   
        })
        this.setState({search: value, blogs: filterBlogs});
    }

    render() {
        const blogs = this.state.search === '' ? this.props.blogsList : this.state.blogs;
        return (
            <div className='wrap'>
                <h2>Hello, Welcome to my blogs!!!</h2>
                <div className='search'>
                    <input type='text' value={this.state.search} onChange={this.handleSearch} placeholder='Search here...' />
                </div>
                {!this.state.isDetail ? 
                    <table border='1'>
                        <thead>
                            <tr>
                                <td>Id</td>
                                <td>Title</td>
                                <td>Description</td>
                            </tr>
                        </thead>
                        <tbody>
                            {(blogs && blogs.length > 0) ? 
                                blogs.map( item => 
                                    <Blogs
                                        key={item.id}
                                        item={item}
                                        onClick={() => this.handleBlogClick(item)} />) 
                                : <tr>
                                    <td className='no-record' colSpan='3'>No Record Found!!!</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                    : 
                    <div className='detail'>
                        <button type='button' className='back' onClick={() => this.setState({ isDetail: false, detail: {} })}>&#8678;&nbsp;&nbsp;Back</button>
                        <Detail item={this.state.detail} /> 
                    </div>}
            </div>
        );
    }
}

Listing.propTypes = { fetchBlogs: PropTypes.func.isRequired }

const mapStateToProps = state => ({ blogsList: state.blogsList })

export default connect(mapStateToProps, { fetchBlogs })(Listing);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextTile from '../../components/Tiles/TextTile/TextTile';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import classes from '../../index.css';
import * as actions from '../../store/actions/index';

class Appliances extends Component {
    componentDidMount() {
        this.props.onLoadRooms(this.props.token, this.props.userId);
        this.props.onLoadCategories(this.props.token);
    }

    handleClick = (title) => {
        this.props.onTileClick(title);
    }

    render() {
        let rooms = this.props.loading ? <Spinner /> : null;
        let categories = this.props.loadingCat ? <Spinner /> : null;
        let errorRooms = this.props.errorR ? <h3>Error loading rooms!</h3> : null;
        let errorCategories = this.props.errorC ? <h3>Error loading categories!</h3> : null;

        // rooms
        if (!this.props.loading) {

            rooms = this.props.rooms.map(r => {
                return <TextTile key={r.id}
                    src={require(`../../assets/icons/${r.icon}`)}
                    title={r.name}
                    clicked={() => this.handleClick(r.name)} />
            });
        }

        // categories
        if (!this.props.loadingCat) {
            categories = this.props.categories.map(c => {
                return <TextTile key={c.id}
                    src={require(`../../assets/icons/${c.icon}`)}
                    title={c.name}
                    clicked={() => this.handleClick(c.name)} />
            });
        }

        let modal = this.props.tileClicked ? <Modal title={this.props.modalTitle} /> : null;

        return (
            <div>
                {modal}
                <h2 >Category</h2>
                <div className={classes.CardLayout}>{categories}</div>
                {errorCategories}

                <h2>Rooms</h2>
                <div className={classes.CardLayout}>{rooms}</div>
                {errorRooms}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        rooms: state.division.rooms,
        categories: state.division.categories,
        loading: state.division.loading,
        loadingCat: state.division.loadingCategories,
        errorR: state.division.errorRooms,
        errorC: state.division.errorCategories,

        tileClicked: state.tile.tileClicked,
        modalTitle: state.tile.modalTitle,

        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadRooms: (token, userId) => dispatch(actions.loadRooms(token, userId)),
        onLoadCategories: (token) => dispatch(actions.loadCategory(token)),
        onTileClick: (title) => dispatch(actions.loadModalClick(title))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Appliances);
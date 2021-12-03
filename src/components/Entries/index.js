import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as usersActions from '../../actions/usersActions';
import * as entriesActions from '../../actions/entriesActions'

import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';

const { bringAll: usersBringAll } = usersActions;
const { bringByUser: entriesBringByUser } = entriesActions;

class Entries extends Component {

	async componentDidMount() {
		const {
			usersBringAll,
			match: { params: { key } },
			entriesBringByUser
		} = this.props;

		if (!this.props.usersReducer.users.length) {
			await usersBringAll();
		};
		if (this.props.usersReducer.error) {
			return;
		};
		if (!('entries_key' in this.props.usersReducer.users[key])) {
			entriesBringByUser(key);
		};
	}

	placeUser = ()  => {
		const { 
			match: { params: { key } },
			usersReducer
		} = this.props

		if (usersReducer.error) {
			return <Fatal message={ usersReducer.error } />
		};

		if (!usersReducer.users.length || usersReducer.loading) {
			return <Spinner />
		};

		const name = usersReducer.users[key].name;

		return (
			<h1>
				Publicaciones de { name }
			</h1>
		);
	};

	placeEntries = () => {
		const {
			usersReducer,
			usersReducer: { users },
			entriesReducer,
			entriesReducer: { entries },
			match: { params: { key } }
		} = this.props;

		if (!users.length) return;
		if (usersReducer.error) return;

		if (entriesReducer.loading) {
			return <Spinner />;
		}
		if (entriesReducer.error) {
			return <Fatal message={ entriesReducer.error } />;
		}

		if (!entries.length) return;
		if (!('entries_key' in users[key])) return;

		const { entries_key } = users[key];
		return entries[entries_key].map((entry) => (
			<div 
				className='entry_title'
				key={ entry.id }
				onClick={ () => alert(entry.id) }
			>
				<h2>
					{ entry.title }
				</h2>
				<p>
					{ entry.body }
				</p>
			</div>
		));
	};

	render() {
		console.log(this.props);
		return (
			<div>
				{ this.placeUser() }
				{ this.placeEntries() }
			</div>
		);
	}
}

const mapStateToProps = ({ usersReducer, entriesReducer }) => {
	return {
		usersReducer,
		entriesReducer
	};
};

const mapDispatchToProps = {
	usersBringAll,
	entriesBringByUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Entries);
'use strict';

import React from 'react';

import { Modal } from 'elemental/lib/Elemental';

import AddForm from './add-form';
import AddOptions from './add-options';

class Add extends React.Component {
	constructor() {
		super();

		this.state = {
			selectedOption: {}
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.isAddModalOpen !== this.props.isAddModalOpen ||
			nextProps.isAddInitialContent !== this.props.isAddInitialContent;
	}

	setSelectedOption(option) {
		mixpanel.track('Chose Column', option);

		this.setState({
			selectedOption: option
		});
	}

	renderContent() {
		if (this.props.isAddInitialContent) {
			return <AddOptions setSelectedOption={this.setSelectedOption.bind(this)} toggleAddModal={this.props.toggleAddModal} toggleAddInitialContent={this.props.toggleAddInitialContent} />
		}
		else {
			return <AddForm auth={this.props.auth} addColumn={this.props.addColumn} selectedOption={this.state.selectedOption} toggleAddModal={this.props.toggleAddModal} toggleAddInitialContent={this.props.toggleAddInitialContent} />
		}
	}

	render() {
		return (
			<Modal id="add-modal" isOpen={this.props.isAddModalOpen} onCancel={this.props.toggleAddModal} backdropClosesModal>
				{this.renderContent()}
			</Modal>
		)
	}
}

export default Add;
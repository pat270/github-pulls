import React from 'react';
import _ from 'lodash';
import Icon from './Icon';

class AccountBar extends React.Component {
	handleClick = (e) => {
		var currentTarget = e.currentTarget;

		this.props.setDisplayView(currentTarget.dataset.displayType);
	}

	render() {
		var props = this.props;

		var buttons = 'compact cozy comfortable'.split(' ').map(
			(item, index) => {
				var btnClassName = `btn btn-default ${props.config.view === item ? 'active' : ''}`;
				var iconClassName = `icon-monospaced display-${item}-icon`;

				return <a className={btnClassName} href="javascript:;" data-display-type={item} key={index} onClick={this.handleClick} title={_.capitalize(item)}>
					<Icon className={iconClassName} name="list-ul" />
				</a>;
			}
		);

		// console.log(this.props);

		return <div className="management-bar management-bar-default">
			<div className="container-fluid-1280 app-column">
				<div className="management-bar-header-right">
					{buttons}
				</div>
			</div>
		</div>;
	}
}

export default AccountBar;
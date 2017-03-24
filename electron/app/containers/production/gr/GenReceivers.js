import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GenReceivers from '../../../components/production/gr/GenReceivers';
import * as GRActions from '../../../actions/production/gr/GRActions';

function mapStateToProps(state) {
  return {
    	GenR: state.GenReceivers
	};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GRActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GenReceivers);
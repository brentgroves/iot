
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GRChecks from '../../../components/production/gr/GRChecks';
import * as GRActions from '../../../actions/production/gr/GRActions';

function mapStateToProps(state) {
  return {
    	GenR: state.GenReceivers
	};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GRActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GRChecks);
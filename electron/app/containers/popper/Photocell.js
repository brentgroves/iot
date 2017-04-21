import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Photocell from '../../components/popper/Photocell';
import * as Actions from '../../actions/popper/Actions';

function mapStateToProps(state) {
  return {
    	Popper: state.Popper
	};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Photocell);
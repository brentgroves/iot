import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Bulb from '../../components/popper/Bulb';
import * as Actions from '../../actions/popper/Actions';

function mapStateToProps(state) {
  return {
    	Popper: state.Popper
	};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Bulb);
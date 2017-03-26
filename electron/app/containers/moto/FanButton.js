import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FanButton from '../../components/moto/FanButton';
import * as Actions from '../../actions/moto/Actions';

function mapStateToProps(state) {
  return {
	Moto: state.Moto
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FanButton);

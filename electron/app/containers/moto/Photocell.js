import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Photocell from '../../components/moto/Photocell';
import * as Actions from '../../actions/moto/Actions';

function mapStateToProps(state) {
  return {
    	Moto: state.Moto
	};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Photocell);
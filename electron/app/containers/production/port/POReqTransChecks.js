
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import POReqTransChecks from '../../../components/production/port/POReqTransChecks';
import * as POReqTrans from '../../../actions/production/port/POReqTrans';

function mapStateToProps(state) {
  return {
    	POReqTrans: state.POReqTrans
	};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(POReqTrans, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(POReqTransChecks);
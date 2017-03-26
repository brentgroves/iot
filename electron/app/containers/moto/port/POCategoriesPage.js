import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import POCategories from '../../../components/production/port/POCategories';
import * as POReqTrans from '../../../actions/production/port/POReqTrans';

function mapStateToProps(state) {
  return {
    	poCategories: state.POCategories
	};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(POReqTrans, dispatch);
//  return bindActionCreators(POUpdateAppActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(POCategories);

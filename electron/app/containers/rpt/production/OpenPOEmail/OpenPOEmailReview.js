import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import OpenPOEmailReview from '../../../../components/rpt/production/OpenPOEmail/OpenPOEmailReview';
import * as Actions from '../../../../actions/rpt/production/Actions';

function mapStateToProps(state) {
  return {
    ProdRpt: state.ProdReports
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenPOEmailReview);



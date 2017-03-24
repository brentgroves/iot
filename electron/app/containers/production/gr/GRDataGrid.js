import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as GRActions from '../../../actions/production/gr/GRActions';
import GRDataGrid from '../../../components/productin/gr/GRDataGrid';

function mapStateToProps(state) {
  return {
    	GenR: state.GenReceivers
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GRActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GRDataGrid);

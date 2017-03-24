import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GRReactDataGrid from '../../../components/production/gr/GRReactDataGrid';
import * as GRActions from '../../../actions/production/gr/GRActions';

function mapStateToProps(state) {
  return {
    	GenR: state.GenReceivers
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GRActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GRReactDataGrid);

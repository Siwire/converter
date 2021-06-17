import { connect } from 'react-redux';
import * as converterActions from '../redux/converterAction';
import { bindActionCreators } from 'redux';
import Panel from '../components/Panel';

const mapStateToProps = state => {
    return {
        converter: state.converter
    }
}
const mapDispatchToProps = dispatch => {
    return {
        converterActions: bindActionCreators(converterActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Panel)
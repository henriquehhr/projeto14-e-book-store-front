import Loading from '../../assets/img/Ripple-1s-200px.svg';
import { $LoadingScreen } from './style.js';

export default function LoadingScreen() {
    return (
        <$LoadingScreen>
            <img src={Loading} alt="loading gif" />
        </$LoadingScreen>
    );
}

import "./WelcomeComponent.css";
import vectorHome from '../../../../images/vectorHome.png'

function WelcomeComponent(): JSX.Element {
    return (
        <div className="WelcomeComponent">
            <div className="WelcomeComponentSen">
                <h2>Reusful, Buy and Sell Reusful stuff.</h2>
                <span>Score a deal and save a bundle with our website! Find gently used clothes, furniture, electronics, and more at a fraction of the cost. Shop unique collectibles and rare finds. </span>
                <span id="WelcomeComponentSenCatchPhrase">Shop with confidence at our website.</span>
            </div>
            <div className="WelcomeComponentImage">
                <img src={vectorHome} alt="" />
            </div>

        </div>
    );
}

export default WelcomeComponent;

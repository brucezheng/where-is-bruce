import { View, useLayoutStore, getBiographyCollapsed } from './LayoutState';
import Accordion from './Accordion';

const Biography = () => {
  const view = useLayoutStore(state => state.view);
  const setView = useLayoutStore(state => state.setView);
  return (
    <Accordion id='biography-accordion' collapsed={getBiographyCollapsed(view)} className='biography-container'>
      <div className="collapsible-text">
        <div className="collapsible-header">
        <div className="banner-text">About</div>
        <button className="close-button" onClick={() => setView(View.Main)}>X</button>
        </div>
        <div className="biography-content">
          <p className="no-top-margin">Hi! I'm Bruce. </p>
          <p>Nice to meet you! Welcome to my website. Make yourself at home!</p>
          <p>[Real bio under construction]</p>
        </div>
      </div>
    </Accordion>
  );
}

export default Biography;
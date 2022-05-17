import { View, useLayoutStore } from './LayoutState';
import brucePic from './IMG_9332.jpg';
import './App.css';

const QuestionHeader = () => {
  const view: View = useLayoutStore(state => state.view);
  const setView = useLayoutStore(state => state.setView);
  const getWording = (view: View) => {
    switch (view) {
      case View.Biography:
        return 'Who is ';
      case View.Main:
      default:
        return 'Where is ';
    }
  }
	return (
    <h1 className="header">
      {getWording(view)}
      <span className={'bruce-label' + (view !== View.Main ? ' bruce-label-active' : '')}>
        <div className="bruce-picture-container">
          <img
            className="bruce-picture"
            src={brucePic}
            alt={'It\'s me!'}
            onClick={() => setView(View.Biography)}
          >
          </img>
        </div>
        Bruce
      </span>?
    </h1>
  );
};

export default QuestionHeader;
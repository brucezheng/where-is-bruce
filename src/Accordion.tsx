import React, { useEffect, useRef } from 'react';
import useMeasure from 'react-use-measure';
import './App.css';

interface AccordionProps {
  id: string;
  className?: string;
  collapsed: boolean;
  children: React.ReactNode;
}

const Accordion = (props: AccordionProps) => {
  const className = props.className ? props.className + ' accordion' : 'accordion';
  const [innerEl, bounds] = useMeasure()
  useEffect(() => {
    setTimeout(() => document.getElementById(props.id)?.classList.add('transition'), 10);
  }, []);
  return (
    <div 
      id={props.id}
      className={className}
      style={{
        height: props.collapsed ? '0' : bounds.height,
        margin: props.collapsed ? '0' : '',
      }}
      >
      <div ref={innerEl}>
        {props.children}
      </div>
    </div>
  );
}

export default Accordion;
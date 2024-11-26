import React from 'react';
import LeafletMap from './leafletmap';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewObjectOffcanvas from './newObjectOffcanvas';



function App() {
  return (  
    <div>
      <h1 className='title'>Skipper</h1>
      <div>
        
        <div className='buttonContainer'>
          
          <NewObjectOffcanvas></NewObjectOffcanvas> 
          {/* new offcanvas component from bootstrap */}
        </div>
        
      </div>
      
      
      <div>
        <LeafletMap/>
        {/* Leaflet map component */}
      </div>
    </div>
  );
}
export default App;
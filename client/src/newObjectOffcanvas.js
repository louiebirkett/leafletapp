import { useState } from 'react';
import './newObjectOffcanvas.css';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';


function geoLocate (){ //Function to geolocate the position of user device
  navigator.geolocation.getCurrentPosition(position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log('Position:', latitude, longitude);

    
  }, error =>{
    console.log('Geolocatation Error:', error);
  });
}

const NewObjectOffcanvas = () =>{ //Offcanvas - bootstrap. for creating and managing new objects
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // React Code for displaying compoents to screen
    return ( 
        <>
          <Button className='newEntryButton' variant="primary" onClick={handleShow}>
            <h1 className='addTitle'>+</h1>
          </Button>
    
          <Offcanvas show={show} onHide={handleClose} placement='end'>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Create & Manage Items <div className='borderBottom'></div> </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div className='createItemContainer'>
                <h1>Create an item</h1>
                <form action='http://localhost:8080/objects' method='POST' className='createItemForm'>
                    <label>Item Name</label> <br></br>

                    <input className='itemName' type='text'></input>
                    <br></br>

                    <label>Description</label> <br></br>
                    <input className='itemDescription' type='text'></input>
                    <br></br>

                    <label>Image</label> <br></br>
                    <input className='itemImage' type='file'></input>

                    <input type='submit' className='btn btn-primary' onClick={geoLocate}></input>
                </form>
                
              </div>
              {/* <div className='borderBottom'></div> */}
              <div className='manageItemContainer'>
                <h1>Manage Items</h1>

              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </>
      );
}

export default NewObjectOffcanvas;
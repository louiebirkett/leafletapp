import { useState } from 'react';
import './newObjectOffcanvas.css';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

// Updated geoLocate function that returns a promise
function geoLocate() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log('Position:', latitude, longitude);
        resolve({ latitude, longitude }); // Resolve with coordinates
      },
      (error) => {
        console.log('Geolocation Error:', error);
        reject(error); // Reject on error
      },
      {
        enableHighAccuracy: true, // Requests GPS-level accuracy
        maximumAge: 0,
        timeout: 10000,
      }
    );
  });
}

const NewObjectOffcanvas = () => {
  const [show, setShow] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission status

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (isSubmitting) return; // Prevent double submissions

    setIsSubmitting(true); // Disable submit button

    try {
      // Get geolocation data before submitting the form
      const position = await geoLocate(); // Wait for geolocation
      setLatitude(position.latitude);
      setLongitude(position.longitude);

      // Find hidden inputs for latitude and longitude
      const form = event.target;
      const latitudeInput = form.querySelector('input[name="latitude"]');
      const longitudeInput = form.querySelector('input[name="longitude"]');

      // Set the hidden inputs with the latitude and longitude values
      latitudeInput.value = position.latitude;
      longitudeInput.value = position.longitude;

      // Submit the form
      form.submit(); // Submit the form programmatically
    } catch (error) {
      console.log('Geolocation failed:', error);
      setIsSubmitting(false); // Re-enable the submit button if geolocation fails
    }
  };

  return (
    <>
      <Button className="newEntryButton" variant="primary" onClick={handleShow}>
        <h1 className="addTitle">+</h1>
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            Create & Manage Items <div className="borderBottom"></div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="createItemContainer">
            <h1>Create an item</h1>
            <form
              action="http://localhost:8080/objects"
              method="POST"
              className="createItemForm"
              onSubmit={handleFormSubmit} // Use handleFormSubmit
              encType="multipart/form-data" // for file uploads
            >
              <label>Item Name</label> <br />
              <input className="itemName" type="text" name="name" required />
              <br />

              <label>Description</label> <br />
              <input className="itemDescription" type="text" name="comment" required />
              <br />

              <label>Image</label> <br />
              <input className="itemImage" type="file" name="image" required />

              <input type="hidden" name="latitude" value={latitude || ''} />
              <input type="hidden" name="longitude" value={longitude || ''} />

              {/* Disable the button while submitting */}
              <input
                type="submit"
                className="btn btn-primary"
                value="Create"
                disabled={isSubmitting} // Disable if submitting
              />
            </form>
          </div>
          <div className="manageItemContainer">
            <h1>Manage Items</h1>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NewObjectOffcanvas;

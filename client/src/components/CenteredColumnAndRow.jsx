import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure to import Bootstrap CSS

const CenteredColumnAndRow = () => {
  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      {/* vh-100 ensures the container takes 100% of the viewport height */}
      <div className="row">
        <div className="col-12 text-center">
          {/* Your content goes here */}
          <h1>Hello, Centered World!</h1>
          <p>This content is centered both vertically and horizontally.</p>
        </div>
      </div>
    </div>
  );
};

export default CenteredColumnAndRow;

import React from 'react';

const ProductBreakdown = (props) => (
  <div className="col no-gutters">
    {props.data
      ? props.data.map((type, index) => {
        const category = type[0];
        const oldNumber = type[1].value;
        const number = (oldNumber / 5) * 100;
        return (
          <div key={category} className="row no-gutters mb-2">
            <div className="col h6 font-weight-light">
              {category}
            </div>
            <div className="progress col-12" style={{ height: 8 }}>
              <div className="progress-bar bg-light" role="progressbar" style={{ width: `${(number - 2.5)}%` }} aria-valuenow={`${(number - 2.5)}`} aria-valuemin="1" aria-valuemax="100" />
              <div className="progress-bar bg-secondary" role="progressbar" style={{ width: '5%' }} aria-valuenow={5} aria-valuemin="1" aria-valuemax="100" />
              <div className="progress-bar bg-light" role="progressbar" style={{ width: `${100 - (number - 2.5)}%` }} aria-valuenow={`${100 - (number - 2.5)}`} aria-valuemin="1" aria-valuemax="100" />
            </div>
            <div className="col">
              {category === 'Size'
                ? (
                  <div className="row">
                    <small className="col font-weight-light text-muted">Too small</small>
                    <small className="col font-weight-light text-muted text-center">Perfect</small>
                    <small className="col font-weight-light text-muted text-right">Too big</small>
                  </div>
                )
                : category === 'Width'
                  ? (
                    <div className="row">
                      <small className="col font-weight-light text-muted">Too narrow</small>
                      <small className="col font-weight-light text-muted text-center">Perfect</small>
                      <small className="col font-weight-light text-muted text-right">Too wide</small>
                    </div>
                  )
                  : category === 'Comfort'
                    ? (
                      <div className="row">
                        <small className="col font-weight-light text-muted">Uncomfortable</small>
                        <small className="col font-weight-light text-muted text-right">Perfect</small>
                      </div>
                    )
                    : category === 'Quality'
                      ? (
                        <div className="row">
                          <small className="col font-weight-light text-muted">Poor</small>
                          <small className="col font-weight-light text-muted text-right">Perfect</small>
                        </div>
                      )
                      : category === 'Length'
                        ? (
                          <div className="row">
                            <small className="col font-weight-light text-muted">Too short</small>
                            <small className="col font-weight-light text-muted text-center">Perfect</small>
                            <small className="col font-weight-light text-muted text-right">Too long</small>
                          </div>
                        )
                        : category === 'Fit'
                          ? (
                            <div className="row">
                              <small className="col font-weight-light text-muted">Too tight</small>
                              <small className="col font-weight-light text-muted text-center">Perfect</small>
                              <small className="col font-weight-light text-muted text-right">Too loose</small>
                            </div>
                          )
                          : null}
            </div>
          </div>
        );
      })
      : null}
  </div>
);

export default ProductBreakdown;

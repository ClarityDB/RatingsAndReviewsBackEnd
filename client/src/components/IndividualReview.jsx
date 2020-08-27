import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './starRating.scss';
import Helpfulness from './Helpfulness';

const IndividualReview = ({
  rating, name, date, title, body, help, id, response, photos,
}) => {
  moment.suppressDeprecationWarnings = true;
  const timestamp = moment(date).format('MMMM D, YYYY');
  return (
    <div className="border-bottom border-dark m-2 no-gutters h-auto w-auto">
      <div className="row justify-content-between no-gutters">
        <div className="col no-gutters">
          <div className="Stars" style={{ '--rating': `${rating}` }} />
        </div>
        <div className="col no-gutters">
          <p id="namedate" className="h6 text-muted text-right">
            {name}
            {', '}
            {timestamp}
          </p>
        </div>
      </div>
      <div className="col">
        <h5 id="title" className="">{title}</h5>
        <p id="body" className="h6 font-weight-light">{body}</p>
      </div>
      <div>
        {photos.length > 0
          ? (
            <div className="col d-flex justify-content-around">
              {photos.map((picture) => (
                <img key={id} src={picture.url} alt="Can not be displayed" width="50" height="50" style={{ objectFit: 'cover' }} />
              ))}
            </div>
          )
          : null}
      </div>
      <div>
        {response !== 'null' && response
          ? (
            <div className="col bg-light">
              <div className="h6">
                Response:
              </div>
              <div className="h6 font-weight-light">
                {response}
              </div>
            </div>
          )
          : null}
      </div>
      <div>
        <Helpfulness id={id} help={help} />
      </div>
    </div>
  );
};

IndividualReview.propTypes = {
  rating: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default IndividualReview;
